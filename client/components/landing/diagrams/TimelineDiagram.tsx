export function TimelineDiagram() {
  return (
    <svg width="400" height="100" viewBox="0 0 400 100" fill="none">
      {/* Timeline axis */}
      <line x1="20" y1="70" x2="380" y2="70" stroke="#474747" strokeWidth="1" />
      {/* Month markers */}
      {["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG"].map((m, i) => {
        const x = 30 + i * 48;
        return (
          <g key={m}>
            <line
              x1={x}
              y1="67"
              x2={x}
              y2="73"
              stroke="#474747"
              strokeWidth="1"
            />
            <text
              x={x}
              y="85"
              fill="#919191"
              fontSize="7"
              fontFamily="Space Grotesk"
              textAnchor="middle"
            >
              {m}
            </text>
          </g>
        );
      })}
      {/* Area chart path */}
      <path
        d="M30,55 Q78,30 126,42 T222,25 T318,38 T366,20"
        stroke="#1db954"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M30,55 Q78,30 126,42 T222,25 T318,38 T366,20 L366,70 L30,70 Z"
        fill="#1db954"
        fillOpacity="0.06"
      />
      {/* Data dots */}
      {[
        [30, 55],
        [126, 42],
        [222, 25],
        [318, 38],
        [366, 20],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="3" fill="#1db954" />
      ))}
      {/* Label */}
      <text
        x="20"
        y="14"
        fill="#919191"
        fontSize="8"
        fontFamily="Space Grotesk"
      >
        LISTENING ACTIVITY
      </text>
      <text
        x="330"
        y="14"
        fill="#1db954"
        fontSize="8"
        fontFamily="Space Grotesk"
      >
        +24%
      </text>
    </svg>
  );
}
