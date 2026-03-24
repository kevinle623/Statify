import { steps } from "@/client/components/landing/landing-data";

export function ProcessSection() {
  return (
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
            A three-stage protocol designed to extract maximum value from your
            Spotify metadata without compromising security.
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
  );
}
