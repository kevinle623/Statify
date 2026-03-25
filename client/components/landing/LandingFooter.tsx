import Link from "next/link";

export function LandingFooter() {
  return (
    <footer className="w-full py-8 border-t border-divider bg-background px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="flex items-center gap-8">
        <span className="font-label text-[10px] uppercase tracking-[0.1em] text-on-surface-variant font-bold">
          &copy; 2026 STATIFY ARCHIVE
        </span>
        <div className="flex gap-4">
          <Link
            href="/privacy"
            className="font-label text-[10px] uppercase tracking-[0.1em] text-on-surface-variant hover:text-on-surface transition-colors"
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className="font-label text-[10px] uppercase tracking-[0.1em] text-on-surface-variant hover:text-on-surface transition-colors"
          >
            Terms
          </Link>
          <a
            href="https://developer.spotify.com/documentation/web-api"
            target="_blank"
            rel="noopener noreferrer"
            className="font-label text-[10px] uppercase tracking-[0.1em] text-on-surface-variant hover:text-on-surface transition-colors"
          >
            API
          </a>
        </div>
      </div>
      <div className="flex items-center gap-4 text-on-surface-variant">
        <span className="font-label text-[9px] uppercase tracking-widest">
          System: Active
        </span>
        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
      </div>
    </footer>
  );
}
