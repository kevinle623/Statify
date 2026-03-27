import Image from "next/image";
import { Play } from "lucide-react";
import { formatDuration } from "@/client/lib/format";
import type { SpotifyTrack } from "@/types/spotify";

export function FeaturedTrack({ track }: { track: SpotifyTrack }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
      <div className="w-full max-w-sm mx-auto lg:max-w-none lg:mx-0 lg:col-span-4 aspect-square bg-surface-container relative group overflow-hidden">
        {track.album.images[0] && (
          <Image
            src={track.album.images[0].url}
            alt={track.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute top-6 left-6 w-12 h-12 bg-primary flex items-center justify-center rounded-full">
          <span className="font-label font-bold text-on-primary text-xl">
            01
          </span>
        </div>
      </div>
      <div className="lg:col-span-8 flex flex-col justify-center">
        <div className="flex items-center gap-3 mb-6">
          <span className="px-2 py-0.5 border border-primary text-primary font-label text-[10px] tracking-widest uppercase">
            Peak Performance
          </span>
        </div>
        <h2 className="text-3xl lg:text-5xl font-black tracking-tighter mb-4 leading-[0.9] font-headline uppercase line-clamp-2">
          {track.name}
        </h2>
        <p className="text-xl lg:text-2xl text-on-surface-variant font-light tracking-tight mb-8">
          {track.artists.map((a) => a.name).join(", ")}
        </p>
        <div className="flex gap-8 lg:gap-12 font-label text-[10px] uppercase tracking-[0.15em] text-on-surface-variant mb-8">
          <div>
            <span className="block text-primary mb-1">Duration</span>
            {formatDuration(track.duration_ms)}
          </div>
          <div>
            <span className="block text-primary mb-1">Album</span>
            {track.album.name}
          </div>
        </div>
        <a
          href={track.external_urls.spotify}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 w-fit"
        >
          <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-primary flex items-center justify-center hover:scale-110 transition-transform shadow-[0_0_30px_rgba(29,185,84,0.3)]">
            <Play className="size-5 lg:size-6 text-on-primary fill-current ml-0.5" />
          </div>
          <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors">
            Play on Spotify
          </span>
        </a>
      </div>
    </div>
  );
}
