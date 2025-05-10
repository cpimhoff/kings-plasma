import {
  GameState,
  CardAction,
  CardTriggerCondition,
  createCardInstance,
  getCardPower,
  getCardPowerStatus,
  CardEffect,
} from '../state';
import { produce } from 'immer';
import { ProcessCtx } from './ctx';
import { allBoardCards, OccupiedTile } from './iter';
import { nextStableInt } from './rng';
import { CardEffectFilters } from '../state/Card/CardEffectFilters';

type Event = Events.CardPlayed | Events.PowerChanged | Events.CardDestroyed;
export namespace Events {
  export type CardPlayed = { triggerId: 'onPlay'; tile: OccupiedTile };
  export type PowerChanged = {
    triggerId: 'onPowerChange';
    tile: OccupiedTile;
    oldPowerModifier: number;
  };
  export type CardDestroyed = { triggerId: 'onDestroy'; tile: OccupiedTile };
}

type TriggeredAction = CardAction & {
  source: OccupiedTile;
};

export function processCardEvents(state: GameState, initialEvent: Events.CardPlayed, ctx: ProcessCtx) {
  const eventQueue: Event[] = [initialEvent];
  let hasCapturedPreview = false;
  while (eventQueue.length > 0) {
    const event = eventQueue.shift()!;
    const triggeredActions = getEventTriggers(state, event);
    triggeredActions.forEach((action) => {
      processTriggeredCardAction(state, action, eventQueue);
      ctx.addKeyframe();
      const didReap = reapZombieCards(state, eventQueue);
      if (didReap) {
        ctx.addKeyframe();
      }
    });
    if (!hasCapturedPreview) {
      // we capture a special keyframe for rendering previews after processing the initial event
      ctx.addKeyframe({ preview: true });
      hasCapturedPreview = true;
    }
  }
  // note that the final keyframe will be equal to the final gamestate in board state,
  // but will differ in player state (because it will be the other player's turn)
}

function getEventTriggers(state: GameState, event: Event) {
  const triggeredActions: TriggeredAction[] = [];
  // destroyed cards aren't on the board anymore but they can still respond to onDestroy events
  let destroyedTile = event.triggerId === 'onDestroy' ? event.tile : null;
  let responders = allBoardCards(state, destroyedTile);
  for (const responder of responders) {
    responder.card.effects = responder.card.effects.map<CardEffect>((effect) => {
      if (effect.maxActivations === 0) return effect;
      if (doesEventSatisfyTriggerCondition(event, responder, effect.trigger)) {
        triggeredActions.push(
          ...effect.actions.map((action) => ({
            ...action,
            source: responder,
          })),
        );
        if (typeof effect.maxActivations === 'number') {
          const newEffect = {
            ...effect,
          } as CardEffect & { maxActivations: number };
          newEffect.maxActivations--;
          return newEffect;
        }
      }
      return effect;
    });
  }
  return triggeredActions;
}

function doesEventSatisfyTriggerCondition(
  event: Event,
  responder: OccupiedTile,
  triggerCond: CardTriggerCondition,
): boolean {
  // first check if the trigger condition is the same as the event's
  if (event.triggerId !== triggerCond.id) return false;

  // then check limitTo
  if (triggerCond.limitTo) {
    const { self, tiles } = triggerCond.limitTo;
    if (self) {
      if (!(event.tile.position.x === responder.position.x && event.tile.position.y === responder.position.y)) {
        return false;
      }
    }
    if (tiles) {
      if (
        !tiles.some(
          (deltaTile) =>
            responder.position.x + deltaTile.dx === event.tile.position.x &&
            responder.position.y + deltaTile.dy === event.tile.position.y,
        )
      ) {
        return false;
      }
    }
  }

  // then check allegiance
  if (triggerCond.allegiance) {
    const allegiance: CardEffectFilters['allegiance'] =
      event.tile.controllerPlayerId === responder.controllerPlayerId ? 'allied' : 'opponent';
    if (triggerCond.allegiance !== allegiance) {
      return false;
    }
  }

  // then check powerModifier
  if (triggerCond.id === 'onPowerChange' && event.triggerId === 'onPowerChange') {
    const oldCard = {
      ...event.tile.card,
      powerModifier: event.oldPowerModifier,
    };
    if (triggerCond.changeDirection) {
      const oldPower = getCardPower(oldCard);
      const newPower = getCardPower(event.tile.card);
      if (triggerCond.changeDirection !== (newPower - oldPower > 0 ? 'increasing' : 'decreasing')) {
        return false;
      }
    }
    if (triggerCond.powerStatusChange) {
      const oldStatus = getCardPowerStatus(oldCard);
      const newStatus = getCardPowerStatus(event.tile.card);
      const targetStatus = triggerCond.powerStatusChange.status;
      if (triggerCond.powerStatusChange.onOff === 'on') {
        if (!(newStatus === targetStatus && oldStatus !== targetStatus)) {
          return false;
        }
      } else {
        if (!(newStatus !== targetStatus && oldStatus === targetStatus)) {
          return false;
        }
      }
    }
  }

  return true;
}

