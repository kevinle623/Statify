"use client";

import { features } from "@/client/components/landing/landing-data";
import { RealtimeDiagram } from "@/client/components/landing/diagrams/RealtimeDiagram";
import { ArtistDiagram } from "@/client/components/landing/diagrams/ArtistDiagram";
import { TimelineDiagram } from "@/client/components/landing/diagrams/TimelineDiagram";
import {
  motion,
  staggerContainer,
  staggerItem,
} from "@/client/components/landing/motion";

export function FeaturesSection() {
  return (
    <section
      id="features"
      className="px-6 lg:px-16 py-24 lg:py-32 scroll-mt-16"
    >
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-12 gap-6"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {features.map((feature, i) => (
          <motion.div
            key={feature.title}
            variants={staggerItem}
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
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
