import { redirect } from "next/navigation";
import {
  clearSpotifySession,
  getSpotifySession,
  setSpotifySession,
} from "@/server/lib/spotify-cookies";
import { TOKEN_REFRESH_BUFFER_MS } from "@/server/lib/spotify";
import { refreshSpotifyAccessToken } from "@/server/services/spotify-auth-service";

export async function hasSpotifySession() {
  const session = await getSpotifySession();
  return Boolean(session.refreshToken);
}

export async function requireSpotifySession() {
  const authenticated = await hasSpotifySession();

  if (!authenticated) {
    redirect("/");
  }
}

export async function getValidSpotifyAccessToken() {
  const session = await getSpotifySession();

  if (!session.refreshToken) {
    return null;
  }

  const isAccessTokenValid =
    session.accessToken &&
    session.expiresAt > Date.now() + TOKEN_REFRESH_BUFFER_MS;

  if (isAccessTokenValid) {
    return session.accessToken;
  }

  try {
    const refreshed = await refreshSpotifyAccessToken(session.refreshToken);

    await setSpotifySession({
      accessToken: refreshed.access_token,
      refreshToken: refreshed.refresh_token ?? session.refreshToken,
      expiresIn: refreshed.expires_in,
    });

    return refreshed.access_token;
  } catch {
    await clearSpotifySession();
    return null;
  }
}
