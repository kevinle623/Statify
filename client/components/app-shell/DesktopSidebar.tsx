import Link from "next/link";
import { Download, PanelLeft } from "lucide-react";
import { cn } from "@/client/lib/utils";
import { NAV_ITEMS } from "./nav-config";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/client/components/ui/tooltip";

const COLLAPSED_WIDTH = "66px";

interface DesktopSidebarProps {
  pathname: string;
  collapsed: boolean;
  onToggle: () => void;
}

export function DesktopSidebar({
  pathname,
  collapsed,
  onToggle,
}: DesktopSidebarProps) {
  return (
    <TooltipProvider delayDuration={0}>
      <aside
        className="fixed left-0 top-0 h-full hidden lg:flex flex-col bg-background border-r border-divider z-50 overflow-hidden transition-[width] duration-300 ease-in-out w-64"
        style={{ width: collapsed ? COLLAPSED_WIDTH : undefined }}
      >
        {/* Header: Logo + Toggle — aligned with top bar */}
        <div className="h-16 flex items-center px-6 border-b border-divider">
          <Link
            href="/dashboard"
            className={cn(
              "overflow-hidden transition-all duration-300 ease-in-out min-w-0",
              collapsed ? "flex-none w-0 opacity-0" : "flex-1 opacity-100",
            )}
          >
            <h1 className="text-xl font-bold tracking-tighter text-on-surface font-headline whitespace-nowrap">
              STATIFY
            </h1>
            <p className="font-label text-[10px] uppercase tracking-[0.1em] text-on-surface-variant mt-0.5 whitespace-nowrap">
              The Digital Archivist
            </p>
          </Link>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={onToggle}
                className="flex-shrink-0 flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
              >
                <PanelLeft
                  className={cn(
                    "size-[18px] transition-transform duration-300",
                    collapsed && "rotate-180",
                  )}
                />
              </button>
            </TooltipTrigger>
            {collapsed && (
              <TooltipContent side="right">Expand sidebar</TooltipContent>
            )}
          </Tooltip>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 pt-6">
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
            const isActive = pathname.startsWith(href);
            return (
              <Tooltip key={href}>
                <TooltipTrigger asChild>
                  <Link
                    href={href}
                    className={cn(
                      "flex items-center gap-4 px-6 py-3 font-medium text-sm uppercase tracking-wide transition-colors duration-200 whitespace-nowrap",
                      isActive
                        ? "text-primary border-r-2 border-primary bg-primary/5"
                        : "text-on-surface-variant hover:text-on-surface hover:bg-white/5",
                    )}
                  >
                    <Icon className="size-[18px] flex-shrink-0" />
                    <span
                      className={cn(
                        "transition-opacity duration-300",
                        collapsed ? "opacity-0" : "opacity-100",
                      )}
                    >
                      {label}
                    </span>
                  </Link>
                </TooltipTrigger>
                {collapsed && (
                  <TooltipContent side="right">{label}</TooltipContent>
                )}
              </Tooltip>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="mt-auto pt-8 pb-8 border-t border-divider px-6">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="relative">
                <button
                  disabled
                  className={cn(
                    "w-full ghost-border bg-white/5 text-on-surface-variant/50 py-3 text-xs font-label uppercase tracking-widest cursor-not-allowed whitespace-nowrap transition-opacity duration-300",
                    collapsed ? "opacity-0" : "opacity-100",
                  )}
                >
                  Export Data
                  <span className="block text-[9px] tracking-normal text-on-surface-variant/30 mt-1">
                    Coming Soon
                  </span>
                </button>
                <div
                  className={cn(
                    "absolute inset-0 flex items-center justify-start transition-opacity duration-300 pointer-events-none",
                    collapsed ? "opacity-100" : "opacity-0",
                  )}
                >
                  <Download className="size-[18px] text-on-surface-variant/50" />
                </div>
              </div>
            </TooltipTrigger>
            {collapsed && (
              <TooltipContent side="right">
                Export Data — Coming Soon
              </TooltipContent>
            )}
          </Tooltip>
        </div>
      </aside>
    </TooltipProvider>
  );
}
