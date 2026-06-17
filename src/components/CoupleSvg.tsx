// Cute cartoon couple SVG illustration (kid-friendly, age 8-10 style)
export function CoupleSvg({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Cute cartoon couple"
    >
      <defs>
        <radialGradient id="bg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff1f5" />
          <stop offset="100%" stopColor="#ffd6e2" />
        </radialGradient>
        <linearGradient id="ground" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#fcd5ce" />
          <stop offset="100%" stopColor="#f8a5b9" />
        </linearGradient>
      </defs>

      {/* Background */}
      <circle cx="200" cy="200" r="195" fill="url(#bg)" />

      {/* Floating hearts */}
      {[
        [60, 70, 14, "#ff6b9d"],
        [330, 90, 10, "#ff8fab"],
        [340, 250, 16, "#ff4d8d"],
        [50, 280, 12, "#ffb3c6"],
        [200, 40, 12, "#ff6b9d"],
      ].map(([x, y, s, c], i) => (
        <path
          key={i}
          d={`M${x},${y} m0,${+s / 4} a${+s / 2},${+s / 2} 0 0,1 ${+s},0 a${+s / 2},${+s / 2} 0 0,1 ${+s},0 q0,${+s * 0.8} -${+s},${+s * 1.2} q-${+s},-${+s * 0.4} -${+s},-${+s * 1.2} z`}
          fill={c as string}
          opacity="0.85"
        />
      ))}

      {/* Ground */}
      <ellipse cx="200" cy="360" rx="160" ry="20" fill="url(#ground)" opacity="0.6" />

      {/* ===== GIRL (Alisha) - left ===== */}
      {/* Dress */}
      <path d="M120 250 Q105 340 90 360 L195 360 L180 250 Z" fill="#ff5d8f" />
      <path d="M120 250 Q105 340 90 360 L90 360 Q120 350 150 355 L140 250 Z" fill="#ff7da6" />
      {/* Neck */}
      <rect x="140" y="215" width="20" height="20" fill="#ffd9b3" />
      {/* Head */}
      <circle cx="150" cy="190" r="42" fill="#ffd9b3" />
      {/* Hair (long, dark) */}
      <path d="M108 190 Q105 140 150 135 Q200 138 192 195 Q190 170 180 165 Q175 155 150 155 Q125 158 120 175 Q115 190 110 220 Q100 230 108 190 Z" fill="#3a1f1a" />
      <path d="M110 220 Q100 290 120 310 L130 305 Q118 270 122 230 Z" fill="#3a1f1a" />
      {/* Bindi/flower */}
      <circle cx="150" cy="158" r="4" fill="#ff1744" />
      {/* Eyes */}
      <circle cx="138" cy="190" r="3.5" fill="#1a1a1a" />
      <circle cx="164" cy="190" r="3.5" fill="#1a1a1a" />
      <circle cx="139" cy="189" r="1" fill="#fff" />
      <circle cx="165" cy="189" r="1" fill="#fff" />
      {/* Blush */}
      <circle cx="130" cy="202" r="5" fill="#ff8fab" opacity="0.6" />
      <circle cx="170" cy="202" r="5" fill="#ff8fab" opacity="0.6" />
      {/* Smile */}
      <path d="M140 208 Q150 218 162 208" stroke="#a32d4a" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Arm holding hands */}
      <path d="M180 260 Q205 270 215 285" stroke="#ffd9b3" strokeWidth="14" fill="none" strokeLinecap="round" />

      {/* ===== BOY (Israr) - right ===== */}
      {/* Sherwani/suit body */}
      <path d="M250 250 Q265 340 280 360 L210 360 Q220 320 230 250 Z" fill="#3d2b1f" />
      <path d="M238 260 L242 350" stroke="#d4af37" strokeWidth="2" />
      {/* Neck */}
      <rect x="240" y="215" width="20" height="20" fill="#e8b890" />
      {/* Head */}
      <circle cx="250" cy="190" r="40" fill="#e8b890" />
      {/* Hair */}
      <path d="M215 178 Q215 150 250 148 Q288 150 285 180 Q280 165 250 162 Q222 165 215 178 Z" fill="#1a1108" />
      {/* Eyes */}
      <circle cx="240" cy="190" r="3.5" fill="#1a1a1a" />
      <circle cx="262" cy="190" r="3.5" fill="#1a1a1a" />
      <circle cx="241" cy="189" r="1" fill="#fff" />
      <circle cx="263" cy="189" r="1" fill="#fff" />
      {/* Blush */}
      <circle cx="232" cy="203" r="4.5" fill="#ff8fab" opacity="0.5" />
      <circle cx="270" cy="203" r="4.5" fill="#ff8fab" opacity="0.5" />
      {/* Smile */}
      <path d="M240 208 Q250 217 262 208" stroke="#5a2a1a" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Tiny mustache */}
      <path d="M243 205 Q250 207 257 205" stroke="#1a1108" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Bowtie */}
      <path d="M242 232 L250 238 L258 232 L258 244 L250 240 L242 244 Z" fill="#ff1744" />
      {/* Arm */}
      <path d="M220 260 Q205 270 195 285" stroke="#e8b890" strokeWidth="14" fill="none" strokeLinecap="round" />

      {/* Holding hands */}
      <circle cx="205" cy="287" r="10" fill="#f0c5a0" />

      {/* Big heart above */}
      <path d="M200 75 q-18 -22 -36 -4 q-14 14 0 32 q14 18 36 38 q22 -20 36 -38 q14 -18 0 -32 q-18 -18 -36 4 z" fill="#ff1744" stroke="#fff" strokeWidth="3" />
      <text x="200" y="112" textAnchor="middle" fontSize="14" fill="#fff" fontWeight="bold" fontFamily="cursive">A ❤ I</text>
    </svg>
  );
}
