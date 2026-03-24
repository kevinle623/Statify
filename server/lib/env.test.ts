import { describe, expect, it, vi, beforeEach } from "vitest";

describe("getRequiredEnv", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it("throws when a required env var is missing", async () => {
    vi.stubEnv("SPOTIFY_CLIENT_ID", "");
    vi.stubEnv("SPOTIFY_CLIENT_SECRET", "");
    vi.stubEnv("SPOTIFY_REDIRECT_URI", "");

    await expect(() => import("./env")).rejects.toThrow(
      "Missing required environment variable",
    );

    vi.unstubAllEnvs();
  });

  it("reads env vars when they are set", async () => {
    vi.stubEnv("SPOTIFY_CLIENT_ID", "test-id");
    vi.stubEnv("SPOTIFY_CLIENT_SECRET", "test-secret");
    vi.stubEnv(
      "SPOTIFY_REDIRECT_URI",
      "http://127.0.0.1:3000/api/auth/callback",
    );

    const { env } = await import("./env");

    expect(env.spotifyClientId).toBe("test-id");
    expect(env.spotifyClientSecret).toBe("test-secret");
    expect(env.spotifyRedirectUri).toBe(
      "http://127.0.0.1:3000/api/auth/callback",
    );

    vi.unstubAllEnvs();
  });
});
