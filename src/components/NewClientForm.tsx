"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewClientForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    sendEmail: true,
  });

  const generatePassword = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789";
    let password = "";
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData((prev) => ({ ...prev, password }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create client");
      }

      router.push(`/admin/clients/${data.id}`);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-error-muted border border-error/20 text-sm text-error">
          <AlertIcon className="w-4 h-4 flex-shrink-0" />
          {error}
        </div>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-2">
          Full Name <span className="text-error">*</span>
        </label>
        <input
          id="name"
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
          className="w-full px-4 py-3 text-sm bg-bg-tertiary border border-border-primary rounded-lg text-text-primary placeholder:text-text-muted focus:border-accent focus:ring-1 focus:ring-accent/20 outline-none transition-all"
          placeholder="John Doe"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-2">
          Email Address <span className="text-error">*</span>
        </label>
        <input
          id="email"
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
          className="w-full px-4 py-3 text-sm bg-bg-tertiary border border-border-primary rounded-lg text-text-primary placeholder:text-text-muted focus:border-accent focus:ring-1 focus:ring-accent/20 outline-none transition-all"
          placeholder="john@example.com"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-text-secondary mb-2">
          Phone Number <span className="text-text-muted font-normal">(optional)</span>
        </label>
        <input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
          className="w-full px-4 py-3 text-sm bg-bg-tertiary border border-border-primary rounded-lg text-text-primary placeholder:text-text-muted focus:border-accent focus:ring-1 focus:ring-accent/20 outline-none transition-all"
          placeholder="(555) 123-4567"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-text-secondary mb-2">
          Temporary Password <span className="text-error">*</span>
        </label>
        <div className="flex gap-2">
          <input
            id="password"
            type="text"
            required
            value={formData.password}
            onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
            className="flex-1 px-4 py-3 text-sm bg-bg-tertiary border border-border-primary rounded-lg text-text-primary font-mono placeholder:text-text-muted placeholder:font-sans focus:border-accent focus:ring-1 focus:ring-accent/20 outline-none transition-all"
            placeholder="Enter or generate password"
          />
          <button
            type="button"
            onClick={generatePassword}
            className="px-4 py-3 text-sm bg-bg-tertiary hover:bg-bg-hover border border-border-primary text-text-secondary hover:text-text-primary rounded-lg font-medium transition-all flex items-center gap-2"
          >
            <DiceIcon className="w-4 h-4" />
            Generate
          </button>
        </div>
        <p className="text-xs text-text-muted mt-2">
          This password will be sent to the client via email.
        </p>
      </div>

      <div className="flex items-center gap-3 p-4 bg-bg-tertiary rounded-lg border border-border-primary">
        <input
          id="sendEmail"
          type="checkbox"
          checked={formData.sendEmail}
          onChange={(e) => setFormData((prev) => ({ ...prev, sendEmail: e.target.checked }))}
          className="w-4 h-4 rounded border-border-primary bg-bg-secondary text-accent focus:ring-accent focus:ring-offset-0 cursor-pointer"
        />
        <label htmlFor="sendEmail" className="text-sm text-text-secondary cursor-pointer select-none">
          Send welcome email with login credentials
        </label>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex-1 px-4 py-3 text-sm border border-border-primary text-text-secondary hover:text-text-primary hover:bg-bg-hover rounded-lg font-medium transition-all"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex-1 flex items-center justify-center gap-2 bg-accent hover:bg-accent-secondary text-btn-text font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <LoaderIcon className="w-4 h-4 animate-spin" />
              Creating...
            </>
          ) : (
            <>
              <PlusIcon className="w-4 h-4" />
              Create Client
            </>
          )}
        </button>
      </div>
    </form>
  );
}

function AlertIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
    </svg>
  );
}

function DiceIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25" />
    </svg>
  );
}

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  );
}

function LoaderIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
  );
}
