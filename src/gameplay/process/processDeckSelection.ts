import { ProcessCtx } from "./ctx";
import { Action, GameState } from "../state";

export function processDeckSelection(
  state: GameState,
  action: Action,
  _ctx: ProcessCtx,
) {
  if (state.phase !== "deckSelection") return;
  if (action.type === "deckReady") processDeckReady(state, action, _ctx);
  else if (action.type === "deckUnready")
    processDeckUnready(state, action, _ctx);
}

function processDeckReady(
  state: GameState,
  action: Action.DeckReady,
  _ctx: ProcessCtx,
) {
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

function processDeckUnready(
  state: GameState,
  action: Action.DeckUnready,
  _ctx: ProcessCtx,
) {
  const { playerId } = action;
  const player = state.players.find((p) => p.id === playerId);
  if (!player) return;

  // clear the deck and mark them as unready
  player.deck = [];
  player.phase.deckSelection.done = false;
}
