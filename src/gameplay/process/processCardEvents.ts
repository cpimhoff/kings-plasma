import {
  GameState,
  Card,
  BoardTile,
  CardAction,
  CardTriggerCondition,
} from "../state";
import { ProcessCtx } from "./ctx";
import { allBoardCards } from "./iter";

type Event = Event.CardPlayed | Event.PowerChanged | Event.CardDestroyed;
namespace Event {
  export type CardPlayed = { triggerId: "onPlay"; tile: BoardTile };
  export type PowerChanged = { triggerId: "onPowerChange"; tile: BoardTile };
  export type CardDestroyed = { triggerId: "onDestroy"; tile: BoardTile };
}

type TriggeredAction = CardAction & {
  source: BoardTile & { card: Card };
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
      processTriggeredCardAction(state, action, eventQueue, ctx);
    });
  }
}

function getEventTriggers(state: GameState, event: Event) {
  const triggeredActions: TriggeredAction[] = [];
  for (const responder of allBoardCards(state)) {
    for (const { trigger: triggerCond, actions: triggerResponses } of responder
      .card.effects) {
      if (doesEventSatisfyTriggerCondition(event, responder, triggerCond)) {
        triggeredActions.push(
          ...triggerResponses.map((action) => ({
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
  if (event.triggerId !== triggerCond.id) return false;

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
  _ctx: ProcessCtx,
) {
  switch (action.id) {
    case "addControlledPips": {
      break;
    }

    case "addPower": {
      // This logic is a bit messy and duplicates
      // some logic from doesEventSatisfyTriggerCondition.
      // (mostly placeholder)
      let target: Card | undefined;
      if (action.self) {
        target = action.source.card;
        target.power += action.amount;
        eventQueue.push({
          triggerId: "onPowerChange",
          tile: action.source,
        });
      }
      const actorPos = action.source.position;
      for (const cell of allBoardCards(state)) {
        if (cell.card === action.source.card) continue; // skip self
        const isAllied =
          cell.controllerPlayerId === action.source.controllerPlayerId;
        if (isAllied && !action.allied) continue;
        if (!isAllied && !action.opponent) continue;

        const isTargetTile =
          !action.tiles ||
          action.tiles.some(
            (deltaTile) =>
              actorPos.x + deltaTile.dx === cell.position.x &&
              actorPos.y + deltaTile.dy === cell.position.y,
          );
        if (!isTargetTile) continue;

        cell.card.power += action.amount;
        eventQueue.push({
          triggerId: "onPowerChange",
          tile: cell,
        });
      }
      break;
    }

    case "createCardForPlayer": {
      break;
    }

    case "immediatelyDestroy": {
      break;
    }

    default:
      action satisfies never;
      break;
  }
}
