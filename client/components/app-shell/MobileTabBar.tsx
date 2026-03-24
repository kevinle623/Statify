import Link from "next/link";
import { cn } from "@/client/lib/utils";
import { NAV_ITEMS } from "./nav-config";

interface MobileTabBarProps {
  pathname: string;
}

export function MobileTabBar({ pathname }: MobileTabBarProps) {
  return (
    <nav className="fixed bottom-0 left-0 w-full lg:hidden flex justify-around items-center py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] px-2 bg-surface-container-lowest z-50 border-t border-divider after:absolute after:left-0 after:top-full after:w-full after:h-12 after:bg-surface-container-lowest">
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
  );
}
