import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { useEffect, useRef, useState } from "react";
import { Heart, MessageCircleHeart, Send, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  addTimelineEvent,
  autoTagMessage,
  loadMessages,
  loadTimeline,
  saveMessages,
  timelineToPrompt,
} from "@/lib/ishuuMemory";

export function IshuuChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [initial] = useState<UIMessage[]>(() => {
    const stored = loadMessages() as UIMessage[];
    if (stored.length) return stored;
    return [
      {
        id: "welcome",
        role: "assistant",
        parts: [
          {
            type: "text",
            text: "Assalamualaikum Alisha 🤍 Ishuu yahan hu... aaj kaisa mood hai aapka? ❤️",
          },
        ],
      } as UIMessage,
    ];
  });

  const transport = useRef(
    new DefaultChatTransport({
      api: "/api/chat",
      prepareSendMessagesRequest: ({ messages, id, body }) => ({
        body: { messages, id, timeline: timelineToPrompt(loadTimeline()), ...body },
      }),
    }),
  ).current;

  const { messages, sendMessage, status } = useChat({
    id: "ishuu-main",
    messages: initial,
    transport,
  });

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open, status]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    saveMessages(messages);
  }, [messages]);

  const busy = status === "submitted" || status === "streaming";

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || busy) return;
    const tag = autoTagMessage(text);
    if (tag) addTimelineEvent(tag);
    setInput("");
    await sendMessage({ text });
  };

  return (
    <>
      {/* Floating button */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-5 left-5 z-50 group"
            aria-label="Chat with Ishuu"
          >
            <span className="absolute inset-0 rounded-full bg-rose-400/60 animate-ping" />
            <span className="absolute inset-0 rounded-full bg-pink-400/40 animate-pulse" />
            <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 via-pink-500 to-fuchsia-500 text-white shadow-2xl ring-4 ring-white/70 group-hover:scale-110 transition">
              <MessageCircleHeart className="h-6 w-6" />
            </span>
            <motion.span
              animate={{ y: [0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 1.6 }}
              className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white/95 backdrop-blur px-3 py-1 text-[11px] font-semibold text-rose-600 shadow border border-rose-100"
            >
              Ishuu se baat karein 💬
            </motion.span>
            <span className="absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full bg-emerald-400 ring-2 ring-white" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-5 left-5 z-50 w-[92vw] max-w-sm h-[70vh] max-h-[560px] flex flex-col rounded-3xl overflow-hidden border border-rose-200 bg-white/90 backdrop-blur-xl shadow-2xl"
            style={{ boxShadow: "0 30px 80px -20px rgba(255,80,130,0.55)" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-2 px-4 py-3 bg-gradient-to-r from-rose-500 via-pink-500 to-fuchsia-500 text-white">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="h-9 w-9 rounded-full bg-white/25 backdrop-blur flex items-center justify-center text-lg">
                    🥰
                  </div>
                  <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-white" />
                </div>
                <div>
                  <div className="text-sm font-bold leading-tight">Ishuu</div>
                  <div className="text-[10px] opacity-90">Sirf aapke liye 🤍 online</div>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="rounded-full p-1.5 hover:bg-white/20 transition"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-3 py-4 space-y-2.5"
              style={{
                background:
                  "radial-gradient(circle at 20% 0%, #fff0f5 0%, transparent 60%), linear-gradient(180deg, #fff7f9 0%, #ffeef4 100%)",
              }}
            >
              {messages.map((m) => {
                const text = m.parts
                  .map((p) => (p.type === "text" ? p.text : ""))
                  .join("");
                const isUser = m.role === "user";
                return (
                  <div
                    key={m.id}
                    className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[82%] rounded-2xl px-3.5 py-2 text-[13.5px] leading-relaxed shadow-sm whitespace-pre-wrap ${
                        isUser
                          ? "bg-gradient-to-br from-rose-500 to-pink-500 text-white rounded-br-md"
                          : "bg-white text-rose-900 border border-rose-100 rounded-bl-md"
                      }`}
                    >
                      {text || (
                        <span className="inline-flex gap-1">
                          <Heart className="h-3 w-3 animate-pulse" fill="currentColor" />
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
              {busy && messages[messages.length - 1]?.role === "user" && (
                <div className="flex justify-start">
                  <div className="bg-white border border-rose-100 rounded-2xl rounded-bl-md px-3.5 py-2.5 shadow-sm">
                    <div className="flex gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-rose-400 animate-bounce" />
                      <span
                        className="h-1.5 w-1.5 rounded-full bg-rose-400 animate-bounce"
                        style={{ animationDelay: "0.15s" }}
                      />
                      <span
                        className="h-1.5 w-1.5 rounded-full bg-rose-400 animate-bounce"
                        style={{ animationDelay: "0.3s" }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Composer */}
            <form
              onSubmit={handleSend}
              className="flex items-center gap-2 px-3 py-2.5 border-t border-rose-100 bg-white/90"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ishuu ko kuch kahein..."
                className="flex-1 rounded-full bg-rose-50 border border-rose-100 px-4 py-2 text-sm outline-none focus:border-rose-300 focus:bg-white text-rose-900 placeholder:text-rose-300"
              />
              <button
                type="submit"
                disabled={busy || !input.trim()}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-pink-500 text-white shadow hover:scale-105 transition disabled:opacity-40 disabled:hover:scale-100"
                aria-label="Send"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
