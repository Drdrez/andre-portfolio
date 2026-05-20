"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  profile,
  aboutParagraphs,
  frontend,
  backend,
  devtools,
  tools,
  experience,
  projectItems,
  social,
} from "@/data/content";

/* ── Types ────────────────────────────────────────── */
interface Message {
  id: string;
  role: "user" | "assistant";
  text: string;
  type?: "text" | "projects" | "contact" | "skills" | "experience" | "fallback";
}

const defaultAnswer = `I'm not sure about that one! Try asking about Andre's skills, projects, experience, tools, or how to contact him. 😊`;

/* ── Knowledge classification and routing ──────────── */
function findAnswer(input: string): { text: string; type: Message["type"] } {
  const lower = input.toLowerCase().trim();

  // 1. Greetings
  const greetings = ["hello", "hi", "hey", "sup", "good morning", "good afternoon", "good evening", "greetings", "yo", "hola"];
  if (greetings.some((g) => lower === g || lower.startsWith(g + " "))) {
    return {
      text: `Hey there! 👋 I'm Andre's virtual assistant. Ask me anything about his skills, projects, experience, or how to get in touch!`,
      type: "text",
    };
  }

  // 2. Goodbyes
  const goodbyes = ["bye", "goodbye", "see you", "see ya", "cya", "talk later", "farewell", "exit"];
  if (goodbyes.some((g) => lower === g || lower.startsWith(g + " "))) {
    return {
      text: `Thanks for stopping by! 😊 Have a wonderful day, and feel free to reach out to Andre if you have any questions. Goodbye! 👋`,
      type: "text",
    };
  }

  // 3. Gratitude / Small Talk
  const gratitude = ["thanks", "thank you", "ty", "awesome", "great", "perfect", "cool", "nice", "appreciate"];
  if (gratitude.some((g) => lower === g || lower.startsWith(g + " ") || lower.includes("thank you"))) {
    return {
      text: `You're very welcome! I'm happy to help. Is there anything else you'd like to know about Andre's work? 🚀`,
      type: "text",
    };
  }

  // 4. Meta (About the bot itself / capabilities)
  const meta = ["who are you", "what are you", "your name", "what do you do", "capabilities", "help", "what can you do", "features"];
  if (meta.some((m) => lower.includes(m))) {
    return {
      text: `I'm Andre's AI virtual assistant! 🤖 I'm here to help you navigate his portfolio. You can ask me about:\n\n• **Projects**: Show his designs, websites, or apps\n• **Skills**: What frameworks and tools he specializes in\n• **Experience**: Where he studied and worked\n• **Contact**: How to reach or hire him`,
      type: "text",
    };
  }

  // 5. Score categories
  const categories: { type: Message["type"]; keywords: string[]; answer: string }[] = [
    {
      type: "projects",
      keywords: ["project", "portfolio", "work", "built", "made", "created", "design", "website", "app", "mobile", "android", "ghl", "gohighlevel", "funnel", "landing page", "poster", "logo", "merch", "social media"],
      answer: `Here are some of Andre's featured projects. You can click on any card to see more details and case studies!`,
    },
    {
      type: "skills",
      keywords: ["skill", "specialize", "capable", "good at", "tech", "stack", "frontend", "backend", "tool", "software", "react", "next", "vue", "javascript", "typescript", "node", "python", "java", "php", "sql", "postgres", "figma", "photoshop", "illustrator", "canva", "premiere", "capcut", "database"],
      answer: `Andre is a multi-disciplinary Full-Stack Developer, Graphic Designer, and UI/UX Designer. Here is a breakdown of his stack:`,
    },
    {
      type: "experience",
      keywords: ["experience", "work history", "career", "job", "worked", "education", "school", "university", "degree", "study", "ateneo", "davao", "graduated", "history", "timeline"],
      answer: `Here is a summary of Andre's professional journey and educational background:`,
    },
    {
      type: "contact",
      keywords: ["contact", "email", "reach", "hire", "message", "get in touch", "phone", "call", "schedule", "meeting", "calendly", "available", "open", "freelance"],
      answer: `You can reach Andre directly through any of these channels. He's open to freelance work, full-time roles, and collaborations!`,
    },
    {
      type: "text",
      keywords: ["who", "about", "yourself", "introduce", "tell me", "location", "where", "based", "from", "city", "country", "philippines"],
      answer: `Andre is a full-stack developer, graphic designer, and UI/UX designer based in Surigao Del Sur, Philippines 🇵🇭. He focuses on combining functional development with sleek, scroll-stopping aesthetics. Here's a brief bio:\n\n${aboutParagraphs.join("\n\n")}`,
    },
  ];

  // Calculate scores based on keyword occurrences and matches
  let bestType: Message["type"] = "text";
  let bestAnswer = defaultAnswer;
  let maxScore = 0;

  for (const cat of categories) {
    let score = 0;
    for (const kw of cat.keywords) {
      if (lower.includes(kw)) {
        score += kw.split(" ").length; // Give more points to multi-word keywords
        if (lower === kw) score += 5; // Extra points for exact match
      }
    }
    if (score > maxScore) {
      maxScore = score;
      bestType = cat.type;
      bestAnswer = cat.answer;
    }
  }

  if (maxScore > 0) {
    return { text: bestAnswer, type: bestType };
  }

  // Fallback
  return {
    text: defaultAnswer,
    type: "fallback",
  };
}

