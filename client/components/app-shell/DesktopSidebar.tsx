import Link from "next/link";
import { cn } from "@/client/lib/utils";
import { NAV_ITEMS } from "./nav-config";

interface DesktopSidebarProps {
  pathname: string;
}

export function DesktopSidebar({ pathname }: DesktopSidebarProps) {
  return (
    <aside className="fixed left-0 top-0 h-full hidden lg:flex flex-col py-8 px-6 bg-background w-64 border-r border-divider z-50">
      <div className="mb-12">
        <Link href="/dashboard">
          <h1 className="text-xl font-bold tracking-tighter text-on-surface font-headline">
            STATIFY
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
                "flex items-center gap-4 px-4 py-3 font-medium text-sm uppercase tracking-wide transition-all duration-200",
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

      <div className="mt-auto pt-8 border-t border-divider">
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
  );
}
