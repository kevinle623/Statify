export function RealtimeDiagram() {
  return (
    <svg width="160" height="120" viewBox="0 0 160 120" fill="none">
      {/* Waveform bars */}
      {[0, 16, 32, 48, 64, 80, 96, 112, 128].map((x, i) => {
        const heights = [30, 55, 40, 70, 25, 60, 45, 35, 50];
        const h = heights[i];
        return (
          <rect
            key={x}
            x={x}
            y={60 - h / 2}
            width="8"
            height={h}
            rx="2"
            fill="#1db954"
            opacity={0.15 + i * 0.08}
          />
        );
      })}
      {/* Baseline */}
      <line x1="0" y1="90" x2="140" y2="90" stroke="#474747" strokeWidth="1" />
      {/* Live dot */}
      <circle cx="136" cy="20" r="4" fill="#1db954" />
      <circle
        cx="136"
        cy="20"
        r="7"
        stroke="#1db954"
        strokeWidth="1"
        opacity="0.3"
      />
      <text
        x="118"
        y="12"
        fill="#919191"
        fontSize="8"
        fontFamily="Space Grotesk"
      >
        LIVE
      </text>
    </svg>
  );
}
