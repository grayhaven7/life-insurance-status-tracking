"use client";

import { useState, useRef, useEffect, FormEvent } from "react";

const ChatIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
    />
  </svg>
);

const CloseIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

const SendIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
    />
  </svg>
);

interface Message {
  role: "user" | "assistant";
  content: string;
}

const CALENDLY_URL = "https://calendly.com/d/cmd8-9f4-5jf/tax-free-pension-tfp";

const INITIAL_MESSAGE: Message = {
  role: "assistant",
  content:
    "Hello! I'm here to help answer your questions about Tax-Free Pensions. What would you like to know?",
};

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();
      const assistantMessage: Message = {
        role: "assistant",
        content: data.message,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      const errorMessage: Message = {
        role: "assistant",
        content:
          "I apologize, but I'm having trouble connecting right now. Please try again or book a call with our team for personalized assistance.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chat Button - Glossy bubble style */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="emerald-chat-button"
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? (
          <CloseIcon className="w-6 h-6" />
        ) : (
          <ChatIcon className="w-7 h-7" />
        )}
      </button>

      {/* Chat Modal - Glass morphism */}
      {isOpen && (
        <div className="emerald-chat-modal">
          {/* Header - Gradient sky blue */}
          <div
            className="flex items-center justify-between p-4"
            style={{
              background: 'linear-gradient(135deg, #48CAE4 0%, #00B4D8 50%, #0096C7 100%)',
              borderBottom: '1px solid rgba(255,255,255,0.2)',
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center"
                style={{
                  background: 'rgba(255,255,255,0.25)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3)',
                }}
              >
                <ChatIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">
                  Tax-Free Pension Assistant
                </h3>
                <p className="text-xs text-white/90">
                  Ask me anything!
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-full text-white/90 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close chat"
            >
              <CloseIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Messages - Glass background */}
          <div
            className="flex-1 overflow-y-auto p-4 space-y-4"
            style={{
              background: 'linear-gradient(180deg, #F0F9FF 0%, #FFFFFF 100%)',
            }}
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2.5 ${
                    message.role === "user"
                      ? "rounded-2xl rounded-br-md text-white"
                      : "rounded-2xl rounded-bl-md text-[var(--text-body)]"
                  }`}
                  style={{
                    background: message.role === "user"
                      ? 'linear-gradient(135deg, #9ACD32 0%, #7CB518 50%, #5A8A0F 100%)'
                      : 'rgba(255,255,255,0.9)',
                    boxShadow: message.role === "user"
                      ? '0 2px 10px rgba(124, 181, 24, 0.3)'
                      : '0 2px 10px rgba(0, 180, 216, 0.1)',
                    border: message.role === "user"
                      ? 'none'
                      : '1px solid rgba(0, 180, 216, 0.15)',
                  }}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div
                  className="rounded-2xl rounded-bl-md px-4 py-3"
                  style={{
                    background: 'rgba(255,255,255,0.9)',
                    boxShadow: '0 2px 10px rgba(0, 180, 216, 0.1)',
                    border: '1px solid rgba(0, 180, 216, 0.15)',
                  }}
                >
                  <div className="flex gap-1.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full animate-bounce"
                      style={{ background: '#00B4D8' }}
                    />
                    <span
                      className="w-2.5 h-2.5 rounded-full animate-bounce"
                      style={{ background: '#7CB518', animationDelay: '0.1s' }}
                    />
                    <span
                      className="w-2.5 h-2.5 rounded-full animate-bounce"
                      style={{ background: '#00B4D8', animationDelay: '0.2s' }}
                    />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Book a Call CTA - Gradient accent bar */}
          <div
            className="px-4 py-3"
            style={{
              background: 'linear-gradient(135deg, rgba(124, 181, 24, 0.1) 0%, rgba(0, 180, 216, 0.1) 100%)',
              borderTop: '1px solid rgba(0, 180, 216, 0.15)',
            }}
          >
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 text-sm font-semibold transition-colors"
              style={{ color: '#0096C7' }}
            >
              <span>Want personalized advice?</span>
              <span className="underline hover:text-[#7CB518]">Book a free consultation</span>
            </a>
          </div>

          {/* Input - Glass effect */}
          <form
            onSubmit={handleSubmit}
            className="p-4"
            style={{
              background: 'rgba(255,255,255,0.95)',
              borderTop: '1px solid rgba(0, 180, 216, 0.1)',
            }}
          >
            <div className="flex gap-3">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your question..."
                className="flex-1 emerald-input text-sm py-3"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="px-4 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105"
                style={{
                  background: 'linear-gradient(180deg, #9ACD32 0%, #7CB518 50%, #5A8A0F 100%)',
                  boxShadow: '0 2px 10px rgba(124, 181, 24, 0.3), inset 0 1px 0 rgba(255,255,255,0.3)',
                }}
                aria-label="Send message"
              >
                <SendIcon className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
