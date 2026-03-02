"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useEffectEvent, useRef, useState } from "react";
import {
  BarChart3,
  Clock3,
  Disc3,
  Menu,
  Music4,
  Sparkles,
  X,
} from "lucide-react";
import { LogoutButton } from "@/client/components/auth/LogoutButton";
import { ThemeToggle } from "@/client/components/theme/ThemeToggle";
import { Badge } from "@/client/components/ui/badge";
import { Button } from "@/client/components/ui/button";
import { cn } from "@/client/lib/utils";

const navigationItems = [
  { href: "/dashboard", label: "Dashboard", icon: Sparkles },
  { href: "/artists", label: "Top artists", icon: BarChart3 },
  { href: "/tracks", label: "Top tracks", icon: Music4 },
  { href: "/history", label: "History", icon: Clock3 },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileMenuState, setMobileMenuState] = useState<
    "closed" | "opening" | "open" | "closing"
  >("closed");
  const mobileNavRef = useRef<HTMLDivElement | null>(null);
  const mobileMenuButtonRef = useRef<HTMLButtonElement | null>(null);
  const mobileMenuOpenedAtRef = useRef(0);
  const mobileMenuFrameRef = useRef<number | null>(null);
  const mobileMenuTimeoutRef = useRef<number | null>(null);

  const isMobileMenuOpen =
    mobileMenuState === "opening" || mobileMenuState === "open";
  const shouldRenderMobileMenu = mobileMenuState !== "closed";
  const isMobileMenuVisible = mobileMenuState !== "closing";

  function clearMobileMenuTimers() {
    if (mobileMenuFrameRef.current !== null) {
      window.cancelAnimationFrame(mobileMenuFrameRef.current);
      mobileMenuFrameRef.current = null;
    }

    if (mobileMenuTimeoutRef.current !== null) {
      window.clearTimeout(mobileMenuTimeoutRef.current);
      mobileMenuTimeoutRef.current = null;
    }
  }

  function openMobileMenu() {
    clearMobileMenuTimers();
    mobileMenuOpenedAtRef.current = window.performance.now();
    setMobileMenuState("opening");
    mobileMenuFrameRef.current = window.requestAnimationFrame(() => {
      setMobileMenuState("open");
      mobileMenuFrameRef.current = null;
    });
  }

  function closeMobileMenu() {
    if (mobileMenuState === "closed" || mobileMenuState === "closing") {
      return;
    }

    clearMobileMenuTimers();
    setMobileMenuState("closing");
    mobileMenuTimeoutRef.current = window.setTimeout(() => {
      setMobileMenuState("closed");
      mobileMenuTimeoutRef.current = null;
    }, 220);
  }

  function toggleMobileMenu() {
    if (isMobileMenuOpen) {
      closeMobileMenu();
      return;
    }

    openMobileMenu();
  }

  const handleMobileMenuDismiss = useEffectEvent(() => {
    closeMobileMenu();
  });

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return;
    }

    function handlePointerDown(event: PointerEvent) {
      const target = event.target as Node;

      if (
        !mobileNavRef.current?.contains(target) &&
        !mobileMenuButtonRef.current?.contains(target)
      ) {
        handleMobileMenuDismiss();
      }
    }

    function handleScroll() {
      if (window.performance.now() - mobileMenuOpenedAtRef.current < 250) {
        return;
      }

      handleMobileMenuDismiss();
    }

    document.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    return () => {
      clearMobileMenuTimers();
    };
  }, []);

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-5 sm:px-6 lg:px-8">
      <div className="sticky top-3 z-40 mb-5 lg:hidden" ref={mobileNavRef}>
        <div className="glass-panel flex items-center justify-between rounded-[24px] px-4 py-3 backdrop-blur-2xl">
          <Link
            href="/"
            className="flex min-w-0 items-center gap-3 rounded-2xl transition hover:opacity-90"
          >
            <span className="flex size-10 items-center justify-center rounded-2xl border border-cyan-300/25 bg-cyan-300/10 text-cyan-100">
              <Disc3 className="size-4" />
            </span>
            <div className="min-w-0">
              <strong className="animate-shimmer block truncate bg-[linear-gradient(90deg,#f8fbff,#c4f1ff,#f8fbff)] bg-clip-text text-base tracking-[-0.04em] text-transparent">
                Statify
              </strong>
              <p className="truncate text-xs font-medium tracking-[-0.03em] text-zinc-300">
                Your recap
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button
              ref={mobileMenuButtonRef}
              aria-expanded={isMobileMenuOpen}
              aria-label={
                isMobileMenuOpen
                  ? "Close navigation menu"
                  : "Open navigation menu"
              }
              onClick={toggleMobileMenu}
              size="icon"
              type="button"
              variant="secondary"
              className="relative overflow-hidden"
            >
              <Menu
                className={cn(
                  "absolute size-4.5 transition-all duration-200 ease-out",
                  isMobileMenuOpen
                    ? "rotate-90 scale-75 opacity-0"
                    : "rotate-0 scale-100 opacity-100",
                )}
              />
              <X
                className={cn(
                  "absolute size-4.5 transition-all duration-200 ease-out",
                  isMobileMenuOpen
                    ? "rotate-0 scale-100 opacity-100"
                    : "-rotate-90 scale-75 opacity-0",
                )}
              />
            </Button>
          </div>
        </div>

        {shouldRenderMobileMenu ? (
          <div
            className={cn(
              "glass-panel absolute inset-x-0 top-[calc(100%+0.75rem)] origin-top rounded-[28px] p-3 shadow-[0_30px_100px_rgba(2,6,23,0.42)] transition-all duration-200 ease-out",
              isMobileMenuVisible
                ? "translate-y-0 scale-100 opacity-100"
                : "-translate-y-2 scale-[0.98] opacity-0",
            )}
          >
            <nav className="grid gap-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  className={cn(
                    "group flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/50",
                    pathname === item.href
                      ? "border-cyan-300/35 bg-cyan-300/12 text-white shadow-[0_0_0_1px_rgba(125,211,252,0.2)]"
                      : "border-white/10 bg-white/[0.05] text-zinc-300 hover:border-white/18 hover:bg-white/[0.08]",
                  )}
                  aria-current={pathname === item.href ? "page" : undefined}
                  href={item.href}
                  onClick={closeMobileMenu}
                >
                  <item.icon
                    className={cn(
                      "size-4",
                      pathname === item.href
                        ? "text-cyan-100"
                        : "text-cyan-200",
                    )}
                  />
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="mt-3 border-t border-white/10 pt-3">
              <LogoutButton />
            </div>
          </div>
        ) : null}
      </div>

      <div className="grid flex-1 gap-5 lg:grid-cols-[290px_minmax(0,1fr)]">
        <aside className="glass-panel hidden h-fit flex-col gap-4 rounded-[28px] p-4 sm:rounded-[32px] sm:p-5 lg:sticky lg:top-5 lg:flex">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-2xl transition hover:opacity-90"
          >
            <span className="flex size-11 items-center justify-center rounded-2xl border border-cyan-300/25 bg-cyan-300/10 text-cyan-100">
              <Disc3 className="size-4.5" />
            </span>
            <div>
              <strong className="animate-shimmer bg-[linear-gradient(90deg,#f8fbff,#c4f1ff,#f8fbff)] bg-clip-text text-base tracking-[-0.04em] text-transparent">
                Statify
              </strong>
              <p className="mt-1 text-sm font-medium tracking-[-0.03em] text-zinc-200">
                Spotify listening snapshots
              </p>
            </div>
          </Link>

          <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-2">
            <Badge variant="default" className="w-fit">
              Your recap
            </Badge>
            <ThemeToggle />
          </div>

          <nav className="grid gap-2 sm:grid-cols-4 lg:grid-cols-1">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                className={cn(
                  "group flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/50",
                  pathname === item.href
                    ? "border-cyan-300/35 bg-cyan-300/12 text-white shadow-[0_0_0_1px_rgba(125,211,252,0.2)]"
                    : "border-white/10 bg-white/[0.05] text-zinc-300 hover:border-white/18 hover:bg-white/[0.08]",
                )}
                aria-current={pathname === item.href ? "page" : undefined}
                href={item.href}
              >
                <item.icon
                  className={cn(
                    "size-4",
                    pathname === item.href ? "text-cyan-100" : "text-cyan-200",
                  )}
                />
                {item.label}
              </Link>
            ))}
          </nav>

          <LogoutButton />
        </aside>

        <div className="min-w-0">{children}</div>
      </div>
      <footer className="pb-2 pt-6 text-center text-sm text-zinc-400">
        Made with ❤️ by Statify team
      </footer>
    </div>
  );
}
