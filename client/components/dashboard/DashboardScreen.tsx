"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useCurrentlyPlaying } from "@/client/hooks/use-currently-playing";
import { useProfile } from "@/client/hooks/use-profile";
import { useRecentHistoryPreview } from "@/client/hooks/use-recent-history-preview";
import { useTopItems } from "@/client/hooks/use-top-items";
import { Skeleton } from "@/client/components/ui/skeleton";
import { formatDuration } from "@/client/lib/format";
import type { SpotifyArtist, SpotifyTrack } from "@/types/spotify";

function NowPlayingSkeleton() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
      <div className="lg:col-span-5">
        <Skeleton className="aspect-square w-full" />
      </div>
      <div className="lg:col-span-7 space-y-6 pb-4">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-16 w-3/4" />
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-1 w-full" />
      </div>
    </section>
  );
}

function StatsSkeleton() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="bg-surface-container-low ghost-border p-8 space-y-6"
        >
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-6 w-32" />
        </div>
      ))}
    </section>
  );
}

function RecentSkeleton() {
  return (
    <div className="bg-surface-container-low ghost-border overflow-hidden">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="flex items-center justify-between p-6 border-t border-white/5 first:border-t-0"
        >
          <div className="flex items-center gap-6">
            <Skeleton className="w-4 h-4" />
            <Skeleton className="w-10 h-10" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
          <Skeleton className="h-3 w-16" />
        </div>
      ))}
    </div>
  );
}

