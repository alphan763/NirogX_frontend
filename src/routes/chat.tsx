import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Camera, Mic, Send, Stethoscope } from "lucide-react";
import { PhoneShell } from "@/components/nirogx/phone-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "AI Assistant | NirogX" },
      {
        name: "description",
        content:
          "Chat with the NirogX AI assistant to understand blood reports, lab values and next clinical steps.",
      },
      { property: "og:title", content: "AI Assistant | NirogX" },
      {
        property: "og:description",
        content: "Ask the NirogX clinical AI assistant about your reports, symptoms and vitals.",
      },
    ],
  }),
  component: ChatScreen,
});

type Msg = { id: number; role: "ai" | "user"; text: string; time: string };

const initial: Msg[] = [
  {
    id: 1,
    role: "ai",
    text: "I've finished reading your blood report from 14 Aug. Overall it looks reassuring — 9 of 11 markers are inside reference range.",
    time: "19:42",
  },
  { id: 2, role: "user", text: "What about the two that aren't?", time: "19:43" },
  {
    id: 3,
    role: "ai",
    text: "Your Vitamin D is 18 ng/mL (reference 30–100), which is mild deficiency, and ferritin is 21 ng/mL — at the lower edge. Together these can explain the fatigue you logged last week.",
    time: "19:43",
  },
  {
    id: 4,
    role: "ai",
    text: "A reasonable next step is to discuss supplementation and an iron-rich diet with your physician, then retest in 8–12 weeks. This is guidance, not a prescription.",
    time: "19:44",
  },
  { id: 5, role: "user", text: "Thanks — can you remind me before the retest?", time: "19:45" },
];

function ChatScreen() {
  const [messages, setMessages] = useState<Msg[]>(initial);
  const [draft, setDraft] = useState("");

  const send = () => {
    const text = draft.trim();
    if (!text) return;
    setMessages((m) => [
      ...m,
      {
        id: m.length + 1,
        role: "user",
        text,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
    setDraft("");
  };

  return (
    <PhoneShell>
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex items-center gap-3 border-b border-border bg-card px-5 pb-4 pt-8">
          <div className="grid size-10 place-items-center rounded-full bg-primary text-primary-foreground">
            <Stethoscope className="size-5" />
          </div>
          <div>
            <h1 className="text-sm font-semibold tracking-tight">NirogX AI Assistant</h1>
            <p className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <span className="size-1.5 rounded-full bg-emerald" />
              Clinical model online
            </p>
          </div>
        </header>

        <div className="flex-1 space-y-3 overflow-y-auto no-scrollbar px-4 py-5">
          {messages.map((m) => (
            <div
              key={m.id}
              className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}
            >
              <div
                className={cn(
                  "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                  m.role === "user"
                    ? "rounded-br-md bg-primary text-primary-foreground"
                    : "rounded-bl-md bg-accent text-foreground",
                )}
              >
                <p>{m.text}</p>
                <p
                  className={cn(
                    "mt-1 text-[10px]",
                    m.role === "user" ? "text-primary-foreground/70" : "text-muted-foreground",
                  )}
                >
                  {m.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-border bg-card px-4 py-3">
          <div className="flex items-end gap-2">
            <button
              className="grid size-10 shrink-0 place-items-center rounded-full bg-secondary text-muted-foreground transition-colors hover:text-primary"
              aria-label="Upload a report"
            >
              <Camera className="size-4.5" />
            </button>
            <button
              className="grid size-10 shrink-0 place-items-center rounded-full bg-secondary text-muted-foreground transition-colors hover:text-primary"
              aria-label="Record a voice note"
            >
              <Mic className="size-4.5" />
            </button>
            <textarea
              rows={1}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
              placeholder="Ask about your report..."
              aria-label="Message"
              className="max-h-24 min-h-10 flex-1 resize-none rounded-2xl border border-input bg-background px-4 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring/40"
            />
            <button
              onClick={send}
              disabled={!draft.trim()}
              className="grid size-10 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground transition-opacity disabled:opacity-40"
              aria-label="Send message"
            >
              <Send className="size-4.5" />
            </button>
          </div>
        </div>
      </div>
    </PhoneShell>
  );
}
