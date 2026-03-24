import { NextRequest, NextResponse } from "next/server";
import { clearSpotifySession } from "@/server/lib/spotify-cookies";
import { getValidSpotifyAccessToken } from "@/server/lib/spotify-session";
import { SpotifyApiError } from "@/server/lib/errors";

type RouteContext = { params: Promise<Record<string, string>> };

type AuthenticatedHandler = (
  accessToken: string,
  request: NextRequest,
  context: RouteContext,
) => Promise<NextResponse>;

/**
 * Wraps an API route handler with Spotify auth validation and
 * standardized error handling.
 */
export function withSpotifyAuth(
  handler: AuthenticatedHandler,
  errorMessage: string,
) {
  return async (request: NextRequest, context: RouteContext) => {
    try {
      const accessToken = await getValidSpotifyAccessToken();

      if (!accessToken) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }

      return await handler(accessToken, request, context);
    } catch (error) {
      await clearSpotifySession();

      if (error instanceof SpotifyApiError && error.isUnauthorized) {
        return NextResponse.json(
          { message: "Not whitelisted", code: "not_whitelisted" },
          { status: 403 },
        );
      }

      return NextResponse.json({ message: errorMessage }, { status: 500 });
    }
  };
}
