"use client";

import Image from "next/image";
import { Clock3, ExternalLink } from "lucide-react";
import { useRecentlyPlayed } from "@/client/hooks/use-recently-played";
import { Badge } from "@/client/components/ui/badge";
import { Button } from "@/client/components/ui/button";
import { Card } from "@/client/components/ui/card";
import { Skeleton } from "@/client/components/ui/skeleton";

function formatPlayedAt(value: string) {
  const playedAt = new Date(value);
  const diffMs = Date.now() - playedAt.getTime();
  const diffMinutes = Math.round(diffMs / 60_000);
  const diffHours = Math.round(diffMs / 3_600_000);
  const diffDays = Math.round(diffMs / 86_400_000);
  const formatter = new Intl.RelativeTimeFormat(undefined, { numeric: "auto" });

  if (diffMinutes < 1) {
    return "Just now";
  }

  if (diffMinutes < 60) {
    return formatter.format(-diffMinutes, "minute");
  }

  if (diffHours < 24) {
    return formatter.format(-diffHours, "hour");
  }

  if (diffDays < 7) {
    return formatter.format(-diffDays, "day");
  }

  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(playedAt);
}

function getDayLabel(value: string) {
  const date = new Date(value);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const target = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const diffDays = Math.round(
    (today.getTime() - target.getTime()) / 86_400_000,
  );

  if (diffDays === 0) {
    return "Today";
  }

  if (diffDays === 1) {
    return "Yesterday";
  }

  return new Intl.DateTimeFormat(undefined, {
    weekday: "long",
    month: "short",
    day: "numeric",
  }).format(date);
}

function groupByDay(
  items: NonNullable<ReturnType<typeof useRecentlyPlayed>["data"]>["items"],
) {
  const groups = new Map<string, typeof items>();

  items.forEach((item) => {
    const label = getDayLabel(item.played_at);
    groups.set(label, [...(groups.get(label) ?? []), item]);
  });

  return [...groups.entries()];
}

function getSectionId(label: string) {
  return `history-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
}

export function HistoryScreen() {
  const { data, isLoading, isLoadingMore, hasMore, loadMore, error } =
    useRecentlyPlayed();

  if (isLoading) {
    return (
      <section className="grid gap-5">
        <div className="glass-panel rounded-[32px] p-7">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="mt-5 h-14 w-full max-w-xl" />
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <Skeleton className="aspect-[1.1] w-full rounded-[30px]" />
          <Skeleton className="aspect-[1.1] w-full rounded-[30px]" />
          <Skeleton className="aspect-[1.1] w-full rounded-[30px]" />
        </div>
      </section>
    );
  }

  if (error || !data) {
    return (
      <div className="glass-panel rounded-[32px] p-6">
        Failed to load listening history.
      </div>
    );
  }

  if (data.items.length === 0) {
    return (
      <section className="grid gap-5">
        <header className="glass-panel rounded-[32px] p-7">
          <Badge variant="accent" className="mb-4 w-fit">
            History
          </Badge>
          <h1 className="text-4xl font-semibold tracking-[-0.06em] text-white md:text-5xl">
            Your recently played tracks
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-zinc-300">
            Your listening history will appear here once Spotify has recent
            playback to show.
          </p>
        </header>
      </section>
    );
  }

  const groups = groupByDay(data.items);
  const loadedDayLinks = groups.map(([label]) => ({
    label,
    href: `#${getSectionId(label)}`,
  }));

  return (
    <section className="grid gap-5">
      <header className="glass-panel rounded-[32px] p-7">
        <Badge variant="accent" className="mb-4 w-fit">
          History
        </Badge>
        <h1 className="text-4xl font-semibold tracking-[-0.06em] text-white md:text-5xl">
          Your recently played tracks
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-zinc-300">
          A visual feed of the songs you have played most recently on Spotify.
        </p>
        <div className="mt-6 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {loadedDayLinks.map((day) => (
              <Button asChild key={day.label} size="sm" variant="secondary">
                <a href={day.href}>{day.label}</a>
              </Button>
            ))}
          </div>
        </div>
      </header>

      <div className="grid gap-8">
        {groups.map(([label, items]) => (
          <section
            id={getSectionId(label)}
            key={label}
            className="scroll-mt-28 grid gap-4"
          >
            <div className="flex items-center gap-3">
              <Badge variant="default">{label}</Badge>
              <div className="h-px flex-1 bg-white/10" />
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {items.map((item, index) => {
                const artwork = item.track.album.images[0]?.url;

                return (
                  <Card
                    key={`${item.track.id}-${item.played_at}-${index}`}
                    className="group overflow-hidden rounded-[30px] bg-white/[0.05] p-0 transition duration-300 hover:-translate-y-1 hover:bg-white/[0.07]"
                  >
                    <div className="relative aspect-[1.08] overflow-hidden">
                      {artwork ? (
                        <Image
                          src={artwork}
                          alt={item.track.name}
                          fill
                          className="object-cover transition duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-cyan-300/16 text-cyan-100" />
                      )}
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(3,7,18,0.64))]" />
                    </div>
                    <div className="space-y-4 p-5">
                      <div>
                        <h2 className="line-clamp-2 text-lg font-semibold text-white">
                          {item.track.name}
                        </h2>
                        <p className="mt-1 text-sm text-zinc-400">
                          {item.track.artists
                            .map((artist) => artist.name)
                            .join(", ")}
                        </p>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2 text-sm text-zinc-400">
                          <Clock3 className="size-4 text-cyan-200" />
                          {formatPlayedAt(item.played_at)}
                        </div>
                        <Button asChild size="sm" variant="secondary">
                          <a
                            href={item.track.external_urls.spotify}
                            rel="noreferrer"
                            target="_blank"
                          >
                            Open
                            <ExternalLink className="size-4" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      {hasMore ? (
        <div className="flex flex-col items-center gap-4">
          {isLoadingMore ? (
            <div className="grid w-full gap-4 md:grid-cols-2 xl:grid-cols-3">
              <Skeleton className="aspect-[1.08] w-full rounded-[30px]" />
              <Skeleton className="aspect-[1.08] w-full rounded-[30px]" />
              <Skeleton className="aspect-[1.08] w-full rounded-[30px]" />
            </div>
          ) : null}
          <Button
            disabled={isLoadingMore}
            onClick={() => loadMore()}
            variant="secondary"
          >
            {isLoadingMore ? "Loading more..." : "Load more history"}
          </Button>
        </div>
      ) : null}
    </section>
  );
}
