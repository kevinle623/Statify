"use client";

import { startTransition, useDeferredValue, useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useTopItems } from "@/client/hooks/use-top-items";
import { SPOTIFY_TIME_RANGE_LABELS } from "@/client/lib/spotify";
import { formatDuration } from "@/client/lib/format";
import type {
  SpotifyArtist,
  SpotifyTimeRange,
  SpotifyTopItemType,
  SpotifyTrack,
} from "@/types/spotify";
import { Skeleton } from "@/client/components/ui/skeleton";
import { cn } from "@/client/lib/utils";

const timeRanges: SpotifyTimeRange[] = [
  "short_term",
  "medium_term",
  "long_term",
];

const TIME_RANGE_SHORT_LABELS: Record<SpotifyTimeRange, string> = {
  short_term: "4 Weeks",
  medium_term: "6 Months",
  long_term: "All Time",
};

function FeaturedSkeleton() {
  return (
    <div className="relative w-full h-[300px] lg:h-[500px] bg-surface-container-low ghost-border overflow-hidden">
      <Skeleton className="w-full h-full" />
    </div>
  );
}

function GridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-8 lg:gap-y-12 gap-x-8 lg:gap-x-12">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="flex items-center gap-6">
          <Skeleton className="w-24 h-24 flex-shrink-0" />
          <div className="flex-grow space-y-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function TopItemsScreen({ type }: { type: SpotifyTopItemType }) {
  const [timeRange, setTimeRange] = useState<SpotifyTimeRange>("medium_term");
  const deferredTimeRange = useDeferredValue(timeRange);
  const { data, isLoading } = useTopItems(type, deferredTimeRange, 20);

  const items = data?.items ?? [];
  const featured = items[0];
  const remaining = items.slice(1);
  const title = type === "artists" ? "ARTISTS" : "TOP TRACKS";

  return (
    <div className="pt-8 lg:pt-16 px-6 lg:px-12 pb-12 max-w-7xl mx-auto">
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
        <div className="flex bg-surface-container-low p-1 ghost-border">
          {timeRanges.map((range) => (
            <button
              key={range}
              className={cn(
                "px-4 lg:px-6 py-2 text-[10px] font-label tracking-widest uppercase transition-all",
                timeRange === range
                  ? "bg-primary text-on-primary"
                  : "text-on-surface-variant hover:text-on-surface",
              )}
              onClick={() => startTransition(() => setTimeRange(range))}
            >
              {TIME_RANGE_SHORT_LABELS[range]}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-16 lg:space-y-20">
          <FeaturedSkeleton />
          <GridSkeleton />
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
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-8 lg:gap-y-12 gap-x-8 lg:gap-x-12">
              {remaining.map((item, i) => {
                const artist = item as SpotifyArtist;
                return (
                  <a
                    key={artist.id}
                    href={artist.external_urls.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-6 group cursor-pointer"
                  >
                    <div className="relative flex-shrink-0">
                      {artist.images[0] && (
                        <Image
                          src={artist.images[0].url}
                          alt={artist.name}
                          width={96}
                          height={96}
                          className="w-24 h-24 object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                        />
                      )}
                      <span className="absolute -top-3 -left-3 font-label text-xs font-bold bg-background p-1 text-primary">
                        {String(i + 2).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="flex-grow min-w-0 border-b border-white/5 pb-4 group-hover:border-primary/30 transition-colors duration-300">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="text-lg font-bold truncate text-on-surface group-hover:text-white transition-colors">
                          {artist.name}
                        </h4>
                        <ArrowUpRight className="size-4 text-outline-variant group-hover:text-primary transition-colors flex-shrink-0 ml-2" />
                      </div>
                      <p className="font-label text-[10px] uppercase tracking-[0.1em] text-on-surface-variant truncate">
                        {artist.genres.slice(0, 2).join(" / ") ||
                          "No genre metadata"}
                      </p>
                    </div>
                  </a>
                );
              })}
            </section>
          ) : (
            <section className="space-y-2">
              {/* Table Header */}
              <div className="hidden lg:grid grid-cols-12 px-6 py-4 font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant border-b border-white/5">
                <div className="col-span-1">Rank</div>
                <div className="col-span-6">Track Detail</div>
                <div className="col-span-3">Album</div>
                <div className="col-span-2 text-right">Time</div>
              </div>
              {remaining.map((item, i) => {
                const track = item as SpotifyTrack;
                return (
                  <a
                    key={track.id}
                    href={track.external_urls.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="grid grid-cols-12 items-center px-4 lg:px-6 py-4 group transition-all duration-300 cursor-pointer hover:bg-white/5 track-row-animate"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    <div className="col-span-2 lg:col-span-1 font-label text-sm text-on-surface-variant group-hover:text-primary transition-colors">
                      {String(i + 2).padStart(2, "0")}
                    </div>
                    <div className="col-span-10 lg:col-span-6 flex items-center gap-4 lg:gap-6">
                      {track.album.images[0] && (
                        <div className="w-12 h-12 bg-surface-container overflow-hidden ghost-border relative flex-shrink-0">
                          <Image
                            src={track.album.images[0].url}
                            alt={track.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                          />
                        </div>
                      )}
                      <div className="min-w-0">
                        <h4 className="font-bold text-sm tracking-tight text-on-surface truncate">
                          {track.name}
                        </h4>
                        <p className="text-xs text-on-surface-variant truncate">
                          {track.artists.map((a) => a.name).join(", ")}
                        </p>
                      </div>
                    </div>
                    <div className="hidden lg:block col-span-3 font-label text-[10px] uppercase tracking-widest text-on-surface-variant truncate">
                      {track.album.name}
                    </div>
                    <div className="hidden lg:block col-span-2 text-right font-label text-[10px] text-on-surface-variant">
                      {formatDuration(track.duration_ms)}
                    </div>
                  </a>
                );
              })}
            </section>
          )}
        </>
      )}
    </div>
  );
}

function FeaturedArtist({ artist }: { artist: SpotifyArtist }) {
  return (
    <div className="relative w-full h-[300px] lg:h-[500px] overflow-hidden bg-surface-container-lowest group cursor-pointer">
      {artist.images[0] && (
        <Image
          src={artist.images[0].url}
          alt={artist.name}
          fill
          className="object-cover opacity-60 grayscale group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      <div className="absolute bottom-8 left-8 lg:bottom-12 lg:left-12 flex items-end gap-8 lg:gap-12 w-full pr-16 lg:pr-24">
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-4">
            <span className="font-label text-sm text-primary font-bold">
              #01
            </span>
            <div className="h-px w-12 bg-white/10" />
            <span className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant">
              Current Peak
            </span>
          </div>
          <h3 className="text-3xl lg:text-5xl font-black tracking-tighter text-white uppercase leading-none font-headline">
            {artist.name}
          </h3>
          <div className="mt-4 lg:mt-6 flex flex-wrap gap-2 lg:gap-3">
            {artist.genres.slice(0, 3).map((genre) => (
              <span
                key={genre}
                className="px-3 py-1 text-[10px] font-label tracking-widest uppercase bg-white/5 ghost-border text-on-surface-variant"
              >
                {genre}
              </span>
            ))}
          </div>
        </div>
        <a
          href={artist.external_urls.spotify}
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-primary flex items-center justify-center hover:scale-110 transition-transform shadow-[0_0_30px_rgba(29,185,84,0.3)] flex-shrink-0"
        >
          <ArrowUpRight className="size-6 lg:size-8 text-on-primary" />
        </a>
      </div>
    </div>
  );
}

function FeaturedTrack({ track }: { track: SpotifyTrack }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
      <div className="lg:col-span-5 aspect-square bg-surface-container relative group overflow-hidden">
        {track.album.images[0] && (
          <Image
            src={track.album.images[0].url}
            alt={track.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute top-6 left-6 w-12 h-12 bg-primary flex items-center justify-center rounded-full">
          <span className="font-label font-bold text-on-primary text-xl">
            01
          </span>
        </div>
      </div>
      <div className="lg:col-span-7 flex flex-col justify-center">
        <div className="flex items-center gap-3 mb-6">
          <span className="px-2 py-0.5 border border-primary text-primary font-label text-[10px] tracking-widest uppercase">
            Peak Performance
          </span>
        </div>
        <h2 className="text-3xl lg:text-5xl font-black tracking-tighter mb-4 leading-[0.9] font-headline uppercase line-clamp-2">
          {track.name}
        </h2>
        <p className="text-xl lg:text-2xl text-on-surface-variant font-light tracking-tight mb-8">
          {track.artists.map((a) => a.name).join(", ")}
        </p>
        <div className="flex gap-8 lg:gap-12 font-label text-[10px] uppercase tracking-[0.15em] text-on-surface-variant">
          <div>
            <span className="block text-primary mb-1">Duration</span>
            {formatDuration(track.duration_ms)}
          </div>
          <div>
            <span className="block text-primary mb-1">Album</span>
            {track.album.name}
          </div>
        </div>
      </div>
    </div>
  );
}
