import { create } from 'zustand';
import { GameState, createInitialState } from './state/GameState';
import { Player } from './state/Player';
import { Action } from './state/Action';
import { process } from './process/process';

interface GameplayStore {
  gameState: GameState | null;
  historyStack: GameState[];
  _pending: boolean;

  beginGame: (players: Player[]) => void;
  dispatchAction: (action: Action) => void;
  undo: () => void;
};

export const useGameplayStore = create<GameplayStore>((set, get) => ({
  gameState: null,
  historyStack: [],
  _pending: false,

  beginGame: (players) => set(() => ({
    gameState: createInitialState(players),
  })),

  dispatchAction: (action) => {
    if (get()._pending) return;
    set(() => ({ _pending: true }));
    const oldGameState = get().gameState!;
    const { state: newGameState, keyframes } = process(oldGameState, action);
    const keyframeStates = keyframes.map(kf => kf.snapshot);
    const keyframesPromise = keyframeStates.map(s => (
      new Promise<void>((resolve) => {
        set(() => ({ gameState: s }));
        resolve();
      })
    )).reduce((accum, curr) => accum.then(() => curr), Promise.resolve());
    keyframesPromise.then(() => {
      set(() => ({
        gameState: newGameState,
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
    const newStack = [...historyStack].splice(0, stackSize);
    return {
      gameState: newState,
      historyStack: newStack,
    };
  }),

}));
