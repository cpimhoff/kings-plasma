import { GameState, Action, Player } from "../state";
import { ProcessCtx } from "./ctx";

export function processPlay(state: GameState, action: Action, ctx: ProcessCtx) {
  if (state.phase !== "play") return;
  if (action.type === "playCard") processPlayCard(state, action, ctx);
  else if (action.type === "pass") processPlayPass(state, action, ctx);
}

function processPlayCard(state: GameState, action: Action, _ctx: ProcessCtx) {
  // TODO... remove card from hand, play card to board, run effects, etc.

  markPlayerPassed(state, action.playerId, false);
  nextPlayer(state);
}

function processPlayPass(state: GameState, action: Action, _ctx: ProcessCtx) {
  // ensure they are in the passed list
  markPlayerPassed(state, action.playerId, true);

  // check if all players have passed, if so, move to next phase, else to next player
  const allPassed = state.players.every((p) => p.phase.play.passed);
  if (allPassed) {
    state.phase = "end";
  } else {
    nextPlayer(state);
  }
}

function markPlayerPassed(
  state: GameState,
  playerId: Player["id"],
  passed: boolean,
) {
  const player = state.players.find((p) => p.id === playerId)!;
  player.phase.play.passed = passed;
}

function nextPlayer(state: GameState) {
  const nextPlayer = state.players.find(
    (p) => p.id !== state.playPhaseActivePlayerId,
  )!;
  state.playPhaseActivePlayerId = nextPlayer.id;
}
