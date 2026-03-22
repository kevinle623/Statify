import { NextRequest, NextResponse } from "next/server";
import {
  clearSpotifyAuthState,
  getSpotifyAuthState,
  setSpotifySession,
} from "@/server/lib/spotify-cookies";
import { exchangeSpotifyCode } from "@/server/services/spotify-auth-service";

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

  const tokens = await exchangeSpotifyCode(code);

  if (!tokens.refresh_token) {
    await clearSpotifyAuthState();
    return NextResponse.redirect(
      new URL("/auth-error?reason=token_error", request.url),
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
