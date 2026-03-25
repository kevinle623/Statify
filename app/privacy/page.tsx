import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Privacy Policy — Statify",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background text-on-surface font-body">
      <header className="border-b border-divider">
        <div className="max-w-3xl mx-auto px-6 py-8 flex items-center gap-4">
          <Link
            href="/dashboard"
            className="text-on-surface-variant hover:text-primary transition-colors"
          >
            <ArrowLeft className="size-5" />
          </Link>
          <div>
            <span className="font-label text-[10px] uppercase tracking-[0.2em] text-primary block mb-1">
              Legal
            </span>
            <h1 className="text-2xl font-bold font-headline tracking-tight uppercase">
              Privacy Policy
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12 space-y-10">
        <section className="space-y-4">
          <p className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant">
            Last Updated — March 2026
          </p>
          <p className="text-on-surface-variant leading-relaxed">
            Statify is an open-source, personal analytics dashboard that
            visualizes your Spotify listening data. Your privacy matters to us.
            This policy explains what data we access, how we use it, and what we
            never do.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-bold font-headline uppercase tracking-tight">
            Data We Access
          </h2>
          <p className="text-on-surface-variant leading-relaxed">
            When you log in with Spotify, we request access to the following
            scopes through Spotify&apos;s OAuth 2.0 authorization:
          </p>
          <ul className="space-y-3 text-on-surface-variant leading-relaxed">
            <li className="flex gap-3">
              <span className="text-primary mt-1.5 text-xs">&#9632;</span>
              <span>
                <strong className="text-on-surface">Profile information</strong>{" "}
                — your display name, profile image, and subscription type.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary mt-1.5 text-xs">&#9632;</span>
              <span>
                <strong className="text-on-surface">Top items</strong> — your
                most-listened artists and tracks across different time ranges.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary mt-1.5 text-xs">&#9632;</span>
              <span>
                <strong className="text-on-surface">Recently played</strong> —
                your listening history (up to the last 50 tracks).
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary mt-1.5 text-xs">&#9632;</span>
              <span>
                <strong className="text-on-surface">Currently playing</strong> —
                the track you&apos;re listening to right now, if any.
              </span>
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-bold font-headline uppercase tracking-tight">
            Data Storage
          </h2>
          <p className="text-on-surface-variant leading-relaxed">
            Statify does not store your Spotify data in any database. All data
            is fetched in real-time from Spotify&apos;s API and displayed
            directly in your browser. Your Spotify access tokens are stored in
            HTTP-only cookies on your device and are never exposed to
            client-side JavaScript.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-bold font-headline uppercase tracking-tight">
            What We Never Do
          </h2>
          <ul className="space-y-3 text-on-surface-variant leading-relaxed">
            <li className="flex gap-3">
              <span className="text-primary mt-1.5 text-xs">&#9632;</span>
              <span>We never sell, share, or monetize your data.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary mt-1.5 text-xs">&#9632;</span>
              <span>We never store your Spotify password.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary mt-1.5 text-xs">&#9632;</span>
              <span>
                We never modify your Spotify account, playlists, or playback.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary mt-1.5 text-xs">&#9632;</span>
              <span>
                We never use tracking pixels or third-party analytics.
              </span>
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-bold font-headline uppercase tracking-tight">
            Revoking Access
          </h2>
          <p className="text-on-surface-variant leading-relaxed">
            You can revoke Statify&apos;s access to your Spotify account at any
            time by visiting{" "}
            <a
              href="https://www.spotify.com/account/apps/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              your Spotify Apps page
            </a>{" "}
            and removing Statify from the list of connected applications.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-bold font-headline uppercase tracking-tight">
            Contact
          </h2>
          <p className="text-on-surface-variant leading-relaxed">
            If you have questions about this policy, please open an issue on the
            project&apos;s GitHub repository.
          </p>
        </section>

        <div className="pt-8 border-t border-divider">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-sm text-on-surface-variant hover:text-primary transition-colors font-label uppercase tracking-widest"
          >
            <ArrowLeft className="size-4" />
            Back to Dashboard
          </Link>
        </div>
      </main>
    </div>
  );
}
