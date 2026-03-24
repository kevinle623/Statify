import { NextResponse } from "next/server";
import { withSpotifyAuth } from "@/server/lib/route-handler";
import { DEFAULT_LIMITS } from "@/server/lib/spotify";
import { getSpotifyRecentlyPlayed } from "@/server/services/spotify-data-service";

export const GET = withSpotifyAuth(async (accessToken, request) => {
  const before = request.nextUrl.searchParams.get("before") ?? undefined;
  const limitParam = request.nextUrl.searchParams.get("limit");
  const limit = limitParam ? Number(limitParam) : DEFAULT_LIMITS.history;

  const history = await getSpotifyRecentlyPlayed(accessToken, {
    before,
    limit,
  });
  return NextResponse.json(history);
}, "Failed to load history");
