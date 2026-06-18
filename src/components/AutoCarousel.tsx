import { useEffect, useRef, useState, type ReactNode } from "react";

interface Props {
  items: ReactNode[];
  intervalMs?: number;
  className?: string;
  dotColor?: string;
}

export function AutoCarousel({ items, intervalMs = 6000, className = "", dotColor = "bg-rose-500" }: Props) {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % items.length), intervalMs);
    return () => clearInterval(t);
  }, [items.length, intervalMs, paused]);

  const go = (dir: number) => setIdx((i) => (i + dir + items.length) % items.length);

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0].clientX;
        setPaused(true);
      }}
      onTouchEnd={(e) => {
        if (touchStartX.current == null) return;
        const dx = e.changedTouches[0].clientX - touchStartX.current;
        if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
        touchStartX.current = null;
        setTimeout(() => setPaused(false), 1500);
      }}
    >
      <div className="overflow-hidden rounded-2xl">
        <div
          className="flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${idx * 100}%)` }}
        >
          {items.map((it, i) => (
            <div key={i} className="w-full flex-shrink-0 px-1">
              {it}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex justify-center gap-2">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2 rounded-full transition-all ${
              i === idx ? `w-6 ${dotColor}` : "w-2 bg-rose-200"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
