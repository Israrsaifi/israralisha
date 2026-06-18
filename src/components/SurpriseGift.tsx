import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import { LOVE_MESSAGES } from "@/lib/loveMessages";

function pickRandom(prev: string | null): string {
  if (LOVE_MESSAGES.length <= 1) return LOVE_MESSAGES[0];
  let m = prev;
  while (m === prev) m = LOVE_MESSAGES[Math.floor(Math.random() * LOVE_MESSAGES.length)];
  return m!;
}

export function SurpriseGift({ title }: { title: string }) {
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const openGift = () => {
    setMsg(pickRandom(msg));
    setOpen(true);
  };

  const next = () => setMsg(pickRandom(msg));

  return (
    <div className="flex flex-col items-center gap-5">
      <p className="text-sm font-semibold text-rose-600 uppercase tracking-widest">
        🎁 {title} 🎁
      </p>

      {!open ? (
        <motion.button
          onClick={openGift}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 1.4, repeat: Infinity }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="relative cursor-pointer"
          aria-label="Open gift"
        >
          <div className="text-7xl sm:text-8xl drop-shadow-2xl">🎁</div>
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{ boxShadow: ["0 0 20px #f43f5e80", "0 0 40px #ec489980", "0 0 20px #f43f5e80"] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <p className="mt-3 text-xs uppercase tracking-widest text-rose-500 font-bold text-center">
            Tap to open ✨
          </p>
        </motion.button>
      ) : (
        <div className="relative w-full max-w-sm">
          {/* floating hearts */}
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.span
              key={i}
              className="absolute text-rose-500 pointer-events-none"
              style={{ left: `${(i * 11) % 90}%`, bottom: 20, fontSize: `${12 + (i % 3) * 6}px` }}
              initial={{ y: 0, opacity: 0 }}
              animate={{ y: -160, opacity: [0, 1, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.2 }}
            >
              ❤
            </motion.span>
          ))}
          {/* sparkles */}
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.span
              key={`s${i}`}
              className="absolute text-amber-400 pointer-events-none"
              style={{ left: `${(i * 17) % 90}%`, top: `${(i * 23) % 60}%` }}
              animate={{ scale: [0, 1, 0], rotate: [0, 180, 360] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
            >
              <Sparkles className="w-4 h-4" />
            </motion.span>
          ))}

          <AnimatePresence mode="wait">
            <motion.div
              key={msg}
              initial={{ y: 40, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -40, opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="relative rounded-3xl bg-gradient-to-br from-white via-rose-50 to-pink-100 border-2 border-rose-200 shadow-2xl p-6 text-center"
            >
              <Heart className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 text-rose-500 drop-shadow" fill="currentColor" />
              <p
                className="mt-3 text-lg sm:text-xl text-rose-900/90 italic leading-relaxed"
                style={{ fontFamily: "Georgia, serif" }}
              >
                “{msg}”
              </p>
              <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-2">
                <button
                  onClick={next}
                  className="rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white px-5 py-2 text-sm font-bold shadow hover:scale-105 transition cursor-pointer"
                >
                  Next Surprise ❤️
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-full border-2 border-rose-300 bg-white/80 text-rose-600 px-5 py-2 text-sm font-semibold hover:bg-white transition cursor-pointer"
                >
                  Close 🎁
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
