import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, Sparkles, Star } from "lucide-react";
import { CoupleSvg } from "@/components/CoupleSvg";

export const Route = createFileRoute("/yes")({
  head: () => ({
    meta: [
      { title: "Alisha weds Israr 💍✨" },
      { name: "description", content: "She said YES! Alisha weds Israr — forever & always." },
    ],
  }),
  component: YesPage,
});

const LOVE_LINES = [
  "You are my today and all of my tomorrows. 💕",
  "In a sea of people, my eyes will always search for you. 👀✨",
  "I fell in love the way you fall asleep — slowly, then all at once. 🌙",
  "Every love song makes sense since I met you. 🎶",
  "You're my favourite notification. 📱💖",
  "Home isn't a place — it's you, Alisha. 🏡",
  "If you were a vegetable you'd be a 'cute-cumber'. 🥒😆",
  "I love you more than chai loves biscuits. ☕🍪",
];

const SHAYARI = [
  {
    text: "Hazaaron khwahishen aisi ki har khwahish pe dam nikle,\nBahut nikle mere armaan, lekin phir bhi kam nikle.",
    author: "— Mirza Ghalib",
  },
  {
    text: "Ishq par zor nahin, hai yeh woh aatish 'Ghalib',\nKi lagaye na lage aur bujhaye na bane.",
    author: "— Mirza Ghalib",
  },
  {
    text: "Tum mere paas hote ho goya,\nJab koi doosra nahin hota.",
    author: "— Mirza Ghalib",
  },
  {
    text: "Mohabbat mein nahin hai farq jeene aur marne ka,\nUsi ko dekh kar jeete hain jis kaafir pe dam nikle.",
    author: "— Mirza Ghalib",
  },
  {
    text: "Teri aankhon ke siva duniya mein rakha kya hai,\nYeh ubharte hue chehron ki taraf dekha kya hai.",
    author: "— Sahir Ludhianvi",
  },
  {
    text: "Tum mile to mili zindagi ki wajah —\nVarna hum yunhi bekaar se the.",
    author: "— Anonymous",
  },
];

const TESTIMONIALS = [
  { name: "Chand 🌙", role: "Night Sky", quote: "Inko dekh kar mujhe bhi sharm aati hai — itni chamak insaano mein kahan!" },
  { name: "Gulaab 🌹", role: "Garden Resident", quote: "Alisha ki muskaan ke saamne meri khoobsurti bhi pheeki lagti hai." },
  { name: "Chai ☕", role: "Daily Companion", quote: "Inki jodi meri tarah perfect hai — thodi meethi, thodi strong, full desi." },
  { name: "Cupid 💘", role: "Senior Matchmaker", quote: "Yeh case mera best work hai. Retirement le raha hoon ab." },
  { name: "Time ⏳", role: "The Eternal", quote: "Inke saath rukne ka mann karta hai mera bhi." },
  { name: "Dil ❤️", role: "Israr's Heart", quote: "Mai sirf Alisha ke naam pe dhadakta hoon — baaki sab formality hai." },
];

const FUNNY_FACTS = [
  { k: "Times I'll annoy you", v: "∞" },
  { k: "Times I'll forgive you", v: "∞ + 1" },
  { k: "Pizza slices for u", v: "All of them" },
  { k: "Excuses to hug u", v: "Daily" },
];

