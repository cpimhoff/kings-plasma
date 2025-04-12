import { Action, GameState } from "../state";

export type ProcessResult = {
  state: GameState;
  action: Action;
  keyframes: ProcessKeyframe[];
};

export type ProcessKeyframe = {
  snapshot: GameState;
  meta?: any;
};

export type ProcessCtx = {
  addKeyframe: (meta?: any) => void;
};
