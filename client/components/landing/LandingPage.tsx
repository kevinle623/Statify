import Link from "next/link";
import { ArrowRight, Clock, TrendingUp, User } from "lucide-react";
import { LoginButton } from "@/client/components/auth/LoginButton";
import { ThemeToggle } from "@/client/components/theme/ThemeToggle";
import { MobileNav } from "@/client/components/landing/MobileNav";
import { LandingNav } from "@/client/components/landing/LandingNav";
import { StatusPulse } from "@/client/components/landing/StatusPulse";
import { Button } from "@/client/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/client/components/ui/accordion";

const features = [
  {
    icon: TrendingUp,
    title: "Real-time Stats",
    description:
      "Live monitoring of your current stream. Every second processed, every decibel archived as it happens.",
    module: "Module 01 // Live",
  },
  {
    icon: User,
    title: "Artist Insights",
    description:
      "Deep-core analysis of your favorite curators. Discover hidden patterns in genre affinity and release cycle loyalty.",
    module: "Module 02 // Analytics",
  },
  {
    icon: Clock,
    title: "Historical Trends",
    description:
      "Your entire listening history, reconstructed. From your first stream to your latest obsession, a high-fidelity timeline of your sonic evolution.",
    module: "Module 03 // Archive",
  },
];

const steps = [
  {
    number: "01",
    title: "Authorization",
    description:
      "Log in with your Spotify account securely. We never see or store your password.",
  },
  {
    number: "02",
    title: "Ingestion",
    description:
      "Massive-scale data fetching of your play history, saved tracks, and custom playlists.",
  },
  {
    number: "03",
    title: "Visualization",
    description:
      "Rendering of complex data clusters into a readable, editorial-grade interface.",
  },
];

const faqs = [
  {
    id: "security",
    question: "Is my Spotify account secure?",
    answer:
      "Statify only requests 'Read' permissions. We never have access to your password or payment details. Your data is your own.",
  },
  {
    id: "refresh",
    question: "How often does the data refresh?",
    answer:
      "Statify pulls real-time data from the Spotify API. Your dashboard reflects your listening habits with minimal latency.",
  },
  {
    id: "export",
    question: "Can I export my archival data?",
    answer:
      "Export functionality is coming soon. You'll be able to export your historical data as structured files for external analysis.",
  },
];

/* ── Decorative SVG Diagrams for Feature Cards ── */

function RealtimeDiagram() {
  return (
    <svg width="160" height="120" viewBox="0 0 160 120" fill="none">
      {/* Waveform bars */}
      {[0, 16, 32, 48, 64, 80, 96, 112, 128].map((x, i) => {
        const heights = [30, 55, 40, 70, 25, 60, 45, 35, 50];
        const h = heights[i];
        return (
          <rect
            key={x}
            x={x}
            y={60 - h / 2}
            width="8"
            height={h}
            rx="2"
            fill="#1db954"
            opacity={0.15 + i * 0.08}
          />
        );
      })}
      {/* Baseline */}
      <line x1="0" y1="90" x2="140" y2="90" stroke="#474747" strokeWidth="1" />
      {/* Live dot */}
      <circle cx="136" cy="20" r="4" fill="#1db954" />
      <circle
        cx="136"
        cy="20"
        r="7"
        stroke="#1db954"
        strokeWidth="1"
        opacity="0.3"
      />
      <text
        x="118"
        y="12"
        fill="#919191"
        fontSize="8"
        fontFamily="Space Grotesk"
      >
        LIVE
      </text>
    </svg>
  );
}

function ArtistDiagram() {
  const genres = [
    { label: "POP", pct: 100 },
    { label: "ROCK", pct: 78 },
    { label: "R&B", pct: 61 },
    { label: "ELECTRONIC", pct: 50 },
    { label: "JAZZ", pct: 33 },
  ];
  return (
    <div className="flex flex-col gap-3 w-56">
      {genres.map((g) => (
        <div key={g.label} className="flex items-center gap-3">
          <span className="font-label text-[10px] tracking-widest text-on-surface-variant w-24 text-right shrink-0">
            {g.label}
          </span>
          <div className="flex-1 h-2 bg-white/5 overflow-hidden">
            <div className="h-full bg-primary" style={{ width: `${g.pct}%` }} />
          </div>
          <span className="font-label text-[10px] text-primary w-8 tabular-nums">
            {g.pct}%
          </span>
        </div>
      ))}
    </div>
  );
}

