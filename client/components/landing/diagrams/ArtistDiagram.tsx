export function ArtistDiagram() {
  const genres = [
    { label: "POP", pct: 100 },
    { label: "ROCK", pct: 78 },
    { label: "R&B", pct: 61 },
    { label: "ELECTRONIC", pct: 50 },
    { label: "JAZZ", pct: 33 },
  ];
  return (
    <div className="flex flex-col gap-3 w-56">
      {genres.map((g) => (
        <div key={g.label} className="flex items-center gap-3">
          <span className="font-label text-[10px] tracking-widest text-on-surface-variant w-24 text-right shrink-0">
            {g.label}
          </span>
          <div className="flex-1 h-2 bg-white/5 overflow-hidden">
            <div className="h-full bg-primary" style={{ width: `${g.pct}%` }} />
          </div>
          <span className="font-label text-[10px] text-primary w-8 tabular-nums">
            {g.pct}%
          </span>
        </div>
      ))}
    </div>
  );
}
