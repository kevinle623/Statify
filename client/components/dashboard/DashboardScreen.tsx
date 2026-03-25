"use client";

import { useCurrentlyPlaying } from "@/client/hooks/use-currently-playing";
import { useProfile } from "@/client/hooks/use-profile";
import { useRecentHistoryPreview } from "@/client/hooks/use-recent-history-preview";
import { useTopItems } from "@/client/hooks/use-top-items";
import { Skeleton } from "@/client/components/ui/skeleton";
import type { SpotifyArtist, SpotifyTrack } from "@/types/spotify";
import { NowPlayingSkeleton } from "./NowPlayingSkeleton";
import { StatsSkeleton } from "./StatsSkeleton";
import { NowPlayingHero } from "./NowPlayingHero";
import { QuickStatsRow } from "./QuickStatsRow";
import { RecentListensSection } from "./RecentListensSection";

export function DashboardScreen() {
  const { data: profile, isLoading: profileLoading } = useProfile();
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

  const topArtist = topArtists?.items?.[0] as SpotifyArtist | undefined;
  const topTrack = topTracks?.items?.[0] as SpotifyTrack | undefined;
  const recentItems = recentHistory?.items ?? [];

  return (
    <div className="pt-8 lg:pt-16 px-6 lg:px-12 pb-6 lg:pb-12 space-y-12 lg:space-y-16">
      {/* Welcome + Now Playing Hero */}
      <section>
        {profileLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-10 lg:h-14 w-[36rem] max-w-full" />
            <Skeleton className="h-3 w-96 max-w-full" />
          </div>
        ) : (
          <>
            <h1 className="text-4xl lg:text-6xl font-black font-headline tracking-tighter mb-2 uppercase">
              Welcome back,{" "}
              {profile?.display_name?.split(" ")[0] ?? "Archivist"}.
            </h1>
            <span className="font-label text-xs uppercase tracking-[0.2em] text-primary mt-4 block">
              Here&apos;s what your ears have been telling us
            </span>
          </>
        )}
      </section>

      {cpLoading ? (
        <NowPlayingSkeleton />
      ) : (
        <NowPlayingHero
          currentlyPlaying={
            currentlyPlaying ?? { is_playing: false, item: null }
          }
          hasError={!!cpError}
        />
      )}

      {/* Quick Stats Row */}
      {artistsLoading || tracksLoading ? (
        <StatsSkeleton />
      ) : (
        <QuickStatsRow
          topArtist={topArtist}
          topTrack={topTrack}
          accountProduct={profile?.product}
          accountCountry={profile?.country}
        />
      )}

      {/* Recent Listens */}
      <RecentListensSection
        recentItems={recentItems}
        isLoading={historyLoading}
      />
    </div>
  );
}
