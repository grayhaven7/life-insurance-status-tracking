"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminHeader from "@/components/AdminHeader";
import Link from "next/link";

interface EmailOpen {
  id: string;
  trackingId: string;
  clientId: string;
  emailType: string;
  subject: string | null;
  firstOpenedAt: string | null;
  lastOpenedAt: string | null;
  openCount: number;
  createdAt: string;
  client: {
    id: string;
    name: string;
    email: string;
  };
}

export default function EmailTrackingDebugPage() {
  const router = useRouter();
  const [emailOpens, setEmailOpens] = useState<EmailOpen[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [testResult, setTestResult] = useState<any>(null);
  const [testLoading, setTestLoading] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState<string>("");
  const [clients, setClients] = useState<Array<{ id: string; name: string; email: string }>>([]);

  useEffect(() => {
    fetchEmailOpens();
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await fetch("/api/clients");
      if (response.ok) {
        const data = await response.json();
        setClients(data);
        if (data.length > 0 && !selectedClientId) {
          setSelectedClientId(data[0].id);
        }
      }
    } catch (err) {
      console.error("Error fetching clients:", err);
    }
  };

  const fetchEmailOpens = async () => {
    try {
      setLoading(true);
      setError(null);
      const url = selectedClientId
        ? `/api/debug/email-tracking?clientId=${selectedClientId}`
        : "/api/debug/email-tracking";
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch email tracking data");
      }

      setEmailOpens(data.emailOpens || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load email tracking data");
      console.error("Error fetching email opens:", err);
    } finally {
      setLoading(false);
    }
  };

  const createTestTracking = async () => {
    if (!selectedClientId) {
      setError("Please select a client");
      return;
    }

    try {
      setTestLoading(true);
      setError(null);
      const response = await fetch("/api/debug/email-tracking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientId: selectedClientId,
          emailType: "status_update",
          subject: "Test Email - " + new Date().toLocaleString(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create test tracking");
      }

      setTestResult(data);
      fetchEmailOpens();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create test tracking");
      console.error("Error creating test tracking:", err);
    } finally {
      setTestLoading(false);
    }
  };

  const testTrackingPixel = async (trackingId: string) => {
    try {
      const baseUrl = window.location.origin;
      const trackingUrl = `${baseUrl}/api/track/${trackingId}`;
      
      // Simulate email client loading the pixel
      const response = await fetch(trackingUrl, {
        method: "GET",
        headers: {
          "User-Agent": "Email Tracking Test/1.0",
        },
      });

      if (response.ok) {
        alert(`Tracking pixel loaded successfully!\n\nTracking ID: ${trackingId}\nStatus: ${response.status}\n\nRefresh the page to see updated open count.`);
        fetchEmailOpens();
      } else {
        alert(`Failed to load tracking pixel. Status: ${response.status}`);
      }
    } catch (err) {
      alert(`Error testing tracking pixel: ${err instanceof Error ? err.message : String(err)}`);
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary">
      <AdminHeader userName="Debug" />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-6">
          <Link href="/admin/dashboard" className="text-text-tertiary hover:text-text-secondary transition-colors">
            Dashboard
          </Link>
          <ChevronRightIcon className="w-4 h-4 text-text-muted" />
          <span className="text-text-primary font-medium">Email Tracking Debug</span>
        </nav>

        <div className="space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-2xl font-bold text-text-primary mb-2">Email Tracking Debug</h1>
            <p className="text-text-tertiary">
              Test and debug email open tracking functionality
            </p>
          </div>

          {/* Error Display */}
          {error && (
            <div className="rounded-lg border border-error bg-error-muted p-4">
              <p className="text-sm text-error">{error}</p>
            </div>
          )}

          {/* Test Section */}
          <div className="rounded-xl border border-border-primary bg-bg-secondary p-4 sm:p-6">
            <h2 className="text-lg font-semibold text-text-primary mb-4">Create Test Tracking</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Select Client
                </label>
                <select
                  value={selectedClientId}
                  onChange={(e) => setSelectedClientId(e.target.value)}
                  className="w-full px-3 py-2 border border-border-primary rounded-lg bg-bg-primary text-text-primary"
                >
                  <option value="">All Clients</option>
                  {clients.map((client) => (
                    <option key={client.id} value={client.id}>
                      {client.name} ({client.email})
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={createTestTracking}
                disabled={testLoading || !selectedClientId}
                className="px-4 py-2 bg-accent hover:bg-accent-secondary text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {testLoading ? "Creating..." : "Create Test Email Tracking"}
              </button>
            </div>

            {testResult && (
              <div className="mt-4 p-4 bg-bg-tertiary rounded-lg border border-border-secondary">
                <h3 className="text-sm font-semibold text-text-primary mb-2">Test Tracking Created</h3>
                <div className="space-y-2 text-xs font-mono">
                  <div>
                    <span className="text-text-muted">Tracking ID:</span>{" "}
                    <span className="text-text-primary">{testResult.trackingId}</span>
                  </div>
                  <div>
                    <span className="text-text-muted">Tracking URL:</span>{" "}
                    <a
                      href={testResult.trackingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:underline break-all"
                    >
                      {testResult.trackingUrl}
                    </a>
                  </div>
                  <button
                    onClick={() => testTrackingPixel(testResult.trackingId)}
                    className="mt-2 px-3 py-1.5 bg-accent hover:bg-accent-secondary text-white rounded text-xs font-medium"
                  >
                    Test Tracking Pixel
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Email Opens List */}
          <div className="rounded-xl border border-border-primary bg-bg-secondary p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-text-primary">
                Email Tracking Records ({emailOpens.length})
              </h2>
              <button
                onClick={fetchEmailOpens}
                className="px-3 py-1.5 text-sm bg-bg-tertiary hover:bg-bg-hover text-text-secondary rounded-lg"
              >
                Refresh
              </button>
            </div>

            {loading ? (
              <div className="text-center py-8">
                <p className="text-text-tertiary">Loading...</p>
              </div>
            ) : emailOpens.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-text-tertiary">No email tracking records found</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border-primary">
                      <th className="px-4 py-2 text-left text-xs font-medium text-text-muted">Client</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-text-muted">Type</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-text-muted">Subject</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-text-muted">Opens</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-text-muted">First Opened</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-text-muted">Last Opened</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-text-muted">Created</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-text-muted">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {emailOpens.map((emailOpen) => (
                      <tr key={emailOpen.id} className="border-b border-border-secondary hover:bg-bg-hover">
                        <td className="px-4 py-3">
                          <div>
                            <p className="text-sm font-medium text-text-primary">{emailOpen.client.name}</p>
                            <p className="text-xs text-text-muted">{emailOpen.client.email}</p>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-xs px-2 py-1 bg-accent-muted text-accent rounded">
                            {emailOpen.emailType}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm text-text-secondary truncate max-w-xs">
                            {emailOpen.subject || "-"}
                          </p>
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`text-sm font-medium ${
                              emailOpen.openCount > 0 ? "text-success" : "text-text-muted"
                            }`}
                          >
                            {emailOpen.openCount}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-xs text-text-tertiary">
                            {emailOpen.firstOpenedAt
                              ? new Date(emailOpen.firstOpenedAt).toLocaleString()
                              : "-"}
                          </p>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-xs text-text-tertiary">
                            {emailOpen.lastOpenedAt
                              ? new Date(emailOpen.lastOpenedAt).toLocaleString()
                              : "-"}
                          </p>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-xs text-text-muted">
                            {new Date(emailOpen.createdAt).toLocaleString()}
                          </p>
                        </td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => testTrackingPixel(emailOpen.trackingId)}
                            className="text-xs px-2 py-1 bg-accent hover:bg-accent-secondary text-white rounded"
                          >
                            Test
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
  );
}

