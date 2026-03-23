import { NextResponse } from "next/server";
import { clearSpotifySession } from "@/server/lib/spotify-cookies";
import { getValidSpotifyAccessToken } from "@/server/lib/spotify-session";
import { getSpotifyCurrentlyPlaying } from "@/server/services/spotify-data-service";

export async function GET() {
  try {
    const accessToken = await getValidSpotifyAccessToken();

    if (!accessToken) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const currentlyPlaying = await getSpotifyCurrentlyPlaying(accessToken);
    return NextResponse.json(currentlyPlaying);
  } catch (error) {
    await clearSpotifySession();
    const statusCode = (error as Error & { statusCode?: number }).statusCode;
    if (statusCode === 401 || statusCode === 403) {
      return NextResponse.json(
        { message: "Not whitelisted", code: "not_whitelisted" },
        { status: 403 },
      );
    }
    return NextResponse.json(
      { message: "Failed to load current playback" },
      { status: 500 },
    );
  }
}
