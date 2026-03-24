import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { SpotifyArtist } from "@/types/spotify";

export function ArtistGrid({ artists }: { artists: SpotifyArtist[] }) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-8 lg:gap-y-12 gap-x-8 lg:gap-x-12">
      {artists.map((artist, i) => (
        <a
          key={artist.id}
          href={artist.external_urls.spotify}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-6 group cursor-pointer"
        >
          <div className="relative flex-shrink-0">
            {artist.images[0] && (
              <Image
                src={artist.images[0].url}
                alt={artist.name}
                width={96}
                height={96}
                className="w-24 h-24 object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
              />
            )}
            <span className="absolute -top-3 -left-3 font-label text-xs font-bold bg-background p-1 text-primary">
              {String(i + 2).padStart(2, "0")}
            </span>
          </div>
          <div className="flex-grow min-w-0 border-b border-white/5 pb-4 group-hover:border-primary/30 transition-colors duration-300">
            <div className="flex justify-between items-start mb-1">
              <h4 className="text-lg font-bold truncate text-on-surface group-hover:text-white transition-colors">
                {artist.name}
              </h4>
              <ArrowUpRight className="size-4 text-outline-variant group-hover:text-primary transition-colors flex-shrink-0 ml-2" />
            </div>
            <p className="font-label text-[10px] uppercase tracking-[0.1em] text-on-surface-variant truncate">
              {artist.genres.slice(0, 2).join(" / ") || "No genre metadata"}
            </p>
          </div>
        </a>
      ))}
    </section>
  );
}
