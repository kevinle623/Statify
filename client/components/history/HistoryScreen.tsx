"use client";

import { useRef } from "react";
import Image from "next/image";
import { useRecentlyPlayed } from "@/client/hooks/use-recently-played";
import { Button } from "@/client/components/ui/button";
import { Skeleton } from "@/client/components/ui/skeleton";
import { formatPlayedAt } from "@/client/lib/format";
import { groupByDay, getSectionId } from "@/client/lib/history-utils";

function HistoryContentSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-8 w-20" />
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="flex items-center gap-6 py-4">
          <Skeleton className="w-12 h-12 flex-shrink-0" />
          <div className="flex-grow space-y-2">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-3 w-24" />
          </div>
          <Skeleton className="h-3 w-16" />
        </div>
      ))}
    </div>
  );
}

export function HistoryScreen() {
  const { data, isLoading, isLoadingMore, hasMore, loadMore, error } =
    useRecentlyPlayed();
  const prevCountRef = useRef(0);

  if (isLoading) {
    return (
      <div className="pt-8 lg:pt-16 px-6 lg:px-12 pb-12">
        <div className="mb-12 lg:mb-16">
          <h2 className="text-4xl lg:text-6xl font-extrabold tracking-tighter text-on-surface leading-none font-headline uppercase">
            History
          </h2>
          <p className="font-label text-xs text-primary mt-4 tracking-[0.2em] uppercase">
            Loading sessions...
          </p>
        </div>
        <HistoryContentSkeleton />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="pt-16 px-12 pb-12">
        <div className="bg-surface-container-low ghost-border p-8">
          <p className="text-on-surface-variant">
            Failed to load listening history.
          </p>
        </div>
      </div>
    );
  }

  if (data.items.length === 0) {
    return (
      <div className="pt-8 lg:pt-16 px-6 lg:px-12 pb-12">
        <h2 className="text-4xl lg:text-6xl font-extrabold tracking-tighter text-on-surface leading-none font-headline uppercase">
          History
        </h2>
        <div className="bg-surface-container-low ghost-border p-8 mt-8">
          <p className="text-on-surface-variant">
            Your listening history will appear here once Spotify has recent
            playback to show.
          </p>
        </div>
      </div>
    );
  }

  const animateFrom = prevCountRef.current;
  prevCountRef.current = data.items.length;

  const groups = groupByDay(data.items);
  const dayLinks = groups.map(([label]) => ({
    label,
    href: `#${getSectionId(label)}`,
  }));

  return (
    <div className="pt-8 lg:pt-16 px-6 lg:px-12 pb-12">
      {/* Header + Quick Jump Links */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 mb-12 lg:mb-16 lg:items-end">
        <div>
          <h2 className="text-4xl lg:text-6xl font-extrabold tracking-tighter text-on-surface leading-none font-headline uppercase">
            History
          </h2>
          <p className="font-label text-xs text-primary mt-4 tracking-[0.2em] uppercase">
            {data.items.length} sessions loaded
          </p>
        </div>
        <div className="lg:ml-auto flex gap-4 lg:gap-6 flex-wrap lg:pb-2">
          {dayLinks.map((day) => (
            <button
              key={day.label}
              onClick={() =>
                document
                  .querySelector(day.href)
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors"
            >
              {day.label}
            </button>
          ))}
        </div>
      </div>

      {/* Day Groups */}
      <div className="space-y-12 lg:space-y-20">
        {(() => {
          let globalIndex = 0;
          return groups.map(([label, items]) => (
            <section
              key={label}
              id={getSectionId(label)}
              className="scroll-mt-24 lg:scroll-mt-28"
            >
              <div className="flex items-baseline justify-between mb-6 lg:mb-8 border-b border-divider pb-4">
                <h3 className="text-2xl lg:text-3xl font-bold tracking-tight font-headline uppercase">
                  {label}
                </h3>
                <span className="font-label text-xs text-on-surface-variant uppercase tracking-widest">
                  {items.length} Track{items.length !== 1 ? "s" : ""}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                {items.map((item, index) => {
                  const artwork = item.track.album.images[0]?.url;
                  const isNew = globalIndex >= animateFrom;
                  const newIndex = globalIndex - animateFrom;
                  globalIndex++;

                  return (
                    <a
                      key={`${item.track.id}-${item.played_at}-${index}`}
                      href={item.track.external_urls.spotify}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group flex items-center justify-between py-3 lg:py-4 px-4 lg:px-6 -mx-4 lg:-mx-6 hover:bg-white/5 transition-all ${isNew ? "track-row-animate" : ""}`}
                      style={
                        isNew
                          ? { animationDelay: `${newIndex * 0.05}s` }
                          : undefined
                      }
                    >
                      <div className="flex items-center gap-4 lg:gap-6 min-w-0">
                        <div className="w-12 h-12 bg-surface-container overflow-hidden ghost-border flex-shrink-0">
                          {artwork && (
                            <Image
                              src={artwork}
                              alt={item.track.name}
                              width={48}
                              height={48}
                              className="w-full h-full object-cover transition-all"
                            />
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-on-surface tracking-tight truncate group-hover:text-primary transition-colors">
                            {item.track.name}
                          </p>
                          <p className="text-xs text-on-surface-variant mt-0.5 truncate">
                            {item.track.artists.map((a) => a.name).join(", ")}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6 lg:gap-12 flex-shrink-0">
                        <span className="font-label text-xs text-on-surface-variant group-hover:text-primary transition-colors">
                          {formatPlayedAt(item.played_at)}
                        </span>
                      </div>
                    </a>
                  );
                })}
              </div>
            </section>
          ));
        })()}
      </div>

      {/* Load More Skeleton */}
      {isLoadingMore && (
        <div className="space-y-1 mt-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-4 lg:gap-6 py-3 lg:py-4 px-4 lg:px-6 -mx-4 lg:-mx-6"
            >
              <Skeleton className="w-12 h-12 flex-shrink-0" />
              <div className="flex-grow space-y-2">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-3 w-24" />
              </div>
              <Skeleton className="h-3 w-16" />
            </div>
          ))}
        </div>
      )}

      {/* Load More */}
      {hasMore && !isLoadingMore && (
        <div className="flex justify-center mt-12">
          <Button
            variant="outline"
            onClick={() => loadMore()}
            disabled={isLoadingMore}
          >
            Load More Archive
          </Button>
        </div>
      )}
    </div>
  );
}
