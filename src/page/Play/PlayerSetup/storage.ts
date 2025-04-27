import { useSyncExternalStore } from "react";
import { produce } from "immer";
import { CardDefinition } from "@/gameplay";

export type StoredCardGroup = {
    cardTypeId: CardDefinition['typeId'];
    count: number;
}
export type StoredDeck = {
    name: string;
    cardGroups: StoredCardGroup[],
};

export function useDeckStorage() {
    const storedDecks: StoredDeck[] = useSyncExternalStore(subscribeToStorage, getStoredDecks);
    return {
        storedDecks,
        saveDeckToLocalStorage,
        deleteStoredDeck,
    };
}

function saveDeckToLocalStorage(deck: StoredDeck) {
    setStorage((existingStorage) => {
        existingStorage.decks.push(deck);
    });
}

function deleteStoredDeck(name: string) {
    setStorage((existingStorage) => {
        existingStorage.decks = existingStorage.decks.filter(d => d.name !== name);
    });
}

function getStoredDecks(): StoredDeck[] {
    return getStorage().decks;
}

type Storage = {
    decks: StoredDeck[];
}

const storageKey = "kp";

let lastRawData: string | null = null;
let lastParsedData: Storage | null = null;

function getStorage(): Storage {
    const rawData = window.localStorage.getItem(storageKey) || "";
    if (rawData === lastRawData) {
        return lastParsedData!;
    }
    lastRawData = rawData;
    let parsedData: Storage;
    try {
        parsedData = JSON.parse(rawData);
        if (!Array.isArray(parsedData.decks)) {
            throw new Error('parse error');
        }
    } catch(_) {
        parsedData = {
            decks: [],
        };
    }
    lastParsedData = parsedData;
    return parsedData;
} 

function setStorage(recipe: (s: Storage) => void) {
    const existingStorage = getStorage();
    const newStorage = produce(existingStorage, recipe);
    const newValue = JSON.stringify(newStorage);
    window.localStorage.setItem(storageKey, newValue);
    window.dispatchEvent(new StorageEvent('storage', { key: storageKey }));
}

function subscribeToStorage(listener: () => void) {
    const filteredListener = (e: StorageEvent) => {
        if (e.key === storageKey) {
            return listener();
        }
    }
    window.addEventListener('storage', filteredListener);
    return () => window.removeEventListener('storage', filteredListener);
}