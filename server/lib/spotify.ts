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

/** Seconds before expiry to consider the access token stale */
export const TOKEN_REFRESH_BUFFER_MS = 30_000;

/** Cookie max-age for auth state (10 minutes) */
export const AUTH_STATE_MAX_AGE = 60 * 10;

/** Cookie max-age for refresh token and expiry (30 days) */
export const SESSION_MAX_AGE = 60 * 60 * 24 * 30;

/** Default limits for API queries */
export const DEFAULT_LIMITS = {
  topItems: 20,
  recentlyPlayed: 10,
  history: 24,
} as const;
