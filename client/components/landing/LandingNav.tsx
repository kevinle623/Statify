"use client";

const NAV_LINKS = ["features", "process", "pricing", "faq"] as const;

export function LandingNav() {
  return (
    <nav className="hidden md:flex gap-10">
      {NAV_LINKS.map((id) => (
        <button
          key={id}
          className="font-label text-xs uppercase tracking-[0.05em] text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
          onClick={() =>
            document
              .querySelector(`#${id}`)
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          {id}
        </button>
      ))}
    </nav>
  );
}