function TimelineDiagram() {
  return (
    <svg width="400" height="100" viewBox="0 0 400 100" fill="none">
      {/* Timeline axis */}
      <line x1="20" y1="70" x2="380" y2="70" stroke="#474747" strokeWidth="1" />
      {/* Month markers */}
      {["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG"].map((m, i) => {
        const x = 30 + i * 48;
        return (
          <g key={m}>
            <line
              x1={x}
              y1="67"
              x2={x}
              y2="73"
              stroke="#474747"
              strokeWidth="1"
            />
            <text
              x={x}
              y="85"
              fill="#919191"
              fontSize="7"
              fontFamily="Space Grotesk"
              textAnchor="middle"
            >
              {m}
            </text>
          </g>
        );
      })}
      {/* Area chart path */}
      <path
        d="M30,55 Q78,30 126,42 T222,25 T318,38 T366,20"
        stroke="#1db954"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M30,55 Q78,30 126,42 T222,25 T318,38 T366,20 L366,70 L30,70 Z"
        fill="#1db954"
        fillOpacity="0.06"
      />
      {/* Data dots */}
      {[
        [30, 55],
        [126, 42],
        [222, 25],
        [318, 38],
        [366, 20],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="3" fill="#1db954" />
      ))}
      {/* Label */}
      <text
        x="20"
        y="14"
        fill="#919191"
        fontSize="8"
        fontFamily="Space Grotesk"
      >
        LISTENING ACTIVITY
      </text>
      <text
        x="330"
        y="14"
        fill="#1db954"
        fontSize="8"
        fontFamily="Space Grotesk"
      >
        +24%
      </text>
    </svg>
  );
}

