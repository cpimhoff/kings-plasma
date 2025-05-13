import { CardDefinition, CardPowerStatus } from './Card';
import { Vector2 } from '@/utils/vector';
import { CardAction, CardActionFilters } from './CardAction';
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
    targets: CardEffectFilters,
    scaleBy?: CardAction.AddPower['scaleBy'],
  ): CardEffect[] {
    const addPowerAction = addPower(amount, targets, scaleBy);
    const removePowerAction = { ...addPowerAction, amount: -amount };

    return [
      // on play this card, add the effect to existing cards
      onThisPlayed(addPowerAction),
      // on play other cards to target tiles, add the effect to them
      {
        trigger: { id: 'onPlay', ...targets },
        actions: [
          addPower(amount, {
            limitTo: {
              eventSource: true,
            },
          }),
        ],
      },
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

  export function addPowerToTargetsWhileHasPowerStatus(
    amount: number,
    status: CardPowerStatus,
    targets: CardEffectFilters,
  ): CardEffect[] {
    return [
      // when gaining the status, raise power of existing cards by amount
      {
        trigger: {
          id: 'onPowerChange',
          limitTo: {
            self: true,
          },
          powerStatusChange: {
            status,
            onOff: 'on',
          },
        },
        actions: [CardEffect.addPower(amount, targets)],
      },
      // while having the status, raise power of newly played cards by amount
      {
        trigger: {
          id: 'onPlay',
          ...targets,
        },
        actions: [
          CardEffect.addPower(
            amount,
            {
              limitTo: {
                eventSource: true,
              },
            },
            {
              limitTo: {
                self: true,
              },
              powerStatus: {
                [status]: true,
              },
            },
          ),
        ],
      },
      // if destroyed while having the status, lower power of existing cards by amount
      {
        trigger: {
          id: 'onDestroy',
          limitTo: {
            self: true,
          },
          powerStatus: {
            [status]: true,
          },
        },
        actions: [CardEffect.addPower(-1 * amount, targets)],
      },
      // when losing the status, lower power of existing cards by amount
      {
        trigger: {
          id: 'onPowerChange',
          limitTo: {
            self: true,
          },
          powerStatusChange: {
            status,
            onOff: 'off',
          },
        },
        actions: [CardEffect.addPower(-1 * amount, targets)],
      },
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
    targets: CardActionFilters,
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

  export function spawnCardsOnCapturedTiles(
    cardDefFactory: (numPips: number) => CardDefinition,
  ): CardAction.SpawnCardsOnCapturedTiles {
    const cardDefByRank = Object.assign(
      {},
      ...[1, 2, 3].map((numPips: number) => {
        return {
          [numPips]: cardDefFactory(numPips),
        };
      }),
    );
    return {
      id: 'spawnCardsOnCapturedTiles',
      cardDefByRank,
    };
  }
}
