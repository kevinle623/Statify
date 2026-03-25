"use client";

import Image from "next/image";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { formatDuration } from "@/client/lib/format";
import type { SpotifyCurrentlyPlaying } from "@/types/spotify";

interface NowPlayingHeroProps {
  currentlyPlaying: SpotifyCurrentlyPlaying;
  hasError: boolean;
}

export function NowPlayingHero({
  currentlyPlaying,
  hasError,
}: NowPlayingHeroProps) {
  const nowPlayingTrack = currentlyPlaying.item;

  if (nowPlayingTrack) {
    return (
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
        <div className="lg:col-span-5 aspect-square relative group">
          <div className="absolute inset-0 bg-primary/10 opacity-100 blur-3xl" />
          {nowPlayingTrack.album.images[0] && (
            <Image
              src={nowPlayingTrack.album.images[0].url}
              alt={nowPlayingTrack.name}
              fill
              className="object-cover transition-all duration-700 ghost-border relative z-10"
            />
          )}
        </div>
        <div className="lg:col-span-7 space-y-6 lg:space-y-8 pb-4">
          <div className="space-y-2">
            <span className="font-label text-xs uppercase tracking-[0.2em] text-primary">
              Now Playing
            </span>
            <h2 className="text-3xl lg:text-5xl font-bold tracking-tighter leading-none text-on-surface font-headline line-clamp-2">
              {nowPlayingTrack.name}
            </h2>
            <p className="text-xl lg:text-2xl font-light text-on-surface-variant tracking-wide truncate">
              {nowPlayingTrack.artists.map((a) => a.name).join(", ")}
            </p>
          </div>
          <a
            href={nowPlayingTrack.external_urls.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-label text-[10px] uppercase tracking-widest text-primary hover:text-on-surface transition-colors w-fit"
          >
            Open in Spotify
            <ArrowUpRight className="size-3.5" />
          </a>
          {currentlyPlaying.progress_ms != null && (
            <div className="space-y-3">
              <div className="w-full h-[2px] bg-white/5 relative">
                <div
                  className="absolute top-0 left-0 h-full bg-primary shadow-[0_0_15px_rgba(29,185,84,0.4)] transition-[width] duration-1000 ease-linear"
                  style={{
                    width: `${(currentlyPlaying.progress_ms / nowPlayingTrack.duration_ms) * 100}%`,
                  }}
                />
              </div>
              <div className="flex justify-between font-label text-[10px] tracking-widest text-on-surface-variant">
                <span>{formatDuration(currentlyPlaying.progress_ms)}</span>
                <span>{formatDuration(nowPlayingTrack.duration_ms)}</span>
              </div>
            </div>
          )}
          <div className="flex gap-6 pt-2">
            <div className="space-y-1">
              <span className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant">
                Album
              </span>
              <p className="text-sm text-on-surface">
                {nowPlayingTrack.album.name}
              </p>
            </div>
            <div className="space-y-1">
              <span className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant">
                Duration
              </span>
              <p className="text-sm text-on-surface">
                {formatDuration(nowPlayingTrack.duration_ms)}
              </p>
            </div>
            {nowPlayingTrack.album.release_date && (
              <div className="space-y-1">
                <span className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant">
                  Released
                </span>
                <p className="text-sm text-on-surface">
                  {nowPlayingTrack.album.release_date.slice(0, 4)}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-surface-container-low ghost-border p-8 lg:p-12 flex flex-col items-center text-center py-16 lg:py-24">
      <span className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant mb-6">
        Now Playing
      </span>
      <h2 className="text-3xl lg:text-5xl font-black font-headline tracking-tighter text-on-surface mb-4">
        {hasError ? "SIGNAL LOST." : "IT\u2019S TOO QUIET IN HERE."}
      </h2>
      <p className="text-on-surface-variant text-lg max-w-md leading-relaxed mb-8">
        {hasError
          ? "We can\u2019t reach your playback right now. Check if Spotify is open and try again."
          : "Play something on Spotify and watch this space come alive."}
      </p>
      {!hasError && (
        <a
          href="https://open.spotify.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-primary text-on-primary px-8 py-4 font-headline font-bold text-sm tracking-wide transition-all active:scale-95"
        >
          OPEN SPOTIFY
        </a>
      )}
      <button
        onClick={() =>
          document
            .getElementById("stats")
            ?.scrollIntoView({ behavior: "smooth" })
        }
        className="mt-8 flex flex-col items-center gap-1 text-on-surface-variant/50 hover:text-on-surface-variant transition-colors cursor-pointer"
      >
        <span className="font-label text-[10px] uppercase tracking-widest">
          Explore your stats
        </span>
        <ChevronDown className="size-4 animate-bounce" />
      </button>
    </section>
  );
}
