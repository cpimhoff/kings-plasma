import { uuid, UUID } from '@/utils';
import { CardEffect } from './CardEffect';
import { Vector2, addVector2s, invertVector2 } from '@/utils/vector';
import { produce } from 'immer';

export type CardTypeId = string & { __cardTypeId: true };

export type CardDefinition = {
  typeId: CardTypeId;

  name: string;

  // requirements to play this card to the board, either a number of pips or
  // "replace" to replace a card on the board
  playRequirement: number | 'replace';

  // score this card contributes to row while on the board, before any power modifiers are applied
  basePower: number;

  // effects associated with this card
  effects: CardEffect[];

  // readable description of special effects
  description?: string | undefined;

  // if true, limit one per deck
  isLegendary?: boolean;
};

type CardInstanceId = UUID & { __cardInstanceId: true };

export type CardInstance = CardDefinition & {
  instanceId: CardInstanceId;
  powerModifier: number;
};

export function createCardInstance(cardDef: CardDefinition): CardInstance {
  return {
    ...cardDef,
    instanceId: uuid() as CardInstanceId,
    powerModifier: 0,
  };
}

export function getCardPower(card: CardInstance): number {
  return card.basePower + card.powerModifier;
}

export type CardPowerStatus = 'empowered' | 'enfeebled' | 'neutral';
export function getCardPowerStatus(card: CardInstance): CardPowerStatus {
  if (card.powerModifier === 0) return 'neutral';
  return card.powerModifier > 0 ? 'empowered' : 'enfeebled';
}

export type CardGridCell = {
  origin: boolean;
  claims: boolean;
  affects: boolean;
};
export type CardGrid = CardGridCell[][];
export function getGridForCardEffects(effects: CardDefinition['effects']): CardGridCell[][] {
  const templateCell: CardGridCell = {
    origin: false,
    claims: false,
    affects: false,
  };
  const grid: CardGrid = Array.from({ length: 5 }, () =>
    Array.from({ length: 5 }, () => ({
      ...templateCell,
    })),
  );
  const origin: Vector2 = { dx: 2, dy: 2 };
  grid[origin.dx][origin.dy].origin = true;
  effects.forEach((effect) => {
    effect.actions.forEach((action) => {
      let tiles: Array<Vector2>;
      if ('tiles' in action && action.tiles) {
        // addControlledPips
        tiles = action.tiles;
      } else if ('limitTo' in action && action.limitTo && 'tiles' in action.limitTo && action.limitTo.tiles) {
        // addPower, immediatelyDestroy
        tiles = action.limitTo.tiles;
      } else {
        tiles = [];
      }
      tiles.forEach((vector) => {
        let claims = false,
          affects = false;
        if (effect.trigger.id === 'onPlay' && action.id === 'addControlledPips') {
          claims = true;
        } else {
          affects = true;
        }
        const coords = addVector2s(origin, vector);
        const cell = grid[coords.dx][4 - coords.dy]; // reverse each column for rendering with css grid
        cell.claims = cell.claims || claims;
        cell.affects = cell.affects || affects;
      });
    });
  });
  return grid;
}

export const getCardHasSpecialEffect = (effects: CardDefinition['effects']) => {
  let ret = false;
  effects.forEach((effect) => {
    effect.actions.forEach((action) => {
      switch (action.id) {
        case 'addControlledPips': {
          if (effect.trigger.id !== 'onPlay') {
            ret = true;
          }
          break;
        }
        default:
          ret = true;
      }
    });
  });
  return ret;
};

export function withReversedVectors(card: CardDefinition): CardDefinition {
  return produce(card, (draft) => {
    draft.effects = draft.effects?.map((effect) => {
      if ('limitTo' in effect.trigger) {
        let tiles: Array<Vector2> | null = effect.trigger.limitTo?.tiles ?? null;
        if (tiles) {
          effect.trigger.limitTo!.tiles = tiles.map((vector: Vector2) => invertVector2(vector));
        }
      }
      effect.actions = effect.actions.map((action) => {
        if ('limitTo' in action && action.limitTo && 'tiles' in action.limitTo && action.limitTo.tiles) {
          action.limitTo.tiles = action.limitTo.tiles.map((tile: Vector2) => invertVector2(tile));
        }
        if ('cardDefinition' in action) {
          action.cardDefinition = withReversedVectors(action.cardDefinition);
        }
        return action;
      });
      return effect;
    });
  });
}
