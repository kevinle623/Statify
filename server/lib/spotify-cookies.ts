import { cookies } from "next/headers";
import { env } from "@/server/lib/env";
import {
  AUTH_STATE_MAX_AGE,
  SESSION_MAX_AGE,
  SPOTIFY_COOKIE_KEYS,
} from "@/server/lib/spotify";

interface SpotifyTokenPair {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

function baseCookieOptions(maxAge?: number) {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: env.isProduction,
    path: "/",
    ...(maxAge ? { maxAge } : {}),
  };
}

export async function setSpotifyAuthState(state: string) {
  const cookieStore = await cookies();

  cookieStore.set(
    SPOTIFY_COOKIE_KEYS.authState,
    state,
    baseCookieOptions(AUTH_STATE_MAX_AGE),
  );
}

export async function getSpotifyAuthState() {
  const cookieStore = await cookies();
  return cookieStore.get(SPOTIFY_COOKIE_KEYS.authState)?.value ?? null;
}

export async function clearSpotifyAuthState() {
  const cookieStore = await cookies();
  cookieStore.delete(SPOTIFY_COOKIE_KEYS.authState);
}

export async function setSpotifySession(tokens: SpotifyTokenPair) {
  const cookieStore = await cookies();
  const expiresAt = Date.now() + tokens.expiresIn * 1000;

  cookieStore.set(
    SPOTIFY_COOKIE_KEYS.accessToken,
    tokens.accessToken,
    baseCookieOptions(tokens.expiresIn),
  );
  cookieStore.set(
    SPOTIFY_COOKIE_KEYS.refreshToken,
    tokens.refreshToken,
    baseCookieOptions(SESSION_MAX_AGE),
  );
  cookieStore.set(
    SPOTIFY_COOKIE_KEYS.expiresAt,
    String(expiresAt),
    baseCookieOptions(SESSION_MAX_AGE),
  );
}

export async function getSpotifySession() {
  const cookieStore = await cookies();

  return {
    accessToken:
      cookieStore.get(SPOTIFY_COOKIE_KEYS.accessToken)?.value ?? null,
    refreshToken:
      cookieStore.get(SPOTIFY_COOKIE_KEYS.refreshToken)?.value ?? null,
    expiresAt: Number(
      cookieStore.get(SPOTIFY_COOKIE_KEYS.expiresAt)?.value ?? "0",
    ),
  };
}

export async function clearSpotifySession() {
  const cookieStore = await cookies();

  cookieStore.delete(SPOTIFY_COOKIE_KEYS.accessToken);
  cookieStore.delete(SPOTIFY_COOKIE_KEYS.refreshToken);
  cookieStore.delete(SPOTIFY_COOKIE_KEYS.expiresAt);
}
