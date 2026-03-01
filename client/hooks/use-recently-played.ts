"use client";

import useSWRInfinite from "swr/infinite";
import type { SpotifyRecentlyPlayedResponse } from "@/types/spotify";
import { fetchRecentlyPlayed } from "@/client/services/history-service";

type RecentlyPlayedKey = readonly ["recently-played", string | null];

export function useRecentlyPlayed() {
  const { data, error, isLoading, isValidating, size, setSize } =
    useSWRInfinite<SpotifyRecentlyPlayedResponse, Error>(
      (pageIndex, previousPageData) => {
        if (
          previousPageData &&
          (!previousPageData.items.length || !previousPageData.cursors?.before)
        ) {
          return null;
        }

        const before =
          pageIndex === 0
            ? null
            : (previousPageData?.cursors?.before ??
              previousPageData?.items.at(-1)?.played_at ??
              null);

        return ["recently-played", before] as RecentlyPlayedKey;
      },
      (key: RecentlyPlayedKey) =>
        fetchRecentlyPlayed({ before: key[1], limit: 24 }),
      {
        revalidateOnFocus: false,
        persistSize: true,
      },
    );

  const pages = data ?? [];
  const items = pages
    .flatMap((page) => page.items)
    .filter(
      (item, index, collection) =>
        collection.findIndex(
          (candidate) =>
            candidate.played_at === item.played_at &&
            candidate.track.id === item.track.id,
        ) === index,
    );
  const lastPage = pages.at(-1);
  const hasMore = Boolean(lastPage?.items.length && lastPage.cursors?.before);
  const isLoadingMore = isValidating && size > pages.length;

  return {
    data: pages.length ? { ...pages[0], items } : null,
    isLoading,
    isLoadingMore,
    hasMore,
    error: error?.message ?? null,
    loadMore: () => setSize((current) => current + 1),
  };
}
