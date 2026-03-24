import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LoginButton } from "@/client/components/auth/LoginButton";
import { StatusPulse } from "@/client/components/landing/StatusPulse";
import { Button } from "@/client/components/ui/button";

export function HeroSection({ isAuthenticated }: { isAuthenticated: boolean }) {
  return (
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
          A clinical deep-dive into your auditory behavior. We treat your data
          as a gallery exhibit, mapping every frequency and rhythm into a living
          digital archive.
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
  );
}
