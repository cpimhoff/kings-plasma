import { create } from 'zustand';
import { GameState } from './state/GameState';
import { Action } from './state/Action';
import { process } from './process/process';

interface GameplayStore {
  gameState: GameState | null;

  beginGame: (initialState: GameState) => void;
  dispatchAction: (action: Action) => void;
};

export const useGameplayStore = create<GameplayStore>((set, get) => ({
  gameState: null,

  beginGame: (initialState) => set(() => ({
    gameState: initialState,
  })),

  dispatchAction: (action) => {
    const { state: newGameState, keyframes } = process(get().gameState!, action);
    const keyframeStates = keyframes.map(kf => kf.snapshot);
    const states = [ ...keyframeStates, newGameState ];
    states.map(s => (
      new Promise((resolve) => {
        set(() => ({ gameState: s }));
        setTimeout(resolve, 1000);
      })
    )).forEach(async p => {
      await p;
    });
  },

}));
