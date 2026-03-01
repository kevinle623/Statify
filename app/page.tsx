import { cookies } from "next/headers";
import { LandingPage } from "@/client/components/landing/LandingPage";
import { SPOTIFY_COOKIE_KEYS } from "@/server/lib/spotify";

export default async function HomePage() {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.has(SPOTIFY_COOKIE_KEYS.refreshToken);

  return <LandingPage isAuthenticated={isAuthenticated} />;
}
