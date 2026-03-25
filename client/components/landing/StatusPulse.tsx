"use client";

import { useEffect, useState } from "react";

const BAR_COUNT = 12;
const INITIAL_HEIGHTS = Array.from(
  { length: BAR_COUNT },
  (_, i) => 5 + ((i * 7 + 3) % 13),
);

function generateHeights(prev: number[]): number[] {
  return prev.map((h) => {
    const drift = (Math.random() - 0.5) * 6;
    return Math.max(3, Math.min(20, h + drift));
  });
}

export function StatusPulse() {
  const [heights, setHeights] = useState<number[]>(INITIAL_HEIGHTS);

  useEffect(() => {
    const id = setInterval(
      () => setHeights((prev) => generateHeights(prev)),
      800,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex items-center gap-3 mt-4 justify-end">
      <div className="flex items-end gap-1 h-5">
        {heights.map((h, i) => (
          <div
            key={i}
            className="w-[2px] bg-primary/40 rounded-sm"
            style={{
              height: `${h}px`,
              transition: "height 800ms ease-in-out",
            }}
          />
        ))}
      </div>
      <div className="flex items-center gap-2">
        <span className="relative flex size-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
          <span className="relative inline-flex rounded-full size-1.5 bg-primary" />
        </span>
        <span className="font-label text-[9px] uppercase tracking-[0.15em] text-primary/60">
          Live
        </span>
      </div>
    </div>
  );
}
