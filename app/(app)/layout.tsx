import { requireSpotifySession } from "@/server/lib/spotify-session";
import { getServerPreference } from "@/server/lib/preferences";
import { AppShell } from "@/client/components/app-shell/AppShell";

export default async function AuthedLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  await requireSpotifySession();

  const sidebarCollapsed =
    (await getServerPreference("sidebar-collapsed")) === "true";

  return (
    <AppShell initialSidebarCollapsed={sidebarCollapsed}>{children}</AppShell>
  );
}
