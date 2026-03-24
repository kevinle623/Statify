import Link from "next/link";
import { ThemeToggle } from "@/client/components/theme/ThemeToggle";
import { LogoutButton } from "@/client/components/auth/LogoutButton";

export function MobileHeader() {
  return (
    <header className="fixed top-0 right-0 left-0 lg:hidden h-16 flex items-center justify-between px-6 z-40 bg-background/80 backdrop-blur-md border-b border-divider">
      {/* Left: logo */}
      <div className="flex items-center gap-2">
        <Link
          href="/dashboard"
          className="text-xl font-black tracking-tighter text-on-surface font-headline"
        >
          STATIFY
        </Link>
        <span className="font-label text-[10px] uppercase tracking-[0.1em] text-on-surface-variant border border-on-surface/15 px-1.5 py-0.5">
          v2.0
        </span>
      </div>

      {/* Right: controls */}
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <LogoutButton />
      </div>
    </header>
  );
}
