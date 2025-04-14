import { GameState, Action, Player } from "../state";
import { ProcessCtx } from "./ctx";
import { discardCardFromHand, drawCardToHand } from "./draw";
import { processCardEvents } from "./processCardEvents";

export function processPlay(state: GameState, action: Action, ctx: ProcessCtx) {
  if (state.phase !== "play") return;
  if (action.type === "playCard") processPlayCard(state, action, ctx);
  else if (action.type === "pass") processPlayPass(state, action, ctx);
}

function processPlayCard(
  state: GameState,
  action: Action.PlayCard,
  ctx: ProcessCtx,
) {
  const player = state.players.find((p) => p.id === action.playerId)!;
  const card = discardCardFromHand(player, action.fromHandIndex);
  if (!card) return;

  // put the card on the board
  const tile = state.board[action.toBoardPosition.x][action.toBoardPosition.y];
  tile.card = card;
  tile.controllerPlayerId = action.playerId;
  tile.pips = 0;
  processCardEvents(state, { triggerId: "onPlay", tile }, ctx);

  markPlayerPassed(state, action.playerId, false);
  nextPlayer(state);
}

function processPlayPass(
  state: GameState,
  action: Action.Pass,
  _ctx: ProcessCtx,
) {
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
  drawCardToHand(nextPlayer);
}
