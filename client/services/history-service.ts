import type { SpotifyRecentlyPlayedResponse } from "@/types/spotify";
import { fetchJson } from "@/client/services/fetcher";

export async function fetchRecentlyPlayed(options?: {
  before?: string | null;
  limit?: number;
}) {
  const searchParams = new URLSearchParams({
    limit: String(options?.limit ?? 24),
  });

  if (options?.before) {
    searchParams.set("before", options.before);
  }

  return fetchJson<SpotifyRecentlyPlayedResponse>(
    `/api/history?${searchParams.toString()}`,
  );
}
