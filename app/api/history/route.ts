import { NextRequest, NextResponse } from "next/server";
import { clearSpotifySession } from "@/server/lib/spotify-cookies";
import { getValidSpotifyAccessToken } from "@/server/lib/spotify-session";
import { getSpotifyRecentlyPlayed } from "@/server/services/spotify-data-service";

export async function GET(request: NextRequest) {
  try {
    const accessToken = await getValidSpotifyAccessToken();

    if (!accessToken) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const before = request.nextUrl.searchParams.get("before") ?? undefined;
    const limitParam = request.nextUrl.searchParams.get("limit");
    const limit = limitParam ? Number(limitParam) : 24;
    const history = await getSpotifyRecentlyPlayed(accessToken, {
      before,
      limit,
    });
    return NextResponse.json(history);
  } catch {
    await clearSpotifySession();
    return NextResponse.json(
      { message: "Failed to load history" },
      { status: 500 },
    );
  }
}
