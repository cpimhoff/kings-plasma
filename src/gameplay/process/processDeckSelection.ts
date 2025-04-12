import { ProcessCtx } from "./ctx";
import { Action, GameState } from "../state";

export function processDeckSelection(
  state: GameState,
  action: Action,
  _ctx: ProcessCtx,
) {
  if (state.phase.type !== "deckSelection") return;
  if (action.type !== "deckReady") return;

  const { playerId, deck } = action;
  const player = state.players.find((p) => p.id === playerId);
  if (!player) return;

  // assign the deck to this player and mark them as readied up
  player.deck = deck;
  state.phase.donePlayerIds.push(playerId);

  // if all players are done, move to setup phase
  if (state.phase.donePlayerIds.length === state.players.length)
    state.phase = { type: "setup", mulliganDonePlayerIds: [] };
}
