import { createGoogleGenerativeAI } from "@ai-sdk/google";

export const createGeminiProvider = (apiKey: string) =>
  createGoogleGenerativeAI({
    apiKey,
    // @ts-expect-error - safetySettings forwarded to Gemini API
    settings: {
      safetySettings: [
        { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
        { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
        { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
        { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" },
      ],
    },
  });
