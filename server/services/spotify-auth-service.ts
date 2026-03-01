import crypto from "node:crypto";
import {
  exchangeCodeForSpotifyTokens,
  refreshSpotifyTokens,
} from "@/server/adapters/spotify/auth-adapter";
import { env } from "@/server/lib/env";
import {
  SPOTIFY_ACCOUNTS_BASE_URL,
  SPOTIFY_SCOPES,
} from "@/server/lib/spotify";

export function createSpotifyAuthorizationUrl(state: string) {
  const url = new URL(`${SPOTIFY_ACCOUNTS_BASE_URL}/authorize`);

  url.searchParams.set("client_id", env.spotifyClientId);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("redirect_uri", env.spotifyRedirectUri);
  url.searchParams.set("scope", SPOTIFY_SCOPES.join(" "));
  url.searchParams.set("state", state);
  url.searchParams.set("show_dialog", "false");

  return url.toString();
}

export function createSpotifyState() {
  return crypto.randomBytes(16).toString("hex");
}

export async function exchangeSpotifyCode(code: string) {
  return exchangeCodeForSpotifyTokens(code);
}

export async function refreshSpotifyAccessToken(refreshToken: string) {
  return refreshSpotifyTokens(refreshToken);
}
