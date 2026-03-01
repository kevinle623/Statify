export const SPOTIFY_API_BASE_URL = "https://api.spotify.com/v1";
export const SPOTIFY_ACCOUNTS_BASE_URL = "https://accounts.spotify.com";

export const SPOTIFY_COOKIE_KEYS = {
  accessToken: "statify_spotify_access_token",
  refreshToken: "statify_spotify_refresh_token",
  expiresAt: "statify_spotify_expires_at",
  authState: "statify_spotify_auth_state",
} as const;

export const SPOTIFY_SCOPES = [
  "user-top-read",
  "user-read-currently-playing",
  "user-read-private",
  "user-read-recently-played",
] as const;
