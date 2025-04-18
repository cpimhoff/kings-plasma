import { create } from 'zustand';
import { GameState, createInitialState } from './state/GameState';
import { Player } from './state/Player';
import { Action } from './state/Action';
import { process } from './process/process';

interface GameplayStore {
  gameState: GameState | null;
  previewState: GameState | null;
  historyStack: GameState[];
  _pending: boolean;

  beginGame: (players: Player[]) => void;
  previewAction: (action: Action) => void;
  clearPreview: () => void;
  dispatchAction: (action: Action) => void;
  undo: () => void;
};

export const useGameplayStore = create<GameplayStore>((set, get) => ({
  gameState: null,
  previewState: null,
  historyStack: [],
  _pending: false,

  beginGame: (players) => set(() => ({
    gameState: createInitialState(players),
  })),

  previewAction: (action) => set(() => {
    const { keyframes, state: finalState } = process(get().gameState!, action);
    const allFrames = [...keyframes.map(kf => kf.snapshot), finalState];
    return {
      previewState: allFrames[0],
    };
  }),

  clearPreview: () => set({
    previewState: null,
  }),

  dispatchAction: (action) => {
    if (get()._pending) return;
    set(() => ({ _pending: true }));
    const oldGameState = get().gameState!;
    const { state: newGameState, keyframes } = process(oldGameState, action);
    const keyframeStates = keyframes.map(kf => kf.snapshot);
    const keyframesPromise = keyframeStates.map(s => (
      new Promise<void>((resolve) => {
        set(() => ({ gameState: s }));
        setTimeout(resolve, 1000);
      })
    )).reduce((accum, curr) => accum.then(() => curr), Promise.resolve());
    keyframesPromise.then(() => {
      set(() => ({
        gameState: newGameState,
        previewState: null,
        historyStack: [...get().historyStack, oldGameState],
        _pending: false,
      }));
    });
  },

  undo: () => set((state) => {
    const { historyStack, _pending } = state;
    if (!historyStack.length || _pending) return {};
    const stackSize = historyStack.length;
    const newState = historyStack[stackSize - 1];
    const newStack = [...historyStack].splice(0, stackSize - 1);
    return {
      gameState: newState,
      previewState: null,
      historyStack: newStack,
    };
  }),

}));
