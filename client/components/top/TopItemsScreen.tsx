"use client";

import { startTransition, useDeferredValue, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Disc3 } from "lucide-react";
import { useTopItems } from "@/client/hooks/use-top-items";
import { SPOTIFY_TIME_RANGE_LABELS } from "@/client/lib/spotify";
import type {
  SpotifyArtist,
  SpotifyTimeRange,
  SpotifyTopItemType,
  SpotifyTrack,
} from "@/types/spotify";
import { Badge } from "@/client/components/ui/badge";
import { Button } from "@/client/components/ui/button";
import { Card } from "@/client/components/ui/card";
import { Skeleton } from "@/client/components/ui/skeleton";
import { cn } from "@/client/lib/utils";

const timeRanges: SpotifyTimeRange[] = [
  "short_term",
  "medium_term",
  "long_term",
];

function isTrack(item: SpotifyArtist | SpotifyTrack): item is SpotifyTrack {
  return "album" in item;
}

export function TopItemsScreen({ type }: { type: SpotifyTopItemType }) {
  const [timeRange, setTimeRange] = useState<SpotifyTimeRange>("short_term");
  const deferredTimeRange = useDeferredValue(timeRange);
  const { data, isLoading, error } = useTopItems(type, deferredTimeRange);
  const featuredItem = data?.items[0];

  return (
    <section className="grid gap-5">
      <header className="glass-panel rounded-[32px] p-7">
        <div>
          <Badge variant="accent" className="mb-4 w-fit">
            {type === "artists" ? "Artists" : "Tracks"}
          </Badge>
          <h1 className="text-4xl font-semibold tracking-[-0.06em] text-white md:text-5xl">
            Your top {type}
          </h1>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {timeRanges.map((range) => (
            <Button
              key={range}
              className={cn(
                range === timeRange &&
                  "border-cyan-300/40 bg-cyan-300/14 text-cyan-50 shadow-[0_0_0_1px_rgba(125,211,252,0.25)] hover:bg-cyan-300/18",
              )}
              onClick={() => startTransition(() => setTimeRange(range))}
              type="button"
              variant="secondary"
            >
              {SPOTIFY_TIME_RANGE_LABELS[range]}
            </Button>
          ))}
        </div>
      </header>

      <div className="grid gap-4">
        {isLoading ? (
          <>
            <Skeleton className="h-[420px] w-full rounded-[32px]" />
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <Skeleton className="aspect-[1.15] w-full rounded-[30px]" />
              <Skeleton className="aspect-[1.15] w-full rounded-[30px]" />
              <Skeleton className="aspect-[1.15] w-full rounded-[30px]" />
            </div>
          </>
        ) : null}
        {error ? (
          <div className="glass-panel rounded-[28px] p-6">
            Failed to load data.
          </div>
        ) : null}
        {featuredItem ? (
          <Card
            className="overflow-hidden rounded-[32px] bg-[linear-gradient(135deg,rgba(56,189,248,0.16),rgba(255,255,255,0.05))] p-0 animate-fade-up"
            key={`${type}-${deferredTimeRange}-${featuredItem.id}`}
          >
            <div className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="relative min-h-[280px] overflow-hidden bg-black/20">
                {"album" in featuredItem ? (
                  featuredItem.album.images[0]?.url ? (
                    <Image
                      src={featuredItem.album.images[0].url}
                      alt={featuredItem.name}
                      fill
                      className="object-cover transition duration-700 hover:scale-105"
                    />
                  ) : null
                ) : featuredItem.images[0]?.url ? (
                  <Image
                    src={featuredItem.images[0].url}
                    alt={featuredItem.name}
                    fill
                    className="object-cover transition duration-700 hover:scale-105"
                  />
                ) : null}
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(3,7,18,0.5))]" />
              </div>
              <div className="flex flex-col justify-between p-6">
                <div>
                  <Badge variant="default" className="mb-4 w-fit">
                    Featured • #1
                  </Badge>
                  <h2 className="text-3xl font-semibold tracking-[-0.05em] text-white">
                    {featuredItem.name}
                  </h2>
                  <p className="mt-3 text-base leading-7 text-zinc-300">
                    {"album" in featuredItem
                      ? featuredItem.artists
                          .map((artist) => artist.name)
                          .join(", ")
                      : featuredItem.genres.slice(0, 3).join(" • ") ||
                        "No genre metadata"}
                  </p>
                  <p className="mt-6 text-sm text-zinc-400">
                    {SPOTIFY_TIME_RANGE_LABELS[timeRange]} snapshot
                  </p>
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button asChild>
                    <a
                      href={featuredItem.external_urls.spotify}
                      rel="noreferrer"
                      target="_blank"
                    >
                      Open in Spotify
                      <ArrowUpRight className="size-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ) : null}
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {data?.items.slice(1).map((item, index) => {
            const artwork = isTrack(item)
              ? item.album.images[0]?.url
              : item.images[0]?.url;
            const meta = isTrack(item)
              ? item.artists.map((artist) => artist.name).join(", ")
              : item.genres.slice(0, 2).join(" • ") || "No genre metadata";

            return (
              <Card
                key={item.id}
                className="group overflow-hidden rounded-[30px] bg-white/[0.05] p-0 transition duration-300 hover:-translate-y-1 hover:bg-white/[0.07]"
              >
                <div className="relative aspect-[1.15] overflow-hidden">
                  {artwork ? (
                    <Image
                      src={artwork}
                      alt={item.name}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-cyan-300/16 text-cyan-100">
                      <Disc3 className="size-8" />
                    </div>
                  )}
                  <div
                    className="absolute left-4 top-4 rounded-full border border-white/12 bg-black/25 px-3 py-1 font-mono text-xs backdrop-blur-xl"
                    style={{ color: "#f8fbff" }}
                  >
                    {String(index + 2).padStart(2, "0")}
                  </div>
                </div>
                <div className="space-y-3 p-5">
                  <div className="min-w-0">
                    <h2 className="truncate text-lg font-semibold text-white">
                      {item.name}
                    </h2>
                    <p className="mt-1 text-sm text-zinc-400">{meta}</p>
                  </div>
                  <Button asChild className="w-full" variant="secondary">
                    <a
                      href={item.external_urls.spotify}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Open in Spotify
                      <ArrowUpRight className="size-4" />
                    </a>
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
