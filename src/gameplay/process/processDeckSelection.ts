import { ProcessCtx } from "./ctx";
import { Action, GameState } from "../state";

export function processDeckSelection(
  state: GameState,
  action: Action,
  _ctx: ProcessCtx,
) {
  if (state.phase !== "deckSelection") return;
  if (action.type !== "deckReady") return;

  const { playerId, deck } = action;
  const player = state.players.find((p) => p.id === playerId);
  if (!player) return;

  // assign the deck to this player and mark them as readied up
  player.deck = deck;
  player.phase.deckSelection.done = true;

  // if all players are done, move to setup phase
  if (state.players.every((p) => p.phase.deckSelection.done))
    state.phase = "setup";
}
