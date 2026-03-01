import { requireSpotifySession } from "@/server/lib/spotify-session";
import { AppShell } from "@/client/components/app-shell/AppShell";

export default async function AuthedLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  await requireSpotifySession();

  return <AppShell>{children}</AppShell>;
}
