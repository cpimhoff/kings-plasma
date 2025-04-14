import { Action, GameState } from "../state";
import { ProcessCtx } from "./ctx";
import { partition } from "@/utils/array";

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
