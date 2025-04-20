import { Action, GameState } from "../state";

export type ProcessResult = {
  state: GameState;
  action: Action;
  keyframes: ProcessKeyframe[];
};

export type KeyframeMetadata = {
  major: boolean;
};

export type ProcessKeyframe = {
  snapshot: GameState;
  meta?: KeyframeMetadata;
};

export type ProcessCtx = {
  addKeyframe: (meta?: KeyframeMetadata) => void;
};
