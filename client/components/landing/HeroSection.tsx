"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LoginButton } from "@/client/components/auth/LoginButton";
import { StatusPulse } from "@/client/components/landing/StatusPulse";
import { Button } from "@/client/components/ui/button";
import {
  motion,
  staggerContainer,
  staggerItem,
  lineExpand,
} from "@/client/components/landing/motion";

export function HeroSection({ isAuthenticated }: { isAuthenticated: boolean }) {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center px-6 lg:px-16 dot-grid overflow-hidden">
      <motion.div
        className="max-w-5xl"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="mb-6 flex items-center gap-4"
          variants={staggerItem}
        >
          <motion.span
            className="h-px w-12 bg-primary origin-left"
            variants={lineExpand}
          />
          <span className="font-label text-xs uppercase tracking-[0.2em] text-primary">
            The Digital Archivist
          </span>
        </motion.div>
        <motion.h1
          className="text-5xl sm:text-7xl lg:text-[7rem] leading-[0.9] font-extrabold tracking-tighter font-headline mb-8 text-on-surface"
          variants={staggerItem}
        >
          STATIFY YOUR
          <br />
          <motion.span
            style={{
              WebkitTextStroke: "2px var(--on-surface)",
              color: "var(--background)",
              paintOrder: "stroke fill",
            }}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            LISTENING.
          </motion.span>
        </motion.h1>
        <motion.p
          className="font-label text-xs lg:text-sm text-on-surface-variant max-w-lg mb-12 tracking-[0.15em] leading-relaxed"
          variants={staggerItem}
        >
          Your listening habits, dissected and displayed. Every track, artist,
          and genre mapped into a living portrait of your taste.
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row items-start sm:items-center gap-8"
          variants={staggerItem}
        >
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
        </motion.div>
      </motion.div>

      {/* Decorative metric */}
      <motion.div
        className="absolute right-16 bottom-16 text-right hidden xl:block"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="font-label text-[10px] uppercase tracking-[0.3em] text-on-surface-variant mb-2">
          System Status
        </div>
        <div className="text-5xl font-extrabold font-headline text-primary">
          OPERATIONAL
        </div>
        <StatusPulse />
      </motion.div>
    </section>
  );
}
