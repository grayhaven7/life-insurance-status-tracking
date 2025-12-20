"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  createdAt: Date;
}

interface Props {
  client: Client;
}

export default function ClientInfoCard({ client }: Props) {
  const router = useRouter();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

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

  return (
    <div className="rounded-xl border border-border-primary bg-bg-secondary p-6">
      <div className="flex items-start gap-4 mb-6">
        <div className="w-14 h-14 rounded-xl bg-accent-muted flex items-center justify-center flex-shrink-0">
          <span className="text-xl font-semibold text-accent">
            {client.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()
              .slice(0, 2)}
          </span>
        </div>
        <div className="min-w-0">
          <h2 className="text-lg font-semibold text-text-primary truncate">{client.name}</h2>
          <p className="text-sm text-text-tertiary">
            Client since{" "}
            {new Date(client.createdAt).toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
      </div>

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
        {client.phone && (
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
        )}
      </div>

      <div className="mt-6 pt-6 border-t border-border-primary">
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
                className="flex-1 bg-error hover:bg-red-600 text-btn-text text-sm py-2 px-4 rounded-lg font-medium disabled:opacity-50 transition-colors"
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
