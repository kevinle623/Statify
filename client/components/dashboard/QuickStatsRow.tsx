import Image from "next/image";
import Link from "next/link";
import type { SpotifyArtist, SpotifyTrack } from "@/types/spotify";

interface QuickStatsRowProps {
  topArtist: SpotifyArtist | undefined;
  topTrack: SpotifyTrack | undefined;
  accountProduct: string | undefined;
  accountCountry: string | undefined;
}

export function QuickStatsRow({
  topArtist,
  topTrack,
  accountProduct,
  accountCountry,
}: QuickStatsRowProps) {
  return (
    <section
      id="stats"
      className="scroll-mt-20 grid grid-cols-1 md:grid-cols-3 gap-6"
    >
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
              className="rounded-full ghost-border"
            />
          )}
          <div>
            <h3 className="text-lg font-bold font-headline">{topArtist?.name ?? "—"}</h3>
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
          <h3 className="text-lg font-bold font-headline">{topTrack?.name ?? "—"}</h3>
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
            {accountProduct === "premium" ? "PRO" : "FREE"}
          </span>
          <span className="text-[10px] text-on-surface-variant uppercase font-label pb-1">
            {accountCountry ?? "—"}
          </span>
        </div>
      </div>
    </section>
  );
}
