export type PreferenceKey = "theme" | "sidebar-collapsed";

export const PREFERENCE_PREFIX = "statify:";

/** Keys that should also be persisted as cookies for SSR access. */
const SSR_KEYS: Set<PreferenceKey> = new Set(["sidebar-collapsed"]);

export interface PreferencesStore {
  get<T extends string>(key: PreferenceKey): T | null;
  set(key: PreferenceKey, value: string): void;
  remove(key: PreferenceKey): void;
}

function setCookie(name: string, value: string) {
  document.cookie = `${name}=${encodeURIComponent(value)};path=/;max-age=${60 * 60 * 24 * 365};SameSite=Lax`;
}

function removeCookie(name: string) {
  document.cookie = `${name}=;path=/;max-age=0`;
}

function createLocalStorageStore(): PreferencesStore {
  function prefixed(key: PreferenceKey): string {
    return `${PREFERENCE_PREFIX}${key}`;
  }

  return {
    get<T extends string>(key: PreferenceKey): T | null {
      if (typeof window === "undefined") return null;
      return localStorage.getItem(prefixed(key)) as T | null;
    },
    set(key: PreferenceKey, value: string) {
      if (typeof window === "undefined") return;
      localStorage.setItem(prefixed(key), value);
      if (SSR_KEYS.has(key)) setCookie(prefixed(key), value);
    },
    remove(key: PreferenceKey) {
      if (typeof window === "undefined") return;
      localStorage.removeItem(prefixed(key));
      if (SSR_KEYS.has(key)) removeCookie(prefixed(key));
    },
  };
}

export const preferences: PreferencesStore = createLocalStorageStore();
