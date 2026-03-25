import { beforeEach, describe, expect, it, vi } from "vitest";

// Simulate browser environment before module import
const store = new Map<string, string>();
let cookieJar = "";

// Must define window/localStorage/document before the module is imported
// since the store checks `typeof window` at call time
Object.defineProperty(globalThis, "window", {
  value: globalThis,
  configurable: true,
});

Object.defineProperty(globalThis, "localStorage", {
  value: {
    getItem: vi.fn((key: string) => store.get(key) ?? null),
    setItem: vi.fn((key: string, value: string) => store.set(key, value)),
    removeItem: vi.fn((key: string) => {
      store.delete(key);
    }),
    clear: vi.fn(() => store.clear()),
  },
  configurable: true,
});

Object.defineProperty(globalThis, "document", {
  value: {
    get cookie() {
      return cookieJar;
    },
    set cookie(v: string) {
      cookieJar = v;
    },
  },
  configurable: true,
});

const { preferences, PREFERENCE_PREFIX } =
  await import("@/client/lib/preferences");

describe("preferences", () => {
  beforeEach(() => {
    store.clear();
    cookieJar = "";
    vi.clearAllMocks();
  });

  describe("get", () => {
    it("returns null when key does not exist", () => {
      expect(preferences.get("theme")).toBeNull();
    });

    it("returns stored value", () => {
      store.set(`${PREFERENCE_PREFIX}theme`, "light");
      expect(preferences.get("theme")).toBe("light");
    });
  });

  describe("set", () => {
    it("writes to localStorage with prefix", () => {
      preferences.set("theme", "dark");
      expect(localStorage.setItem).toHaveBeenCalledWith(
        `${PREFERENCE_PREFIX}theme`,
        "dark",
      );
    });

    it("does not set cookie for non-SSR keys", () => {
      preferences.set("theme", "dark");
      expect(cookieJar).toBe("");
    });

    it("sets cookie for SSR keys", () => {
      preferences.set("sidebar-collapsed", "true");
      expect(cookieJar).toContain(`${PREFERENCE_PREFIX}sidebar-collapsed=true`);
    });
  });

  describe("remove", () => {
    it("removes from localStorage", () => {
      preferences.set("theme", "dark");
      preferences.remove("theme");
      expect(localStorage.removeItem).toHaveBeenCalledWith(
        `${PREFERENCE_PREFIX}theme`,
      );
    });

    it("clears cookie for SSR keys", () => {
      preferences.set("sidebar-collapsed", "true");
      preferences.remove("sidebar-collapsed");
      expect(cookieJar).toContain("max-age=0");
    });
  });
});
