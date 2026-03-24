import Link from "next/link";
import { cookies } from "next/headers";
import { ArrowRight } from "lucide-react";
import { Button } from "@/client/components/ui/button";
import { SPOTIFY_COOKIE_KEYS } from "@/server/lib/spotify";

export default async function NotFound() {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.has(SPOTIFY_COOKIE_KEYS.refreshToken);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 lg:px-16 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary rounded-full blur-[160px]" />
      </div>

      <div className="relative z-10 w-full max-w-7xl flex flex-col md:flex-row items-baseline justify-between gap-12">
        {/* 404 number */}
        <div className="flex flex-col">
          <span className="font-label text-xs uppercase tracking-[0.2em] text-on-surface-variant mb-4">
            Error Code
          </span>
          <h1 className="text-[8rem] md:text-[18rem] font-extrabold leading-none tracking-tighter text-on-surface flex items-start font-headline">
            404
            <span className="text-primary text-4xl mt-12">.</span>
          </h1>
        </div>

        {/* Message & CTA */}
        <div className="flex flex-col items-start md:items-end text-left md:text-right max-w-md">
          <span className="font-label text-xs uppercase tracking-[0.2em] text-primary mb-8">
            System Notification
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-on-surface mb-6 leading-tight font-headline">
            The beat has dropped.
          </h2>
          <p className="text-on-surface-variant text-lg leading-relaxed mb-12">
            The archival record you are looking for has been moved or purged
            from the database. It exists now only in the silence between tracks.
          </p>
          <Button asChild size="lg">
            <Link
              href={isAuthenticated ? "/dashboard" : "/"}
              className="flex items-center gap-3"
            >
              {isAuthenticated ? "RETURN TO DASHBOARD" : "RETURN HOME"}
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <div className="mt-16 flex flex-col items-start md:items-end gap-2">
            <span className="font-label text-[10px] uppercase tracking-[0.1em] text-on-surface-variant">
              Request ID
            </span>
            <span className="font-label text-[10px] uppercase tracking-[0.1em] text-on-surface">
              STF-09X-ARCHIVE-ERR
            </span>
          </div>
        </div>
      </div>

      {/* Bottom branding */}
      <div className="fixed bottom-12 left-6 right-6 lg:left-16 lg:right-16 flex justify-between items-end border-t border-divider pt-8">
        <div className="flex flex-col gap-1">
          <span className="text-xl font-bold tracking-tighter text-on-surface font-headline">
            STATIFY
          </span>
          <span className="font-label text-[10px] uppercase tracking-[0.1em] text-on-surface-variant">
            The Digital Archivist
          </span>
        </div>
        <nav className="flex gap-8">
          <span className="font-label text-[10px] uppercase tracking-[0.1em] text-on-surface-variant">
            Support
          </span>
          <span className="font-label text-[10px] uppercase tracking-[0.1em] text-on-surface-variant">
            API Status
          </span>
        </nav>
      </div>
    </main>
  );
}
