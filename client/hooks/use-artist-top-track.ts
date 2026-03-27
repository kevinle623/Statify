"use client";

import useSWR from "swr";
import { fetchArtistTopTracks } from "@/client/services/artist-service";
import type { SpotifyTrack } from "@/types/spotify";

export function useArtistTopTrack(artistId: string) {
  const { data, isLoading } = useSWR<{ tracks: SpotifyTrack[] }>(
    ["artist-top-tracks", artistId],
    () => fetchArtistTopTracks(artistId),
    {
      revalidateOnFocus: false,
    },
  );

  return {
    topTrack: data?.tracks?.[0] ?? null,
    isLoading,
  };
}