function getSuggestedQuestions(lastType?: Message["type"]): string[] {
  switch (lastType) {
    case "projects":
      return ["How can I contact Andre?", "What tools does he use?", "Tell me about his experience"];
    case "skills":
      return ["Show me his projects", "How can I contact him?", "What is his work history?"];
    case "experience":
      return ["Show me his projects", "What are his skills?", "How can I contact him?"];
    case "contact":
      return ["Show me his projects", "What can he do?", "Tell me about himself"];
    case "text":
    default:
      return ["What are his skills?", "Show me his projects", "How can I contact him?", "What tools does he use?"];
  }
}

/* ── Rich UI Sub-Components inside Chat bubbles ──── */
function ProjectsBlock() {
  return (
    <div className="grid gap-2 sm:grid-cols-2 mt-1 w-full">
      {projectItems.map((p) => (
        <Link
          key={p.slug}
          href={`/projects/${p.slug}`}
          className="group flex flex-col rounded-xl border border-border bg-surface p-3 transition-all hover:border-border-strong hover:bg-surface-raised hover:-translate-y-0.5 shadow-1"
        >
          <div className="flex flex-wrap gap-1 mb-1">
            {p.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="text-[9px] font-semibold uppercase tracking-wider text-text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
          <h4 className="text-xs font-bold text-text-primary group-hover:text-interactive transition-colors">
            {p.title}
          </h4>
          <p className="mt-1 text-[11px] leading-relaxed text-text-secondary line-clamp-2">
            {p.description}
          </p>
          <div className="mt-2 inline-flex items-center gap-0.5 text-[10px] font-semibold text-text-muted group-hover:text-text-primary">
            View details
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-2.5 w-2.5 transition-transform group-hover:translate-x-0.5"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </div>
        </Link>
      ))}
    </div>
  );
}

function ContactBlock() {
  return (
    <div className="flex flex-col gap-1.5 mt-1 w-full">
      <a
        href={profile.scheduleUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 rounded-xl bg-interactive text-interactive-contrast px-3 py-2 text-xs font-semibold shadow-1 transition-transform hover:scale-[1.01] active:scale-[0.99]"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5">
          <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
          <path d="M16 2v4M8 2v4M3 10h18" />
        </svg>
        Book a Chat (Calendly)
      </a>
      <div className="grid grid-cols-2 gap-1.5">
        <a
          href={`mailto:${profile.email}`}
          className="flex items-center justify-center gap-1.5 rounded-xl border border-border bg-surface px-3 py-2 text-xs font-semibold text-text-primary shadow-1 transition-colors hover:bg-surface-raised"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5 text-text-muted">
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
          Send Email
        </a>
        <a
          href={`tel:${profile.phone.replace(/\s+/g, "")}`}
          className="flex items-center justify-center gap-1.5 rounded-xl border border-border bg-surface px-3 py-2 text-xs font-semibold text-text-primary shadow-1 transition-colors hover:bg-surface-raised"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5 text-text-muted">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          Call Phone
        </a>
      </div>
      {social.facebook && (
        <a
          href={social.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 rounded-xl border border-border bg-surface px-3 py-1.5 text-xs font-medium text-text-secondary shadow-1 transition-colors hover:bg-surface-raised"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5 text-text-muted">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
          </svg>
          Connect on Facebook
        </a>
      )}
    </div>
  );
}

function SkillsBlock() {
  const categories = [
    { label: "Frontend", items: frontend.slice(0, 6) },
    { label: "Backend", items: backend.slice(0, 6) },
    { label: "Design Tools", items: tools.slice(0, 6) },
  ];

  return (
    <div className="space-y-2.5 mt-1 rounded-xl border border-border bg-surface p-3 shadow-1 text-left w-full">
      {categories.map((cat) => (
        <div key={cat.label}>
          <h5 className="text-[10px] font-bold uppercase tracking-wider text-text-muted mb-1">
            {cat.label}
          </h5>
          <div className="flex flex-wrap gap-1">
            {cat.items.map((item) => (
              <span
                key={item.name}
                className="inline-flex items-center gap-1 rounded-lg border border-border bg-surface-raised px-2 py-0.5 text-xs text-text-secondary"
              >
                {item.iconSrc ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.iconSrc}
                    alt=""
                    className="h-3 w-3 shrink-0 object-contain"
                    loading="lazy"
                  />
                ) : null}
                <span>{item.name}</span>
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ExperienceBlock() {
  return (
    <div className="relative mt-1 rounded-xl border border-border bg-surface p-3 shadow-1 text-left pl-6 w-full">
      <div className="absolute left-[15px] top-4 bottom-4 w-px bg-border" />
      <ul className="space-y-3 relative" role="list">
        {experience.slice(0, 5).map((item, i) => (
          <li key={i} className="relative flex flex-col items-start">
            <span className="absolute -left-[18.5px] top-1.5 z-10 h-2 w-2 rounded-full border-2 border-text-primary bg-surface" />
            <div className="flex w-full items-baseline justify-between gap-2">
              <span className="text-xs font-bold text-text-primary">{item.title}</span>
              <span className="text-[10px] text-text-muted font-medium tabular-nums shrink-0">{item.year}</span>
            </div>
            <span className="text-[11px] text-text-secondary leading-normal">{item.org}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FallbackBlock({ onSelect }: { onSelect: (query: string) => void }) {
  const topics = [
    { label: "Show Projects", query: "Show me your projects" },
    { label: "Check Skills", query: "What are your skills?" },
    { label: "View Experience", query: "Tell me about your experience" },
    { label: "Get Contact Info", query: "How can I contact you?" },
  ];

  return (
    <div className="flex flex-col gap-2 mt-1 bg-surface-raised/40 p-2.5 rounded-xl border border-dashed border-border w-full">
      <p className="text-[11px] text-text-secondary font-medium">Try asking about one of these topics:</p>
      <div className="grid grid-cols-2 gap-1.5">
        {topics.map((t) => (
          <button
            key={t.label}
            onClick={() => onSelect(t.query)}
            className="rounded-lg border border-border bg-surface px-2.5 py-1.5 text-xs text-text-secondary text-left font-medium transition-all hover:bg-surface-raised hover:text-text-primary hover:scale-[1.01] active:scale-[0.99]"
          >
            {t.label} →
          </button>
        ))}
      </div>
    </div>
  );
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
        const result = findAnswer(text);
        const botMsg: Message = {
          id: `a-${Date.now()}`,
          role: "assistant",
          text: result.text,
          type: result.type,
        };
        setMessages((prev) => [...prev, botMsg]);
        setIsTyping(false);
      }, 600 + Math.random() * 600);
    },
    [],
  );

  const lastBotMessage = [...messages].reverse().find((m) => m.role === "assistant");
  const currentSuggestions = getSuggestedQuestions(lastBotMessage?.type);

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
        <div className="fixed bottom-24 right-6 z-50 flex w-[22rem] flex-col overflow-hidden rounded-2xl border border-border/80 bg-surface/95 backdrop-blur-md shadow-4 sm:w-[24rem] animate-in">
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-border bg-surface-raised/75 backdrop-blur-md px-4 py-3">
            {profile.imageSrc ? (
              <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full border border-border bg-surface-raised">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={profile.imageSrc}
                  alt={`Portrait of ${profile.name}`}
                  className="h-full w-full object-cover"
                />
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 border-2 border-surface-raised animate-pulse" />
              </div>
            ) : (
              <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-interactive text-interactive-contrast text-xs font-bold shrink-0">
                A
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 border-2 border-surface-raised animate-pulse" />
              </div>
            )}
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-text-primary">
                {"Andre's Assistant"}
              </p>
              <p className="text-xs text-text-muted flex items-center gap-1">
                <span>Online</span>
              </p>
            </div>
            
            {/* Action buttons */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => {
                  setMessages([
                    {
                      id: "welcome",
                      role: "assistant",
                      text: `Hi! 👋 I'm Andre's virtual assistant. Ask me anything about his work, skills, or how to reach him.`,
                    },
                  ]);
                }}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-text-muted hover:bg-surface-strong hover:text-text-primary transition-colors"
                title="Reset conversation"
                aria-label="Reset conversation"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                  <path d="M3 3v5h5" />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4 scrollbar-thin" style={{ maxHeight: "24rem", minHeight: "18rem" }}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-line shadow-1 ${
                    msg.role === "user"
                      ? "bg-interactive text-interactive-contrast rounded-br-none"
                      : "bg-surface-raised text-text-primary rounded-bl-none border border-border"
                  }`}
                >
                  {msg.text}
                </div>

                {/* Dynamic Rich Layouts */}
                {msg.role === "assistant" && msg.type && msg.type !== "text" && (
                  <div className="mt-2 w-full max-w-[85%] animate-in">
                    {msg.type === "projects" && <ProjectsBlock />}
                    {msg.type === "contact" && <ContactBlock />}
                    {msg.type === "skills" && <SkillsBlock />}
                    {msg.type === "experience" && <ExperienceBlock />}
                    {msg.type === "fallback" && <FallbackBlock onSelect={send} />}
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-center gap-1 rounded-2xl rounded-bl-none border border-border bg-surface-raised px-4 py-3 shadow-1">
                  <span className="h-2 w-2 rounded-full bg-text-muted/50 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="h-2 w-2 rounded-full bg-text-muted/50 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="h-2 w-2 rounded-full bg-text-muted/50 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Suggested questions (dynamic, shown when bot is not typing) */}
          {!isTyping && currentSuggestions.length > 0 && (
            <div className="flex flex-wrap gap-1.5 border-t border-border px-4 py-2.5 bg-surface-raised/40">
              {currentSuggestions.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="rounded-full border border-border bg-surface px-3 py-1 text-xs text-text-secondary transition-all hover:bg-surface-raised hover:text-text-primary hover:scale-[1.02] active:scale-[0.98]"
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
            className="flex items-center gap-2 border-t border-border px-3 py-3 bg-surface"
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
