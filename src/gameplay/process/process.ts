import { createDraft, finishDraft, current as snapshotDraft } from "immer";

import { Action, GameState } from "../state";
import { ProcessCtx, ProcessKeyframe, ProcessResult } from "./ctx";
import { processSetup } from "./processSetup";
import { processPlay } from "./processPlay";
import { processEnd } from "./processEnd";

/**
 * Process a single action in the game, atomically updating the state to the
 * next logical state. Saves all intermediary states as keyframes to allow for
 * incremental animation.
 *
 * Pass `skipKeyframes` to skip keyframe saving, good for exploring many game
 * states more efficiently.
 */
export function process(
  state: GameState,
  action: Action,
  { skipKeyframes = false }: Partial<{ skipKeyframes: boolean }> = {},
): ProcessResult {
  const draftState = createDraft(state);
  const keyframes: ProcessKeyframe[] = [];
  const ctx: ProcessCtx = {
    addKeyframe: skipKeyframes
      ? () => undefined
      : (meta?: any) => {
          keyframes.push({
            snapshot: snapshotDraft(draftState),
            meta,
          });
        },
  };
  processPhase(draftState, action, ctx);
  const finalState = finishDraft(draftState);
  return { state: finalState, action, keyframes };
}

function processPhase(state: GameState, action: Action, ctx: ProcessCtx) {
  const phase = state.phase;
  ({
    setup: processSetup,
    play: processPlay,
    end: processEnd,
  })[phase](state, action, ctx);
}
