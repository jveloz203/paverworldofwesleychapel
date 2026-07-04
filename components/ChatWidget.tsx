"use client";

import { useEffect, useRef, useState } from "react";
import { business } from "@/lib/business";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const GREETING: Message = {
  role: "assistant",
  content: `Hi! I'm Paver Pete, ${business.name}'s assistant. Ask me about patios, driveways, pool decks — or let's set up your free estimate!`,
};

const QUICK_REPLIES = ["Get a free estimate", "What do pavers cost?", "Do you do pool decks?"];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [messages, busy, open]);

  async function send(text: string) {
    const content = text.trim();
    if (!content || busy) return;
    const next: Message[] = [...messages, { role: "user", content }];
    setMessages(next);
    setInput("");
    setBusy(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        // Send the last 20 turns; server enforces the same cap.
        body: JSON.stringify({ messages: next.slice(-20) }),
      });
      const json = await res.json();
      const reply: string = res.ok
        ? json.reply
        : json.error ?? `Please call us at ${business.phone.display} and we'll help right away.`;
      setMessages((current) => [...current, { role: "assistant", content: reply }]);
    } catch {
      setMessages((current) => [
        ...current,
        { role: "assistant", content: `I'm having trouble connecting — call ${business.phone.display} and we'll help right away.` },
      ]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label={open ? "Close chat" : "Chat with Paver Pete"}
        className="fixed bottom-20 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-clay-600 text-2xl text-white shadow-lg hover:bg-clay-700 sm:bottom-6"
      >
        {open ? "✕" : "💬"}
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Paver Pete chat assistant"
          className="fixed bottom-36 right-4 z-50 flex h-[28rem] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-sand-300 sm:bottom-24"
        >
          <div className="bg-espresso-900 px-4 py-3">
            <p className="font-display font-bold text-sand-50">Paver Pete</p>
            <p className="text-xs text-sand-300">{business.name} · AI assistant</p>
          </div>

          <div ref={logRef} className="flex-1 space-y-3 overflow-y-auto bg-sand-50 p-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={
                  m.role === "user"
                    ? "ml-8 rounded-2xl rounded-br-sm bg-clay-600 px-3 py-2 text-sm text-white"
                    : "mr-8 rounded-2xl rounded-bl-sm bg-white px-3 py-2 text-sm text-espresso-800 ring-1 ring-sand-200"
                }
              >
                {m.content}
              </div>
            ))}
            {busy && (
              <div className="mr-8 w-16 rounded-2xl bg-white px-3 py-2 text-sm text-espresso-500 ring-1 ring-sand-200">
                <span className="animate-pulse">•••</span>
              </div>
            )}
            {messages.length === 1 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {QUICK_REPLIES.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => send(q)}
                    className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-clay-700 ring-1 ring-clay-300 hover:bg-clay-50"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              void send(input);
            }}
            className="flex gap-2 border-t border-sand-200 bg-white p-2"
          >
            <label htmlFor="chat-input" className="sr-only">Message</label>
            <input
              id="chat-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about your project…"
              className="flex-1 rounded-lg border border-sand-300 px-3 py-2 text-sm focus:border-clay-500 focus:outline-none"
            />
            <button
              type="submit"
              disabled={busy || !input.trim()}
              className="rounded-lg bg-clay-600 px-4 py-2 text-sm font-bold text-white disabled:opacity-50"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
}