function processTriggeredCardAction(state: GameState, action: TriggeredAction, eventQueue: Event[]) {
  const actionPlayerId = action.source.controllerPlayerId;
  switch (action.id) {
    case 'addControlledPips': {
      const targets = action.tiles.map((deltaTile) => ({
        x: action.source.position.x + deltaTile.dx,
        y: action.source.position.y + deltaTile.dy,
      }));
      for (const t of targets) {
        const tile = state.board?.[t.x]?.[t.y];
        if (!tile) continue; // out of bounds
        if (tile.card) continue; // nothing to do on already occupied tiles
        if (
          // only add pips if not already under enemy control
          tile.controllerPlayerId === null ||
          tile.controllerPlayerId === actionPlayerId
        ) {
          tile.pips += action.amount;
        }
        tile.controllerPlayerId = actionPlayerId;
      }
      break;
    }

    case 'addPower': {
      if (action.amount === 0) break;
      const targets = findMatchingCards(state, action.source, action);
      const scalingFactor = action.scaleBy ? findMatchingCards(state, action.source, action.scaleBy).length : 1;
      for (const t of targets) {
        const delta = scalingFactor * action.amount;
        const oldPowerModifier = t.card.powerModifier;
        t.card.powerModifier += delta;
        if (getCardPower(t.card) < 0) t.card.powerModifier = -1 * t.card.basePower;
        eventQueue.push({
          triggerId: 'onPowerChange',
          tile: t,
          oldPowerModifier,
        });
      }
      break;
    }

    case 'createCardForPlayer': {
      const player = state.players.find((p) =>
        action.player === 'allied' ? p.id === actionPlayerId : p.id !== actionPlayerId,
      )!;
      if (!player) break;
      const card = createCardInstance(action.cardDefinition);
      switch (action.into) {
        case 'hand': {
          player.hand.push(card);
          break;
        }
        case 'deck.random': {
          const randomIndex = nextStableInt(state, 0, player.deck.length - 1);
          player.deck.splice(randomIndex, 0, card);
          break;
        }
        case 'deck.top': {
          player.deck.push(card);
          break;
        }
      }
      break;
    }

    case 'immediatelyDestroy': {
      const targets = findMatchingCards(state, action.source, action);
      for (const t of targets) {
        const oldTile = destroyCardAtTile(t);
        eventQueue.push({ triggerId: 'onDestroy', tile: oldTile });
      }
      break;
    }

    default:
      action satisfies never;
      break;
  }
}

function destroyCardAtTile(tile: OccupiedTile): OccupiedTile {
  const destroyedCard = tile.card;
  tile.card = null!;
  tile.pips = 1;
  const oldTile = produce(tile, (draft) => {
    draft.card = destroyedCard;
  });
  return oldTile;
}

function reapZombieCards(state: GameState, eventQueue: Event[]): boolean {
  let didReap = false;
  for (const tile of allBoardCards(state)) {
    if (getCardPower(tile.card) === 0) {
      const oldTile = destroyCardAtTile(tile);
      eventQueue.push({
        triggerId: 'onDestroy',
        tile: oldTile,
      });
      didReap = true;
    }
  }
  return didReap;
}

function findMatchingCards(state: GameState, source: OccupiedTile, filters: CardEffectFilters): OccupiedTile[] {
  // first gather cards to filter, using limitTo or falling back to all board cards
  let targets: OccupiedTile[];
  if (filters.limitTo) {
    const { self, tiles } = filters.limitTo;
    if (tiles) {
      targets = tiles
        .map((deltaTile) => ({
          x: source.position.x + deltaTile.dx,
          y: source.position.y + deltaTile.dy,
        }))
        .map((pos) => state.board[pos.x]?.[pos.y])
        .filter((t) => t?.card) as OccupiedTile[];
    } else {
      targets = [];
    }
    if (self) {
      // NOTE: 'tiles' should never specify (0,0), otherwise it will be redundant with 'self'
      targets.push(source);
    }
  } else {
    targets = Array.from(allBoardCards(state));
  }

  // then filter out based on conditions
  return targets
    .filter((t) => {
      if (filters.allegiance) {
        return filters.allegiance === 'allied'
          ? t.controllerPlayerId === source.controllerPlayerId
          : t.controllerPlayerId === source.controllerPlayerId;
      }
      return true;
    })
    .filter((t) => {
      if (filters.powerStatus) {
        const powerStatus = getCardPowerStatus(t.card);
        return filters.powerStatus[powerStatus];
      }
      return true;
    });
}
