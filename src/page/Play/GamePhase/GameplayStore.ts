import { create } from 'zustand';
import { GameState, createInitialState } from '@/gameplay/state/GameState';
import { Player } from '@/gameplay/state/Player';
import { Action } from '@/gameplay/state/Action';
import { process } from '@/gameplay/process/process';

interface GameplayStore {
  gameState: GameState | null;
  previewState: GameState | null;
  historyStack: GameState[];
  animating: boolean;

  beginGame: (players: Player[]) => void;
  previewAction: (action: Action) => void;
  clearPreview: () => void;
  dispatchAction: (action: Action) => void;
  undo: () => void;
  _setDebugState: (state: GameState) => void;
};

export const useGameplayStore = create<GameplayStore>((set, get) => ({
  gameState: null,
  previewState: null,
  historyStack: [],
  animating: false,

  beginGame: (players) =>
    set(() => ({
      gameState: createInitialState(players),
    })),

  previewAction: (action) =>
    set(() => {
      const { keyframes } = process(get().gameState!, action);
      const majorFrames = keyframes.filter((kf) => !kf.meta?.minor);
      const previewState = [...majorFrames, keyframes[0]].map((kf) => kf.snapshot)[0];
      return {
        previewState,
      };
    }),

  clearPreview: () =>
    set({
      previewState: null,
    }),

  dispatchAction: async (action) => {
    if (get().animating) return;
    set(() => ({
      animating: true,
      previewState: null,
    }));
    const oldGameState = get().gameState!;
    const { keyframes, state: newGameState } = process(oldGameState, action);
    const keyframeStates = keyframes.map((kf) => kf.snapshot);
    await keyframeStates.reduce((accum, curr) => {
      return accum.then(() => {
        return new Promise((resolve) => {
          set({ gameState: curr });
          setTimeout(resolve, 1000);
        });
      });
    }, Promise.resolve());
    set({
      gameState: newGameState,
      historyStack: [...get().historyStack, oldGameState],
      animating: false,
    });
  },

  undo: () =>
    set((state) => {
      const { historyStack, animating } = state;
      if (!historyStack.length || animating) return {};
      const stackSize = historyStack.length;
      const newState = historyStack[stackSize - 1];
      const newStack = [...historyStack].splice(0, stackSize - 1);
      return {
        gameState: newState,
        previewState: null,
        historyStack: newStack,
      };
    }),

  _setDebugState: (state) => set({
    gameState: state,
  }),

}));