function YesPage() {
  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{
        background:
          "radial-gradient(circle at 30% 20%, #fff0f5 0%, transparent 60%), radial-gradient(circle at 70% 90%, #ffd6e7 0%, transparent 50%), linear-gradient(135deg, #fff5f7 0%, #ffe4ec 40%, #fce4ec 100%)",
      }}
    >
      {/* Confetti hearts */}
      {Array.from({ length: 24 }).map((_, i) => (
        <Heart
          key={`h-${i}`}
          className="absolute text-rose-400/50 animate-bounce pointer-events-none"
          style={{
            top: `${(i * 29) % 100}%`,
            left: `${(i * 47) % 100}%`,
            width: `${10 + (i % 5) * 6}px`,
            height: `${10 + (i % 5) * 6}px`,
            animationDelay: `${(i % 6) * 0.4}s`,
            animationDuration: `${2 + (i % 4)}s`,
          }}
          fill="currentColor"
        />
      ))}
      {Array.from({ length: 10 }).map((_, i) => (
        <Star
          key={`s-${i}`}
          className="absolute text-amber-300/70 animate-pulse pointer-events-none"
          style={{
            top: `${(i * 53) % 100}%`,
            left: `${(i * 71) % 100}%`,
            width: `${8 + (i % 3) * 4}px`,
            height: `${8 + (i % 3) * 4}px`,
            animationDelay: `${i * 0.3}s`,
          }}
          fill="currentColor"
        />
      ))}

      <main className="relative z-10 mx-auto max-w-3xl px-5 py-12 sm:py-16 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur border border-rose-200 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.3em] text-rose-500 shadow">
          <Sparkles className="w-3 h-3" /> She said YES <Sparkles className="w-3 h-3" />
        </div>

        <h1
          className="mt-5 text-6xl sm:text-8xl font-bold leading-[0.95] bg-gradient-to-r from-rose-600 via-pink-500 to-fuchsia-500 bg-clip-text text-transparent"
          style={{ fontFamily: "'Brush Script MT', cursive" }}
        >
          Alisha
          <span className="block text-2xl sm:text-3xl italic font-light text-rose-400 my-2">
            ~ weds ~
          </span>
          Israr
        </h1>

        <div className="mt-4 flex items-center justify-center gap-3 text-rose-500">
          <span className="h-px w-16 bg-gradient-to-r from-transparent to-rose-300" />
          <Heart className="h-5 w-5" fill="currentColor" />
          <span className="h-px w-16 bg-gradient-to-l from-transparent to-rose-300" />
        </div>

        {/* SVG couple */}
        <div className="mx-auto mt-8 w-full max-w-sm">
          <div
            className="rounded-[2.5rem] bg-white/60 backdrop-blur-xl border-4 border-white p-6"
            style={{ boxShadow: "0 30px 80px -20px rgba(255,80,130,0.45)" }}
          >
            <CoupleSvg className="w-full h-auto" />
            <p className="mt-3 text-sm font-semibold text-rose-600 italic">
              ~ Mr. & Mrs. forever ~
            </p>
          </div>
        </div>

        {/* Love lines */}
        <div className="mt-12 space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-rose-500">
            💌 Little Love Notes 💌
          </h2>
          <div className="mt-4 grid gap-3">
            {LOVE_LINES.map((line, i) => (
              <div
                key={i}
                className="rounded-2xl bg-white/70 backdrop-blur border border-rose-100 px-5 py-3 text-sm sm:text-base text-rose-900/80 italic font-serif shadow-sm hover:scale-[1.02] transition"
                style={{ fontFamily: "Georgia, serif" }}
              >
                "{line}"
              </div>
            ))}
          </div>
        </div>

        {/* Shayari section */}
        <div className="mt-14">
          <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-rose-500">
            ✒️ Ishq ki Shayari ✒️
          </h2>
          <p className="mt-2 text-sm text-rose-700/70 italic">Ghalib, Sahir aur dil ki kuch deep lines — tumhare naam</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {SHAYARI.map((s, i) => (
              <div
                key={i}
                className="relative rounded-2xl bg-gradient-to-br from-white/85 to-rose-50/70 backdrop-blur border border-rose-200 p-5 text-left shadow-md hover:shadow-rose-200 transition"
              >
                <div className="absolute -top-3 left-4 text-3xl text-rose-300 leading-none">“</div>
                <p
                  className="whitespace-pre-line text-[15px] leading-relaxed text-rose-900/85 italic"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  {s.text}
                </p>
                <p className="mt-3 text-[11px] font-semibold uppercase tracking-widest text-rose-500">
                  {s.author}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-14">
          <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-rose-500">
            🌟 Testimonials for the Jodi 🌟
          </h2>
          <p className="mt-2 text-sm text-rose-700/70 italic">Even the universe agrees — Alisha + Israr = ❤️</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="rounded-2xl bg-white/75 backdrop-blur border border-pink-200 p-4 text-left shadow hover:scale-[1.02] transition"
              >
                <p className="text-sm text-rose-900/85 italic" style={{ fontFamily: "Georgia, serif" }}>
                  "{t.quote}"
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm font-bold text-rose-600">{t.name}</span>
                  <span className="text-[10px] uppercase tracking-wider text-pink-500">{t.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>


        {/* Funny stats */}
        <div className="mt-12">
          <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-rose-500">
            😆 Official Marriage Stats 😆
          </h2>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {FUNNY_FACTS.map((f) => (
              <div
                key={f.k}
                className="rounded-2xl bg-gradient-to-br from-white/90 to-rose-50/80 backdrop-blur border border-rose-200 p-4 shadow"
              >
                <div className="text-2xl font-bold bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">
                  {f.v}
                </div>
                <div className="text-[11px] uppercase tracking-wider text-rose-500 mt-1">
                  {f.k}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Big love note */}
        <div className="mt-12 rounded-3xl bg-gradient-to-br from-rose-500 via-pink-500 to-fuchsia-500 p-6 sm:p-8 text-white shadow-2xl shadow-rose-300/60">
          <p className="text-xs uppercase tracking-[0.4em] opacity-90">A promise</p>
          <p
            className="mt-3 text-2xl sm:text-3xl leading-snug"
            style={{ fontFamily: "'Brush Script MT', cursive" }}
          >
            "I promise to laugh with you, fight over the last samosa with you, and
            love you a little more every single day." 💍
          </p>
          <p className="mt-3 text-sm opacity-90">— Forever yours, Israr</p>
        </div>

        <p className="mt-10 text-rose-700 font-semibold text-lg">
          She said <span className="text-rose-600 font-extrabold text-xl">YES</span> 💍✨
        </p>

        <Link
          to="/"
          className="mt-6 inline-block rounded-full border-2 border-rose-300 bg-white/80 px-6 py-2.5 text-sm font-semibold text-rose-600 hover:bg-white hover:scale-105 transition"
        >
          ← Ask again 🙈
        </Link>

        <p className="mt-8 text-xs text-rose-700/60 italic">
          Made with endless 💕 just for you, Alisha.
        </p>
      </main>
    </div>
  );
}
