import { NextResponse } from "next/server";
import {
  createSpotifyAuthorizationUrl,
  createSpotifyState,
} from "@/server/services/spotify-auth-service";
import { setSpotifyAuthState } from "@/server/lib/spotify-cookies";

export async function GET() {
  const state = createSpotifyState();
  await setSpotifyAuthState(state);

  return NextResponse.redirect(createSpotifyAuthorizationUrl(state));
}
