import { Action, GameState } from "..";
import { ProcessCtx } from "./ctx";

export function processSetup(
  state: GameState,
  action: Action,
  _ctx: ProcessCtx,
) {
  if (state.phase !== "setup") return;
  if (action.type !== "mulligan") return;

  // TODO...
}
