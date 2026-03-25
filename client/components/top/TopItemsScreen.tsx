"use client";

import { startTransition, useDeferredValue, useState } from "react";
import { useTopItems } from "@/client/hooks/use-top-items";
import { SPOTIFY_TIME_RANGE_LABELS } from "@/client/lib/spotify";
import type {
  SpotifyArtist,
  SpotifyTimeRange,
  SpotifyTopItemType,
  SpotifyTrack,
} from "@/types/spotify";
import { FeaturedArtist } from "@/client/components/top/FeaturedArtist";
import { FeaturedTrack } from "@/client/components/top/FeaturedTrack";
import { ArtistGrid } from "@/client/components/top/ArtistGrid";
import { TrackTable } from "@/client/components/top/TrackTable";
import { FeaturedSkeleton } from "@/client/components/top/FeaturedSkeleton";
import { GridSkeleton } from "@/client/components/top/GridSkeleton";
import { TimeRangePicker } from "@/client/components/top/TimeRangePicker";

export function TopItemsScreen({ type }: { type: SpotifyTopItemType }) {
  const [timeRange, setTimeRange] = useState<SpotifyTimeRange>("medium_term");
  const deferredTimeRange = useDeferredValue(timeRange);
  const { data, isLoading } = useTopItems(type, deferredTimeRange, 20);

  const items = data?.items ?? [];
  const featured = items[0];
  const remaining = items.slice(1);
  const title = type === "artists" ? "ARTISTS" : "TOP TRACKS";

  return (
    <div className="pt-8 lg:pt-16 px-6 lg:px-12 pb-12">
      {/* Header + Time Range */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-12 lg:mb-16">
        <div>
          <h2 className="text-4xl lg:text-6xl font-extrabold tracking-tighter text-on-surface leading-none font-headline">
            {title}
          </h2>
          <p className="font-label text-xs text-primary mt-4 tracking-[0.2em] uppercase">
            {SPOTIFY_TIME_RANGE_LABELS[timeRange]}
          </p>
        </div>
        <TimeRangePicker
          timeRange={timeRange}
          onTimeRangeChange={(range) =>
            startTransition(() => setTimeRange(range))
          }
        />
      </div>

      {isLoading ? (
        <div className="space-y-16 lg:space-y-20">
          <FeaturedSkeleton type={type} />
          <GridSkeleton type={type} />
        </div>
      ) : (
        <>
          {/* Featured #1 */}
          {featured && (
            <section className="mb-16 lg:mb-20">
              {type === "artists" ? (
                <FeaturedArtist artist={featured as SpotifyArtist} />
              ) : (
                <FeaturedTrack track={featured as SpotifyTrack} />
              )}
            </section>
          )}

          {/* Remaining Items */}
          {type === "artists" ? (
            <ArtistGrid artists={remaining as SpotifyArtist[]} />
          ) : (
            <TrackTable tracks={remaining as SpotifyTrack[]} />
          )}
        </>
      )}
    </div>
  );
}
