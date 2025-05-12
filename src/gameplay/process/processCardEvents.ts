import {
  GameState,
  CardAction,
  CardTriggerCondition,
  createCardInstance,
  getCardPower,
  getCardPowerStatus,
  CardEffect,
  CardInstance,
  BoardPosition,
  Player,
  getPlayerWithId,
  CardActionFilters,
  positionsEqual,
  BoardTile,
} from '../state';
import { produce } from 'immer';
import { ProcessCtx } from './ctx';
import { allBoardCards, OccupiedTile } from './iter';
import { nextStableInt } from './rng';
import { CardEffectFilters } from '../state/Card/CardEffectFilters';
import { getRowScores } from '../scoring';

export namespace Events {
  export type RequestPlayCard = {
    id: 'requestPlayCard';
    card: CardInstance;
    position: BoardPosition;
    playerId: Player['id'];
  };
  export type CardPlayed = { id: 'cardPlayed'; triggerId: 'onPlay'; source: OccupiedTile; replacedCard?: CardInstance };
  export type PowerChanged = {
    id: 'powerChanged';
    triggerId: 'onPowerChange';
    source: OccupiedTile;
    oldPowerModifier: number;
  };
  export type CardDestroyed = { id: 'cardDestroyed'; triggerId: 'onDestroy'; source: OccupiedTile };
  export type RequestAddPips = {
    id: 'requestAddPips';
    source: OccupiedTile;
    position: BoardPosition;
    playerId: Player['id'];
    numPips: number;
  };
  export type GameEnd = { id: 'gameEnd'; triggerId: 'onGameEnd' };
}
type CardEvent =
  | Events.CardPlayed
  | Events.PowerChanged
  | Events.CardDestroyed
  | Events.GameEnd
  | Events.RequestAddPips;
type InitialEvent = Events.RequestPlayCard | Events.GameEnd;

type TriggeredAction = CardAction & {
  source: OccupiedTile;
  event: CardEvent;
};

export function processCardEvents(state: GameState, initialEvent: InitialEvent, ctx: ProcessCtx) {
  const eventQueue: CardEvent[] = [];
  processInitialEvent(state, initialEvent, eventQueue);
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
  }
  // we capture a special keyframe for rendering previews.
  // note that this keyframe will be equal to the final gamestate in board state,
  // but will differ in player state (because it will be the other player's turn, etc)
  ctx.addKeyframe({ preview: true });
}

function processInitialEvent(state: GameState, event: InitialEvent, eventQueue: CardEvent[]) {
  switch (event.id) {
    case 'requestPlayCard': {
      // cards don't respond to this event; we handle it ourselves
      const { card, position, playerId } = event;
      const tile = state.board[position.x][position.y];
      let replacedCard: CardInstance | null = null;
      if (tile.card) {
        // we're destroying the card ourselves, so we have to announce it manually
        eventQueue.push({
          id: 'cardDestroyed',
          triggerId: 'onDestroy',
          source: { ...tile } as OccupiedTile,
        });
        replacedCard = tile.card;
      }
      // place the card on the board
      tile.card = card;
      tile.controllerPlayerId = playerId;
      tile.pips = 0;
      // announce
      const playEvent: Events.CardPlayed = {
        id: 'cardPlayed',
        triggerId: 'onPlay',
        source: tile as OccupiedTile,
      };
      if (replacedCard) {
        playEvent.replacedCard = replacedCard;
      }
      eventQueue.push(playEvent);
      break;
    }
    case 'gameEnd': {
      // cards can respond to this event
      eventQueue.push(event);
      break;
    }
  }
}

