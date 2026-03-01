"use client";

import { useState, useSyncExternalStore } from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "statify-theme";

function getSystemTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.classList.remove("light", "dark");
  root.classList.add(theme);
  root.style.colorScheme = theme;
}

export function useTheme() {
  const isMounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof document !== "undefined") {
      const existingTheme = document.documentElement.dataset.theme;

      if (existingTheme === "light" || existingTheme === "dark") {
        return existingTheme;
      }
    }

    if (typeof window !== "undefined") {
      const storedTheme = window.localStorage.getItem(STORAGE_KEY);

      if (storedTheme === "light" || storedTheme === "dark") {
        return storedTheme;
      }

      return getSystemTheme();
    }

    return "dark";
  });

  function setTheme(nextTheme: Theme) {
    window.localStorage.setItem(STORAGE_KEY, nextTheme);
    applyTheme(nextTheme);
    setThemeState(nextTheme);
  }

  function toggleTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  return {
    isMounted,
    theme,
    setTheme,
    toggleTheme,
  };
}
