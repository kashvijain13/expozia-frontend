// src/app/components/FloatingAIChat.tsx
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Bot, X, Send, Loader2, Trash2 } from "lucide-react";
import { api } from "../../lib/axios";

const smoothEase = "cubic-bezier(0.16, 1, 0.3, 1)";

type ChatMsg = { role: "ai" | "user"; text: string };

export type DashboardAIContext = {
  currentPage: string;
  appOverview?: string;
  uiState?: any;
  lastScan?: any;
};

const DEFAULT_OVERVIEW = `
EXPOZIA Dashboard:
- TextScan: analyze text for authenticity, AI-generated sections, and misinformation.
- LinkCheck: analyze a URL for trust score, SSL, reputation, blacklist signals.
- ImageScan: analyze an image for deepfake signals + extracted text corrections.
- Sessions/History: stores scans per user.
`.trim();

export default function FloatingAIChat({
  getContext,
}: {
  getContext?: () => DashboardAIContext | null;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMsg[]>([
    { role: "ai", text: "Hey! I’m EXPOZIA AI. Ask me anything — I can help with the dashboard + scans + errors." },
  ]);
  const [sending, setSending] = useState(false);

  const listRef = useRef<HTMLDivElement | null>(null);
  const canSend = useMemo(() => !!message.trim() && !sending, [message, sending]);

  const scrollToBottom = () => {
    const el = listRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  };

  useEffect(() => {
    if (!isOpen) return;
    scrollToBottom();
  }, [messages.length, isOpen]);

  const safeContext = (): DashboardAIContext => {
    const ctx = typeof getContext === "function" ? getContext() : null;
    return (
      ctx || {
        currentPage: "Dashboard",
        appOverview: DEFAULT_OVERVIEW,
        uiState: {},
        lastScan: null,
      }
    );
  };

  const clearChat = () => {
    setMessages([{ role: "ai", text: "Chat cleared. Ask me anything about EXPOZIA." }]);
  };

  const handleSend = async () => {
    const text = message.trim();
    if (!text || sending) return;

    setMessages((prev) => [...prev, { role: "user", text }]);
    setMessage("");
    setSending(true);

    try {
      const context = safeContext();

      const { data } = await api.post("/chat/ask", {
        message: text,
        context,
      });

      setMessages((prev) => [
        ...prev,
        { role: "ai", text: data?.reply || "No reply returned." },
      ]);
    } catch (e: any) {
      const msg =
        e?.response?.data?.message ||
        e?.message ||
        "Something went wrong. Try again.";
      setMessages((prev) => [...prev, { role: "ai", text: msg }]);
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      {!isOpen && (
        <motion.button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 sm:bottom-8 right-4 sm:right-8 z-50 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center"
          style={{
            backgroundColor: "#00D9FF",
            boxShadow: "0 8px 32px rgba(0, 217, 255, 0.6)",
          }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
        >
          <Bot className="w-7 h-7 sm:w-8 sm:h-8" style={{ color: "#0A0E14" }} />
        </motion.button>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.85 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-4 sm:bottom-8 right-4 sm:right-8 z-50 w-[calc(100vw-2rem)] sm:w-96 rounded-3xl overflow-hidden flex flex-col"
            style={{
              backgroundColor: "#151B23",
              border: "1px solid rgba(0, 217, 255, 0.2)",
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.6)",
              height: "520px", // ✅ fixed height
              maxWidth: "400px",
            }}
          >
            {/* Header */}
            <div
              className="px-5 py-4 border-b flex items-center gap-3"
              style={{ borderColor: "rgba(73, 182, 230, 0.18)" }}
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "rgba(73, 182, 230, 0.18)", border: "1px solid rgba(73, 182, 230, 0.28)" }}
              >
                <Bot className="w-5 h-5" style={{ color: "#49B6E6" }} />
              </div>

              <div className="min-w-0">
                <div className="text-sm" style={{ color: "#E6E0EB" }}>EXPOZIA AI</div>
                <div className="text-xs truncate" style={{ color: "rgba(230,224,235,0.65)" }}>
                  Dashboard assistant • scans • troubleshooting
                </div>
              </div>

              <div className="ml-auto flex items-center gap-2">
                <button
                  onClick={clearChat}
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  title="Clear chat"
                  style={{
                    backgroundColor: "rgba(73, 182, 230, 0.10)",
                    border: "1px solid rgba(73, 182, 230, 0.18)",
                  }}
                >
                  <Trash2 className="w-4 h-4" style={{ color: "#E6E0EB" }} />
                </button>

                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  title="Close"
                  style={{
                    backgroundColor: "rgba(73, 182, 230, 0.14)",
                    border: "1px solid rgba(73, 182, 230, 0.22)",
                  }}
                >
                  <X className="w-4 h-4" style={{ color: "#E6E0EB" }} />
                </button>
              </div>
            </div>

            {/* Messages (scroll after fixed height) */}
            <div
              ref={listRef}
              className="flex-1 overflow-y-auto p-5 space-y-3"
              style={{ scrollBehavior: "smooth" }}
            >
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.22, ease: smoothEase }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className="max-w-[84%] px-4 py-3 rounded-2xl text-sm leading-relaxed"
                    style={{
                      backgroundColor: msg.role === "user" ? "#1A0623" : "rgba(73, 182, 230, 0.15)",
                      color: "#E6E0EB",
                      border: msg.role === "ai" ? "1px solid rgba(73, 182, 230, 0.28)" : "1px solid rgba(255,255,255,0.06)",
                      whiteSpace: "pre-wrap",
                      wordBreak: "break-word",
                    }}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {sending && (
                <div className="flex items-center gap-2 text-sm" style={{ color: "rgba(230, 224, 235, 0.75)" }}>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Thinking...
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t" style={{ borderColor: "rgba(73, 182, 230, 0.18)" }}>
              <div className="flex gap-2">
                <input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask anything..."
                  className="flex-1 px-4 py-2.5 rounded-full outline-none text-sm"
                  style={{
                    backgroundColor: "#1A0623",
                    color: "#E6E0EB",
                    border: "1px solid rgba(73, 182, 230, 0.18)",
                  }}
                />
                <button
                  onClick={handleSend}
                  disabled={!canSend}
                  className="w-11 h-11 rounded-full flex items-center justify-center disabled:opacity-50"
                  style={{ backgroundColor: "#49B6E6", color: "#1B0824" }}
                  title="Send"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}