export function DashboardScreen() {
  const { data: profile } = useProfile();
  const {
    data: currentlyPlaying,
    isLoading: cpLoading,
    error: cpError,
  } = useCurrentlyPlaying();
  const { data: topArtists, isLoading: artistsLoading } = useTopItems(
    "artists",
    "medium_term",
    1,
  );
  const { data: topTracks, isLoading: tracksLoading } = useTopItems(
    "tracks",
    "medium_term",
    1,
  );
  const { data: recentHistory, isLoading: historyLoading } =
    useRecentHistoryPreview(4);

  const nowPlayingTrack = currentlyPlaying?.item ?? null;
  const topArtist = topArtists?.items?.[0] as SpotifyArtist | undefined;
  const topTrack = topTracks?.items?.[0] as SpotifyTrack | undefined;
  const recentItems = recentHistory?.items ?? [];

  return (
    <div className="pt-8 lg:pt-16 px-6 lg:px-12 pb-6 lg:pb-12 space-y-12 lg:space-y-16">
      {/* Welcome + Now Playing Hero */}
      <section>
        <h1 className="text-4xl lg:text-6xl font-black font-headline tracking-tighter mb-2 uppercase">
          Welcome back, {profile?.display_name?.split(" ")[0] ?? "Archivist"}.
        </h1>
        <span className="font-label text-[10px] uppercase tracking-[0.2em] text-primary">
          Here&apos;s what your ears have been telling us
        </span>
      </section>

      {cpLoading ? (
        <NowPlayingSkeleton />
      ) : nowPlayingTrack ? (
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          <div className="lg:col-span-5 aspect-square relative group">
            <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-3xl" />
            {nowPlayingTrack.album.images[0] && (
              <Image
                src={nowPlayingTrack.album.images[0].url}
                alt={nowPlayingTrack.name}
                fill
                className="object-cover grayscale brightness-75 hover:grayscale-0 hover:brightness-100 transition-all duration-700 ghost-border relative z-10"
              />
            )}
          </div>
          <div className="lg:col-span-7 space-y-6 lg:space-y-8 pb-4">
            <div className="space-y-2">
              <span className="font-label text-xs uppercase tracking-[0.2em] text-primary">
                Now Playing
              </span>
              <h2 className="text-4xl lg:text-7xl font-bold tracking-tighter leading-none text-on-surface font-headline line-clamp-2">
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
            {currentlyPlaying?.progress_ms != null && (
              <div className="space-y-3">
                <div className="w-full h-[2px] bg-white/5 relative">
                  <div
                    className="absolute top-0 left-0 h-full bg-primary shadow-[0_0_15px_rgba(29,185,84,0.4)]"
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
      ) : (
        <section className="bg-surface-container-low ghost-border p-8 lg:p-12 flex flex-col items-center text-center py-16 lg:py-24">
          <span className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant mb-6">
            Now Playing
          </span>
          <h2 className="text-3xl lg:text-5xl font-black font-headline tracking-tighter text-on-surface mb-4">
            {cpError ? "SIGNAL LOST." : "IT\u2019S TOO QUIET IN HERE."}
          </h2>
          <p className="text-on-surface-variant text-lg max-w-md leading-relaxed mb-8">
            {cpError
              ? "We can\u2019t reach your playback right now. Check if Spotify is open and try again."
              : "Play something on Spotify and watch this space come alive."}
          </p>
          {!cpError && (
            <a
              href="https://open.spotify.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-primary text-on-primary px-8 py-4 font-headline font-bold text-sm tracking-wide transition-all active:scale-95"
            >
              OPEN SPOTIFY
            </a>
          )}
        </section>
      )}

      {/* Quick Stats Row */}
      {artistsLoading || tracksLoading ? (
        <StatsSkeleton />
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Top Artist */}
          <Link
            href="/artists"
            className="bg-surface-container-low ghost-border p-8 space-y-6 hover:bg-surface-container transition-colors"
          >
            <p className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant">
              Primary Influence
            </p>
            <div className="flex items-center gap-4">
              {topArtist?.images?.[0] && (
                <Image
                  src={topArtist.images[0].url}
                  alt={topArtist.name}
                  width={48}
                  height={48}
                  className="rounded-full grayscale ghost-border"
                />
              )}
              <div>
                <h3 className="text-lg font-bold">{topArtist?.name ?? "—"}</h3>
                <p className="text-[10px] text-primary font-label uppercase">
                  {topArtist?.genres?.[0] ?? "Artist"}
                </p>
              </div>
            </div>
          </Link>

          {/* Top Track */}
          <Link
            href="/tracks"
            className="bg-surface-container-low ghost-border p-8 space-y-6 hover:bg-surface-container transition-colors"
          >
            <p className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant">
              Peak Resonance
            </p>
            <div>
              <h3 className="text-lg font-bold">{topTrack?.name ?? "—"}</h3>
              <p className="text-[10px] text-primary font-label uppercase">
                {topTrack?.artists.map((a) => a.name).join(", ") ?? "Track"}
              </p>
            </div>
          </Link>

          {/* Activity */}
          <div className="bg-surface-container-low ghost-border p-8 space-y-6">
            <p className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant">
              Account Status
            </p>
            <div className="flex items-end gap-2">
              <span className="text-4xl font-bold font-label leading-none text-primary">
                {profile?.product === "premium" ? "PRO" : "FREE"}
              </span>
              <span className="text-[10px] text-on-surface-variant uppercase font-label pb-1">
                {profile?.country ?? "—"}
              </span>
            </div>
          </div>
        </section>
      )}

      {/* Recent Listens */}
      <section className="space-y-6 lg:space-y-8">
        <div className="flex justify-between items-end">
          <h2 className="text-2xl lg:text-3xl font-bold tracking-tighter font-headline">
            Temporal Log
          </h2>
          <Link
            href="/history"
            className="font-label text-[10px] uppercase tracking-widest text-primary hover:underline"
          >
            View Full Archive
          </Link>
        </div>
        {historyLoading ? (
          <RecentSkeleton />
        ) : recentItems.length === 0 ? (
          <div className="bg-surface-container-low ghost-border p-8">
            <p className="text-on-surface-variant">
              Your listening history will appear here once Spotify has recent
              playback to show.
            </p>
          </div>
        ) : (
          <div className="bg-surface-container-low ghost-border overflow-hidden">
            {recentItems.map((item, index) => (
              <a
                key={`${item.track.id}-${item.played_at}`}
                href={item.track.external_urls.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-4 lg:p-6 transition-colors duration-200 hover:bg-white/5 border-t border-white/5 first:border-t-0 track-row-animate"
                style={{ animationDelay: `${(index + 1) * 100}ms` }}
              >
                <div className="flex items-center gap-4 lg:gap-6 min-w-0">
                  <span className="font-label text-xs text-outline-variant w-4 hidden sm:block">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {item.track.album.images[0] && (
                    <Image
                      src={item.track.album.images[0].url}
                      alt={item.track.name}
                      width={40}
                      height={40}
                      className="grayscale ghost-border group-hover:grayscale-0 transition-all flex-shrink-0"
                    />
                  )}
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-on-surface truncate group-hover:text-primary transition-colors">
                      {item.track.name}
                    </h4>
                    <p className="text-xs text-on-surface-variant truncate">
                      {item.track.artists.map((a) => a.name).join(", ")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-6 lg:gap-12 flex-shrink-0">
                  <span className="font-label text-[10px] uppercase tracking-tighter text-outline-variant hidden md:block">
                    {formatDuration(item.track.duration_ms)}
                  </span>
                  <span className="font-label text-[10px] uppercase tracking-tighter text-on-surface-variant w-20 lg:w-24 text-right">
                    {formatPlayedAt(item.played_at)}
                  </span>
                </div>
              </a>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function formatPlayedAt(value: string) {
  const diffMs = Date.now() - new Date(value).getTime();
  const diffMinutes = Math.round(diffMs / 60_000);
  const diffHours = Math.round(diffMs / 3_600_000);
  const diffDays = Math.round(diffMs / 86_400_000);

  if (diffMinutes < 1) return "Just now";
  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${diffDays}d ago`;
}
