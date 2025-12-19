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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);

    try {
      const response = await fetch(`/api/clients/${clientId}/status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stage: newStage, note }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update status");
      }

      setSuccess(true);
      setNote("");
      router.refresh();

      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const canUpdate = newStage !== currentStage;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-primary mb-4">Update Status</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
            Status updated successfully! Email notification sent.
          </div>
        )}

        <div>
          <label htmlFor="stage" className="block text-sm font-medium text-gray-700 mb-2">
            New Stage
          </label>
          <select
            id="stage"
            value={newStage}
            onChange={(e) => setNewStage(Number(e.target.value))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-white"
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
          <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-2">
            Note (optional)
          </label>
          <textarea
            id="note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none"
            placeholder="Add a note about this status update..."
          />
          <p className="text-xs text-muted mt-1">
            This note will be included in the email notification.
          </p>
        </div>

        <button
          type="submit"
          disabled={loading || !canUpdate}
          className="w-full bg-accent hover:bg-accent-light text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Updating..." : "Update Status & Notify Client"}
        </button>

        {!canUpdate && (
          <p className="text-xs text-center text-muted">
            Select a different stage to enable the update button.
          </p>
        )}
      </form>
    </div>
  );
}
