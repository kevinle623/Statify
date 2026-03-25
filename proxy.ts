import { NextRequest, NextResponse } from "next/server";
import { SPOTIFY_COOKIE_KEYS } from "@/server/lib/spotify";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAuthedRoute =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/top") ||
    pathname.startsWith("/history");

  const isAuthedApi =
    pathname.startsWith("/api/profile") ||
    pathname.startsWith("/api/player") ||
    pathname.startsWith("/api/history") ||
    pathname.startsWith("/api/top");

  if (isAuthedRoute || isAuthedApi) {
    const refreshToken = request.cookies.get(
      SPOTIFY_COOKIE_KEYS.refreshToken,
    )?.value;

    if (!refreshToken) {
      if (isAuthedApi) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Redirect logged-in users from landing to dashboard
  if (pathname === "/") {
    const refreshToken = request.cookies.get(
      SPOTIFY_COOKIE_KEYS.refreshToken,
    )?.value;

    if (refreshToken) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/dashboard/:path*",
    "/top/:path*",
    "/history/:path*",
    "/api/profile/:path*",
    "/api/player/:path*",
    "/api/history/:path*",
    "/api/top/:path*",
  ],
};
