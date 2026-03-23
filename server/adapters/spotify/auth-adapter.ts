import { env } from "@/server/lib/env";
import { SPOTIFY_ACCOUNTS_BASE_URL } from "@/server/lib/spotify";

interface SpotifyTokenResponse {
  access_token: string;
  token_type: string;
  scope: string;
  expires_in: number;
  refresh_token?: string;
}

function getBasicAuthorizationHeader() {
  const credentials = `${env.spotifyClientId}:${env.spotifyClientSecret}`;
  return `Basic ${Buffer.from(credentials).toString("base64")}`;
}

async function requestSpotifyToken(body: URLSearchParams) {
  const response = await fetch(`${SPOTIFY_ACCOUNTS_BASE_URL}/api/token`, {
    method: "POST",
    headers: {
      Authorization: getBasicAuthorizationHeader(),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
    cache: "no-store",
  });

  if (!response.ok) {
    const text = await response.text();
    let errorBody: { error?: string; error_description?: string } = {};
    try {
      errorBody = JSON.parse(text);
    } catch {
      // not JSON
    }

    const err = new Error(
      `Spotify token request failed: ${errorBody.error_description ?? text}`,
    );
    (err as Error & { spotifyError?: string }).spotifyError =
      errorBody.error ?? "unknown";
    throw err;
  }

  return (await response.json()) as SpotifyTokenResponse;
}

export async function exchangeCodeForSpotifyTokens(code: string) {
  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    redirect_uri: env.spotifyRedirectUri,
  });

  return requestSpotifyToken(body);
}

export async function refreshSpotifyTokens(refreshToken: string) {
  const body = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: refreshToken,
  });

  return requestSpotifyToken(body);
}
