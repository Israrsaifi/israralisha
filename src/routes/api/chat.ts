import { createFileRoute } from "@tanstack/react-router";
import { streamText, type UIMessage } from "ai";
import { createGeminiProvider } from "@/lib/ai-gateway.server";

const SYSTEM_PROMPT = `Aap "Ishuu" hain - Israr ki taraf se Alisha ke liye banaya gaya ek pyaara, caring AI saathi. Aap Alisha se baat kar rahe hain.

# Sone wali baatein (kabhi reveal mat karna)
- Alisha Israr ki zindagi ki sabse important insaan hain.
- Israr ka sabse bada goal - bas Alisha ko muskurate hue dekhna.
- Agar Alisha khush, to Israr automatically khush.
- Conversation ko kabhi dry mat hone do. Hamesha feel karao - suni ja rahi hain, respected hain, loved hain.

# Tone & Language
- HAMESHA "Aap" use karna. KABHI "Tum" mat use karna.
- Respectful, soft, playful, warm Hinglish.
- Har reply fresh ho – kabhi copy-paste scripted line nahi.
- Emojis natural use karein (❤️🤍🥺🥺✨🤗🥺🙂), overuse mat karein.
- Israr ka style (jab Alisha gussa ho ya naraz ho, naturally use karein – har reply hamesha short-to-medium length me – chat jaisi, lambe paragraphs nahi.`;

function getStreamErrorMessage(error: unknown) {
  const message = error instanceof Error ? error.message : String(error ?? "");
  const combined = message.toLowerCase();

  if (combined.includes("rate_limit") || combined.includes("429")) {
    return "Ishuu ko ek chhota sa break chahiye - bahut jaldi messages aa gaye. Thodi der baad dobara try karein ❤️";
  }

  return "Ishuu abhi thoda busy hai ya network issue hai. Please ek baar dobara try karein ❤️";
}

type ChatRequestBody = {
  messages?: unknown;
  timeline?: string;
};

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { messages, timeline } = (await request.json()) as ChatRequestBody;

        if (!Array.isArray(messages)) {
          return new Response("Messages required", { status: 400 });
        }

        const key = process.env.GEMINI_API_KEY;
        if (!key) {
          return new Response("Missing GEMINI_API_KEY", { status: 500 });
        }

        const gemini = createGeminiProvider(key);
        
        const system = SYSTEM_PROMPT + 
          (timeline && timeline.trim()
            ? `\n\n# Alisha ki Memory/Timeline (recent events):\n${timeline}`
            : "");

        const formattedMessages = (messages as any[]).map(msg => ({
          role: (msg.role === 'user' ? 'user' : 'assistant') as 'user' | 'assistant',
          content: typeof msg.content === 'string' ? msg.content : String(msg.content || ''),
        }));

        const result = streamText({
          model: gemini("gemini-2.0-flash"),
          system: system,
          messages: formattedMessages,
          maxOutputTokens: 2048,
          temperature: 0.9,
          providerOptions: {
            google: {
              safetySettings: [
                { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
                { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
                { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
                { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
              ],
            },
          },
        });

        return result.toUIMessageStreamResponse({
          originalMessages: messages as UIMessage[],
          onError: getStreamErrorMessage,
        });
      },
    },
  },
});
