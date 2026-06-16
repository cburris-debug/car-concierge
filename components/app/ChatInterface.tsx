"use client";

import { useState, useRef, useEffect, Fragment } from "react";

function renderContent(text: string) {
  const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)|(https?:\/\/[^\s]+)/g;
  const lines = text.split("\n");

  return lines.map((line, li) => {
    const parts: React.ReactNode[] = [];
    let last = 0;
    let match: RegExpExecArray | null;
    linkRegex.lastIndex = 0;

    while ((match = linkRegex.exec(line)) !== null) {
      if (match.index > last) parts.push(line.slice(last, match.index));
      if (match[1] && match[2]) {
        parts.push(
          <a key={match.index} href={match[2]} target="_blank" rel="noopener noreferrer" className="underline opacity-90 hover:opacity-100">
            {match[1]}
          </a>
        );
      } else if (match[3]) {
        parts.push(
          <a key={match.index} href={match[3]} target="_blank" rel="noopener noreferrer" className="underline opacity-90 hover:opacity-100">
            {match[3]}
          </a>
        );
      }
      last = match.index + match[0].length;
    }
    if (last < line.length) parts.push(line.slice(last));

    return (
      <Fragment key={li}>
        {parts}
        {li < lines.length - 1 && <br />}
      </Fragment>
    );
  });
}

interface Message {
  role: "user" | "assistant";
  content: string;
  buttons?: Array<{ name: string }>;
}

interface ChatInterfaceProps {
  userId: string;
}

export default function ChatInterface({ userId }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [launched, setLaunched] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function launch() {
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "launch" }),
      });
      const data = await res.json();
      if (data.traces) {
        processTraces(data.traces);
        setLaunched(true);
      }
    } finally {
      setLoading(false);
    }
  }

  function processTraces(traces: Array<{ type: string; payload?: unknown }>) {
    const newMessages: Message[] = [];
    let buttons: Array<{ name: string }> = [];

    for (const trace of traces) {
      if (trace.type === "text") {
        const payload = trace.payload as { message: string };
        newMessages.push({ role: "assistant", content: payload.message });
      } else if (trace.type === "choice") {
        const payload = trace.payload as { buttons: Array<{ name: string }> };
        buttons = payload.buttons;
      }
    }

    // Attach buttons to the last assistant message
    if (buttons.length > 0 && newMessages.length > 0) {
      newMessages[newMessages.length - 1].buttons = buttons;
    }

    setMessages((prev) => [...prev, ...newMessages]);
  }

  async function sendMessage(text: string) {
    if (!text.trim() || loading) return;

    const userMessage: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "message", message: text }),
      });
      const data = await res.json();
      if (data.traces) {
        processTraces(data.traces);
      } else if (data.error) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: `Error: ${data.error}` },
        ]);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card flex flex-col h-[600px]">
      <div className="p-5 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-brand-orange flex items-center justify-center text-white text-sm font-bold">
            AI
          </div>
          <div>
            <h2 className="font-bold text-brand-navy text-sm">CarSoup Assistant</h2>
            <p className="text-xs text-gray-500">Car buying guidance, always available</p>
          </div>
          <span className="ml-auto text-xs text-green-500 font-medium">
            ● Online
          </span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {!launched && messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="text-4xl mb-3">🚗</div>
            <h3 className="font-semibold text-brand-navy mb-1">
              Ready to help you buy smarter
            </h3>
            <p className="text-gray-500 text-sm mb-5 max-w-xs">
              Ask about pricing, negotiation, specific vehicles, or what to
              watch out for at the dealership.
            </p>
            <button
              onClick={launch}
              disabled={loading}
              className="btn-primary text-sm px-5 py-2.5"
            >
              {loading ? "Starting…" : "Start Conversation"}
            </button>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i}>
            <div
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs lg:max-w-sm px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-brand-navy text-white rounded-br-sm"
                    : "bg-gray-100 text-gray-800 rounded-bl-sm"
                }`}
              >
                {renderContent(msg.content)}
              </div>
            </div>

            {/* Choice buttons */}
            {msg.buttons && msg.buttons.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2 pl-0">
                {msg.buttons.map((btn) => (
                  <button
                    key={btn.name}
                    onClick={() => sendMessage(btn.name)}
                    disabled={loading}
                    className="text-xs px-3 py-1.5 rounded-full border border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white transition-colors disabled:opacity-50"
                  >
                    {btn.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {loading && messages.length > 0 && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-2xl rounded-bl-sm px-4 py-3 text-sm text-gray-500">
              <span className="inline-flex gap-1">
                <span className="animate-bounce" style={{ animationDelay: "0ms" }}>●</span>
                <span className="animate-bounce" style={{ animationDelay: "150ms" }}>●</span>
                <span className="animate-bounce" style={{ animationDelay: "300ms" }}>●</span>
              </span>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      {launched && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage(input);
          }}
          className="p-4 border-t border-gray-100 flex gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about pricing, negotiation, vehicles…"
            disabled={loading}
            className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="bg-brand-orange text-white px-4 py-2.5 rounded-xl font-semibold text-sm hover:bg-brand-orange-dark transition-colors disabled:opacity-50"
            aria-label="Send message"
          >
            Send
          </button>
        </form>
      )}
    </div>
  );
}
