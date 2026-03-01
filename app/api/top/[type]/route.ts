import { NextRequest, NextResponse } from "next/server";
import { clearSpotifySession } from "@/server/lib/spotify-cookies";
import { getValidSpotifyAccessToken } from "@/server/lib/spotify-session";
import { getSpotifyTopItems } from "@/server/services/spotify-data-service";
import type { SpotifyTimeRange, SpotifyTopItemType } from "@/types/spotify";

const validTypes: SpotifyTopItemType[] = ["artists", "tracks"];
const validTimeRanges: SpotifyTimeRange[] = [
  "short_term",
  "medium_term",
  "long_term",
];

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ type: string }> },
) {
  try {
    const accessToken = await getValidSpotifyAccessToken();

    if (!accessToken) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { type } = await context.params;
    const timeRange =
      request.nextUrl.searchParams.get("timeRange") ?? "short_term";
    const limitParam = request.nextUrl.searchParams.get("limit");
    const limit = limitParam ? Number(limitParam) : 20;

    if (!validTypes.includes(type as SpotifyTopItemType)) {
      return NextResponse.json(
        { message: "Invalid top item type" },
        { status: 400 },
      );
    }

    if (!validTimeRanges.includes(timeRange as SpotifyTimeRange)) {
      return NextResponse.json(
        { message: "Invalid time range" },
        { status: 400 },
      );
    }

    const narrowedTimeRange = timeRange as SpotifyTimeRange;
    const narrowedType = type as SpotifyTopItemType;
    const response =
      narrowedType === "artists"
        ? await getSpotifyTopItems(
            accessToken,
            "artists",
            narrowedTimeRange,
            limit,
          )
        : await getSpotifyTopItems(
            accessToken,
            "tracks",
            narrowedTimeRange,
            limit,
          );

    return NextResponse.json(response);
  } catch {
    await clearSpotifySession();
    return NextResponse.json(
      { message: "Failed to load top items" },
      { status: 500 },
    );
  }
}
