import { CardEffect } from "./CardEffect";
import { Vector2, addVector2s, invertVector2 } from '@/utils/vector';
import { produce } from 'immer';

export type Card = {
  id: string;
  name: string;

  // requirements to play this card to the board, either a number of pips or
  // "replace" to replace a card on the board
  playRequirement: number | "replace";

  // score this card contributes to row while on the board
  power: number;

  // effects associated with this card
  effects: CardEffect[];

  // readable description of special effects
  description?: string | undefined,

  // if true, limit one per deck
  isLegendary: boolean,
};

export type CardGridCell = {
  origin: boolean,
  claims: boolean,
  affects: boolean,
};
export type CardGrid = CardGridCell[][];
export function getGridForCardEffects(effects: Card['effects']): CardGridCell[][] {
  const templateCell = {
    origin: false,
    claims: false,
    affects: false,
  };
  const grid: CardGrid = Array.from({ length: 5 }, () => (
    Array.from({ length: 5 }, () => ({
      ...templateCell,
    }))));
  const origin: Vector2 = { dx: 2, dy: 2};
  grid[origin.dx][origin.dy].origin = true;
  effects.forEach((effect) => {
    effect.actions.forEach((action) => {
        switch (action.id) {
          case 'addControlledPips':
          case 'addPower': {
            action.tiles?.forEach((vector) => {
              let claims = false, affects = false;
              if (effect.trigger.id === 'onPlay' && action.id === 'addControlledPips') {
                claims = true;
              } else {
                affects = true;
              }
              const coords = addVector2s(origin, vector);
              const cell = grid[coords.dx][coords.dy];
              cell.claims = cell.claims || claims;
              cell.affects = cell.affects || affects;
            });
            break;
          }
        }
    });
  });
  return grid;
};

export const getCardHasSpecialEffect = (effects: Card['effects']) => {
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
}

export function withReversedVectors(card: Card): Card {
  return produce(card, (draft) => {
    draft.effects = draft.effects?.map((effect) => {
      effect.trigger.tiles = effect.trigger?.tiles?.map((vector: Vector2) => invertVector2(vector));
      effect.actions = effect.actions.map((action) => {
        if ('tiles' in action) {
          action.tiles = action.tiles?.map((tile: Vector2) => invertVector2(tile))
        }
        return action;
      });
      return effect;
    });
  });
}
