import { useSyncExternalStore } from 'react';
import { getStorageHandle } from '@/utils/storage';
import { DehydratedCardGroup } from '@/deck';

export type StoredDeck = {
  name: string;
  cardGroups: DehydratedCardGroup[];
};

const key = 'decks';
const DEFAULT_VALUE: StoredDeck[] = [];

const handle = getStorageHandle<StoredDeck[]>(key, DEFAULT_VALUE);

export function useDeckStorage() {
  const storedDecks: StoredDeck[] = useSyncExternalStore(
    handle.emitter,
    handle.get,
  );
  return {
    storedDecks,
    saveDeckToLocalStorage,
    deleteStoredDeck,
  };
}

function saveDeckToLocalStorage(deck: StoredDeck) {
  handle.set([...handle.get(), deck]);
}

function deleteStoredDeck(name: string) {
  const decks = handle.get();
  const index = decks.findIndex((d) => d.name === name);
  if (index >= 0) {
    decks.splice(index, 1);
  }
  handle.set(decks);
}
