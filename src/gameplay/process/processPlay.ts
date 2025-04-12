import { GameState, Phase, Action, Player } from "../state";
import { ProcessCtx } from "./ctx";

export function processPlay(
  state: GameState & { phase: Phase.Play },
  action: Action,
  ctx: ProcessCtx,
) {
  if (state.phase.type !== "play") return;
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
  const allPassed =
    (state.phase as Phase.Play).passedPlayerIds.length === state.players.length;
  if (allPassed) {
    state.phase = { type: "end", rematchPlayerIds: [] };
  } else {
    nextPlayer(state);
  }
}

function markPlayerPassed(
  state: GameState,
  playerId: Player["id"],
  passed: boolean,
) {
  const phase = state.phase as Phase.Play;
  if (passed) {
    if (!phase.passedPlayerIds.includes(playerId))
      phase.passedPlayerIds.push(playerId);
  } else {
    phase.passedPlayerIds = phase.passedPlayerIds.filter((p) => p !== playerId);
  }
}

function nextPlayer(state: GameState) {
  const phase = state.phase as Phase.Play;
  const nextPlayer = state.players.find((p) => p.id !== phase.activePlayerId)!;
  phase.activePlayerId = nextPlayer.id;
}
