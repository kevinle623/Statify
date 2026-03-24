import { SpotifyApiError } from "@/server/lib/errors";
import { SPOTIFY_API_BASE_URL } from "@/server/lib/spotify";

export async function spotifyWebApiFetch<T>(
  path: string,
  accessToken: string,
  searchParams?: Record<string, string | number | undefined>,
) {
  const url = new URL(`${SPOTIFY_API_BASE_URL}${path}`);

  Object.entries(searchParams ?? {}).forEach(([key, value]) => {
    if (value !== undefined) {
      url.searchParams.set(key, String(value));
    }
  });

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  if (response.status === 204) {
    return null as T;
  }

  if (!response.ok) {
    const message = await response.text();
    throw new SpotifyApiError(
      `Spotify API request failed: ${message}`,
      response.status,
    );
  }

  return (await response.json()) as T;
}
