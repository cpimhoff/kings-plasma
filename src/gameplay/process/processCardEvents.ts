import {
  GameState,
  Card,
  BoardTile,
  CardAction,
  CardTriggerCondition,
} from "../state";
import { produce } from 'immer';
import { ProcessCtx } from "./ctx";
import { allBoardCards, ActionSource } from "./iter";
import { nextStableInt } from "./rng";

type Event = Event.CardPlayed | Event.PowerChanged | Event.CardDestroyed;
namespace Event {
  export type CardPlayed = { triggerId: "onPlay"; tile: BoardTile };
  export type PowerChanged = {
    triggerId: "onPowerChange";
    tile: BoardTile;
    changeDirection: "increasing" | "decreasing";
  };
  export type CardDestroyed = { triggerId: "onDestroy"; tile: ActionSource };
}

type TriggeredAction = CardAction & {
  source: ActionSource;
};

export function processCardEvents(
  state: GameState,
  initialEvent: Event,
  ctx: ProcessCtx,
) {
  const eventQueue: Event[] = [initialEvent];
  while (eventQueue.length > 0) {
    const event = eventQueue.shift()!;
    const triggeredActions = getEventTriggers(state, event);
    triggeredActions.forEach((action) => {
      processTriggeredCardAction(state, action, eventQueue);
    });
    if (eventQueue.length > 0) {
      ctx.addKeyframe();
    }
  }
}

function getEventTriggers(state: GameState, event: Event) {
  const triggeredActions: TriggeredAction[] = [];
  // destroyed cards aren't on the board anymore but they can still respond to onDestroy events
  let destroyedTile = (event.triggerId === 'onDestroy') ? event.tile : null;
  let responders = allBoardCards(state, destroyedTile);
  for (const responder of responders) {
    for (const effect of responder.card.effects) {
      if (doesEventSatisfyTriggerCondition(event, responder, effect.trigger)) {
        triggeredActions.push(
          ...effect.actions.map((action) => ({
            ...action,
            source: responder,
          })),
        );
      }
    }
  }
  return triggeredActions;
}

function doesEventSatisfyTriggerCondition(
  event: Event,
  responder: BoardTile & { card: Card },
  triggerCond: CardTriggerCondition,
): boolean {
  // first check if the trigger condition is the same as the event's
  if (event.triggerId !== triggerCond.id) return false;

  // special cases for specific trigger conditions are represented as
  // guard conditions and come first:
  if (
    triggerCond.id === "onPowerChange" &&
    event.triggerId === "onPowerChange" &&
    triggerCond.changeDirection !== event.changeDirection
  )
    return false;

  // the rest are general conditions:
  if (
    triggerCond.self &&
    event.tile.position.x === responder.position.x &&
    event.tile.position.y === responder.position.y
  ) {
    return true;
  }

  const isEventFromAlly =
    event.tile.controllerPlayerId === responder.controllerPlayerId;
  if (!triggerCond.allied && isEventFromAlly) return false;
  if (!triggerCond.opponent && !isEventFromAlly) return false;

  if (triggerCond.tiles) {
    return triggerCond.tiles.some(
      (deltaTile) =>
        responder.position.x + deltaTile.dx === event.tile.position.x &&
        responder.position.y + deltaTile.dy === event.tile.position.y,
    );
  } else {
    return true;
  }
}

function processTriggeredCardAction(
  state: GameState,
  action: TriggeredAction,
  eventQueue: Event[],
) {
  const actionPlayerId = action.source.controllerPlayerId;
  switch (action.id) {
    case "addControlledPips": {
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

    case "addPower": {
      if (action.amount === 0) break;
      const targets = getTileTargets(state, action.source, action);
      for (const t of targets) {
        t.card.power += action.amount;
        if (t.card.power > 0) {
          eventQueue.push({
            triggerId: "onPowerChange",
            tile: t,
            changeDirection: action.amount > 0 ? "increasing" : "decreasing",
          });
        } else {
          const oldTile = destroyCardAtTile(t);
          eventQueue.push({
            triggerId: "onDestroy",
            tile: oldTile,
          });
        }
      }
      break;
    }

    case "createCardForPlayer": {
      const player = state.players.find((p) =>
        action.player === "allied"
          ? p.id === actionPlayerId
          : p.id !== actionPlayerId,
      )!;
      if (!player) break;
      switch (action.into) {
        case "hand": {
          player.hand.push(action.card);
          break;
        }
        case "deck.random": {
          const randomIndex = nextStableInt(state, 0, player.deck.length - 1);
          player.deck.splice(randomIndex, 0, action.card);
          break;
        }
        case "deck.top": {
          player.deck.push(action.card);
          break;
        }
      }
      break;
    }

    case "immediatelyDestroy": {
      const targets = getTileTargets(state, action.source, action);
      for (const t of targets) {
        const oldTile = destroyCardAtTile(t);
        eventQueue.push({ triggerId: "onDestroy", tile: oldTile });
      }
      break;
    }

    default:
      action satisfies never;
      break;
  }
}

function destroyCardAtTile(tile: ActionSource): ActionSource {
  const destroyedCard = tile.card;
  tile.card = null!;
  tile.pips = 1;
  const oldTile = produce(tile, (draft) => {
    draft.card = destroyedCard;
  });
  return oldTile;
}

function getTileTargets(
  state: GameState,
  source: BoardTile,
  action: Partial<
    Pick<CardAction.AddPower, "tiles" | "self" | "allied" | "opponent">
  >,
): (BoardTile & { card: Card })[] {
  // start with the targeted tiles, including self
  const targetTiles = action.tiles
    ? ([
        source.position,
        ...action.tiles.map((deltaTile) => ({
          x: source.position.x + deltaTile.dx,
          y: source.position.y + deltaTile.dy,
        })),
      ]
        .map((pos) => state.board?.[pos.x]?.[pos.y])
        .filter((t) => t) // ignore out of bounds targets
        .filter((t) => t.card) as (BoardTile & { card: Card })[])
    : Array.from(allBoardCards(state));

  // filter out based on conditions
  return targetTiles
    .filter((t) => action.self || t.card !== source.card)
    .filter(
      (t) =>
        action.allied || t.controllerPlayerId !== source.controllerPlayerId,
    )
    .filter(
      (t) =>
        action.opponent || t.controllerPlayerId === source.controllerPlayerId,
    );
}
