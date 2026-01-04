"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

interface InvitationData {
  email: string;
  name: string | null;
  contactEmail: string | null;
  contactPhone: string | null;
  invitedBy: string;
  expiresAt: string;
}

function AdminSignupContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [invitation, setInvitation] = useState<InvitationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!token) {
      setError("Invalid invitation link. No token provided.");
      setLoading(false);
      return;
    }

    // Validate invitation token
    fetch(`/api/admins/invitations/${token}`)
      .then(async (res) => {
        if (!res.ok) {
          let errorMessage = "Invalid or expired invitation";
          try {
            const data = await res.json();
            errorMessage = data.error || errorMessage;
          } catch {
            // If response is not JSON, use status text
            errorMessage = res.statusText || errorMessage;
          }
          throw new Error(errorMessage);
        }
        return res.json();
      })
      .then((data) => {
        setInvitation(data);
        setFormData((prev) => ({
          ...prev,
          name: data.name || "",
        }));
      })
      .catch((err) => {
        setError(err.message || "Failed to validate invitation");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!token) {
      setError("Invalid invitation link");
      return;
    }

    if (!formData.name || !formData.password) {
      setError("Name and password are required");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setSubmitting(true);

    try {
      // Accept invitation and create account
      const response = await fetch(`/api/admins/invitations/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          password: formData.password,
        }),
      });

      // Read response once
      const responseText = await response.text();
      let responseData: any = null;

      // Try to parse as JSON
      try {
        responseData = JSON.parse(responseText);
      } catch {
        // Not JSON, that's okay
      }

      if (!response.ok) {
        const errorMessage = responseData?.error || responseText || response.statusText || "Failed to create account";
        console.error("Signup error:", {
          status: response.status,
          statusText: response.statusText,
          error: responseData?.error,
          responseText,
        });
        throw new Error(errorMessage);
      }

      // Account created successfully
      console.log("Account created:", responseData);

      // Auto-login after account creation
      const result = await signIn("credentials", {
        email: invitation!.email,
        password: formData.password,
        loginType: "admin",
        redirect: false,
        callbackUrl: "/admin/dashboard",
      });

      if (result?.error) {
        // Account created but login failed, redirect to login
        router.push("/portal?message=Account created successfully. Please sign in.");
      } else if (result?.ok) {
        router.push("/admin/dashboard");
        router.refresh();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create account");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-primary flex flex-col items-center justify-center p-4">
        <div className="text-center text-text-secondary">Validating invitation...</div>
      </div>
    );
  }

  if (error && !invitation) {
    return (
      <div className="min-h-screen bg-bg-primary flex flex-col">
        <header className="px-4 py-4 sm:p-6 border-b border-border-primary">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center flex-shrink-0 shadow-sm">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none">
                  <path d="M12 3L5 10L12 21L19 10L12 3Z" fill="currentColor" fillOpacity="0.3" />
                  <path d="M12 3L5 10L12 21L19 10L12 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M5 10H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M12 3V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M8.5 10L12 21L15.5 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="min-w-0">
                <h1 className="text-sm font-semibold text-text-primary truncate">Emerald Tide Financial</h1>
                <p className="text-xs text-text-tertiary hidden sm:block">Admin Portal</p>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center p-4 sm:p-6">
          <div className="w-full max-w-sm">
            <div className="rounded-xl border border-error/20 bg-error-muted p-6 text-center">
              <AlertIcon className="w-12 h-12 text-error mx-auto mb-4" />
              <h2 className="text-lg font-semibold text-error mb-2">Invalid Invitation</h2>
              <p className="text-sm text-error mb-6">{error}</p>
              <Link
                href="/portal"
                className="inline-block bg-accent hover:bg-accent-secondary !text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Go to Login
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-primary flex flex-col">
      <header className="px-4 py-4 sm:p-6 border-b border-border-primary">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center flex-shrink-0 shadow-sm">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none">
                <path d="M12 3L5 10L12 21L19 10L12 3Z" fill="currentColor" fillOpacity="0.3" />
                <path d="M12 3L5 10L12 21L19 10L12 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M5 10H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M12 3V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M8.5 10L12 21L15.5 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="min-w-0">
              <h1 className="text-sm font-semibold text-text-primary truncate">Emerald Tide Financial</h1>
              <p className="text-xs text-text-tertiary hidden sm:block">Admin Portal</p>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-sm">
          <div className="text-center mb-6 sm:mb-8">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-bg-secondary border border-border-primary rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <UserPlusIcon className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
            </div>
            <h2 className="text-lg sm:text-xl font-semibold text-text-primary">Create Your Admin Account</h2>
            <p className="text-sm text-text-tertiary mt-1">
              You've been invited by {invitation?.invitedBy}
            </p>
            <p className="text-xs text-text-muted mt-2">
              Email: <strong>{invitation?.email}</strong>
            </p>
          </div>

          <div className="rounded-xl border border-border-primary bg-bg-secondary p-4 sm:p-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-error-muted border border-error/20 text-sm text-error">
                  <AlertIcon className="w-4 h-4 flex-shrink-0" />
                  {error}
                </div>
              )}

              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-text-secondary mb-2"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-3.5 py-2.5 text-sm bg-bg-tertiary border border-border-primary rounded-lg text-text-primary placeholder:text-text-muted focus:border-accent focus:ring-1 focus:ring-accent/20 outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-text-secondary mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                    minLength={8}
                    autoComplete="new-password"
                    className="w-full px-3.5 py-2.5 pr-20 text-sm bg-bg-tertiary border border-border-primary rounded-lg text-text-primary placeholder:text-text-muted focus:border-accent focus:ring-1 focus:ring-accent/20 outline-none transition-all"
                    placeholder="Enter a secure password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary text-xs px-2 py-1"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                <p className="text-xs text-text-muted mt-1">Must be at least 8 characters</p>
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-text-secondary mb-2"
                >
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  required
                  minLength={8}
                  autoComplete="new-password"
                  className="w-full px-3.5 py-2.5 text-sm bg-bg-tertiary border border-border-primary rounded-lg text-text-primary placeholder:text-text-muted focus:border-accent focus:ring-1 focus:ring-accent/20 outline-none transition-all"
                  placeholder="Confirm your password"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full flex items-center justify-center gap-2 bg-accent hover:bg-accent-secondary text-white font-medium py-2.5 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <LoaderIcon className="w-4 h-4 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>
          </div>

          <p className="mt-6 text-center text-sm text-text-tertiary">
            Already have an account?{" "}
            <Link href="/portal" className="text-accent hover:text-accent-secondary font-medium transition-colors">
              Sign In
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}

export default function AdminSignupPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-bg-primary flex flex-col items-center justify-center p-4">
        <div className="text-center text-text-secondary">Loading...</div>
      </div>
    }>
      <AdminSignupContent />
    </Suspense>
  );
}

function UserPlusIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM3 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 019.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
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

function LoaderIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
  );
}

