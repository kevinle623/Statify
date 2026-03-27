"use client";

import Image from "next/image";
import { ArrowUpRight, Play } from "lucide-react";
import type { SpotifyArtist } from "@/types/spotify";
import { useArtistTopTrack } from "@/client/hooks/use-artist-top-track";
import { Skeleton } from "@/client/components/ui/skeleton";

export function FeaturedArtist({ artist }: { artist: SpotifyArtist }) {
  const { topTrack, isLoading } = useArtistTopTrack(artist.id);

  return (
    <div className="relative w-full h-[300px] lg:h-[500px] overflow-hidden bg-surface-container-lowest group cursor-pointer">
      {artist.images[0] && (
        <>
          {/* Blurred atmospheric backdrop */}
          <Image
            src={artist.images[0].url}
            alt=""
            fill
            className="object-cover opacity-40 blur-2xl scale-125"
            aria-hidden
          />
          {/* Main image */}
          <Image
            src={artist.images[0].url}
            alt={artist.name}
            fill
            className="object-cover group-hover:scale-105 transition-all duration-700"
          />
        </>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-background/10" />
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
          <h3 className="text-3xl lg:text-5xl font-black tracking-tighter text-on-surface uppercase leading-none font-headline">
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
          {/* Always reserve space for the top track strip to prevent layout shift */}
          <div className="mt-4 lg:mt-5">
            {isLoading ? (
              <div className="inline-flex items-center gap-3 bg-black/40 backdrop-blur-sm ghost-border px-3 py-2 max-w-full overflow-hidden">
                <Skeleton className="w-9 h-9 rounded flex-shrink-0" />
                <div className="flex-1 min-w-0 space-y-1.5">
                  <Skeleton className="h-2 w-14" />
                  <Skeleton className="h-3 w-24 lg:w-36" />
                </div>
                <Skeleton className="w-7 h-7 rounded-full flex-shrink-0 ml-1" />
              </div>
            ) : topTrack ? (
              <a
                href={topTrack.external_urls.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-black/40 backdrop-blur-sm ghost-border px-3 py-2 hover:bg-white/5 transition-colors group/track"
                onClick={(e) => e.stopPropagation()}
              >
                {topTrack.album.images[0] && (
                  <Image
                    src={topTrack.album.images[0].url}
                    alt={topTrack.album.name}
                    width={36}
                    height={36}
                    className="rounded object-cover flex-shrink-0"
                  />
                )}
                <div className="min-w-0">
                  <p className="text-[9px] font-label uppercase tracking-widest text-on-surface-variant">
                    Top Track
                  </p>
                  <p className="text-sm font-semibold text-on-surface truncate max-w-[160px] lg:max-w-[260px]">
                    {topTrack.name}
                  </p>
                </div>
                <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center flex-shrink-0 ml-1 group-hover/track:scale-110 transition-transform shadow-[0_0_16px_rgba(29,185,84,0.4)]">
                  <Play className="size-3.5 text-on-primary fill-current ml-0.5" />
                </div>
              </a>
            ) : null}
          </div>
        </div>
        <a
          href={artist.external_urls.spotify}
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-primary flex items-center justify-center hover:scale-110 transition-transform shadow-[0_0_30px_rgba(29,185,84,0.3)] flex-shrink-0"
          onClick={(e) => e.stopPropagation()}
        >
          <ArrowUpRight className="size-6 lg:size-8 text-on-primary" />
        </a>
      </div>
    </div>
  );
}
