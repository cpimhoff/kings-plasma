import { ProcessCtx } from "./ctx";
import { Action, createGameState, GameState } from "../state";

export function processEnd(state: GameState, action: Action, _ctx: ProcessCtx) {
  if (state.phase !== "end") return;
  if (action.type !== "rematch") return;

  const player = state.players.find((p) => p.id === action.playerId)!;
  player.phase.end.requestRematch = action.rematch;

  // if all players have requested a rematch, reset game state to initial
  const allPlayersRequestedRematch = state.players.every(
    (p) => p.phase.end.requestRematch,
  );
  if (allPlayersRequestedRematch) {
    const freshGameState = createGameState();
    Object.assign(state, freshGameState);
  }
}
