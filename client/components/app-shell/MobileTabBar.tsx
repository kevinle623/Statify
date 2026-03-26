import Link from "next/link";
import { cn } from "@/client/lib/utils";
import { NAV_ITEMS } from "./nav-config";
import type { MouseEvent } from "react";

interface MobileTabBarProps {
  pathname: string;
}

export function MobileTabBar({ pathname }: MobileTabBarProps) {
  const handleTap = (e: MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.blur();
  };

  return (
    <nav className="fixed bottom-0 left-0 w-full lg:hidden flex justify-around items-center py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] px-2 bg-surface-container-lowest z-50 border-t border-divider after:absolute after:left-0 after:top-full after:w-full after:h-12 after:bg-surface-container-lowest after:pointer-events-none">
      {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
        const isActive = pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            prefetch={true}
            onClick={handleTap}
            className={cn(
              "flex flex-1 flex-col items-center justify-center gap-1 py-3 px-2 min-h-[56px] touch-manipulation select-none transition-colors [-webkit-tap-highlight-color:transparent] active:opacity-60 focus:outline-none",
              isActive ? "text-primary" : "text-on-surface-variant",
            )}
          >
            <Icon className="size-6 pointer-events-none" />
            <span className="font-label text-[10px] uppercase tracking-widest pointer-events-none">
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
