import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { SurpriseGift } from "./SurpriseGift";

export interface WheelReward {
  label: string;
  color: string;
  isGift?: boolean;
}

export const REWARDS: WheelReward[] = [
  { label: "❤️ 100 Hugs", color: "#f43f5e" },
  { label: "😘 20 Kisses", color: "#ec4899" },
  { label: "💌 Romantic Date", color: "#d946ef" },
  { label: "🌹 Surprise Gift Box #1", color: "#e11d48", isGift: true },
  { label: "🎁 Surprise Gift Box #2", color: "#be185d", isGift: true },
  { label: "💕 Unlimited Love", color: "#f472b6" },
  { label: "🤗 Warm Cuddles", color: "#fb7185" },
  { label: "😂 Try Again", color: "#fda4af" },
];

const SLICE = 360 / REWARDS.length;

function playCelebration() {
  try {
    const AC = (window as any).AudioContext || (window as any).webkitAudioContext;
    if (!AC) return;
    const ctx = new AC();
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, i) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.frequency.value = freq;
      o.type = "triangle";
      o.connect(g);
      g.connect(ctx.destination);
      const start = ctx.currentTime + i * 0.12;
      g.gain.setValueAtTime(0, start);
      g.gain.linearRampToValueAtTime(0.25, start + 0.02);
      g.gain.exponentialRampToValueAtTime(0.001, start + 0.35);
      o.start(start);
      o.stop(start + 0.4);
    });
  } catch {}
}

export function LoveWheel() {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [winner, setWinner] = useState<WheelReward | null>(null);
  const audioBtn = useRef<HTMLButtonElement | null>(null);

  const spin = () => {
    if (spinning) return;
    setWinner(null);
    const winIdx = Math.floor(Math.random() * REWARDS.length);
    const rounds = 4 + Math.floor(Math.random() * 3); // 4-6
    // pointer at top => slice center should align to 0°. Current center of i = i*SLICE + SLICE/2 (rotated clockwise from top)
    const target = 360 * rounds - (winIdx * SLICE + SLICE / 2);
    const finalRot = rotation + (target - (rotation % 360));
    setSpinning(true);
    setRotation(finalRot);
    setTimeout(() => {
      setSpinning(false);
      setWinner(REWARDS[winIdx]);
      playCelebration();
      confetti({
        particleCount: 160,
        spread: 90,
        origin: { y: 0.6 },
        colors: ["#f43f5e", "#ec4899", "#d946ef", "#fb7185", "#fbbf24"],
      });
    }, 5200);
  };

  // build conic-gradient
  const conic = REWARDS.map((r, i) => `${r.color} ${i * SLICE}deg ${(i + 1) * SLICE}deg`).join(", ");

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative w-[280px] h-[280px] sm:w-[360px] sm:h-[360px]">
        {/* pointer */}
        <div className="absolute left-1/2 -translate-x-1/2 -top-2 z-20 w-0 h-0 border-l-[14px] border-r-[14px] border-t-[24px] border-l-transparent border-r-transparent border-t-rose-700 drop-shadow-lg" />
        {/* wheel */}
        <motion.div
          className="absolute inset-0 rounded-full border-[6px] border-white shadow-2xl"
          style={{ background: `conic-gradient(${conic})` }}
          animate={{ rotate: rotation }}
          transition={{ duration: 5, ease: [0.16, 1, 0.3, 1] }}
        >
          {REWARDS.map((r, i) => {
            const angle = i * SLICE + SLICE / 2;
            return (
              <div
                key={i}
                className="absolute left-1/2 top-1/2 origin-[0_0] text-white font-bold text-[10px] sm:text-xs whitespace-nowrap drop-shadow"
                style={{
                  transform: `rotate(${angle}deg) translate(0, -42%) rotate(90deg)`,
                }}
              >
                <span className="block -translate-x-1/2">{r.label}</span>
              </div>
            );
          })}
        </motion.div>
        {/* center */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-16 h-16 rounded-full bg-white border-4 border-rose-300 shadow-xl flex items-center justify-center text-2xl">
          💖
        </div>
      </div>

      <motion.button
        ref={audioBtn}
        onClick={spin}
        disabled={spinning}
        whileHover={{ scale: spinning ? 1 : 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-fuchsia-500 text-white px-10 py-3 text-lg font-extrabold shadow-xl disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer tracking-widest"
      >
        {spinning ? "Spinning…" : "SPIN"}
      </motion.button>

      <AnimatePresence>
        {winner && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="w-full max-w-md rounded-3xl bg-white/80 backdrop-blur-xl border border-rose-200 shadow-2xl p-6 text-center"
          >
            <p className="text-xs uppercase tracking-[0.4em] text-rose-500 font-bold">
              🎉 Congratulations! 🎉
            </p>
            <p className="mt-2 text-sm text-rose-700/80 italic">You won</p>
            <p className="mt-2 text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-rose-500 via-pink-500 to-fuchsia-500 bg-clip-text text-transparent">
              {winner.label}
            </p>
            {winner.isGift && (
              <div className="mt-6">
                <SurpriseGift title={winner.label} />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
