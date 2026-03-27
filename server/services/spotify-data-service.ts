import { spotifyWebApiFetch } from "@/server/adapters/spotify/web-api-adapter";
import type {
  SpotifyArtist,
  SpotifyArtistTopTracksResponse,
  SpotifyCurrentlyPlaying,
  SpotifyRecentlyPlayedResponse,
  SpotifyTimeRange,
  SpotifyTopItemType,
  SpotifyTopResponse,
  SpotifyTrack,
  SpotifyUserProfile,
} from "@/types/spotify";

export async function getSpotifyProfile(accessToken: string) {
  return spotifyWebApiFetch<SpotifyUserProfile>("/me", accessToken);
}

export async function getSpotifyCurrentlyPlaying(accessToken: string) {
  return spotifyWebApiFetch<SpotifyCurrentlyPlaying | null>(
    "/me/player/currently-playing",
    accessToken,
  );
}

export async function getSpotifyTopItems(
  accessToken: string,
  type: "artists",
  timeRange: SpotifyTimeRange,
  limit?: number,
): Promise<SpotifyTopResponse<SpotifyArtist>>;
export async function getSpotifyTopItems(
  accessToken: string,
  type: "tracks",
  timeRange: SpotifyTimeRange,
  limit?: number,
): Promise<SpotifyTopResponse<SpotifyTrack>>;
export async function getSpotifyTopItems(
  accessToken: string,
  type: SpotifyTopItemType,
  timeRange: SpotifyTimeRange,
  limit = 10,
): Promise<
  SpotifyTopResponse<SpotifyArtist> | SpotifyTopResponse<SpotifyTrack>
> {
  if (type === "artists") {
    return spotifyWebApiFetch<SpotifyTopResponse<SpotifyArtist>>(
      `/me/top/${type}`,
      accessToken,
      {
        time_range: timeRange,
        limit,
      },
    );
  }

  return spotifyWebApiFetch<SpotifyTopResponse<SpotifyTrack>>(
    `/me/top/${type}`,
    accessToken,
    {
      time_range: timeRange,
      limit,
    },
  );
}

export async function getArtistTopTracks(
  accessToken: string,
  artistId: string,
) {
  return spotifyWebApiFetch<SpotifyArtistTopTracksResponse>(
    `/artists/${artistId}/top-tracks`,
    accessToken,
  );
}

export async function getSpotifyRecentlyPlayed(
  accessToken: string,
  options?: {
    limit?: number;
    before?: string;
  },
) {
  return spotifyWebApiFetch<SpotifyRecentlyPlayedResponse>(
    "/me/player/recently-played",
    accessToken,
    {
      limit: options?.limit ?? 10,
      before: options?.before,
    },
  );
}
