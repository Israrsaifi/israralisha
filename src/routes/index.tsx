import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Heart } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Will You Marry Me?" },
      { name: "description", content: "A little question for you 💍" },
    ],
  }),
  component: Index,
});

function Index() {
  const navigate = useNavigate();
  const [noPos, setNoPos] = useState<{ top: string; left: string } | null>(null);

  const dodge = () => {
    const top = Math.random() * 80 + 5; // 5% - 85%
    const left = Math.random() * 80 + 5;
    setNoPos({ top: `${top}%`, left: `${left}%` });
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-rose-100 via-pink-50 to-amber-50 flex items-center justify-center px-4">
      {/* Floating hearts */}
      {Array.from({ length: 12 }).map((_, i) => (
        <Heart
          key={i}
          className="absolute text-rose-300/50 animate-pulse"
          style={{
            top: `${(i * 37) % 100}%`,
            left: `${(i * 53) % 100}%`,
            width: `${16 + (i % 4) * 8}px`,
            height: `${16 + (i % 4) * 8}px`,
            animationDelay: `${i * 0.3}s`,
          }}
          fill="currentColor"
        />
      ))}

      <div className="relative z-10 w-full max-w-md rounded-3xl bg-white/80 backdrop-blur-xl shadow-2xl border border-rose-200/60 p-8 sm:p-10 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-rose-500 shadow-lg shadow-rose-500/40">
          <Heart className="h-7 w-7 text-white" fill="currentColor" />
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-rose-600 to-pink-500 bg-clip-text text-transparent">
          Will u marry me?
        </h1>
        <p className="mt-3 text-sm text-rose-900/60">
          Please log in your answer below 💌
        </p>

        {/* Fake login-style fields for the bit */}
        <div className="mt-6 space-y-3 text-left">
          <div>
            <label className="text-xs font-medium text-rose-900/70">Heart ID</label>
            <input
              type="text"
              defaultValue="alisha@love.com"
              readOnly
              className="mt-1 w-full rounded-xl border border-rose-200 bg-rose-50/50 px-4 py-3 text-sm text-rose-900 focus:outline-none"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-rose-900/70">Secret Feeling</label>
            <input
              type="password"
              defaultValue="iloveyou"
              readOnly
              className="mt-1 w-full rounded-xl border border-rose-200 bg-rose-50/50 px-4 py-3 text-sm text-rose-900 focus:outline-none"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="relative mt-8 h-32">
          <button
            onClick={() => navigate({ to: "/yes" })}
            className="absolute left-1/2 top-2 -translate-x-1/2 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 px-10 py-3 text-base font-semibold text-white shadow-lg shadow-rose-500/40 transition-transform hover:scale-110"
          >
            Yes 💖
          </button>

          <button
            onMouseEnter={dodge}
            onFocus={dodge}
            onTouchStart={dodge}
            onClick={dodge}
            style={
              noPos
                ? { top: noPos.top, left: noPos.left, transform: "translate(-50%, -50%)" }
                : { top: "calc(2px + 3.5rem)", left: "50%", transform: "translateX(-50%)" }
            }
            className="absolute rounded-full border border-rose-300 bg-white px-8 py-2.5 text-sm font-medium text-rose-600 shadow transition-all duration-300 ease-out"
          >
            No
          </button>
        </div>

        <p className="mt-6 text-xs text-rose-900/40">Hint: the "No" button is shy 🙈</p>
      </div>
    </div>
  );
}
