import Image from "next/image";
import { formatDuration } from "@/client/lib/format";
import type { SpotifyTrack } from "@/types/spotify";

export function TrackTable({ tracks }: { tracks: SpotifyTrack[] }) {
  return (
    <section className="space-y-2">
      {/* Table Header */}
      <div className="hidden lg:grid grid-cols-12 px-6 py-4 font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant border-b border-divider">
        <div className="col-span-1">Rank</div>
        <div className="col-span-6">Track Detail</div>
        <div className="col-span-3">Album</div>
        <div className="col-span-2 text-right">Time</div>
      </div>
      {tracks.map((track, i) => (
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
              <h4 className="font-bold text-sm tracking-tight text-on-surface truncate font-headline">
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
      ))}
    </section>
  );
}
