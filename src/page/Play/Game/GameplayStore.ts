import { create } from 'zustand';
import { GameState, createInitialState } from '@/gameplay/state/GameState';
import { getPlayerWithId, Player } from '@/gameplay/state/Player';
import { Action } from '@/gameplay/state/Action';
import { process } from '@/gameplay/process/process';

type ActionRecord = {
  subject: string;
  verb: string;
  object: string | null;
};

interface GameplayStore {
  gameState: GameState | null;
  previewState: GameState | null;
  actionLog: ActionRecord[];
  historyStack: GameState[];
  animating: boolean;

  beginGame: (players: Player[]) => void;
  previewAction: (action: Action) => void;
  clearPreview: () => void;
  dispatchAction: (action: Action) => void;
  undo: () => void;
  _setDebugState: (state: GameState) => void;
}

export const useGameplayStore = create<GameplayStore>((set, get) => ({
  gameState: null,
  previewState: null,
  actionLog: [],
  historyStack: [],
  animating: false,

  beginGame: (players) =>
    set(() => ({
      gameState: createInitialState(players),
    })),

  previewAction: (action) =>
    set(() => {
      const { keyframes } = process(get().gameState!, action);
      const previewFrame = keyframes.find((kf) => kf.meta?.preview);
      return {
        previewState: previewFrame!.snapshot,
      };
    }),

  clearPreview: () =>
    set({
      previewState: null,
    }),

  dispatchAction: async (action) => {
    if (get().animating) return;
    set(() => ({
      previewState: null,
    }));
    const oldGameState = get().gameState!;
    const { keyframes, state: newGameState } = process(oldGameState, action);
    if (oldGameState.phase === 'end' && newGameState.phase === 'setup') {
      set(() => ({
        historyStack: [],
        actionLog: [],
      }));
    } else {
      set(() => ({
        animating: true,
        actionLog: [...get().actionLog, getRecordForAction(action, oldGameState.players)],
      }));
      const keyframeStates = keyframes.filter((kf) => !kf.meta?.preview).map((kf) => kf.snapshot);
      await keyframeStates.reduce((accum, curr) => {
        return accum.then(() => {
          return new Promise((resolve) => {
            set({ gameState: curr });
            setTimeout(resolve, 1000);
          });
        });
      }, Promise.resolve());
      set(() => ({
        animating: false,
        historyStack: [...get().historyStack, oldGameState],
      }));
    }
    set({
      gameState: newGameState,
    });
  },

  undo: () =>
    set((state) => {
      const { historyStack, animating, actionLog } = state;
      if (!historyStack.length || animating) return {};
      const stackSize = historyStack.length;
      const newState = historyStack[stackSize - 1];
      const newStack = [...historyStack].splice(0, stackSize - 1);
      const newLog = [...actionLog].splice(0, stackSize - 1);
      return {
        gameState: newState,
        previewState: null,
        actionLog: newLog,
        historyStack: newStack,
      };
    }),

  _setDebugState: (state) =>
    set({
      gameState: state,
    }),
}));

function getRecordForAction(action: Action, players: Player[]) {
  const player = getPlayerWithId(players, action.playerId);
  const subject = player.name;
  const verb = {
    playCard: 'played',
    pass: 'passed',
    mulligan: 'mulliganed',
    rematch: 'requested a rematch',
  }[action.type];
  let object = null;
  if (action.type === 'playCard') {
    object = player.hand[action.fromHandIndex].def.name;
  } else if (action.type === 'mulligan') {
    object = `${action.handIndexes.length} cards`;
  }
  return {
    subject,
    verb,
    object,
  };
}
