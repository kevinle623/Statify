import { NextResponse } from "next/server";
import { hasSpotifySession } from "@/server/lib/spotify-session";

export async function GET() {
  return NextResponse.json({ authenticated: await hasSpotifySession() });
}
