"use client";

import {
  motion,
  staggerContainer,
  staggerItem,
  Reveal,
} from "@/client/components/landing/motion";

export function PricingSection() {
  return (
    <section
      id="pricing"
      className="px-6 lg:px-16 py-24 lg:py-32 border-t border-divider scroll-mt-16"
    >
      <Reveal direction="none" className="text-center mb-16 lg:mb-20">
        <span className="font-label text-xs uppercase tracking-[0.3em] text-on-surface-variant mb-4 block">
          Access Tiers
        </span>
        <h2 className="text-4xl lg:text-5xl font-extrabold font-headline tracking-tighter uppercase">
          Pricing
        </h2>
      </Reveal>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Free Tier */}
        <motion.div
          className="relative bg-surface-container-low ghost-border p-8 lg:p-10 flex flex-col"
          variants={staggerItem}
        >
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
        </motion.div>

        {/* Pro Tier */}
        <motion.div
          className="relative bg-surface-container-low ghost-border p-8 lg:p-10 flex flex-col opacity-60"
          variants={staggerItem}
        >
          <div className="flex items-center gap-3 mb-8">
            <span className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant border border-divider px-2 py-0.5">
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
        </motion.div>
      </motion.div>

      <Reveal delay={0.3} direction="none">
        <p className="text-center mt-12 font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant">
          Early access is invite-only. All features are free during the closed
          beta.
        </p>
      </Reveal>
    </section>
  );
}
