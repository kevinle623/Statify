import { NextResponse } from "next/server";
import { withSpotifyAuth } from "@/server/lib/route-handler";
import { getSpotifyProfile } from "@/server/services/spotify-data-service";

export const GET = withSpotifyAuth(async (accessToken) => {
  const profile = await getSpotifyProfile(accessToken);
  return NextResponse.json(profile);
}, "Failed to load profile");
