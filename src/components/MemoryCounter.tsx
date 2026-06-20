import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";

const START = new Date("2025-04-17T00:00:00").getTime();

function diff(now: number) {
  const ms = Math.max(0, now - START);
  const days = Math.floor(ms / 86_400_000);
  const hours = Math.floor((ms % 86_400_000) / 3_600_000);
  const minutes = Math.floor((ms % 3_600_000) / 60_000);
  const seconds = Math.floor((ms % 60_000) / 1000);
  return { days, hours, minutes, seconds };
}

function Cell({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/70 backdrop-blur border border-rose-200 shadow-md flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={value}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-br from-rose-500 to-pink-500 bg-clip-text text-transparent tabular-nums"
          >
            {String(value).padStart(2, "0")}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="mt-2 text-[10px] sm:text-xs uppercase tracking-widest text-rose-500 font-semibold">
        {label}
      </span>
    </div>
  );
}

export function MemoryCounter() {
  const [t, setT] = useState(() => diff(START));

  useEffect(() => {
    setT(diff(Date.now()));
    const id = setInterval(() => setT(diff(Date.now())), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative mx-auto w-full max-w-2xl"
    >
      {/* floating particles */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute text-rose-400/70 pointer-events-none"
          style={{
            top: `${10 + (i * 37) % 70}%`,
            left: `${(i * 53) % 90}%`,
            fontSize: `${10 + (i % 3) * 4}px`,
          }}
          animate={{ y: [0, -14, 0], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 3 + (i % 3), repeat: Infinity, delay: i * 0.3 }}
        >
          ❤
        </motion.span>
      ))}

      <div
        className="relative rounded-3xl border border-white/60 bg-white/40 backdrop-blur-xl p-6 sm:p-8 shadow-xl"
        style={{ boxShadow: "0 20px 60px -20px rgba(244,114,182,0.45)" }}
      >
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="flex items-center justify-center gap-2"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="text-rose-500"
            style={{ filter: "drop-shadow(0 0 10px rgba(244,63,94,0.7))" }}
          >
            <Heart className="w-6 h-6" fill="currentColor" />
          </motion.div>
          <h2 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-rose-600 via-pink-500 to-fuchsia-500 bg-clip-text text-transparent">
            ❤️ Our Beautiful Journey Together ❤️
          </h2>
        </motion.div>

        <p className="mt-2 text-center text-xs sm:text-sm italic text-rose-700/80">
          Every second with you is my favorite memory.
        </p>

        <div className="mt-6 grid grid-cols-4 gap-2 sm:gap-4">
          <Cell label="Days" value={t.days} />
          <Cell label="Hours" value={t.hours} />
          <Cell label="Minutes" value={t.minutes} />
          <Cell label="Seconds" value={t.seconds} />
        </div>

        <p className="mt-5 text-center text-[11px] uppercase tracking-[0.3em] text-rose-500 font-semibold">
          Since 17 April 2025 💍
        </p>
      </div>
    </motion.section>
  );
}
