"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/client/hooks/use-theme";

export function ThemeToggle() {
  const { isMounted, theme, toggleTheme } = useTheme();
  const resolvedTheme = isMounted ? theme : "dark";

  return (
    <button
      aria-label={
        resolvedTheme === "dark"
          ? "Switch to light mode"
          : "Switch to dark mode"
      }
      className="text-on-surface-variant cursor-pointer hover:text-primary transition-colors"
      onClick={toggleTheme}
      type="button"
    >
      {resolvedTheme === "dark" ? (
        <Moon className="size-5" />
      ) : (
        <Sun className="size-5" />
      )}
    </button>
  );
}
