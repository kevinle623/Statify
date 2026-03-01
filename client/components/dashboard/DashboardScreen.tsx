"use client";

import Image from "next/image";
import Link from "next/link";
import { BarChart3, Globe2, Radio, Sparkles, Waves } from "lucide-react";
import { useCurrentlyPlaying } from "@/client/hooks/use-currently-playing";
import { useProfile } from "@/client/hooks/use-profile";
import { useRecentHistoryPreview } from "@/client/hooks/use-recent-history-preview";
import { useTopItems } from "@/client/hooks/use-top-items";
import { Badge } from "@/client/components/ui/badge";
import { Button } from "@/client/components/ui/button";
import { Card, CardContent } from "@/client/components/ui/card";
import { Skeleton } from "@/client/components/ui/skeleton";
import { formatDuration } from "@/client/lib/format";
import { cn } from "@/client/lib/utils";
import type { SpotifyArtist, SpotifyTrack } from "@/types/spotify";

function DashboardHeaderSkeleton() {
  return (
    <header className="glass-panel overflow-hidden rounded-[32px] p-7">
      <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
        <div>
          <Skeleton className="h-6 w-28" />
          <Skeleton className="mt-5 h-14 w-full max-w-xl" />
          <Skeleton className="mt-4 h-5 w-full max-w-2xl" />
          <div className="mt-6">
            <Skeleton className="h-28 w-full rounded-[24px]" />
          </div>
        </div>
        <div className="grid gap-3">
          <Skeleton className="h-16 w-full rounded-[24px]" />
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
            <Skeleton className="h-16 w-full rounded-[24px]" />
            <Skeleton className="h-16 w-full rounded-[24px]" />
          </div>
          <Skeleton className="h-24 w-full rounded-[28px]" />
        </div>
      </div>
    </header>
  );
}

function DashboardListSkeleton() {
  return (
    <Card className="rounded-[30px]">
      <CardContent className="p-0">
        <div className="mb-5 flex items-center justify-between">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-5 w-20" />
        </div>
        <div className="grid gap-3">
          <Skeleton className="h-20 w-full rounded-[22px]" />
          <Skeleton className="h-20 w-full rounded-[22px]" />
          <Skeleton className="h-20 w-full rounded-[22px]" />
        </div>
      </CardContent>
    </Card>
  );
}

function DashboardSectionState({
  title,
  message,
}: {
  title: string;
  message: string;
}) {
  return (
    <Card className="rounded-[30px]">
      <CardContent className="p-0">
        <div className="mb-5 flex items-center justify-between">
          <span className="text-xs uppercase tracking-[0.18em] text-zinc-400">
            {title}
          </span>
        </div>
        <div className="rounded-[22px] border border-white/10 bg-white/[0.04] px-5 py-6 text-sm text-zinc-400">
          {message}
        </div>
      </CardContent>
    </Card>
  );
}

