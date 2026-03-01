"use client";

import { MoonStar, SunMedium } from "lucide-react";
import { Button } from "@/client/components/ui/button";
import { useTheme } from "@/client/hooks/use-theme";

export function ThemeToggle() {
  const { isMounted, theme, toggleTheme } = useTheme();
  const resolvedTheme = isMounted ? theme : "dark";

  return (
    <Button
      aria-label={
        resolvedTheme === "dark"
          ? "Switch to light mode"
          : "Switch to dark mode"
      }
      onClick={toggleTheme}
      size="icon"
      type="button"
      variant="secondary"
    >
      {resolvedTheme === "dark" ? (
        <SunMedium className="size-4.5" />
      ) : (
        <MoonStar className="size-4.5" />
      )}
    </Button>
  );
}
