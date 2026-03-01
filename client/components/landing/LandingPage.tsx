import Link from "next/link";
import {
  BarChart3,
  Clock3,
  Disc3,
  Headphones,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { LoginButton } from "@/client/components/auth/LoginButton";
import { ThemeToggle } from "@/client/components/theme/ThemeToggle";
import { Badge } from "@/client/components/ui/badge";
import { Button } from "@/client/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/client/components/ui/card";

interface LandingPageProps {
  isAuthenticated: boolean;
}

const benefits = [
  {
    icon: Headphones,
    title: "See your listening personality",
    description:
      "Find the artists, tracks, and moods you actually return to, not just what was trending for a week.",
  },
  {
    icon: Clock3,
    title: "Compare your eras",
    description:
      "Flip between recent favorites, six-month habits, longer-term patterns, and your latest listening history.",
  },
  {
    icon: ShieldCheck,
    title: "Built for repeat visits",
    description:
      "Come back anytime to pick up where you left off, compare phases, and revisit the songs shaping your taste.",
  },
];

const demos = [
  {
    label: "Now playing",
    title: "Catch what is on repeat in real time",
    description:
      "A live panel for your current session, so the dashboard still feels active after the first login.",
  },
  {
    label: "Top artists",
    title: "Surface the names behind your year",
    description:
      "Clean rankings, genres, and quick links make it easy to revisit who shaped your listening.",
  },
  {
    label: "History",
    title: "Scroll back through what you just played",
    description:
      "Recently played history adds recency to your stats so the app feels alive every time you come back.",
  },
];

const faqs = [
  {
    question: "What can Statify show me?",
    answer:
      "Right now it shows your top artists, top tracks, recently played listening history, and what you are currently listening to. The dashboard is built around quick summaries first, then deeper drill-down pages.",
  },
  {
    question: "Does it post anything to Spotify?",
    answer:
      "No. The app currently uses read-only Spotify scopes for profile details, current playback, and top items.",
  },
  {
    question: "Why are there different time ranges?",
    answer:
      "Spotify exposes short-term, medium-term, and long-term listening windows. Statify uses those directly so you can compare your recent phase against your more stable taste.",
  },
  {
    question: "Do I need to reconnect every time?",
    answer:
      "No. After sign-in, the app stores the Spotify session in secure HTTP-only cookies and refreshes access tokens on the services when needed.",
  },
];

export function LandingPage({ isAuthenticated }: LandingPageProps) {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 pb-20 pt-5 sm:px-6 lg:px-8">
      <section className="animate-fade-up relative overflow-hidden rounded-[28px] border border-white/12 bg-white/[0.05] px-3 py-3 shadow-[0_30px_100px_rgba(2,6,23,0.48)] backdrop-blur-2xl sm:rounded-[32px] sm:px-4 sm:py-4">
        <div className="aurora absolute inset-0 opacity-80" />
        <div className="absolute left-6 top-8 h-28 w-28 rounded-full bg-cyan-300/20 blur-3xl" />
        <div className="absolute bottom-4 right-8 h-32 w-32 rounded-full bg-emerald-300/10 blur-3xl" />

        <div className="relative rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] px-4 py-4 sm:rounded-[28px] sm:px-8 sm:py-7">
          <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
            <Link href="/" className="flex min-w-0 items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-2xl border border-cyan-300/25 bg-cyan-300/10 text-cyan-100">
                <Disc3 className="size-4" />
              </div>
              <div className="min-w-0">
                <p className="animate-shimmer truncate bg-[linear-gradient(90deg,#f8fbff,#c4f1ff,#f8fbff)] bg-clip-text text-sm font-semibold tracking-[-0.04em] text-transparent">
                  Statify
                </p>
                <p className="truncate text-xs font-medium tracking-[-0.03em] text-zinc-200">
                  Spotify listening snapshots
                </p>
              </div>
            </Link>
            <div className="hidden items-center gap-2 sm:flex">
              <ThemeToggle />
              <Button asChild size="sm" variant="ghost">
                <a href="#faq">FAQ</a>
              </Button>
              <Button asChild size="sm">
                <a href={isAuthenticated ? "/dashboard" : "/api/auth/login"}>
                  {isAuthenticated ? "Open dashboard" : "Connect Spotify"}
                </a>
              </Button>
            </div>
            <div className="sm:hidden">
              <ThemeToggle />
            </div>
          </div>

          <div className="grid gap-10 px-1 py-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="max-w-2xl">
              <Badge variant="accent" className="mb-5">
                <Sparkles className="size-3.5" />
                Music stats made simple
              </Badge>
              <h1 className="max-w-[14ch] text-[3.25rem] font-semibold leading-[1.08] tracking-[-0.02em] text-white sm:text-[5rem] lg:text-[6.5rem]">
                <span className="animate-shimmer bg-[linear-gradient(90deg,#f8fbff,#c4f1ff,#f8fbff)] bg-clip-text text-transparent">
                  Statify
                </span>
              </h1>
              <p className="mt-5 max-w-2xl text-balance text-base leading-8 text-zinc-300 sm:text-xl">
                Statify turns your Spotify data into a clean snapshot of what
                you have been obsessed with lately, what has stuck over time,
                and what is playing right now.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <LoginButton
                  href={isAuthenticated ? "/dashboard" : "/api/auth/login"}
                  label={isAuthenticated ? "Open dashboard" : "Connect Spotify"}
                />
                <Button asChild size="lg" variant="secondary">
                  <a href="#why-statify">Learn more</a>
                </Button>
              </div>
            </div>

            <div className="relative min-h-[360px] lg:min-h-[420px]" id="demo">
              <Card className="glass-strong surface-outline mx-auto w-full max-w-lg overflow-hidden bg-[linear-gradient(135deg,rgba(10,18,32,0.92),rgba(17,24,39,0.78))] p-0">
                <div className="preview-divider px-5 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <Badge variant="default">Preview</Badge>
                    <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">
                      Your dashboard
                    </p>
                  </div>
                </div>
                <CardContent className="grid gap-4 p-5 sm:p-6">
                  <div className="rounded-[26px] border border-cyan-200/10 bg-[linear-gradient(135deg,rgba(56,189,248,0.18),rgba(14,165,233,0.02))] p-5">
                    <p className="text-xs uppercase tracking-[0.18em] text-cyan-100/70">
                      Now playing
                    </p>
                    <div className="mt-4 flex items-center gap-4">
                      <div className="animate-cover-glow size-16 rounded-2xl bg-[linear-gradient(135deg,#fb7185,#22d3ee)] shadow-[0_10px_35px_rgba(34,211,238,0.28)]" />
                      <div>
                        <p className="text-lg font-semibold text-white">
                          Saturn
                        </p>
                        <p className="text-sm text-zinc-300">SZA</p>
                        <p className="mt-2 text-xs text-zinc-400">
                          Playing right now
                        </p>
                        <div className="mt-3 flex items-center gap-1.5">
                          <span className="animate-meter h-1.5 w-10 origin-left rounded-full bg-cyan-200/80" />
                          <span className="animate-meter-delayed h-1.5 w-6 origin-left rounded-full bg-white/60" />
                          <span className="animate-meter-late h-1.5 w-8 origin-left rounded-full bg-emerald-200/70" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      ["Top artist", "Fred again..", "Genre: electronic"],
                      ["Top track", "Good Luck, Babe!", "6 month favorite"],
                    ].map(([label, title, meta]) => (
                      <div
                        key={label}
                        className="rounded-[24px] border border-white/10 bg-white/[0.05] px-4 py-4"
                      >
                        <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">
                          {label}
                        </p>
                        <p className="mt-2 font-medium text-white">{title}</p>
                        <p className="mt-1 text-sm text-zinc-400">{meta}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            icon: Users,
            value: "Less clutter",
            label: "Dashboard first, deep dives second",
          },
          {
            icon: BarChart3,
            value: "Top songs",
            label: "Fast access to your repeat-heavy picks",
          },
          {
            icon: Headphones,
            value: "Top artists",
            label: "Genre context and direct Spotify links",
          },
          {
            icon: ShieldCheck,
            value: "Secure auth",
            label: "Spotify tokens stay on the services",
          },
        ].map((item) => (
          <Card key={item.label} className="rounded-[26px] bg-white/[0.05]">
            <CardContent className="flex items-center gap-4 p-1">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] text-cyan-200">
                <item.icon className="size-5" />
              </div>
              <div>
                <p className="text-lg font-semibold text-white">{item.value}</p>
                <p className="text-sm leading-6 text-zinc-400">{item.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="grid gap-5" id="why-statify">
        <div className="max-w-2xl">
          <Badge variant="default" className="mb-4 w-fit">
            Why people use it
          </Badge>
          <h2 className="text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">
            A calmer way to understand your listening habits.
          </h2>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {benefits.map((benefit, index) => (
            <Card
              key={benefit.title}
              className="animate-fade-up rounded-[30px] bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0.05))]"
              style={{ animationDelay: `${index * 120}ms` }}
            >
              <CardHeader className="gap-4">
                <div className="flex size-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.08] text-cyan-200">
                  <benefit.icon className="size-5" />
                </div>
                <div>
                  <CardTitle className="text-xl">{benefit.title}</CardTitle>
                  <CardDescription className="mt-2 text-base">
                    {benefit.description}
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section className="grid gap-5">
        <Card className="rounded-[32px] bg-[linear-gradient(160deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))]">
          <CardHeader>
            <Badge variant="default" className="w-fit">
              How it feels
            </Badge>
            <CardTitle className="text-3xl tracking-[-0.04em]">
              A softer, more colorful take on the familiar Next.js product
              style.
            </CardTitle>
            <CardDescription className="max-w-xl text-base">
              The visual system keeps the glass and clarity of a modern SaaS
              app, then adds more color separation and motion so the product
              feels less generic and more alive.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3">
            {[
              [
                "01",
                "Sign in",
                "Connect Spotify and land straight in your personal summary.",
              ],
              [
                "02",
                "Scan the snapshot",
                "See artists, tracks, and your live playback in one place.",
              ],
              [
                "03",
                "Dig deeper",
                "Open dedicated views for the songs and artists behind the trend.",
              ],
            ].map(([step, title, body]) => (
              <div
                key={step}
                className="rounded-[24px] border border-white/10 bg-black/[0.1] p-4"
              >
                <p className="text-sm font-mono text-cyan-200">{step}</p>
                <p className="mt-3 text-lg font-semibold text-white">{title}</p>
                <p className="mt-2 text-sm leading-6 text-zinc-400">{body}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="grid gap-5">
          {demos.map((demo) => (
            <Card key={demo.title} className="rounded-[30px] bg-white/[0.05]">
              <CardHeader>
                <Badge variant="accent" className="w-fit">
                  {demo.label}
                </Badge>
                <CardTitle className="text-2xl tracking-[-0.04em]">
                  {demo.title}
                </CardTitle>
                <CardDescription className="text-base">
                  {demo.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section className="grid gap-5" id="faq">
        <Card className="rounded-[32px] bg-[linear-gradient(150deg,rgba(16,185,129,0.1),rgba(255,255,255,0.04))]">
          <CardHeader>
            <Badge variant="success" className="w-fit">
              FAQ
            </Badge>
            <CardTitle className="text-3xl tracking-[-0.05em]">
              Built for people who just want to understand their taste quickly.
            </CardTitle>
            <CardDescription className="text-base">
              No spreadsheets, no confusing charts, no overbuilt setup flow.
              Just connect Spotify and start exploring what you actually listen
              to.
            </CardDescription>
          </CardHeader>
        </Card>

        <div className="grid gap-4">
          {faqs.map((faq, index) => (
            <details
              key={faq.question}
              className="group rounded-[28px] border border-white/12 bg-white/[0.08] px-6 shadow-[0_18px_40px_rgba(15,23,42,0.08)] transition duration-300 hover:border-white/20 hover:bg-white/[0.1] open:bg-white/[0.12]"
              style={{ animationDelay: `${index * 90}ms` }}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left text-base font-medium text-white marker:hidden">
                <span>{faq.question}</span>
                <span className="text-xl leading-none text-zinc-500 transition duration-300 group-open:rotate-45 group-open:text-cyan-200">
                  +
                </span>
              </summary>
              <div className="grid transition-all duration-300 group-open:grid-rows-[1fr] [grid-template-rows:0fr]">
                <div className="overflow-hidden">
                  <div className="border-t border-white/10 pb-5 pt-4 text-sm leading-7 text-zinc-300">
                    {faq.answer}
                  </div>
                </div>
              </div>
            </details>
          ))}
        </div>
      </section>

      <footer className="pb-2 pt-2 text-center text-sm text-zinc-400">
        Made with ❤️ by Statify team
      </footer>
    </main>
  );
}