export function LandingPage({ isAuthenticated }: { isAuthenticated: boolean }) {
  return (
    <div className="bg-surface-container-lowest text-on-surface font-body">
      {/* Top Navigation */}
      <header className="fixed top-0 right-0 left-0 flex justify-between items-center px-6 lg:px-12 z-40 bg-background/80 backdrop-blur-md w-full h-16 border-b border-white/5">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tighter text-on-surface font-headline">
            STATIFY
          </span>
          <span className="font-label text-[10px] uppercase tracking-[0.1em] text-on-surface-variant border border-on-surface/15 px-1.5 py-0.5 ml-2 hidden sm:inline-flex">
            v2.0
          </span>
        </div>
        <LandingNav />
        <div className="flex items-center gap-6">
          <ThemeToggle />
          <MobileNav />
        </div>
      </header>

      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex flex-col justify-center px-6 lg:px-16 dot-grid overflow-hidden">
          <div className="max-w-5xl">
            <div className="mb-6 flex items-center gap-4">
              <span className="h-px w-12 bg-primary" />
              <span className="font-label text-xs uppercase tracking-[0.2em] text-primary">
                The Digital Archivist
              </span>
            </div>
            <h1 className="text-5xl sm:text-7xl lg:text-[7rem] leading-[0.9] font-extrabold tracking-tighter font-headline mb-8 text-on-surface">
              STATIFY YOUR
              <br />
              <span
                className="text-transparent"
                style={{
                  WebkitTextStroke: "2px var(--on-surface)",
                  color: "transparent",
                }}
              >
                LISTENING.
              </span>
            </h1>
            <p className="text-lg lg:text-xl text-on-surface-variant max-w-xl mb-12 leading-relaxed">
              A clinical deep-dive into your auditory behavior. We treat your
              data as a gallery exhibit, mapping every frequency and rhythm into
              a living digital archive.
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
              {isAuthenticated ? (
                <Button asChild size="lg">
                  <Link href="/dashboard" className="flex items-center gap-3">
                    Open Dashboard
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              ) : (
                <LoginButton />
              )}
            </div>
          </div>

          {/* Decorative metric */}
          <div className="absolute right-16 bottom-16 text-right hidden xl:block">
            <div className="font-label text-[10px] uppercase tracking-[0.3em] text-on-surface-variant mb-2">
              System Status
            </div>
            <div className="text-5xl font-extrabold font-headline text-primary">
              OPERATIONAL
            </div>
            <StatusPulse />
          </div>
        </section>

        {/* Features Bento Grid */}
        <section
          id="features"
          className="px-6 lg:px-16 py-24 lg:py-32 scroll-mt-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {features.map((feature, i) => (
              <div
                key={feature.title}
                className={`${
                  i === 0
                    ? "lg:col-span-4"
                    : i === 1
                      ? "lg:col-span-8"
                      : "lg:col-span-12"
                } p-8 lg:p-12 bg-surface-container-low ghost-border flex flex-col justify-between min-h-[220px] lg:min-h-[400px] overflow-hidden`}
              >
                <div className="flex flex-col lg:flex-row lg:justify-between gap-8">
                  <div className="min-w-0">
                    <feature.icon className="size-8 text-primary mb-6" />
                    <h3 className="text-2xl font-bold font-headline mb-4 uppercase tracking-tight">
                      {feature.title}
                    </h3>
                    <p className="text-on-surface-variant leading-relaxed max-w-md">
                      {feature.description}
                    </p>
                  </div>
                  {/* Decorative Diagram */}
                  <div className="hidden lg:flex items-center justify-center flex-shrink-0">
                    {i === 0 && <RealtimeDiagram />}
                    {i === 1 && <ArtistDiagram />}
                    {i === 2 && <TimelineDiagram />}
                  </div>
                </div>
                <div className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant/50 mt-8">
                  {feature.module}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section
          id="process"
          className="px-6 lg:px-16 py-24 lg:py-32 border-t border-white/5 scroll-mt-16"
        >
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-20">
            <div className="lg:w-1/3">
              <h2 className="text-4xl lg:text-5xl font-extrabold font-headline tracking-tighter mb-8 text-on-surface">
                THE
                <br />
                PROCESS.
              </h2>
              <p className="text-on-surface-variant leading-relaxed">
                A three-stage protocol designed to extract maximum value from
                your Spotify metadata without compromising security.
              </p>
            </div>
            <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-3 gap-12">
              {steps.map((step) => (
                <div key={step.number} className="relative pt-12">
                  <div className="text-[4rem] font-extrabold font-headline text-on-surface/10 absolute top-0 left-0 leading-none">
                    {step.number}
                  </div>
                  <h4 className="text-lg font-bold font-headline mb-4 uppercase tracking-tight relative z-10">
                    {step.title}
                  </h4>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section
          id="pricing"
          className="px-6 lg:px-16 py-24 lg:py-32 border-t border-white/5 scroll-mt-16"
        >
          <div className="text-center mb-16 lg:mb-20">
            <span className="font-label text-xs uppercase tracking-[0.3em] text-on-surface-variant mb-4 block">
              Access Tiers
            </span>
            <h2 className="text-4xl lg:text-5xl font-extrabold font-headline tracking-tighter uppercase">
              Pricing
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Free Tier */}
            <div className="relative bg-surface-container-low ghost-border p-8 lg:p-10 flex flex-col">
              <div className="flex items-center gap-3 mb-8">
                <span className="font-label text-[10px] uppercase tracking-[0.2em] text-primary border border-primary/30 px-2 py-0.5">
                  Current
                </span>
                <span className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant">
                  Closed Beta
                </span>
              </div>
              <h3 className="text-5xl lg:text-6xl font-black font-headline tracking-tighter mb-2">
                $0
              </h3>
              <p className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant mb-8">
                Free during early access
              </p>
              <ul className="space-y-4 mb-10 flex-1">
                {[
                  "Full dashboard analytics",
                  "Top artists & tracks",
                  "Listening history archive",
                  "Currently playing tracker",
                  "Dark & light themes",
                ].map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-3 text-sm text-on-surface-variant"
                  >
                    <span className="text-primary text-xs">&#9632;</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="ghost-border bg-white/5 text-on-surface-variant py-3 text-xs font-label uppercase tracking-widest text-center cursor-not-allowed">
                Signups Closed
              </div>
            </div>

            {/* Pro Tier */}
            <div className="relative bg-surface-container-low ghost-border p-8 lg:p-10 flex flex-col opacity-60">
              <div className="flex items-center gap-3 mb-8">
                <span className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant border border-white/10 px-2 py-0.5">
                  Upcoming
                </span>
              </div>
              <h3 className="text-5xl lg:text-6xl font-black font-headline tracking-tighter mb-2">
                TBD
              </h3>
              <p className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant mb-8">
                Coming in a future release
              </p>
              <ul className="space-y-4 mb-10 flex-1">
                {[
                  "Everything in Free",
                  "Export data to CSV / JSON",
                  "Extended history beyond 50 tracks",
                  "Genre & mood analytics",
                  "Listening reports & insights",
                ].map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-3 text-sm text-on-surface-variant"
                  >
                    <span className="text-on-surface-variant/50 text-xs">
                      &#9632;
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="ghost-border bg-white/5 text-on-surface-variant/50 py-3 text-xs font-label uppercase tracking-widest text-center cursor-not-allowed">
                Coming Soon
              </div>
            </div>
          </div>

          <p className="text-center mt-12 font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant">
            Early access is invite-only. All features are free during the closed
            beta.
          </p>
        </section>

        {/* FAQ Section */}
        <section
          id="faq"
          className="px-6 lg:px-16 py-24 lg:py-32 bg-surface-container-lowest scroll-mt-16"
        >
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16 lg:mb-20">
              <span className="font-label text-xs uppercase tracking-[0.3em] text-on-surface-variant mb-4 block">
                Information Desk
              </span>
              <h2 className="text-3xl lg:text-4xl font-extrabold font-headline tracking-tight uppercase">
                Common Queries
              </h2>
            </div>
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Final CTA */}
        <section className="px-6 lg:px-16 py-24 lg:py-40 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 dot-grid pointer-events-none" />
          <div className="relative z-10">
            <h2 className="text-4xl lg:text-6xl font-extrabold font-headline tracking-tighter mb-10 max-w-2xl mx-auto">
              READY TO ARCHIVE YOUR JOURNEY?
            </h2>
            {isAuthenticated ? (
              <Button asChild size="lg">
                <Link href="/dashboard">Open Dashboard</Link>
              </Button>
            ) : (
              <LoginButton label="Start Exploration Now" />
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-8 border-t border-white/5 bg-background px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
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
          </div>
        </div>
        <div className="flex items-center gap-4 text-on-surface-variant">
          <span className="font-label text-[9px] uppercase tracking-widest">
            System: Active
          </span>
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        </div>
      </footer>
    </div>
  );
}
