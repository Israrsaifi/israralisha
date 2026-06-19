export type TimelineEvent = {
  ts: number;
  kind: "angry" | "laugh" | "photo" | "call" | "hijab_compliment" | "topic" | "sad" | "happy";
  note: string;
};

const KEY = "ishuu_timeline_v1";
const MSG_KEY = "ishuu_messages_v1";

export function loadTimeline(): TimelineEvent[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function addTimelineEvent(ev: TimelineEvent) {
  const arr = loadTimeline();
  arr.push(ev);
  // cap at 80
  const trimmed = arr.slice(-80);
  localStorage.setItem(KEY, JSON.stringify(trimmed));
}

export function timelineToPrompt(events: TimelineEvent[]): string {
  if (!events.length) return "";
  return events
    .slice(-20)
    .map((e) => {
      const d = new Date(e.ts);
      const day = d.toLocaleDateString("en-IN", { month: "short", day: "numeric" });
      return `- ${day}: [${e.kind}] ${e.note}`;
    })
    .join("\n");
}

// Heuristic auto-tagging of Alisha's messages
export function autoTagMessage(text: string): TimelineEvent | null {
  const t = text.toLowerCase();
  const now = Date.now();
  if (/(gussa|naraz|annoy|irritat|chidh)/.test(t))
    return { ts: now, kind: "angry", note: text.slice(0, 80) };
  if (/(haha|lol|😂|🤣|hassi|hass|funny|maza)/.test(t))
    return { ts: now, kind: "laugh", note: text.slice(0, 80) };
  if (/(photo|pic|selfie|tasveer)/.test(t))
    return { ts: now, kind: "photo", note: text.slice(0, 80) };
  if (/(call|baat kar|phone)/.test(t))
    return { ts: now, kind: "call", note: text.slice(0, 80) };
  if (/(hijab|dress|kapde|outfit)/.test(t))
    return { ts: now, kind: "hijab_compliment", note: text.slice(0, 80) };
  if (/(udaas|sad|rona|dukhi|upset)/.test(t))
    return { ts: now, kind: "sad", note: text.slice(0, 80) };
  if (/(khush|happy|excited|yay)/.test(t))
    return { ts: now, kind: "happy", note: text.slice(0, 80) };
  return null;
}

export function loadMessages(): unknown[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(MSG_KEY) || "[]");
  } catch {
    return [];
  }
}

export function saveMessages(messages: unknown[]) {
  localStorage.setItem(MSG_KEY, JSON.stringify(messages));
}
