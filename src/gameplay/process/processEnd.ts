import { ProcessCtx } from "./ctx";
import { Action, GameState } from "../state";

export function processEnd(state: GameState, action: Action, _ctx: ProcessCtx) {
  if (state.phase !== "end") return;
  if (action.type !== "rematch") return;

  // TODO...
}