export function DashboardScreen() {
  const {
    data: profile,
    isLoading: isProfileLoading,
    error: profileError,
  } = useProfile();
  const {
    data: liveCurrentlyPlaying,
    isLoading: isCurrentlyPlayingLoading,
    error: currentlyPlayingError,
  } = useCurrentlyPlaying();
  const {
    data: topArtistsData,
    isLoading: isTopArtistsLoading,
    error: topArtistsError,
  } = useTopItems("artists", "medium_term", 5);
  const {
    data: topTracksData,
    isLoading: isTopTracksLoading,
    error: topTracksError,
  } = useTopItems("tracks", "medium_term", 5);
  const {
    data: recentHistoryData,
    isLoading: isRecentHistoryLoading,
    error: recentHistoryError,
  } = useRecentHistoryPreview(6);

  if (profileError) {
    return (
      <div className="glass-panel rounded-[32px] p-6">
        Failed to load your Spotify data.
      </div>
    );
  }

  const topArtists = (topArtistsData?.items ?? []) as SpotifyArtist[];
  const topTracks = (topTracksData?.items ?? []) as SpotifyTrack[];
  const currentTrack = liveCurrentlyPlaying?.item;
  const currentArtwork = currentTrack?.album.images[0]?.url;
  const profileImage = profile?.images[0]?.url;

  return (
    <section className="grid gap-5">
      {isProfileLoading || !profile ? (
        <DashboardHeaderSkeleton />
      ) : (
        <header className="glass-panel overflow-hidden rounded-[32px] p-7">
          <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
            <div>
              <Badge variant="accent" className="mb-4 w-fit">
                Dashboard
              </Badge>
              <h1 className="max-w-[16ch] text-4xl font-semibold tracking-[-0.06em] text-white md:text-5xl">
                Welcome back, {profile.display_name}.
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-7 text-zinc-300">
                Here is your listening summary, with current playback, favorite
                artists, and repeat-heavy tracks.
              </p>

              <div className="mt-6">
                <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-[linear-gradient(135deg,rgba(56,189,248,0.14),rgba(255,255,255,0.04))] px-5 py-5">
                  <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_center,rgba(125,211,252,0.18),transparent_70%)]" />
                  <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
                    Listening motion
                  </p>
                  <div className="mt-4 flex items-end gap-2">
                    <span className="animate-meter h-8 w-3 rounded-full bg-cyan-200/80" />
                    <span className="animate-meter-delayed h-14 w-3 rounded-full bg-white/70" />
                    <span className="animate-meter-late h-10 w-3 rounded-full bg-emerald-200/70" />
                    <span className="animate-meter h-16 w-3 rounded-full bg-cyan-300/80" />
                    <span className="animate-meter-delayed h-11 w-3 rounded-full bg-white/80" />
                    <span className="animate-meter-late h-7 w-3 rounded-full bg-cyan-100/70" />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-3">
              <div className="flex items-center gap-3 rounded-[24px] border border-white/10 bg-white/[0.05] px-4 py-4">
                <Sparkles className="size-4 text-emerald-200" />
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">
                    Profile
                  </p>
                  <p className="text-sm font-medium text-white">
                    {profile.display_name}
                  </p>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                <div className="flex items-center gap-3 rounded-[24px] border border-white/10 bg-white/[0.05] px-4 py-4">
                  <Radio className="size-4 text-cyan-200" />
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">
                      Current plan
                    </p>
                    <p className="text-sm font-medium text-white">
                      {profile.product}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-[24px] border border-white/10 bg-white/[0.05] px-4 py-4">
                  <Globe2 className="size-4 text-emerald-200" />
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">
                      Country
                    </p>
                    <p className="text-sm font-medium text-white">
                      {profile.country}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-[28px] border border-white/12 bg-white/[0.06] p-4">
                {profileImage ? (
                  <Image
                    src={profileImage}
                    alt={profile.display_name}
                    width={72}
                    height={72}
                    className="rounded-[20px]"
                  />
                ) : (
                  <div className="flex size-[72px] items-center justify-center rounded-[20px] bg-cyan-300/15 text-2xl font-semibold text-cyan-100">
                    {profile.display_name.slice(0, 1)}
                  </div>
                )}
                <div>
                  <strong className="text-lg text-white">
                    {profile.display_name}
                  </strong>
                  <p className="mt-1 text-sm text-zinc-400">
                    {profile.product} plan • {profile.country}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>
      )}

      <div className="grid gap-5">
        <Card className="rounded-[30px] bg-[linear-gradient(135deg,rgba(56,189,248,0.16),rgba(255,255,255,0.04))]">
          <CardContent className="grid gap-6 p-0 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <span className="mb-5 inline-flex text-xs uppercase tracking-[0.18em] text-zinc-400">
                Currently listening
              </span>
              {currentlyPlayingError ? (
                <p className="text-zinc-300">
                  Current playback is unavailable right now.
                </p>
              ) : isCurrentlyPlayingLoading && !liveCurrentlyPlaying ? (
                <div className="flex items-center gap-4">
                  <Skeleton className="size-28 rounded-[24px]" />
                  <div className="min-w-0 flex-1">
                    <Skeleton className="h-7 w-2/3" />
                    <Skeleton className="mt-3 h-4 w-1/2" />
                    <Skeleton className="mt-4 h-4 w-20" />
                  </div>
                </div>
              ) : currentTrack ? (
                <div className="flex items-center gap-4">
                  {currentArtwork ? (
                    <Image
                      src={currentArtwork}
                      alt={currentTrack.album.name}
                      width={112}
                      height={112}
                      className="rounded-[24px] object-cover shadow-[0_18px_40px_rgba(34,211,238,0.18)]"
                    />
                  ) : null}
                  <div>
                    <h2 className="text-2xl font-semibold text-white">
                      {currentTrack.name}
                    </h2>
                    <p className="mt-1 text-sm text-zinc-300">
                      {currentTrack.artists
                        .map((artist) => artist.name)
                        .join(", ")}
                    </p>
                    <small className="mt-3 inline-flex text-sm text-cyan-200">
                      {formatDuration(currentTrack.duration_ms)}
                    </small>
                  </div>
                </div>
              ) : (
                <p className="text-zinc-300">Nothing is currently playing.</p>
              )}
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                {
                  label: "Queue energy",
                  value: currentTrack ? "Active" : "Quiet",
                  kind: "status" as const,
                },
                {
                  label: "Top artist",
                  value: topArtists[0]?.name ?? "No data yet",
                  image: topArtists[0]?.images[0]?.url,
                  fallback: topArtists[0]?.name?.slice(0, 1) ?? "A",
                  kind: "artist" as const,
                  href: "/artists",
                },
                {
                  label: "Top track",
                  value: topTracks[0]?.name ?? "No data yet",
                  image: topTracks[0]?.album.images[0]?.url,
                  fallback: topTracks[0]?.name?.slice(0, 1) ?? "T",
                  kind: "track" as const,
                  href: "/tracks",
                },
              ].map((item) => {
                const content = (
                  <div
                    className={cn(
                      "flex min-h-[92px] items-center rounded-[24px] border border-white/10 bg-white/[0.05] px-4 py-4",
                      item.href &&
                        "transition hover:-translate-y-0.5 hover:border-white/18 hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/50",
                    )}
                  >
                    <div className="w-full">
                      <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
                        {item.label}
                      </p>
                      <div className="mt-3 grid grid-cols-[42px_minmax(0,1fr)] items-center gap-3">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.value}
                            width={42}
                            height={42}
                            className="rounded-[12px] object-cover"
                          />
                        ) : item.kind === "status" ? (
                          <div className="flex h-[42px] w-[42px] items-center justify-center rounded-[12px] bg-cyan-300/12">
                            <Waves className="size-4 text-cyan-200" />
                          </div>
                        ) : (
                          <div className="flex h-[42px] w-[42px] items-center justify-center rounded-[12px] bg-cyan-300/12 text-sm font-semibold text-cyan-100">
                            {item.fallback}
                          </div>
                        )}
                        <p className="line-clamp-2 min-w-0 text-sm font-medium leading-5 text-white">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  </div>
                );

                if (item.href) {
                  return (
                    <Link key={item.label} href={item.href}>
                      {content}
                    </Link>
                  );
                }

                return <div key={item.label}>{content}</div>;
              })}
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-5 xl:grid-cols-2">
          {isTopArtistsLoading ? (
            <DashboardListSkeleton />
          ) : topArtistsError ? (
            <DashboardSectionState
              title="Top artists"
              message="Top artists are unavailable right now."
            />
          ) : (
            <Card className="rounded-[30px]">
              <CardContent className="p-0">
                <div className="mb-5 flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.18em] text-zinc-400">
                    Top artists
                  </span>
                  <BarChart3 className="size-4 text-cyan-200" />
                </div>
                <ol className="grid gap-3">
                  {topArtists.map((artist) => (
                    <li
                      key={artist.id}
                      className="grid grid-cols-[56px_minmax(0,1fr)_auto] items-center gap-4 rounded-[22px] border border-white/10 bg-white/[0.04] px-4 py-4"
                    >
                      {artist.images[0]?.url ? (
                        <Image
                          src={artist.images[0].url}
                          alt={artist.name}
                          width={56}
                          height={56}
                          className="rounded-[16px] object-cover"
                        />
                      ) : (
                        <div className="flex h-14 w-14 items-center justify-center rounded-[16px] bg-cyan-300/14 text-cyan-100">
                          {artist.name.slice(0, 1)}
                        </div>
                      )}
                      <div className="min-w-0">
                        <strong className="text-white">{artist.name}</strong>
                        <p className="mt-1 text-sm text-zinc-400">
                          {artist.genres.slice(0, 2).join(" • ") ||
                            "No genre metadata"}
                        </p>
                      </div>
                      <span className="text-sm text-zinc-400">
                        {artist.popularity}
                      </span>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          )}

          {isTopTracksLoading ? (
            <DashboardListSkeleton />
          ) : topTracksError ? (
            <DashboardSectionState
              title="Top tracks"
              message="Top tracks are unavailable right now."
            />
          ) : (
            <Card className="rounded-[30px]">
              <CardContent className="p-0">
                <div className="mb-5 flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.18em] text-zinc-400">
                    Top tracks
                  </span>
                  <Badge variant="default">Medium term</Badge>
                </div>
                <ol className="grid gap-3">
                  {topTracks.map((track) => (
                    <li
                      key={track.id}
                      className="grid grid-cols-[56px_minmax(0,1fr)_auto] items-center gap-4 rounded-[22px] border border-white/10 bg-white/[0.04] px-4 py-4"
                    >
                      {track.album.images[0]?.url ? (
                        <Image
                          src={track.album.images[0].url}
                          alt={track.name}
                          width={56}
                          height={56}
                          className="rounded-[16px] object-cover"
                        />
                      ) : (
                        <div className="flex h-14 w-14 items-center justify-center rounded-[16px] bg-cyan-300/14 text-cyan-100">
                          {track.name.slice(0, 1)}
                        </div>
                      )}
                      <div className="min-w-0">
                        <strong className="text-white">{track.name}</strong>
                        <p className="mt-1 text-sm text-zinc-400">
                          {track.artists
                            .map((artist) => artist.name)
                            .join(", ")}
                        </p>
                      </div>
                      <span className="text-sm text-zinc-400">
                        {formatDuration(track.duration_ms)}
                      </span>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          )}
        </div>

        {isRecentHistoryLoading ? (
          <DashboardListSkeleton />
        ) : recentHistoryError ? (
          <DashboardSectionState
            title="Recent listening history"
            message="Recent listening history is unavailable right now."
          />
        ) : (
          <Card className="rounded-[30px]">
            <CardContent className="p-0">
              <div className="mb-5 flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.18em] text-zinc-400">
                  Recent listening history
                </span>
                <Button asChild size="sm" variant="secondary">
                  <a href="/history">View history</a>
                </Button>
              </div>
              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {recentHistoryData?.items.map((item, index) => (
                  <div
                    key={`${item.track.id}-${item.played_at}-${index}`}
                    className="grid grid-cols-[56px_minmax(0,1fr)] items-center gap-4 rounded-[22px] border border-white/10 bg-white/[0.04] px-4 py-4"
                  >
                    {item.track.album.images[0]?.url ? (
                      <Image
                        src={item.track.album.images[0].url}
                        alt={item.track.name}
                        width={56}
                        height={56}
                        className="rounded-[16px] object-cover"
                      />
                    ) : (
                      <div className="flex h-14 w-14 items-center justify-center rounded-[16px] bg-cyan-300/14 text-cyan-100">
                        {item.track.name.slice(0, 1)}
                      </div>
                    )}
                    <div className="min-w-0">
                      <strong className="line-clamp-1 text-white">
                        {item.track.name}
                      </strong>
                      <p className="mt-1 line-clamp-1 text-sm text-zinc-400">
                        {item.track.artists
                          .map((artist) => artist.name)
                          .join(", ")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
}
