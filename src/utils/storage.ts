type StorageHandle<T> = {
  get: () => T;
  set: (t: T) => void;
  emitter: (listener: () => void) => () => void;
};

const HANDLES: Record<string, StorageHandle<any>> = {};

/**
 * Convenient abstraction around localstorage that handles JSON parsing.
 * Produces a handle for interacting with the data in localstorage at the given key.
 * Can be used just for getting and setting, but also includes an emitter for use with
 * React.useSyncExternalStore.
 *
 * @param key The string key to identify the stored data
 * @param defaultValue The value to use when the stored data is missing
 * @returns A handle unique to the given key
 */
export function getStorageHandle<T>(key: string, defaultValue: T) {
  let handle: StorageHandle<T>;
  if (!HANDLES[key]) {
    handle = makeStorageHandle(key, defaultValue);
    HANDLES[key] = handle;
  } else {
    handle = HANDLES[key];
  }
  return handle;
}

function makeStorageHandle<T>(key: string, defaultValue: T): StorageHandle<T> {
  return {
    get: makeGetter<T>(key, defaultValue),
    set: makeSetter<T>(key),
    emitter: makeEmitter(key),
  };
}

function makeGetter<T>(key: string, fallback: T) {
  // we need to maintain reference identity for useSyncExternalStore,
  // so we reuse the results from JSON.parse unless the serialized value has changed
  let lastRawData: string | null = null;
  let lastParsedData: T | null = null;
  return () => {
    const rawData = window.localStorage.getItem(key) || '';
    if (rawData === lastRawData && lastParsedData) {
      return lastParsedData;
    }
    lastRawData = rawData;
    let parsedData: T;
    try {
      parsedData = JSON.parse(rawData);
    } catch (_) {
      parsedData = fallback;
    }
    lastParsedData = parsedData;
    return parsedData;
  };
}

function makeSetter<T>(key: string) {
  return (newValue: T) => {
    const newRawValue = JSON.stringify(newValue);
    window.localStorage.setItem(key, newRawValue);
    window.dispatchEvent(new StorageEvent('storage', { key }));
  };
}

function makeEmitter(key: string) {
  return (listener: () => void) => {
    const filteredListener = (e: StorageEvent) => {
      if (e.key === key) {
        return listener();
      }
    };
    window.addEventListener('storage', filteredListener);
    return () => window.removeEventListener('storage', filteredListener);
  };
}