function getEventTriggers(state: GameState, event: CardEvent): TriggeredAction[] {
  if (event.id === 'requestAddPips') {
    return [
      {
        id: 'addControlledPips',
        amount: event.numPips,
        tiles: [
          {
            // we have to subtract the vector so it can be re-added later
            dx: event.position.x - event.source.position.x,
            dy: event.position.y - event.source.position.y,
          },
        ],
        source: event.source, // the action source is the same as the event source here, since the processor is directly responding to the event
        event,
      },
    ];
  }
  const triggeredActions: TriggeredAction[] = [];
  // destroyed cards aren't on the board anymore but they can still respond to onDestroy events
  let destroyedTile = event.triggerId === 'onDestroy' ? event.source : null;
  let responders = allBoardCards(state, destroyedTile);
  for (const responder of responders) {
    responder.card.effects = responder.card.effects.map<CardEffect>((effect) => {
      if (effect.maxActivations === 0) return effect;
      if (doesEventSatisfyTriggerCondition(event, responder, effect.trigger, state)) {
        triggeredActions.push(
          ...effect.actions.map((action) => ({
            ...action,
            source: responder,
            event,
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
  event: CardEvent,
  responder: OccupiedTile,
  triggerCond: CardTriggerCondition,
  state: GameState,
): boolean {
  // first check if the trigger condition is the same as the event's
  if (!('triggerId' in event) || event.triggerId !== triggerCond.id) return false;

  // onGameEnd is special because it doesn't have the same filter fields, so we handle it upfront
  if (event.triggerId === 'onGameEnd') {
    if (triggerCond.id !== 'onGameEnd') return false; // type guard
    const rowIdx = responder.position.y;
    const playerId = responder.controllerPlayerId;
    const rowScores = getRowScores(state);
    const wonRow = rowScores[rowIdx].winningPlayerId === playerId;
    return wonRow === triggerCond.wonRow;
  }
  if (triggerCond.id === 'onGameEnd') return false; // type guard

  // then check limitTo
  if (triggerCond.limitTo) {
    const { self, tiles } = triggerCond.limitTo;
    if (self) {
      if (!(event.source.position.x === responder.position.x && event.source.position.y === responder.position.y)) {
        return false;
      }
    }
    if (tiles) {
      if (
        !tiles.some(
          (deltaTile) =>
            responder.position.x + deltaTile.dx === event.source.position.x &&
            responder.position.y + deltaTile.dy === event.source.position.y,
        )
      ) {
        return false;
      }
    }
  }

  // then check allegiance
  if (triggerCond.allegiance) {
    const allegiance: CardEffectFilters['allegiance'] =
      event.source.controllerPlayerId === responder.controllerPlayerId ? 'allied' : 'opponent';
    if (triggerCond.allegiance !== allegiance) {
      return false;
    }
  }

  // then check powerModifier
  if (triggerCond.id === 'onPowerChange' && event.triggerId === 'onPowerChange') {
    const oldCard = {
      ...event.source.card,
      powerModifier: event.oldPowerModifier,
    };
    const oldPower = getCardPower(oldCard);
    const newPower = getCardPower(event.source.card);
    if (oldPower === newPower) {
      return false;
    }
    if (triggerCond.changeDirection) {
      if (triggerCond.changeDirection !== (newPower - oldPower > 0 ? 'increasing' : 'decreasing')) {
        return false;
      }
    }
    if (triggerCond.powerStatusChange) {
      const oldStatus = getCardPowerStatus(oldCard);
      const newStatus = getCardPowerStatus(event.source.card);
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
    // then check powerLevel
    if (typeof triggerCond.powerLevel === 'number') {
      if (newPower !== triggerCond.powerLevel) {
        return false;
      }
    }
  }

  return true;
}

function processTriggeredCardAction(state: GameState, action: TriggeredAction, eventQueue: CardEvent[]) {
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
        if (tile.card) {
          // we can't add the pips here now, but the card might be destroyed during the processing of the current event.
          // we queue up a special event that tells us to retry. this allows cards to not have to worry about the order
          // in which their effects are defined.
          if (action.event.id !== 'requestAddPips') {
            // ^only try this once per event; don't infinite loop
            eventQueue.unshift({
              id: 'requestAddPips',
              position: t,
              playerId: actionPlayerId,
              numPips: action.amount,
              source: action.source,
            });
          }
        } else {
          if (
            // only add pips if not already under enemy control
            tile.controllerPlayerId === null ||
            tile.controllerPlayerId === actionPlayerId
          ) {
            tile.pips += action.amount;
          }
          tile.controllerPlayerId = actionPlayerId;
        }
      }
      break;
    }

    case 'addPower': {
      if (action.amount === 0) break;
      const targets = findActionTargets(state, action);
      let scalingFactor = 1;
      if (action.scaleBy) {
        if (action.scaleBy === 'replaced') {
          if ('replacedCard' in action.event && action.event.replacedCard) {
            scalingFactor = getCardPower(action.event.replacedCard);
          } else {
            console.error('Non-replacement card attempted to use scaleBy=replace');
            // TODO: is there a way we can enforce this with types? (prolly not)
          }
        } else {
          scalingFactor = findActionTargets(state, action).length;
        }
      }
      for (const t of targets) {
        const delta = scalingFactor * action.amount;
        const oldPowerModifier = t.card.powerModifier;
        t.card.powerModifier += delta;
        if (getCardPower(t.card) < 0) t.card.powerModifier = -1 * t.card.basePower;
        eventQueue.push({
          id: 'powerChanged',
          triggerId: 'onPowerChange',
          source: t,
          oldPowerModifier,
        });
      }
      break;
    }

    case 'createCardForPlayer': {
      const player = state.players.find((p) =>
        action.player === 'controller' ? p.id === actionPlayerId : p.id !== actionPlayerId,
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
      const targets = findActionTargets(state, action);
      for (const t of targets) {
        const oldTile = destroyCardAtTile(t);
        eventQueue.push({ id: 'cardDestroyed', triggerId: 'onDestroy', source: oldTile });
      }
      break;
    }

    case 'addScoreBonusForPlayer': {
      const targetPlayer =
        action.player === 'controller'
          ? getPlayerWithId(state.players, action.source.controllerPlayerId)
          : state.players.find((p) => p.id !== action.source.controllerPlayerId)!;
      targetPlayer.scoreBonus += action.amount;
      break;
    }

    default:
      action satisfies never;
      break;
  }
}

function destroyCardAtTile(tile: OccupiedTile): OccupiedTile {
  const destroyedCard = tile.card;
  const emptyTile: BoardTile = tile;
  emptyTile.card = null;
  emptyTile.controllerPlayerId = null;
  emptyTile.pips = 0;
  const oldTile: OccupiedTile = produce(tile, (draft) => {
    draft.card = destroyedCard;
  });
  return oldTile;
}

function reapZombieCards(state: GameState, eventQueue: CardEvent[]): boolean {
  let didReap = false;
  for (const tile of allBoardCards(state)) {
    if (getCardPower(tile.card) === 0) {
      const oldTile = destroyCardAtTile(tile);
      eventQueue.push({
        id: 'cardDestroyed',
        triggerId: 'onDestroy',
        source: oldTile,
      });
      didReap = true;
    }
  }
  return didReap;
}

function findActionTargets(state: GameState, action: TriggeredAction): OccupiedTile[] {
  let filters: CardActionFilters;
  switch (action.id) {
    case 'createCardForPlayer':
    case 'addScoreBonusForPlayer':
      // these actions don't use this function
      return [];
    case 'addControlledPips':
      // for now we only support adding pips on specific tiles
      filters = {
        limitTo: {
          tiles: action.tiles,
        },
      };
      break;
    case 'addPower':
    case 'immediatelyDestroy':
      filters = action;
      break;
    default:
      action satisfies never;
      return [];
  }
  // first gather cards to filter, using limitTo or falling back to all board cards
  let targets: OccupiedTile[] = [];
  const addTarget = (t: OccupiedTile) => {
    if (!targets.some((_t) => positionsEqual(t.position, _t.position))) {
      targets.push(t);
    }
  };
  if (filters.limitTo) {
    const { self, tiles, eventSource } = filters.limitTo;
    if (self) {
      addTarget(action.source);
    }
    if (eventSource && 'source' in action.event) {
      addTarget(action.event.source);
    }
    if (tiles) {
      tiles
        .map((deltaTile) => ({
          x: action.source.position.x + deltaTile.dx,
          y: action.source.position.y + deltaTile.dy,
        }))
        .map((pos) => state.board[pos.x]?.[pos.y])
        .filter((t) => t?.card)
        .map((t) => t as OccupiedTile)
        .forEach((t) => {
          addTarget(t);
        });
    }
  } else {
    targets = Array.from(allBoardCards(state));
  }

  // then filter out based on conditions
  return targets
    .filter((t) => {
      if (filters.allegiance) {
        return filters.allegiance === 'allied'
          ? t.controllerPlayerId === action.source.controllerPlayerId
          : t.controllerPlayerId !== action.source.controllerPlayerId;
      }
      return true;
    })
    .filter((t) => {
      if (filters.powerStatus) {
        const powerStatus = getCardPowerStatus(t.card);
        return filters.powerStatus[powerStatus];
      }
      return true;
    })
    .filter((t) => {
      if (typeof filters.powerLevel === 'number') {
        const powerLevel = getCardPower(t.card);
        return powerLevel === filters.powerLevel;
      }
      return true;
    });
}
