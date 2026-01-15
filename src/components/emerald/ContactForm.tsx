"use client";

import { useState, FormEvent } from "react";

const LoaderIcon = ({ className }: { className?: string }) => (
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
      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
    />
  </svg>
);

const CheckIcon = ({ className }: { className?: string }) => (
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
      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

interface ContactFormProps {
  variant?: "default" | "compact";
}

export default function ContactForm({ variant = "default" }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    smsConsent: false,
    website: "", // Honeypot field
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Honeypot check - if filled, silently reject
    if (formData.website) {
      setStatus("success");
      return;
    }

    // SMS consent is required
    if (!formData.smsConsent) {
      setStatus("error");
      setErrorMessage("Please consent to SMS messages to continue.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to submit form");
      }

      setStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
        smsConsent: false,
        website: "",
      });

      // Reset success state after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong"
      );
    }
  };

  if (status === "success") {
    return (
      <div
        className="emerald-card text-center py-10"
        style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(240,253,244,0.95) 100%)',
        }}
      >
        <div
          className="w-20 h-20 mx-auto mb-5 rounded-full flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, #9ACD32 0%, #7CB518 50%, #5A8A0F 100%)',
            boxShadow: '0 4px 20px rgba(124, 181, 24, 0.3), inset 0 1px 0 rgba(255,255,255,0.3)',
          }}
        >
          <CheckIcon className="w-10 h-10 text-white" />
        </div>
        <h3
          className="text-xl font-bold mb-2"
          style={{ color: '#1A365D' }}
        >
          Thank You!
        </h3>
        <p style={{ color: '#5A7A9A' }}>
          We&apos;ve received your message and will be in touch soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Name */}
      <div>
        <label htmlFor="name" className="emerald-label">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="emerald-input"
          placeholder="John Smith"
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="emerald-label">
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="emerald-input"
          placeholder="john@example.com"
        />
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="emerald-label">
          Phone Number <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          required
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="emerald-input"
          placeholder="(555) 123-4567"
        />
      </div>

      {/* Honeypot field - hidden from users, catches bots */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          type="text"
          id="website"
          name="website"
          value={formData.website}
          onChange={(e) => setFormData({ ...formData, website: e.target.value })}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Message - only show in default variant */}
      {variant === "default" && (
        <div>
          <label htmlFor="message" className="emerald-label">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            className="emerald-input resize-none"
            placeholder="How can we help you?"
          />
        </div>
      )}

      {/* SMS Consent - Styled checkbox */}
      <div className="flex items-start gap-3">
        <div className="relative mt-0.5">
          <input
            type="checkbox"
            id="smsConsent"
            name="smsConsent"
            required
            checked={formData.smsConsent}
            onChange={(e) =>
              setFormData({ ...formData, smsConsent: e.target.checked })
            }
            className="w-5 h-5 rounded-lg border-2 border-[rgba(0,180,216,0.3)] bg-white/90 text-[var(--sky-blue)] focus:ring-[var(--sky-blue)] focus:ring-offset-0 focus:ring-2 transition-all cursor-pointer"
            style={{
              accentColor: '#7CB518',
            }}
          />
        </div>
        <label htmlFor="smsConsent" className="text-sm" style={{ color: '#5A7A9A' }}>
          <span className="text-red-500">*</span> I consent to receive SMS messages from Emerald Tide Financial regarding my inquiry.
          Message and data rates may apply. Reply STOP to opt out. See our{" "}
          <a
            href="/privacy"
            className="font-medium hover:underline"
            style={{ color: '#00B4D8' }}
          >
            Privacy Policy
          </a>{" "}
          for more information.
        </label>
      </div>

      {/* Error Message - Glass style */}
      {status === "error" && (
        <div
          className="p-4 rounded-xl"
          style={{
            background: 'rgba(254, 202, 202, 0.5)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            backdropFilter: 'blur(8px)',
          }}
        >
          <p className="text-sm text-red-600">{errorMessage}</p>
        </div>
      )}

      {/* Submit Button - Glossy green */}
      <button
        type="submit"
        disabled={status === "loading"}
        className="emerald-btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed py-3.5"
      >
        {status === "loading" ? (
          <>
            <LoaderIcon className="w-5 h-5 animate-spin" />
            Sending...
          </>
        ) : (
          "Send Message"
        )}
      </button>
    </form>
  );
}
