"use client";

import useSWR from "swr";
import type { SpotifyCurrentlyPlaying } from "@/types/spotify";
import { fetchCurrentlyPlaying } from "@/client/services/currently-playing-service";

export function useCurrentlyPlaying(
  initialData?: SpotifyCurrentlyPlaying | null,
) {
  const { data, error, isLoading } = useSWR<SpotifyCurrentlyPlaying | null>(
    "currently-playing",
    fetchCurrentlyPlaying,
    {
      fallbackData: initialData,
      refreshInterval: 5_000,
      dedupingInterval: 2_500,
      revalidateOnFocus: false,
    },
  );

  return {
    data: data ?? null,
    isLoading,
    error: error?.message ?? null,
  };
}
