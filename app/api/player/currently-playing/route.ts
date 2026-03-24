import { NextResponse } from "next/server";
import { withSpotifyAuth } from "@/server/lib/route-handler";
import { getSpotifyCurrentlyPlaying } from "@/server/services/spotify-data-service";

export const GET = withSpotifyAuth(async (accessToken) => {
  const currentlyPlaying = await getSpotifyCurrentlyPlaying(accessToken);
  return NextResponse.json(currentlyPlaying);
}, "Failed to load current playback");
