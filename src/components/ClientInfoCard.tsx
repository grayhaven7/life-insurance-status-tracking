"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  createdAt: Date;
  assignedAdminId?: string | null;
}

interface Admin {
  id: string;
  name: string;
}

interface AssignedAdmin {
  id: string;
  name: string;
  contactEmail: string | null;
  contactPhone: string | null;
}

interface Props {
  client: Client;
  admins?: Admin[];
  assignedAdmin?: AssignedAdmin | null;
}

export default function ClientInfoCard({ client, admins = [], assignedAdmin }: Props) {
  const router = useRouter();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [updatingAdmin, setUpdatingAdmin] = useState(false);
  const [selectedAdminId, setSelectedAdminId] = useState(assignedAdmin?.id || "");
  
  // Edit mode state
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editForm, setEditForm] = useState({
    name: client.name,
    email: client.email,
    phone: client.phone || "",
  });
  const [error, setError] = useState("");

  const handleAdminChange = async (adminId: string) => {
    setSelectedAdminId(adminId);
    setUpdatingAdmin(true);
    try {
      const response = await fetch(`/api/clients/${client.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assignedAdminId: adminId || null }),
      });

      if (response.ok) {
        router.refresh();
      }
    } catch (error) {
      console.error("Failed to update assigned admin:", error);
      setSelectedAdminId(assignedAdmin?.id || "");
    } finally {
      setUpdatingAdmin(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const response = await fetch(`/api/clients/${client.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        router.push("/admin/dashboard");
        router.refresh();
      }
    } catch (error) {
      console.error("Failed to delete client:", error);
    } finally {
      setDeleting(false);
    }
  };

  const handleEditToggle = () => {
    if (isEditing) {
      // Cancel edit - reset form
      setEditForm({
        name: client.name,
        email: client.email,
        phone: client.phone || "",
      });
      setError("");
    }
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    setError("");
    
    // Basic validation
    if (!editForm.name.trim()) {
      setError("Name is required");
      return;
    }
    if (!editForm.email.trim()) {
      setError("Email is required");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editForm.email)) {
      setError("Please enter a valid email address");
      return;
    }

    setSaving(true);
    try {
      const response = await fetch(`/api/clients/${client.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: editForm.name.trim(),
          email: editForm.email.trim(),
          phone: editForm.phone.trim() || null,
        }),
      });

      if (response.ok) {
        setIsEditing(false);
        router.refresh();
      } else {
        const data = await response.json();
        setError(data.error || "Failed to save changes");
      }
    } catch (error) {
      console.error("Failed to update client:", error);
      setError("Failed to save changes");
    } finally {
      setSaving(false);
    }
  };

  const displayName = isEditing ? editForm.name : client.name;

  return (
    <div className="rounded-xl border border-border-primary bg-bg-secondary p-4 sm:p-6">
      <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-accent-muted flex items-center justify-center flex-shrink-0">
          <span className="text-lg sm:text-xl font-semibold text-accent">
            {displayName
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()
              .slice(0, 2)}
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-base sm:text-lg font-semibold text-text-primary truncate">{client.name}</h2>
            <button
              onClick={handleEditToggle}
              className="flex items-center gap-1.5 text-xs font-medium text-text-tertiary hover:text-accent transition-colors"
            >
              {isEditing ? (
                <>
                  <XIcon className="w-3.5 h-3.5" />
                  Cancel
                </>
              ) : (
                <>
                  <PencilIcon className="w-3.5 h-3.5" />
                  Edit
                </>
              )}
            </button>
          </div>
          <p className="text-xs sm:text-sm text-text-tertiary">
            Client since{" "}
            {new Date(client.createdAt).toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
      </div>

      {isEditing ? (
        <div className="space-y-3">
          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
              <p className="text-sm text-error">{error}</p>
            </div>
          )}
          
          <div>
            <label className="block text-xs font-medium text-text-muted uppercase tracking-wider mb-1.5">
              Name
            </label>
            <input
              type="text"
              value={editForm.name}
              onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
              className="w-full px-3 py-2.5 text-sm bg-bg-tertiary border border-border-primary rounded-lg text-text-primary focus:border-accent focus:ring-1 focus:ring-accent/20 outline-none transition-all"
              placeholder="Client name"
            />
          </div>
          
          <div>
            <label className="block text-xs font-medium text-text-muted uppercase tracking-wider mb-1.5">
              Email
            </label>
            <input
              type="email"
              value={editForm.email}
              onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
              className="w-full px-3 py-2.5 text-sm bg-bg-tertiary border border-border-primary rounded-lg text-text-primary focus:border-accent focus:ring-1 focus:ring-accent/20 outline-none transition-all"
              placeholder="client@example.com"
            />
          </div>
          
          <div>
            <label className="block text-xs font-medium text-text-muted uppercase tracking-wider mb-1.5">
              Phone
            </label>
            <input
              type="tel"
              value={editForm.phone}
              onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
              className="w-full px-3 py-2.5 text-sm bg-bg-tertiary border border-border-primary rounded-lg text-text-primary focus:border-accent focus:ring-1 focus:ring-accent/20 outline-none transition-all"
              placeholder="(555) 123-4567"
            />
          </div>
          
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full mt-2 bg-accent hover:bg-accent-hover text-white text-sm py-2.5 px-4 rounded-lg font-medium disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
          >
            {saving ? (
              <>
                <LoaderIcon className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <CheckIcon className="w-4 h-4" />
                Save Changes
              </>
            )}
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <a 
            href={`mailto:${client.email}`} 
            className="flex items-center gap-3 p-3 rounded-lg bg-bg-tertiary hover:bg-bg-hover transition-colors group"
          >
            <div className="w-8 h-8 rounded-lg bg-bg-elevated flex items-center justify-center">
              <MailIcon className="w-4 h-4 text-text-tertiary group-hover:text-accent transition-colors" />
            </div>
            <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors truncate">
              {client.email}
            </span>
          </a>
          {client.phone ? (
            <a 
              href={`tel:${client.phone}`} 
              className="flex items-center gap-3 p-3 rounded-lg bg-bg-tertiary hover:bg-bg-hover transition-colors group"
            >
              <div className="w-8 h-8 rounded-lg bg-bg-elevated flex items-center justify-center">
                <PhoneIcon className="w-4 h-4 text-text-tertiary group-hover:text-accent transition-colors" />
              </div>
              <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">
                {client.phone}
              </span>
            </a>
          ) : (
            <div className="flex items-center gap-3 p-3 rounded-lg bg-bg-tertiary">
              <div className="w-8 h-8 rounded-lg bg-bg-elevated flex items-center justify-center">
                <PhoneIcon className="w-4 h-4 text-text-muted" />
              </div>
              <span className="text-sm text-text-muted italic">No phone number</span>
            </div>
          )}
        </div>
      )}

      {/* Assigned Advisor */}
      {admins.length > 0 && (
        <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-border-primary">
          <label className="block text-xs font-medium text-text-muted uppercase tracking-wider mb-2">
            Assigned Advisor
          </label>
          <div className="relative">
            <select
              value={selectedAdminId}
              onChange={(e) => handleAdminChange(e.target.value)}
              disabled={updatingAdmin}
              className="w-full px-3 py-2.5 text-sm bg-bg-tertiary border border-border-primary rounded-lg text-text-primary focus:border-accent focus:ring-1 focus:ring-accent/20 outline-none transition-all disabled:opacity-50 appearance-none cursor-pointer"
            >
              <option value="">No advisor assigned</option>
              {admins.map((admin) => (
                <option key={admin.id} value={admin.id}>
                  {admin.name}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              {updatingAdmin ? (
                <LoaderIcon className="w-4 h-4 text-text-muted animate-spin" />
              ) : (
                <ChevronDownIcon className="w-4 h-4 text-text-muted" />
              )}
            </div>
          </div>
          {assignedAdmin?.contactEmail && (
            <p className="text-xs text-text-muted mt-2">
              Contact: {assignedAdmin.contactEmail}
            </p>
          )}
        </div>
      )}

      <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-border-primary">
        {!showDeleteConfirm ? (
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="flex items-center gap-2 text-sm font-medium text-error hover:text-red-400 transition-colors"
          >
            <TrashIcon className="w-4 h-4" />
            Delete Client
          </button>
        ) : (
          <div className="space-y-3">
            <p className="text-sm text-error">Are you sure? This cannot be undone.</p>
            <div className="flex gap-2">
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 bg-error hover:bg-red-600 text-white text-sm py-2 px-4 rounded-lg font-medium disabled:opacity-50 transition-colors"
              >
                {deleting ? "Deleting..." : "Yes, Delete"}
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 bg-bg-tertiary hover:bg-bg-hover text-text-secondary text-sm py-2 px-4 rounded-lg font-medium transition-colors border border-border-primary"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
    </svg>
  );
}

function TrashIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
    </svg>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
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

function PencilIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}
