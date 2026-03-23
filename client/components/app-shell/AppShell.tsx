"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  LayoutDashboard,
  User,
  Music,
  Clock,
  Bell,
  BellOff,
  UserCircle,
} from "lucide-react";
import { ThemeToggle } from "@/client/components/theme/ThemeToggle";
import { LogoutButton } from "@/client/components/auth/LogoutButton";
import { useProfile } from "@/client/hooks/use-profile";
import { cn } from "@/client/lib/utils";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/artists", label: "Artists", icon: User },
  { href: "/tracks", label: "Tracks", icon: Music },
  { href: "/history", label: "History", icon: Clock },
] as const;

function getBreadcrumb(pathname: string): string {
  if (pathname.startsWith("/dashboard")) return "Status: Synchronized";
  if (pathname.startsWith("/artists")) return "Archive / Top Artists";
  if (pathname.startsWith("/tracks")) return "Archive / Top Tracks";
  if (pathname.startsWith("/history")) return "Archive / History";
  return "Archive";
}

function NotificationPanel() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div className="relative flex items-center" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        aria-label="Notifications"
        className="cursor-pointer"
      >
        <Bell className="size-5 text-on-surface-variant hover:text-primary transition-colors" />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-3 w-80 bg-surface-container ghost-border shadow-xl z-50">
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
            <span className="font-label text-xs uppercase tracking-widest text-on-surface font-bold">
              Notifications
            </span>
            <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">
              0 New
            </span>
          </div>
          <div className="flex flex-col items-center justify-center py-12 px-6">
            <BellOff className="size-8 text-on-surface-variant/30 mb-4" />
            <p className="text-sm text-on-surface-variant text-center">
              No notifications right now
            </p>
            <p className="text-xs text-on-surface-variant/50 text-center mt-1">
              We&apos;ll let you know when something comes up.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data: profile } = useProfile();

  const displayName = profile?.display_name ?? "User";

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="fixed left-0 top-0 h-full hidden lg:flex flex-col py-8 px-6 bg-background w-64 border-r border-white/5 z-50">
        <div className="mb-12">
          <Link href="/dashboard">
            <h1 className="text-xl font-bold tracking-tighter text-on-surface font-headline">
              Statify
            </h1>
          </Link>
          <p className="font-label text-[10px] uppercase tracking-[0.1em] text-on-surface-variant mt-1">
            The Digital Archivist
          </p>
        </div>

        <nav className="flex-1 space-y-1">
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
            const isActive = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-4 px-4 py-3 font-medium text-sm transition-all duration-200",
                  isActive
                    ? "text-primary border-r-2 border-primary bg-primary/5"
                    : "text-on-surface-variant hover:text-on-surface hover:bg-white/5",
                )}
              >
                <Icon className="size-[18px]" />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto pt-8 border-t border-white/5">
          <button
            disabled
            className="w-full ghost-border bg-white/5 text-on-surface-variant/50 py-3 text-xs font-label uppercase tracking-widest cursor-not-allowed"
          >
            Export Data
            <span className="block text-[9px] tracking-normal text-on-surface-variant/30 mt-1">
              Coming Soon
            </span>
          </button>
        </div>
      </aside>

      {/* Top Header — Mobile */}
      <header className="fixed top-0 right-0 left-0 lg:hidden h-16 grid grid-cols-3 items-center px-6 z-40 bg-background/80 backdrop-blur-md border-b border-white/5">
        {/* Left: avatar + name */}
        <div className="flex items-center gap-3">
          <UserCircle className="size-8 text-on-surface-variant" />
          <span className="font-headline text-sm font-bold uppercase tracking-[0.05em] text-on-surface">
            {displayName.split(" ")[0]}
          </span>
        </div>

        {/* Center: logo */}
        <Link
          href="/dashboard"
          className="text-xl font-black tracking-tighter text-on-surface font-headline text-center"
        >
          STATIFY
        </Link>

        {/* Right: controls */}
        <div className="flex items-center gap-4 justify-end">
          <ThemeToggle />
          <LogoutButton />
        </div>
      </header>

      {/* Top Header — Desktop */}
      <header className="fixed top-0 right-0 left-64 h-16 hidden lg:flex justify-between items-center px-12 z-40 bg-background/80 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center">
          <span className="font-label text-xs uppercase tracking-[0.05em] text-on-surface-variant">
            {getBreadcrumb(pathname)}
          </span>
        </div>

        <div className="flex items-center gap-6">
          <ThemeToggle />
          <NotificationPanel />

          <div className="flex items-center gap-3">
            <div className="h-4 w-px bg-white/10" />
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-xs font-bold text-on-surface">
                  {displayName}
                </p>
                <p className="font-label text-[9px] uppercase tracking-tighter text-on-surface-variant">
                  {profile?.product ?? "Free"} Archivist
                </p>
              </div>
              <UserCircle className="size-8 text-on-surface-variant" />
              <LogoutButton />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="lg:ml-64 pt-16 pb-20 lg:pb-12 min-h-screen">
        {children}
      </main>

      {/* Desktop Footer */}
      <footer className="fixed bottom-0 right-0 left-64 h-12 hidden lg:flex justify-between items-center px-12 bg-background border-t border-white/5 z-40">
        <span className="font-label text-[10px] uppercase tracking-[0.1em] text-on-surface-variant">
          &copy; 2026 STATIFY ARCHIVE
        </span>
        <div className="flex gap-8">
          <Link
            href="/privacy"
            className="font-label text-[10px] uppercase tracking-[0.1em] text-on-surface-variant hover:text-on-surface transition-colors"
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className="font-label text-[10px] uppercase tracking-[0.1em] text-on-surface-variant hover:text-on-surface transition-colors"
          >
            Terms
          </Link>
          <span className="font-label text-[10px] uppercase tracking-[0.1em] text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer">
            API
          </span>
        </div>
      </footer>

      {/* Mobile Bottom Tab Bar */}
      <nav className="fixed bottom-0 left-0 w-full lg:hidden flex justify-around items-center py-3 px-2 bg-surface-container-lowest z-50 border-t border-white/5">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 transition-all",
                isActive ? "text-primary" : "text-on-surface-variant",
              )}
            >
              <Icon className="size-5" />
              <span className="font-label text-[10px] uppercase tracking-widest">
                {label}
              </span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
