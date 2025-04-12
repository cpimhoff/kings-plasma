import { Action, GameState, Phase } from "..";
import { ProcessCtx } from "./ctx";

export function processSetup(
  state: GameState & { phase: Phase.Setup },
  action: Action,
  _ctx: ProcessCtx,
) {
  if (state.phase.type !== "setup") return;
  if (action.type !== "mulligan") return;

  // TODO...
}
