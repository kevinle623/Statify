import { NextRequest, NextResponse } from "next/server";
import {
  clearSpotifyAuthState,
  getSpotifyAuthState,
  setSpotifySession,
} from "@/server/lib/spotify-cookies";
import { SpotifyAuthError } from "@/server/lib/errors";
import { SPOTIFY_API_BASE_URL } from "@/server/lib/spotify";
import { exchangeSpotifyCode } from "@/server/services/spotify-auth-service";

async function verifySpotifyAccess(accessToken: string): Promise<boolean> {
  const response = await fetch(`${SPOTIFY_API_BASE_URL}/me`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response.ok;
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");
  const storedState = await getSpotifyAuthState();

  if (error) {
    await clearSpotifyAuthState();
    const reason = error === "access_denied" ? "denied" : "unknown";
    return NextResponse.redirect(
      new URL(`/auth-error?reason=${reason}`, request.url),
    );
  }

  if (!code || !state || !storedState || state !== storedState) {
    await clearSpotifyAuthState();
    return NextResponse.redirect(
      new URL("/auth-error?reason=state_mismatch", request.url),
    );
  }

  let tokens;
  try {
    tokens = await exchangeSpotifyCode(code);
  } catch (error) {
    await clearSpotifyAuthState();
    const spotifyError =
      error instanceof SpotifyAuthError ? error.spotifyError : "unknown";
    const reason =
      spotifyError === "invalid_grant" ? "not_whitelisted" : "token_error";
    return NextResponse.redirect(
      new URL(`/auth-error?reason=${reason}`, request.url),
    );
  }

  if (!tokens.refresh_token) {
    await clearSpotifyAuthState();
    return NextResponse.redirect(
      new URL("/auth-error?reason=token_error", request.url),
    );
  }

  // Verify the token actually works before persisting the session.
  // Non-whitelisted users in dev mode get tokens but Spotify's API rejects them.
  const hasAccess = await verifySpotifyAccess(tokens.access_token);
  if (!hasAccess) {
    await clearSpotifyAuthState();
    return NextResponse.redirect(
      new URL("/auth-error?reason=not_whitelisted", request.url),
    );
  }

  await setSpotifySession({
    accessToken: tokens.access_token,
    refreshToken: tokens.refresh_token,
    expiresIn: tokens.expires_in,
  });
  await clearSpotifyAuthState();

  return NextResponse.redirect(new URL("/dashboard", request.url));
}
