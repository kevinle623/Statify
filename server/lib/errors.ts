export class SpotifyApiError extends Error {
  readonly statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = "SpotifyApiError";
    this.statusCode = statusCode;
  }

  get isUnauthorized() {
    return this.statusCode === 401 || this.statusCode === 403;
  }
}

export class SpotifyAuthError extends Error {
  readonly spotifyError: string;

  constructor(message: string, spotifyError: string) {
    super(message);
    this.name = "SpotifyAuthError";
    this.spotifyError = spotifyError;
  }
}
