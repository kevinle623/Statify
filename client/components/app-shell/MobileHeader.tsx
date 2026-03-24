import Link from "next/link";
import { UserCircle } from "lucide-react";
import { ThemeToggle } from "@/client/components/theme/ThemeToggle";
import { LogoutButton } from "@/client/components/auth/LogoutButton";
import { Skeleton } from "@/client/components/ui/skeleton";

interface MobileHeaderProps {
  profileLoading: boolean;
  displayName: string;
}

export function MobileHeader({
  profileLoading,
  displayName,
}: MobileHeaderProps) {
  return (
    <header className="fixed top-0 right-0 left-0 lg:hidden h-16 grid grid-cols-3 items-center px-6 z-40 bg-background/80 backdrop-blur-md border-b border-white/5">
      {/* Left: avatar + name */}
      <div className="flex items-center gap-3">
        {profileLoading ? (
          <>
            <Skeleton className="size-8 rounded-full" />
            <Skeleton className="h-4 w-16" />
          </>
        ) : (
          <>
            <UserCircle className="size-8 text-on-surface-variant" />
            <span className="font-headline text-sm font-bold uppercase tracking-[0.05em] text-on-surface">
              {displayName.split(" ")[0]}
            </span>
          </>
        )}
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
  );
}
