import Image from "next/image";
import Link from "next/link";
import { formatDuration, formatPlayedAt } from "@/client/lib/format";
import type { SpotifyRecentlyPlayedItem } from "@/types/spotify";
import { RecentSkeleton } from "./RecentSkeleton";

interface RecentListensSectionProps {
  recentItems: SpotifyRecentlyPlayedItem[];
  isLoading: boolean;
}

export function RecentListensSection({
  recentItems,
  isLoading,
}: RecentListensSectionProps) {
  return (
    <section className="space-y-6 lg:space-y-8">
      <div className="flex justify-between items-baseline">
        <h2 className="text-2xl lg:text-3xl font-bold tracking-tighter font-headline uppercase">
          Recently Played
        </h2>
        <Link
          href="/history"
          className="font-label text-[10px] uppercase tracking-widest text-primary hover:underline"
        >
          View Full Archive
        </Link>
      </div>
      {isLoading ? (
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
              className="group flex items-center justify-between p-4 lg:p-6 transition-colors duration-200 hover:bg-white/5 border-t border-divider first:border-t-0 track-row-animate"
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
                    className="ghost-border transition-all flex-shrink-0"
                  />
                )}
                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-on-surface truncate group-hover:text-primary transition-colors font-headline">
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
  );
}
