"use client";

import { Logo } from "@/client/components/ui/logo";

export function LandingLogo() {
  return (
    <button
      className="cursor-pointer"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <Logo />
    </button>
  );
}
