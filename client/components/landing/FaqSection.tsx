"use client";

import { faqs } from "@/client/components/landing/landing-data";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/client/components/ui/accordion";
import {
  motion,
  staggerContainer,
  staggerItem,
  Reveal,
} from "@/client/components/landing/motion";

export function FaqSection() {
  return (
    <section
      id="faq"
      className="px-6 lg:px-16 py-24 lg:py-32 bg-surface-container-lowest scroll-mt-16"
    >
      <div className="max-w-3xl mx-auto">
        <Reveal direction="none" className="text-center mb-16 lg:mb-20">
          <span className="font-label text-xs uppercase tracking-[0.3em] text-on-surface-variant mb-4 block">
            Information Desk
          </span>
          <h2 className="text-3xl lg:text-4xl font-extrabold font-headline tracking-tight uppercase">
            Common Queries
          </h2>
        </Reveal>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <Accordion
            type="single"
            collapsible
            className="space-y-4 min-h-[320px]"
          >
            {faqs.map((faq) => (
              <motion.div key={faq.id} variants={staggerItem}>
                <AccordionItem value={faq.id}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
