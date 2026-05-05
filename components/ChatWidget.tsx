"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  profile,
  aboutParagraphs,
  frontend,
  backend,
  devtools,
  tools,
  experience,
  projectItems,
} from "@/data/content";

/* ── Types ────────────────────────────────────────── */
interface Message {
  id: string;
  role: "user" | "assistant";
  text: string;
}

/* ── Knowledge base (keyword → answer) ─────────────── */
const knowledgeBase: { keywords: string[]; answer: string }[] = [
  {
    keywords: ["hello", "hi", "hey", "sup", "good morning", "good afternoon", "good evening"],
    answer: `Hey there! 👋 I'm Andre's virtual assistant. Ask me anything about his skills, projects, experience, or how to get in touch!`,
  },
  {
    keywords: ["who", "about", "yourself", "introduce", "tell me"],
    answer: aboutParagraphs.join(" "),
  },
  {
    keywords: ["skill", "what can", "capable", "good at", "specialize"],
    answer: `Andre is a full-stack developer, graphic designer, and UI/UX designer. He works across design tools like ${tools.map((t) => t.name).join(", ")} and codes with ${frontend.slice(0, 4).map((f) => f.name).join(", ")} on the frontend and ${backend.slice(0, 4).map((b) => b.name).join(", ")} on the backend.`,
  },
  {
    keywords: ["frontend", "front-end", "front end", "react", "next", "vue", "javascript", "typescript"],
    answer: `On the frontend Andre works with: ${frontend.map((f) => f.name).join(", ")}.`,
  },
  {
    keywords: ["backend", "back-end", "back end", "node", "python", "java", "php", "database", "sql"],
    answer: `On the backend Andre works with: ${backend.map((b) => b.name).join(", ")}.`,
  },
  {
    keywords: ["tool", "software", "figma", "photoshop", "illustrator", "canva", "premiere", "capcut"],
    answer: `Andre uses these tools daily: ${tools.map((t) => t.name).join(", ")}.`,
  },
  {
    keywords: ["devtool", "dev tool", "git", "github", "gitlab", "vscode", "slack", "discord"],
    answer: `For development workflow Andre uses: ${devtools.map((d) => d.name).join(", ")}.`,
  },
  {
    keywords: ["experience", "work history", "career", "job", "worked"],
    answer: experience
      .map((e) => `• ${e.title} at ${e.org} (${e.year})`)
      .join("\n"),
  },
  {
    keywords: ["project", "portfolio", "work", "built", "made", "created"],
    answer: `Here are Andre's projects:\n${projectItems.map((p) => `• ${p.title} — ${p.tags.join(", ")}`).join("\n")}\n\nClick on any project card on the main page to see more details!`,
  },
  {
    keywords: ["contact", "email", "reach", "hire", "message", "get in touch", "phone", "call"],
    answer: `You can reach Andre at:\n📧 ${profile.email}\n📱 ${profile.phone}\n\nHe's open to freelance projects and collaboration!`,
  },
  {
    keywords: ["location", "where", "based", "from", "city", "country"],
    answer: `Andre is based in ${profile.location}, Philippines 🇵🇭`,
  },
  {
    keywords: ["design", "graphic", "logo", "poster", "social media", "merch", "brand"],
    answer: `Andre offers design services including social media designs, poster designs, logo & identity, and merch designs. He uses Figma, Photoshop, Illustrator, and Canva for his design work.`,
  },
  {
    keywords: ["website", "web", "app", "mobile", "android", "ghl", "gohighlevel"],
    answer: `Andre builds websites, mobile apps, Android apps, and GoHighLevel (GHL) sites. He works with React, Next.js, and Vue.js on the frontend, and Node.js, Python, Java, and PHP on the backend.`,
  },
  {
    keywords: ["ai", "artificial intelligence", "machine learning"],
    answer: `Andre has been diving into AI — integrating AI tools into apps, shipping smarter features, and using generative workflows where they actually save time.`,
  },
  {
    keywords: ["education", "school", "university", "degree", "study"],
    answer: `Andre holds a BS in Information Technology from Ateneo de Davao University (2023).`,
  },
  {
    keywords: ["available", "freelance", "open", "hire"],
    answer: `Yes! Andre is open to freelance projects and collaboration. Reach out at ${profile.email} or ${profile.phone}.`,
  },
];

const defaultAnswer = `I'm not sure about that one! Try asking about Andre's skills, projects, experience, tools, or how to contact him. 😊`;

const suggestedQuestions = [
  "What can Andre do?",
  "Show me his projects",
  "How can I contact him?",
  "What tools does he use?",
];

function findAnswer(input: string): string {
  const lower = input.toLowerCase();
  for (const entry of knowledgeBase) {
    if (entry.keywords.some((kw) => lower.includes(kw))) {
      return entry.answer;
    }
  }
  return defaultAnswer;
}

/* ── Component ────────────────────────────────────── */
export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      text: `Hi! 👋 I'm Andre's virtual assistant. Ask me anything about his work, skills, or how to reach him.`,
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const send = useCallback(
    (text: string) => {
      if (!text.trim()) return;
      const userMsg: Message = {
        id: `u-${Date.now()}`,
        role: "user",
        text: text.trim(),
      };
      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setIsTyping(true);

      // Simulate typing delay
      setTimeout(() => {
        const answer = findAnswer(text);
        const botMsg: Message = {
          id: `a-${Date.now()}`,
          role: "assistant",
          text: answer,
        };
        setMessages((prev) => [...prev, botMsg]);
        setIsTyping(false);
      }, 600 + Math.random() * 600);
    },
    [],
  );

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-interactive text-interactive-contrast shadow-4 transition-all duration-normal hover:scale-105 hover:shadow-[0_4px_20px_rgba(0,0,0,0.25)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-primary"
        aria-label={open ? "Close chat" : "Chat with Andre"}
      >
        {open ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 flex w-[22rem] flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-4 sm:w-[24rem] animate-in">
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-border bg-surface-raised px-4 py-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-interactive text-interactive-contrast text-xs font-bold">
              A
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-text-primary">
                Chat with Andre
              </p>
              <p className="text-xs text-text-muted">
                Ask me anything
              </p>
            </div>
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4" style={{ maxHeight: "24rem", minHeight: "16rem" }}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-line ${
                    msg.role === "user"
                      ? "bg-interactive text-interactive-contrast rounded-br-md"
                      : "bg-surface-raised text-text-primary rounded-bl-md border border-border"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-center gap-1 rounded-2xl rounded-bl-md border border-border bg-surface-raised px-4 py-3">
                  <span className="h-2 w-2 rounded-full bg-text-muted/50 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="h-2 w-2 rounded-full bg-text-muted/50 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="h-2 w-2 rounded-full bg-text-muted/50 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Suggested questions (only show at start) */}
          {messages.length <= 1 && (
            <div className="flex flex-wrap gap-1.5 border-t border-border px-4 py-3 bg-surface-raised/50">
              {suggestedQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs text-text-secondary transition-colors hover:bg-surface-raised hover:text-text-primary"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2 border-t border-border px-3 py-3"
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message…"
              className="flex-1 rounded-lg border border-border bg-surface-raised px-3 py-2 text-sm text-text-primary placeholder:text-text-muted outline-none focus:border-text-muted transition-colors"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-interactive text-interactive-contrast transition-all hover:brightness-90 disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Send message"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <path d="m22 2-7 20-4-9-9-4z" />
                <path d="m22 2-11 11" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
}
