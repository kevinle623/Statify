import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Terms of Service — Statify",
};

export default function TermsPage() {
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
              Terms of Service
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
            By using Statify, you agree to the following terms. Statify is a
            personal project provided as-is for visualizing your Spotify
            listening data.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-bold font-headline uppercase tracking-tight">
            1. Use of Service
          </h2>
          <p className="text-on-surface-variant leading-relaxed">
            Statify is a free, open-source tool that connects to your Spotify
            account to display analytics about your listening habits. You must
            have a valid Spotify account to use the service. You agree to use
            the service only for personal, non-commercial purposes.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-bold font-headline uppercase tracking-tight">
            2. Spotify Integration
          </h2>
          <p className="text-on-surface-variant leading-relaxed">
            Statify accesses your Spotify data through Spotify&apos;s official
            Web API. Your use of Statify is also subject to{" "}
            <a
              href="https://www.spotify.com/legal/end-user-agreement/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Spotify&apos;s Terms of Use
            </a>
            . Statify is not affiliated with, endorsed by, or officially
            connected to Spotify AB.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-bold font-headline uppercase tracking-tight">
            3. Data Handling
          </h2>
          <p className="text-on-surface-variant leading-relaxed">
            We do not store your Spotify data on any server. All data is fetched
            in real-time and displayed in your browser session. Authentication
            tokens are stored as HTTP-only cookies and are automatically cleared
            when you log out. For full details, see our{" "}
            <Link href="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-bold font-headline uppercase tracking-tight">
            4. Availability
          </h2>
          <p className="text-on-surface-variant leading-relaxed">
            Statify is provided on an &quot;as-is&quot; and &quot;as
            available&quot; basis. We make no guarantees that the service will
            be available at all times or that it will be free of errors. We
            reserve the right to modify, suspend, or discontinue the service at
            any time without notice.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-bold font-headline uppercase tracking-tight">
            5. Limitation of Liability
          </h2>
          <p className="text-on-surface-variant leading-relaxed">
            Statify and its contributors shall not be held liable for any
            damages, direct or indirect, arising from the use of this service.
            This includes but is not limited to data loss, service
            interruptions, or issues related to your Spotify account.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-bold font-headline uppercase tracking-tight">
            6. Open Source
          </h2>
          <p className="text-on-surface-variant leading-relaxed">
            Statify is open-source software. You are free to inspect, fork, and
            modify the source code in accordance with the project&apos;s
            license. Contributions are welcome via the project&apos;s GitHub
            repository.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-bold font-headline uppercase tracking-tight">
            7. Changes to Terms
          </h2>
          <p className="text-on-surface-variant leading-relaxed">
            We may update these terms from time to time. Continued use of
            Statify after changes constitutes acceptance of the updated terms.
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
