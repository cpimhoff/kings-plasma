import { Action, GameState } from "../state";
import { ProcessCtx } from "./ctx";
import { drawCardToHand } from "./draw";
import { partition } from "@/utils/array";

export function processEnterSetup(state: GameState, _ctx: ProcessCtx) {
  state.phase = "setup";

  // shuffle each player's deck
  // ...TODO: needs a stable random function...

  // draw 5 cards to each player's hand from their deck
  for (let i = 0; i < 5; i++) {
    state.players.forEach((player) => {
      drawCardToHand(player);
    });
  }
}

export function processSetup(
  state: GameState,
  action: Action,
  _ctx: ProcessCtx,
) {
  if (state.phase !== "setup") return;
  if (action.type !== "mulligan") return;

  // mulligan selected cards
  const player = state.players.find((p) => p.id === action.playerId)!;
  const [discardedCards, heldCards] = partition(player.hand, (_, idx) =>
    action.handIndexes.includes(idx),
  );
  player.hand = heldCards;
  player.deck = [...discardedCards, ...player.deck];
  player.phase.setup.done = true;

  // if all players are done, move to play phase
  if (state.players.every((p) => p.phase.setup.done)) {
    state.phase = "play";
    state.playPhaseActivePlayerId = state.players[0].id;
  }
}
