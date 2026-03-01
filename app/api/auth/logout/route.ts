import { NextRequest, NextResponse } from "next/server";
import { clearSpotifySession } from "@/server/lib/spotify-cookies";

export async function POST(request: NextRequest) {
  await clearSpotifySession();

  return NextResponse.json({
    success: true,
    redirectTo: new URL("/", request.url).pathname,
  });
}
