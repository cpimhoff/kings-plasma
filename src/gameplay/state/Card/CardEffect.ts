import { CardDefinition, CardPowerStatus } from './Card';
import { Vector2 } from '@/utils/vector';
import { CardAction } from './CardAction';
import { CardTriggerCondition } from './CardTriggerCondition';

export type CardEffect = {
  trigger: CardTriggerCondition;
  actions: CardAction[];
};

export type CardEffectFilters = {
  // if true, only match this card
  self?: boolean;
  // if set, only match cards in these relative tiles
  tiles?: Array<Vector2>;
  // if true, match allied cards
  allied?: boolean;
  // if true, match opponent cards
  opponent?: boolean;
  // if true, only match buffed cards
  buffed?: boolean;
  // if true, only match debuffed cards
  debuffed?: boolean;
  // TODO: allow setting both buffed and debuffed to match either one?
};

/** A collection of functions for easier creation of card effects. */
export namespace CardEffect {
  export function onThisPlayedAddPips(tiles: Vector2[], amount: number = 1): CardEffect {
    return onThisPlayed(addPips(tiles, amount));
  }

  export function onThisPlayed(...actions: CardAction[]): CardEffect {
    return {
      trigger: { id: 'onPlay', self: true },
      actions,
    };
  }

  export function onThisDestroyed(...actions: CardAction[]): CardEffect {
    return {
      trigger: { id: 'onDestroy', self: true },
      actions,
    };
  }

  export function passiveBoardPowerChange(
    tiles: Vector2[],
    amount: number,
    targets: CardEffectFilters,
  ): CardEffect[] {
    const addPowerAction = addPower(tiles, amount, targets);
    const removePowerAction = { ...addPowerAction, amount: -amount };

    return [
      // on play this card, add the effect to existing cards
      {
        trigger: { id: 'onPlay', self: true },
        actions: [addPowerAction],
      },
      // on play other cards to target tiles, add the effect to them
      // this needs to be a separate effect per tile to ensure that playing
      // a card to a targeted tile only triggers the effect for that new card,
      // and not repeating the effect for existing cards
      ...(addPowerAction.tiles ?? []).map<CardEffect>((tile) => ({
        trigger: { id: 'onPlay', tiles: [tile], ...targets },
        actions: [{ ...addPowerAction, tiles: [tile] }],
      })),
      // on destroy remove the effect from all currently affected
      {
        trigger: { id: 'onDestroy', self: true },
        actions: [removePowerAction],
      },
    ];
  }

  export function scalePowerByNumMatchingCards(baseAmount: number, filters: CardEffectFilters): CardEffect[] {
    const onPlayEffect = {
      trigger: { id: 'onPlay', self: true },
      actions: [
        {
          id: 'addPower',
          amount: baseAmount,
          self: true,
          scaleBy: filters,
        },
      ],
    } satisfies CardEffect;
    const onDestroyEffect = {
      trigger: {
        id: 'onDestroy',
        ...filters,
      },
      actions: [
        {
          id: 'addPower',
          amount: -1 * baseAmount,
          self: true,
        },
      ],
    } satisfies CardEffect;
    const statuses = ['buffed', 'debuffed'] satisfies CardPowerStatus[];
    let powerChangeEffects = [];
    if (statuses.length === 1) {
      // ^if both are set, we won't match anything.
      // if none are set, we don't need to add these effects.
      const status = statuses[0];
      const modifiedFilters = {
        ...filters,
      };
      delete modifiedFilters.buffed;
      delete modifiedFilters.debuffed;
      powerChangeEffects.push(
        {
          trigger: {
            id: 'onPowerChange',
            ...modifiedFilters,
            powerStatusChange: {
              status,
              onOff: 'on',
            },
          },
          actions: [
            {
              id: 'addPower',
              amount: baseAmount,
              self: true,
            },
          ],
        } satisfies CardEffect,
        {
          trigger: {
            id: 'onPowerChange',
            ...modifiedFilters,
            powerStatusChange: {
              status,
              onOff: 'off',
            },
          },
          actions: [
            {
              id: 'addPower',
              amount: -1 * baseAmount,
              self: true,
            },
          ],
        } satisfies CardEffect,
      );
    }
    return [
      // on play this card, increase own power by the base amount scaled by the number of matching cards
      onPlayEffect,
      // increase/decrease own power as matching cards gain/lose buffed/debuffed status, if needed
      ...powerChangeEffects,
      // as matching cards are destroyed, decrease own power by the base amount
      onDestroyEffect,
    ];
  }

  export function addPips(tiles: Vector2[], amount: number = 1): CardAction.AddControlledPips {
    return {
      id: 'addControlledPips',
      tiles,
      amount,
    };
  }

  export function addPower(
    tiles: Vector2[],
    amount: number,
    targets: CardEffectFilters,
  ): CardAction.AddPower {
    return {
      id: 'addPower',
      tiles,
      amount,
      ...targets,
    };
  }

  export function createCardForPlayer(
    cardDefinition: CardDefinition,
    player: 'allied' | 'opponent' = 'allied',
    into: 'hand' | 'deck.random' | 'deck.top' = 'hand',
  ): CardAction.CreateCardForPlayer {
    return {
      id: 'createCardForPlayer',
      cardDefinition,
      player,
      into,
    };
  }
}
