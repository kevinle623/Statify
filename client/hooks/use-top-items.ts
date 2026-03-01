"use client";

import useSWR from "swr";
import { fetchTopItems } from "@/client/services/top-items-service";
import type {
  SpotifyArtist,
  SpotifyTimeRange,
  SpotifyTopItemType,
  SpotifyTopResponse,
  SpotifyTrack,
} from "@/types/spotify";

export function useTopItems(
  type: SpotifyTopItemType,
  timeRange: SpotifyTimeRange,
  limit = 20,
) {
  const { data, error, isLoading } = useSWR<
    SpotifyTopResponse<SpotifyArtist | SpotifyTrack>
  >(
    ["top-items", type, timeRange, limit],
    () => fetchTopItems(type, timeRange, limit),
    {
      keepPreviousData: true,
      revalidateOnFocus: false,
    },
  );

  return { data: data ?? null, isLoading, error: error?.message ?? null };
}
