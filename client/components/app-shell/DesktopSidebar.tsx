import { useCallback, useState } from "react";
import Link from "next/link";
import { Download, PanelLeft } from "lucide-react";
import { cn } from "@/client/lib/utils";
import { Button } from "@/client/components/ui/button";
import { Logo } from "@/client/components/ui/logo";
import { NAV_ITEMS } from "./nav-config";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/client/components/ui/tooltip";

const COLLAPSED_WIDTH = "66px";

/** Always-controlled tooltip that only opens when `enabled` is true. */
function SidebarTooltip({
  enabled,
  children,
  content,
}: {
  enabled: boolean;
  children: React.ReactNode;
  content: React.ReactNode;
}) {
  const [hovered, setHovered] = useState(false);

  const handleOpenChange = useCallback(
    (open: boolean) => {
      setHovered(enabled && open);
    },
    [enabled],
  );

  return (
    <Tooltip open={enabled && hovered} onOpenChange={handleOpenChange}>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent side="right">{content}</TooltipContent>
    </Tooltip>
  );
}

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
  const [showTooltips, setShowTooltips] = useState(collapsed);

  const handleToggle = useCallback(() => {
    setShowTooltips(false);
    onToggle();
  }, [onToggle]);

  const handleTransitionEnd = useCallback(() => {
    setShowTooltips(collapsed);
  }, [collapsed]);

  return (
    <TooltipProvider delayDuration={0}>
      <aside
        className="fixed left-0 top-0 h-full hidden lg:flex flex-col bg-background border-r border-divider z-50 overflow-hidden transition-[width] duration-300 ease-in-out w-64"
        style={{ width: collapsed ? COLLAPSED_WIDTH : undefined }}
        onTransitionEnd={handleTransitionEnd}
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
            <Logo className="whitespace-nowrap" />
          </Link>
          <SidebarTooltip enabled={showTooltips} content="Expand sidebar">
            <button
              onClick={handleToggle}
              className="flex-shrink-0 flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
            >
              <PanelLeft
                className={cn(
                  "size-[18px] transition-transform duration-300",
                  collapsed && "rotate-180",
                )}
              />
            </button>
          </SidebarTooltip>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 pt-6">
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
            const isActive = pathname.startsWith(href);
            return (
              <SidebarTooltip key={href} enabled={showTooltips} content={label}>
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
              </SidebarTooltip>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="mt-auto pt-8 pb-8 border-t border-divider px-6 shrink-0">
          <div className="relative overflow-hidden">
            <Button
              variant="secondary"
              disabled
              subtitle="Coming Soon"
              className="w-full shrink-0 transition-[opacity,visibility] duration-300"
              style={
                collapsed
                  ? {
                      opacity: 0,
                      visibility: "hidden",
                      transitionDelay: "0ms, 300ms",
                    }
                  : {
                      opacity: 1,
                      visibility: "visible",
                      transitionDelay: "0ms, 0ms",
                    }
              }
            >
              Export Data
            </Button>
            <SidebarTooltip
              enabled={showTooltips}
              content="Export Data — Coming Soon"
            >
              <div
                className={cn(
                  "absolute inset-0 flex items-center transition-opacity duration-300",
                  collapsed ? "opacity-50" : "opacity-0 pointer-events-none",
                )}
              >
                <Download className="size-[18px] flex-shrink-0 text-on-surface-variant" />
              </div>
            </SidebarTooltip>
          </div>
        </div>
      </aside>
    </TooltipProvider>
  );
}
