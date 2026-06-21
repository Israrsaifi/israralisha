import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { Heart, Sparkles, Lock, Mail } from "lucide-react";
import { CoupleSvg } from "@/components/CoupleSvg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Will You Marry Me? 💍" },
      { name: "description", content: "A little love test for the love of my life 💌" },
    ],
  }),
  component: Index,
});

const FUNNY_MESSAGES = [
  "Nope, try again 😜",
  "Wrong button silly 🙈",
  "Catch me if you can! 🏃‍♀️",
  "That button is allergic to NO 🌹",
  "Even the button is shy 💕",
  "404: No-button not found 🔍",
  "It's a YES kinda day 💖",
  "Stop chasing, start saying YES 💍",
];

const NO_EMOJIS = ["🙄", "🥴", "🤨", "😒", "😏", "🫤", "😩", "😐", "🙃", "😬"];

function Index() {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const yesRef = useRef<HTMLButtonElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [noPos, setNoPos] = useState<{ top: number; left: number } | null>(null);
  const [msg, setMsg] = useState<string>("");
  const [clicks, setClicks] = useState(0);

  const noEmoji = NO_EMOJIS[clicks % NO_EMOJIS.length];

  const handleYesClick = () => {
    const username = usernameRef.current?.value.trim() ?? "";
    const password = passwordRef.current?.value ?? "";

    if (username === "israralisha" && password === "forever") {
      navigate({ to: "/yes" });
    } else {
      toast("Arey, galat chabi hai 😅! Sirf Meri Alice open kr skti h.. ❤️");
    }
  };

  const dodge = () => {
    const container = containerRef.current;
    const yes = yesRef.current;
    if (!container || !yes) return;

    const cRect = container.getBoundingClientRect();
    const yRect = yes.getBoundingClientRect();

    const btnW = 90;
    const btnH = 44;
    const padding = 8;

    let top = 0;
    let left = 0;
    for (let i = 0; i < 30; i++) {
      top = Math.random() * (cRect.height - btnH - padding * 2) + padding;
      left = Math.random() * (cRect.width - btnW - padding * 2) + padding;

      const absTop = cRect.top + top;
      const absLeft = cRect.left + left;
      const overlapsYes =
        absLeft < yRect.right + 16 &&
        absLeft + btnW > yRect.left - 16 &&
        absTop < yRect.bottom + 16 &&
        absTop + btnH > yRect.top - 16;

      if (!overlapsYes) break;
    }

    setNoPos({ top, left });
    setMsg(FUNNY_MESSAGES[clicks % FUNNY_MESSAGES.length]);
    setClicks((c) => c + 1);
  };

  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center px-4 py-8"
      style={{
        background:
          "radial-gradient(circle at 20% 10%, #ffe5ec 0%, transparent 50%), radial-gradient(circle at 80% 80%, #ffd1dc 0%, transparent 50%), linear-gradient(135deg, #fff5f7 0%, #ffe0eb 50%, #fce4ec 100%)",
      }}
    >
      {Array.from({ length: 14 }).map((_, i) => (
        <Heart
          key={i}
          className="absolute text-rose-300/60 animate-pulse pointer-events-none"
          style={{
            top: `${(i * 41) % 95}%`,
            left: `${(i * 67) % 95}%`,
            width: `${14 + (i % 4) * 8}px`,
            height: `${14 + (i % 4) * 8}px`,
            animationDelay: `${i * 0.25}s`,
            animationDuration: `${2 + (i % 3)}s`,
          }}
          fill="currentColor"
        />
      ))}

      <div className="relative z-10 w-full max-w-md">
        <div className="mx-auto -mb-8 w-40 h-40 relative z-20">
          <CoupleSvg className="w-full h-full drop-shadow-xl" />
        </div>

        <div
          className="relative rounded-[2rem] bg-white/70 backdrop-blur-2xl border border-white/80 p-7 sm:p-9 text-center"
          style={{
            boxShadow:
              "0 25px 60px -15px rgba(255, 105, 145, 0.4), 0 0 0 1px rgba(255,255,255,0.6) inset",
          }}
        >
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 px-4 py-1 text-[10px] font-bold text-white uppercase tracking-widest shadow-lg">
            <Sparkles className="w-3 h-3" /> Love Login <Sparkles className="w-3 h-3" />
          </div>

          <h1
            className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight bg-gradient-to-r from-rose-600 via-pink-500 to-fuchsia-500 bg-clip-text text-transparent leading-tight"
            style={{ fontFamily: "'Brush Script MT', cursive" }}
          >
            Will u marry me<br />Alisha?
          </h1>
          <p className="mt-2 text-sm text-rose-900/70 italic">
            Alisha please sign in my heart to continue 🙈🤭
          </p>

          <div className="mt-4 grid grid-cols-1 gap-2 text-[12px]">
            <div className="rounded-xl bg-rose-100/60 border border-rose-200 px-3 py-2 text-rose-700 italic">
              "Tum mere ho, bas itna hi kaafi hai zindagi ke liye." 💞
            </div>
            <div className="rounded-xl bg-pink-100/60 border border-pink-200 px-3 py-2 text-pink-700 italic">
              Warning: Logging in may cause sudden butterflies 🦋 & forever smiles 😄
            </div>
            <div className="rounded-xl bg-fuchsia-100/60 border border-fuchsia-200 px-3 py-2 text-fuchsia-700 italic">
              Username: Meri Jaan • Password: Tumhara Pyaar 🔐💘
            </div>
          </div>

          <div className="mt-6 space-y-4 text-left">
            <div className="relative">
              <label className="text-[11px] font-semibold text-rose-700/80 uppercase tracking-wider">
                Heart ID
              </label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-rose-400" />
                <input
                  ref={usernameRef}
                  type="text"
                  placeholder="Username"
                  className="w-full rounded-2xl border-2 border-rose-200 bg-white/80 pl-10 pr-4 py-3 text-sm text-rose-900 placeholder-rose-300 focus:outline-none focus:border-rose-400 focus:ring-4 focus:ring-rose-200/50 transition"
                />
              </div>
            </div>
            <div className="relative">
              <label className="text-[11px] font-semibold text-rose-700/80 uppercase tracking-wider">
                Secret Feeling
              </label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-rose-400" />
                <input
                  ref={passwordRef}
                  type="password"
                  placeholder="Password"
                  className="w-full rounded-2xl border-2 border-rose-200 bg-white/80 pl-10 pr-4 py-3 text-sm text-rose-900 placeholder-rose-300 focus:outline-none focus:border-rose-400 focus:ring-4 focus:ring-rose-200/50 transition"
                />
              </div>
            </div>
          </div>

          <div ref={containerRef} className="relative mt-8 h-44 rounded-2xl bg-rose-50/40 border border-dashed border-rose-200">
            <button
              ref={yesRef}
              onClick={handleYesClick}
              className="absolute left-1/2 top-4 -translate-x-1/2 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-fuchsia-500 px-10 py-3 text-base font-bold text-white shadow-xl shadow-rose-400/50 hover:scale-110 active:scale-95 transition-transform"
            >
              Yes 💖
            </button>

            <button
              onMouseEnter={dodge}
              onFocus={dodge}
              onTouchStart={(e) => {
                e.preventDefault();
                dodge();
              }}
              onClick={dodge}
              style={
                noPos
                  ? { top: `${noPos.top}px`, left: `${noPos.left}px` }
                  : { bottom: "16px", left: "50%", transform: "translateX(-50%)" }
              }
              className="absolute rounded-full border-2 border-rose-300 bg-white px-7 py-2.5 text-sm font-semibold text-rose-500 shadow-md transition-all duration-200 ease-out"
            >
              No {noEmoji}
            </button>

            {msg && (
              <p className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[11px] text-rose-500 font-medium animate-pulse whitespace-nowrap">
                {msg}
              </p>
            )}
          </div>

          <p className="mt-5 text-xs text-rose-900/50 italic">
            Psst… the No button is feeling a little nervous 🙈
          </p>
        </div>

        <p className="mt-4 text-center text-xs text-rose-700/60">
          Made with 💕 by Israr for my love Alisha
        </p>
      </div>

    </div>
  );
}
