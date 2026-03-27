import Link from "next/link";
import { Logo } from "@/client/components/ui/logo";

export function ErrorPageFooter() {
  return (
    <footer className="relative z-10 w-full border-t border-divider px-6 lg:px-12 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
      <Logo />
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
    </footer>
  );
}
