import Link from "next/link";

export function FooterContent() {
  return (
    <>
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
      <div className="inline-flex items-center gap-1.5 text-on-surface-variant">
        <span className="font-label text-[9px] uppercase tracking-widest leading-none">
          System: Active
        </span>
        <div className="size-1.5 shrink-0 rounded-full bg-primary animate-pulse -translate-y-px" />
      </div>
    </>
  );
}
