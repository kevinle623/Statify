import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { SpotifyArtist } from "@/types/spotify";

export function FeaturedArtist({ artist }: { artist: SpotifyArtist }) {
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
          {/* Main image — vintage film look */}
          <Image
            src={artist.images[0].url}
            alt={artist.name}
            fill
            className="object-cover opacity-60 contrast-[1.1] saturate-[0.6] sepia-[0.15] brightness-[0.9] group-hover:scale-105 transition-all duration-700"
          />
        </>
      )}
      {/* Warm film tint */}
      <div className="absolute inset-0 bg-amber-900/10 mix-blend-overlay pointer-events-none" />
      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.7) 100%)",
        }}
      />
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
        </div>
        <a
          href={artist.external_urls.spotify}
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-primary flex items-center justify-center hover:scale-110 transition-transform shadow-[0_0_30px_rgba(29,185,84,0.3)] flex-shrink-0"
        >
          <ArrowUpRight className="size-6 lg:size-8 text-on-primary" />
        </a>
      </div>
    </div>
  );
}
