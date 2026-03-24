function getRequiredEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export const env = {
  spotifyClientId: getRequiredEnv("SPOTIFY_CLIENT_ID"),
  spotifyClientSecret: getRequiredEnv("SPOTIFY_CLIENT_SECRET"),
  spotifyRedirectUri: getRequiredEnv("SPOTIFY_REDIRECT_URI"),
  isProduction: process.env.NODE_ENV === "production",
};
