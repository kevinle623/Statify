import { NextResponse } from "next/server";
import { withSpotifyAuth } from "@/server/lib/route-handler";
import { getArtistTopTracks } from "@/server/services/spotify-data-service";

export const GET = withSpotifyAuth(async (accessToken, _request, context) => {
  const { id } = await context.params;

  if (!id) {
    return NextResponse.json({ message: "Artist ID required" }, { status: 400 });
  }

  const response = await getArtistTopTracks(accessToken, id);
  return NextResponse.json(response);
}, "Failed to load artist top tracks");
