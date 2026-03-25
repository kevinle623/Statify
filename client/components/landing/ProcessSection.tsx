"use client";

import { steps } from "@/client/components/landing/landing-data";
import {
  motion,
  staggerContainer,
  staggerItem,
  Reveal,
} from "@/client/components/landing/motion";

export function ProcessSection() {
  return (
    <section
      id="process"
      className="px-6 lg:px-16 py-24 lg:py-32 border-t border-divider scroll-mt-16"
    >
      <div className="flex flex-col lg:flex-row gap-16 lg:gap-20">
        <div className="lg:w-1/3">
          <Reveal>
            <h2 className="text-4xl lg:text-5xl font-extrabold font-headline tracking-tighter mb-8 text-on-surface">
              THE
              <br />
              PROCESS.
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-on-surface-variant leading-relaxed">
              A three-stage protocol designed to extract maximum value from your
              Spotify metadata without compromising security.
            </p>
          </Reveal>
        </div>
        <motion.div
          className="lg:w-2/3 grid grid-cols-1 md:grid-cols-3 gap-12"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {steps.map((step) => (
            <motion.div
              key={step.number}
              className="relative pt-12"
              variants={staggerItem}
            >
              <motion.div
                className="text-[4rem] font-extrabold font-headline text-on-surface/10 absolute top-0 left-0 leading-none"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {step.number}
              </motion.div>
              <h4 className="text-lg font-bold font-headline mb-4 uppercase tracking-tight relative z-10">
                {step.title}
              </h4>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
