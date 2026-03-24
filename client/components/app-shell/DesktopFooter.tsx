import Link from "next/link";

export function DesktopFooter() {
  return (
    <footer className="fixed bottom-0 right-0 left-64 h-12 hidden lg:flex justify-between items-center px-12 bg-background border-t border-divider z-40">
      <span className="font-label text-[10px] uppercase tracking-[0.1em] text-on-surface-variant">
        &copy; 2026 STATIFY ARCHIVE
      </span>
      <div className="flex gap-8">
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
        <span className="font-label text-[10px] uppercase tracking-[0.1em] text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer">
          API
        </span>
      </div>
    </footer>
  );
}
