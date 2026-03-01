import type {
  SpotifyArtist,
  SpotifyTimeRange,
  SpotifyTopResponse,
  SpotifyTopItemType,
  SpotifyTrack,
} from "@/types/spotify";
import { fetchJson } from "@/client/services/fetcher";

export async function fetchTopItems(
  type: SpotifyTopItemType,
  timeRange: SpotifyTimeRange,
  limit = 20,
) {
  return fetchJson<SpotifyTopResponse<SpotifyArtist | SpotifyTrack>>(
    `/api/top/${type}?timeRange=${timeRange}&limit=${limit}`,
  );
}
