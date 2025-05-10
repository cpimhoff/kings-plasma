import { useSyncExternalStore } from 'react';
import { getStorageHandle } from '@/utils/storage';
import { GameState } from '@/gameplay';

export type DebugState = {
  name: string;
  state: GameState;
};

const key = 'decks';
const DEFAULT_VALUE: DebugState[] = [];

const handle = getStorageHandle<DebugState[]>(key, DEFAULT_VALUE);

export function useDebugStateStorage() {
  const debugStates: DebugState[] = useSyncExternalStore(handle.emitter, handle.get);
  return {
    debugStates,
    saveStateToLocalStorage,
    deleteStoredState,
  };
}

function saveStateToLocalStorage(state: DebugState) {
  handle.set([...handle.get(), state]);
}

function deleteStoredState(name: string) {
  const states = handle.get();
  const index = states.findIndex((s) => s.name === name);
  if (index >= 0) {
    states.splice(index, 1);
  }
  handle.set(states);
}
