"use client";

import { usePathname } from "next/navigation";
import { useProfile } from "@/client/hooks/use-profile";
import { DesktopSidebar } from "./DesktopSidebar";
import { DesktopHeader } from "./DesktopHeader";
import { DesktopFooter } from "./DesktopFooter";
import { MobileHeader } from "./MobileHeader";
import { MobileTabBar } from "./MobileTabBar";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data: profile, isLoading: profileLoading } = useProfile();

  const displayName = profile?.display_name ?? "User";

  return (
    <>
      {/* Desktop Sidebar */}
      <DesktopSidebar pathname={pathname} />

      {/* Top Header — Mobile */}
      <MobileHeader profileLoading={profileLoading} displayName={displayName} />

      {/* Top Header — Desktop */}
      <DesktopHeader
        pathname={pathname}
        profile={profile}
        profileLoading={profileLoading}
        displayName={displayName}
      />

      {/* Main Content */}
      <main className="lg:ml-64 pt-16 pb-20 lg:pb-12 min-h-screen">
        {children}
      </main>

      {/* Desktop Footer */}
      <DesktopFooter />

      {/* Mobile Bottom Tab Bar */}
      <MobileTabBar pathname={pathname} />
    </>
  );
}
