import { CircleUser } from "lucide-react";
import { ThemeToggle } from "@/client/components/theme/ThemeToggle";
import { LogoutButton } from "@/client/components/auth/LogoutButton";
import { Skeleton } from "@/client/components/ui/skeleton";
import { NotificationPanel } from "./NotificationPanel";
import { getBreadcrumb } from "./nav-config";
import type { SpotifyUserProfile } from "@/types/spotify";

interface DesktopHeaderProps {
  pathname: string;
  profile: SpotifyUserProfile | null | undefined;
  profileLoading: boolean;
  displayName: string;
  sidebarWidth: string;
}

export function DesktopHeader({
  pathname,
  profile,
  profileLoading,
  displayName,
  sidebarWidth,
}: DesktopHeaderProps) {
  return (
    <header
      className="fixed top-0 right-0 h-16 hidden lg:flex justify-between items-center px-12 z-40 bg-background/80 backdrop-blur-md border-b border-divider transition-all duration-300"
      style={{ left: sidebarWidth }}
    >
      <div className="flex items-center">
        <span className="font-label text-xs uppercase tracking-[0.05em] text-on-surface-variant">
          {getBreadcrumb(pathname)}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-3">
          {profileLoading ? (
            <>
              <Skeleton className="size-8 rounded-full" />
              <div className="text-left space-y-1.5">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-2.5 w-20" />
              </div>
            </>
          ) : (
            <>
              <CircleUser className="size-8 text-on-surface-variant" />
              <div className="text-left">
                <p className="text-xs font-bold text-on-surface">
                  {displayName}
                </p>
                <p className="font-label text-[9px] uppercase tracking-tighter text-on-surface-variant">
                  {profile?.product ?? "Free"} Archivist
                </p>
              </div>
            </>
          )}
        </div>

        <div className="h-4 w-px bg-on-surface/15" />

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <NotificationPanel />
          <LogoutButton />
        </div>
      </div>
    </header>
  );
}
