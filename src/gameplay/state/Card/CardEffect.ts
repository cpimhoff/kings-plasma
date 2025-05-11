import { CardDefinition, CardPowerStatus } from './Card';
import { Vector2 } from '@/utils/vector';
import { CardAction } from './CardAction';
import { CardTriggerCondition } from './CardTriggerCondition';
import { CardEffectFilters } from './CardEffectFilters';

export type CardEffect = {
  trigger: CardTriggerCondition;
  actions: CardAction[];
  maxActivations?: number;
};

/** A collection of functions for easier creation of card effects. */
export namespace CardEffect {
  export function onThisPlayedAddPips(tiles: Vector2[], amount: number = 1): CardEffect {
    return onThisPlayed(addPips(tiles, amount));
  }

  export function onThisPlayed(...actions: CardAction[]): CardEffect {
    return {
      trigger: { id: 'onPlay', limitTo: { self: true } },
      actions,
    };
  }

  export function onThisDestroyed(...actions: CardAction[]): CardEffect {
    return {
      trigger: { id: 'onDestroy', limitTo: { self: true } },
      actions,
    };
  }

  export function passiveBoardPowerChange(
    amount: number,
    targets: CardEffectFilters & {
      limitTo: {
        tiles: Array<Vector2>; // tiles is required
      };
    },
    scaleBy?: CardAction.AddPower['scaleBy'],
  ): CardEffect[] {
    const addPowerAction = addPower(amount, targets, scaleBy);
    const removePowerAction = { ...addPowerAction, amount: -amount };

    return [
      // on play this card, add the effect to existing cards
      onThisPlayed(addPowerAction),
      // on play other cards to target tiles, add the effect to them
      // this needs to be a separate effect per tile to ensure that playing
      // a card to a targeted tile only triggers the effect for that new card,
      // and not repeating the effect for existing cards
      ...targets.limitTo.tiles.map<CardEffect>((tile) => ({
        trigger: { id: 'onPlay', ...targets },
        actions: [{ ...addPowerAction, limitTo: { tiles: [tile] } }],
      })),
      // on destroy remove the effect from all currently affected
      onThisDestroyed(removePowerAction),
    ];
  }

  export function scalePowerByNumMatchingCards(baseAmount: number, filters: CardEffectFilters): CardEffect[] {
    // initialize the card with power based on the state of the board at the time of play
    const onThisPlayedEffect: CardEffect = onThisPlayed({
      id: 'addPower',
      amount: baseAmount,
      scaleBy: filters,
    });
    // observe as matching cards are played
    const onMatchingCardsPlayedEffect: CardEffect = {
      trigger: {
        id: 'onPlay',
        ...filters,
      },
      actions: [
        {
          id: 'addPower',
          limitTo: { self: true },
          amount: baseAmount,
        },
      ],
    };
    // observe as non-matching cards change status to become matching cards
    const powerStatus = filters.powerStatus || {};
    const observePowerStatusEffects: CardEffect[] = Object.keys(powerStatus)
      .map((s) => s as CardPowerStatus)
      .filter((s) => !!powerStatus[s])
      .flatMap((status) => {
        return [
          {
            trigger: {
              id: 'onPowerChange',
              powerStatusChange: {
                status,
                onOff: 'on',
              },
            },
            actions: [
              {
                id: 'addPower',
                limitTo: { self: true },
                amount: baseAmount,
              },
            ],
          },
          {
            trigger: {
              id: 'onPowerChange',
              powerStatusChange: {
                status,
                onOff: 'off',
              },
            },
            actions: [
              {
                id: 'addPower',
                limitTo: { self: true },
                amount: -1 * baseAmount,
              },
            ],
          },
        ];
      });
    // decrease power when matching cards are destroyed
    const onMatchingCardsDestoyedEffect: CardEffect = {
      trigger: {
        id: 'onDestroy',
        ...filters,
      },
      actions: [
        {
          id: 'addPower',
          amount: -1 * baseAmount,
        },
      ],
    };
    return [
      onThisPlayedEffect,
      onMatchingCardsPlayedEffect,
      ...observePowerStatusEffects,
      // NOTE: as new filters are added to CardEffectFilter, we might need to add more effects here
      onMatchingCardsDestoyedEffect,
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
    amount: number,
    targets: CardEffectFilters,
    scaleBy?: CardAction.AddPower['scaleBy'],
  ): CardAction.AddPower {
    return {
      id: 'addPower',
      amount,
      ...targets,
      scaleBy,
    };
  }

  export function createCardForPlayer(
    cardDefinition: CardDefinition,
    player: 'controller' | 'opponent' = 'controller',
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
