"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Stage } from "@/lib/stages";

interface Props {
  clientId: string;
  currentStage: number;
  stages: Stage[];
}

export default function StatusUpdateForm({ clientId, currentStage, stages }: Props) {
  const router = useRouter();
  const [newStage, setNewStage] = useState(currentStage);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [smsSent, setSmsSent] = useState(false);
  const [smsError, setSmsError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setEmailSent(false);
    setEmailError(null);
    setSmsSent(false);
    setSmsError(null);
    setLoading(true);

    try {
      const response = await fetch(`/api/clients/${clientId}/status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stage: newStage, note }),
      });

      const data = await response.json();

      // Log full response for debugging
      console.log("[Status Update Response]", JSON.stringify(data, null, 2));

      if (!response.ok) {
        throw new Error(data.error || "Failed to update status");
      }

      setSuccess(true);
      setEmailSent(data.emailSent === true);
      setSmsSent(data.smsSent === true);
      
      // Capture email error details for display
      if (data.emailError) {
        const debugInfo = data.emailDebugInfo 
          ? ` | Debug: ${JSON.stringify(data.emailDebugInfo)}`
          : "";
        setEmailError(`${data.emailError}${debugInfo}`);
        console.error("[Email Error]", data.emailError, data.emailDebugInfo);
      }

      // Capture SMS error details for display
      if (data.smsError) {
        const debugInfo = data.smsDebugInfo 
          ? ` | Debug: ${JSON.stringify(data.smsDebugInfo)}`
          : "";
        setSmsError(`${data.smsError}${debugInfo}`);
        console.error("[SMS Error]", data.smsError, data.smsDebugInfo);
      }
      
      setNote("");
      router.refresh();

      setTimeout(() => {
        setSuccess(false);
        setEmailSent(false);
        setEmailError(null);
        setSmsSent(false);
        setSmsError(null);
      }, 10000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const canUpdate = newStage !== currentStage;

  return (
    <div className="rounded-xl border border-border-primary bg-bg-secondary p-4 sm:p-6">
      <div className="flex items-center gap-2 mb-4 sm:mb-5">
        <div className="w-8 h-8 rounded-lg bg-accent-muted flex items-center justify-center">
          <RefreshIcon className="w-4 h-4 text-accent" />
        </div>
        <h3 className="text-base font-semibold text-text-primary">Update Status</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-error-muted border border-error/20 text-sm text-error">
            <AlertIcon className="w-4 h-4 flex-shrink-0" />
            {error}
          </div>
        )}

        {success && (
          <div className={`px-3 py-2 rounded-lg text-sm ${
            emailSent && smsSent
              ? "bg-success-muted border border-success/20 text-success"
              : "bg-warning-muted border border-warning/20 text-warning"
          }`}>
            <div className="flex items-center gap-2">
              {emailSent && smsSent ? (
                <CheckIcon className="w-4 h-4 flex-shrink-0" />
              ) : (
                <AlertIcon className="w-4 h-4 flex-shrink-0" />
              )}
              <span>
                Status updated successfully.
                {" "}
                Email: {emailSent ? "sent" : "not sent"}.
                {" "}
                SMS: {smsSent ? "sent" : "not sent"}.
              </span>
            </div>
            {emailError && (
              <div className="mt-2 text-xs font-mono bg-black/10 p-2 rounded overflow-x-auto">
                {emailError}
              </div>
            )}
            {smsError && (
              <div className="mt-2 text-xs font-mono bg-black/10 p-2 rounded overflow-x-auto">
                {smsError}
              </div>
            )}
          </div>
        )}

        <div>
          <label htmlFor="stage" className="block text-sm font-medium text-text-secondary mb-2">
            New Stage
          </label>
          <select
            id="stage"
            value={newStage}
            onChange={(e) => setNewStage(Number(e.target.value))}
            className="w-full px-3 py-2.5 text-sm bg-bg-tertiary border border-border-primary rounded-lg text-text-primary focus:border-accent focus:ring-1 focus:ring-accent/20 outline-none transition-all appearance-none cursor-pointer"
          >
            {stages.map((stage) => (
              <option key={stage.id} value={stage.id}>
                {stage.id}. {stage.name}
                {stage.id === currentStage ? " (current)" : ""}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="note" className="block text-sm font-medium text-text-secondary mb-2">
            Note <span className="text-text-muted font-normal">(optional)</span>
          </label>
          <textarea
            id="note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={3}
            className="w-full px-3 py-2.5 text-sm bg-bg-tertiary border border-border-primary rounded-lg text-text-primary placeholder:text-text-muted focus:border-accent focus:ring-1 focus:ring-accent/20 outline-none resize-none transition-all"
            placeholder="Add a note about this status update..."
          />
          <p className="text-xs text-text-muted mt-1.5">
            This note will be included in the email/SMS notification.
          </p>
        </div>

        <button
          type="submit"
          disabled={loading || !canUpdate}
          className="w-full flex items-center justify-center gap-2 bg-accent hover:bg-accent-secondary text-white font-medium py-2.5 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <LoaderIcon className="w-4 h-4 animate-spin" />
              Updating...
            </>
          ) : (
            <>
              <SendIcon className="w-4 h-4" />
              Update Status & Notify Client
            </>
          )}
        </button>

        {!canUpdate && (
          <p className="text-xs text-center text-text-muted">
            Select a different stage to enable the update button.
          </p>
        )}
      </form>
    </div>
  );
}

function RefreshIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
    </svg>
  );
}

function AlertIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function SendIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
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
