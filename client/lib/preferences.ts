type PreferenceKey = "theme" | "sidebar-collapsed";

const STORAGE_PREFIX = "statify:";

interface PreferencesStore {
  get<T extends string>(key: PreferenceKey): T | null;
  set(key: PreferenceKey, value: string): void;
  remove(key: PreferenceKey): void;
}

function createLocalStorageStore(): PreferencesStore {
  function prefixed(key: PreferenceKey): string {
    return `${STORAGE_PREFIX}${key}`;
  }

  return {
    get<T extends string>(key: PreferenceKey): T | null {
      if (typeof window === "undefined") return null;
      return localStorage.getItem(prefixed(key)) as T | null;
    },
    set(key: PreferenceKey, value: string) {
      if (typeof window === "undefined") return;
      localStorage.setItem(prefixed(key), value);
    },
    remove(key: PreferenceKey) {
      if (typeof window === "undefined") return;
      localStorage.removeItem(prefixed(key));
    },
  };
}

export const preferences: PreferencesStore = createLocalStorageStore();
