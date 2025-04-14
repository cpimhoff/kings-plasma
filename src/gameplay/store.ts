import { create } from 'zustand';
import { GameState, createInitialState } from './state/GameState';
import { Player } from './state/Player';
import { Action } from './state/Action';
import { process } from './process/process';

interface GameplayStore {
  gameState: GameState | null;

  beginGame: (players: Player[]) => void;
  dispatchAction: (action: Action) => void;
};

export const useGameplayStore = create<GameplayStore>((set, get) => ({
  gameState: null,

  beginGame: (players) => set(() => ({
    gameState: createInitialState(players),
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
