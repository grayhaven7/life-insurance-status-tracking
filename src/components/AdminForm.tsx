"use client";

import { useState, useEffect } from "react";

interface Admin {
  id: string;
  name: string;
  email: string;
  contactEmail: string | null;
  contactPhone: string | null;
}

interface Props {
  admin: Admin | null;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AdminForm({ admin, onClose, onSuccess }: Props) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    contactEmail: "",
    contactPhone: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const isEditing = !!admin;

  useEffect(() => {
    if (admin) {
      setFormData({
        name: admin.name,
        email: admin.email,
        password: "",
        contactEmail: admin.contactEmail || "",
        contactPhone: admin.contactPhone || "",
      });
    }
  }, [admin]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      if (isEditing) {
        // Editing existing admin
        const body: any = {
          name: formData.name,
          email: formData.email,
          contactEmail: formData.contactEmail || null,
          contactPhone: formData.contactPhone || null,
        };

        // Only include password if provided
        if (formData.password && formData.password.trim() !== "") {
          body.password = formData.password;
        }

        const response = await fetch(`/api/admins/${admin.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || "Failed to update admin");
        }

        onSuccess();
      } else {
        // Creating new admin - send invitation
        const response = await fetch("/api/admins/invitations", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            contactEmail: formData.contactEmail || null,
            contactPhone: formData.contactPhone || null,
          }),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || "Failed to send invitation");
        }

        setSuccess(`Invitation sent to ${formData.email}. They will receive an email with instructions to create their account.`);
        // Close form after a short delay to show success message
        setTimeout(() => {
          onSuccess();
        }, 2000);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setLoading(false);
    }
  };


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-bg-secondary border border-border-primary rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-bg-secondary border-b border-border-primary px-6 py-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-text-primary">
            {isEditing ? "Edit Admin" : "Invite Admin"}
          </h2>
          <button
            onClick={onClose}
            className="text-text-muted hover:text-text-primary transition-colors"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="rounded-lg border border-error/20 bg-error-muted p-3 text-sm text-error">
              {error}
            </div>
          )}
          {success && (
            <div className="rounded-lg border border-success/20 bg-success-muted p-3 text-sm text-success">
              {success}
            </div>
          )}
          {!isEditing && (
            <div className="rounded-lg border border-info/20 bg-info-muted p-3 text-sm text-info">
              An invitation email will be sent to the admin. They will create their own password when they accept the invitation.
            </div>
          )}

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-1.5">
              Full Name <span className="text-error">*</span>
            </label>
            <input
              type="text"
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-border-primary rounded-lg bg-bg-primary text-text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-1.5">
              Email <span className="text-error">*</span>
            </label>
            <input
              type="email"
              id="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 border border-border-primary rounded-lg bg-bg-primary text-text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              placeholder="admin@example.com"
            />
          </div>

          {isEditing && (
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-text-secondary mb-1.5"
              >
                New Password
                <span className="text-text-muted text-xs"> (leave blank to keep current)</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-3 py-2 pr-20 border border-border-primary rounded-lg bg-bg-primary text-text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                  placeholder="Enter new password"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-text-muted hover:text-text-primary text-xs px-2 py-1"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
            </div>
          )}

          <div>
            <label
              htmlFor="contactEmail"
              className="block text-sm font-medium text-text-secondary mb-1.5"
            >
              Contact Email
              <span className="text-text-muted text-xs font-normal ml-1">
                (for client communications)
              </span>
            </label>
            <input
              type="email"
              id="contactEmail"
              value={formData.contactEmail}
              onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
              className="w-full px-3 py-2 border border-border-primary rounded-lg bg-bg-primary text-text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              placeholder="contact@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="contactPhone"
              className="block text-sm font-medium text-text-secondary mb-1.5"
            >
              Contact Phone
              <span className="text-text-muted text-xs font-normal ml-1">
                (for client communications)
              </span>
            </label>
            <input
              type="tel"
              id="contactPhone"
              value={formData.contactPhone}
              onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
              className="w-full px-3 py-2 border border-border-primary rounded-lg bg-bg-primary text-text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              placeholder="(555) 123-4567"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-border-primary rounded-lg text-text-secondary hover:text-text-primary hover:bg-bg-hover transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-accent hover:bg-accent-secondary !text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (isEditing ? "Updating..." : "Sending Invitation...") : isEditing ? "Update" : "Send Invitation"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

