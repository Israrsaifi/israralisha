import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import couple from "@/assets/couple.jpg";

export const Route = createFileRoute("/yes")({
  head: () => ({
    meta: [
      { title: "Alisha weds Israr 💍" },
      { name: "description", content: "She said yes! Alisha weds Israr." },
    ],
  }),
  component: YesPage,
});

function YesPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-rose-50 via-amber-50 to-pink-100">
      {/* Petals */}
      {Array.from({ length: 18 }).map((_, i) => (
        <Heart
          key={i}
          className="absolute text-rose-400/40 animate-bounce"
          style={{
            top: `${(i * 29) % 100}%`,
            left: `${(i * 47) % 100}%`,
            width: `${12 + (i % 5) * 6}px`,
            height: `${12 + (i % 5) * 6}px`,
            animationDelay: `${(i % 6) * 0.4}s`,
            animationDuration: `${2 + (i % 4)}s`,
          }}
          fill="currentColor"
        />
      ))}

      <main className="relative z-10 mx-auto max-w-3xl px-6 py-12 sm:py-20 text-center">
        <p className="text-sm uppercase tracking-[0.4em] text-rose-500 font-semibold">
          Save the date
        </p>

        <h1 className="mt-4 font-serif text-5xl sm:text-7xl font-bold leading-tight bg-gradient-to-r from-rose-600 via-pink-500 to-amber-500 bg-clip-text text-transparent">
          Alisha <span className="italic font-light text-rose-400">weds</span> Israr
        </h1>

        <div className="mt-3 flex items-center justify-center gap-3 text-rose-500">
          <span className="h-px w-12 bg-rose-300" />
          <Heart className="h-5 w-5" fill="currentColor" />
          <span className="h-px w-12 bg-rose-300" />
        </div>

        <div className="mx-auto mt-10 w-full max-w-md overflow-hidden rounded-3xl border-4 border-white shadow-2xl shadow-rose-300/50">
          <img
            src={couple}
            alt="Alisha and Israr — wedding portrait"
            className="h-full w-full object-cover"
          />
        </div>

        <p className="mx-auto mt-10 max-w-xl text-lg sm:text-xl text-rose-900/80 leading-relaxed font-serif italic">
          "In a sea of people, my eyes will always search for you. You are my
          today and all of my tomorrows."
        </p>

        <div className="mt-8 grid grid-cols-3 gap-4 text-rose-900">
          <div className="rounded-2xl bg-white/70 backdrop-blur p-4 shadow">
            <div className="text-2xl font-bold">∞</div>
            <div className="text-xs uppercase tracking-wider text-rose-500">Love</div>
          </div>
          <div className="rounded-2xl bg-white/70 backdrop-blur p-4 shadow">
            <div className="text-2xl font-bold">1</div>
            <div className="text-xs uppercase tracking-wider text-rose-500">Heart</div>
          </div>
          <div className="rounded-2xl bg-white/70 backdrop-blur p-4 shadow">
            <div className="text-2xl font-bold">2</div>
            <div className="text-xs uppercase tracking-wider text-rose-500">Souls</div>
          </div>
        </div>

        <p className="mt-10 text-rose-700 font-medium">
          She said <span className="text-rose-600 font-bold">YES</span> 💍✨
        </p>

        <Link
          to="/"
          className="mt-6 inline-block rounded-full border border-rose-300 bg-white/70 px-6 py-2 text-sm font-medium text-rose-600 hover:bg-white transition"
        >
          ← Ask again
        </Link>
      </main>
    </div>
  );
}
