"use client";

import { useCallback, useState } from "react";
import { usePathname } from "next/navigation";
import { useProfile } from "@/client/hooks/use-profile";
import { preferences } from "@/client/lib/preferences";
import { DesktopSidebar } from "./DesktopSidebar";
import { DesktopHeader } from "./DesktopHeader";
import { DesktopFooter } from "./DesktopFooter";
import { MobileHeader } from "./MobileHeader";
import { MobileTabBar } from "./MobileTabBar";

interface AppShellProps {
  children: React.ReactNode;
  initialSidebarCollapsed?: boolean;
}

export function AppShell({
  children,
  initialSidebarCollapsed = false,
}: AppShellProps) {
  const pathname = usePathname();
  const { data: profile, isLoading: profileLoading } = useProfile();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(
    initialSidebarCollapsed,
  );

  const handleToggle = useCallback(() => {
    setSidebarCollapsed((prev) => {
      const next = !prev;
      preferences.set("sidebar-collapsed", String(next));
      return next;
    });
  }, []);

  const displayName = profile?.display_name ?? "User";
  const sidebarWidth = sidebarCollapsed ? "66px" : "16rem";

  return (
    <>
      {/* Desktop Sidebar */}
      <DesktopSidebar
        pathname={pathname}
        collapsed={sidebarCollapsed}
        onToggle={handleToggle}
      />

      {/* Top Header — Mobile */}
      <MobileHeader />

      {/* Top Header — Desktop */}
      <DesktopHeader
        pathname={pathname}
        profile={profile}
        profileLoading={profileLoading}
        displayName={displayName}
        sidebarWidth={sidebarWidth}
      />

      {/* Main Content */}
      <main
        className="max-lg:!ml-0 pt-16 pb-20 lg:pb-12 min-h-screen transition-[margin-left] duration-300"
        style={{ marginLeft: sidebarWidth }}
      >
        {children}
      </main>

      {/* Desktop Footer */}
      <DesktopFooter sidebarWidth={sidebarWidth} />

      {/* Mobile Bottom Tab Bar */}
      <MobileTabBar pathname={pathname} />
    </>
  );
}
