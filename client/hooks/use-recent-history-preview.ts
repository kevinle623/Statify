"use client";

import useSWR from "swr";
import type { SpotifyRecentlyPlayedResponse } from "@/types/spotify";
import { fetchRecentlyPlayed } from "@/client/services/history-service";

export function useRecentHistoryPreview(limit = 6) {
  const { data, error, isLoading } = useSWR<SpotifyRecentlyPlayedResponse>(
    ["recent-history-preview", limit],
    () => fetchRecentlyPlayed({ limit }),
    {
      revalidateOnFocus: false,
    },
  );

  return { data: data ?? null, isLoading, error: error?.message ?? null };
}
