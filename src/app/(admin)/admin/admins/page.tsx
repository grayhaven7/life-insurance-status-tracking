"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import AdminHeader from "@/components/AdminHeader";
import AdminForm from "@/components/AdminForm";

interface Admin {
  id: string;
  name: string;
  email: string;
  contactEmail: string | null;
  contactPhone: string | null;
  createdAt: string;
  updatedAt: string;
}

export default function AdminsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<Admin | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated" && session?.user.role === "admin") {
      fetchAdmins();
    }
  }, [status, session]);

  const fetchAdmins = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admins");
      if (!response.ok) throw new Error("Failed to fetch admins");
      const data = await response.json();
      setAdmins(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load admins");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingAdmin(null);
    setShowForm(true);
  };

  const handleEdit = (admin: Admin) => {
    setEditingAdmin(admin);
    setShowForm(true);
  };

  const handleDelete = async (admin: Admin) => {
    if (!confirm(`Are you sure you want to delete ${admin.name}? This action cannot be undone.`)) {
      return;
    }

    try {
      setError(null);
      const response = await fetch(`/api/admins/${admin.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to delete admin");
      }

      await fetchAdmins();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to delete admin";
      setError(errorMessage);
      // Also show alert for immediate feedback
      alert(errorMessage);
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingAdmin(null);
  };

  const handleFormSuccess = () => {
    fetchAdmins();
    handleFormClose();
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-bg-primary">
        <AdminHeader userName={session?.user.name || ""} />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="text-center text-text-secondary">Loading...</div>
        </main>
      </div>
    );
  }

  if (status === "unauthenticated" || session?.user.role !== "admin") {
    return null;
  }

  return (
    <div className="min-h-screen bg-bg-primary">
      <AdminHeader userName={session?.user.name || ""} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-text-primary">Admin Accounts</h2>
            <p className="text-sm text-text-tertiary mt-0.5">Manage administrator accounts</p>
          </div>
          <button
            onClick={handleCreate}
            className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-secondary !text-white px-4 py-2.5 sm:py-2 rounded-lg text-sm font-medium transition-colors"
          >
            <PlusIcon className="w-4 h-4" />
            Add Admin
          </button>
        </div>

        {error && (
          <div className="mb-6 rounded-lg border border-error/20 bg-error-muted p-4 text-sm text-error">
            {error}
          </div>
        )}

        {/* Admin list */}
        {admins.length === 0 ? (
          <div className="rounded-xl border border-border-primary bg-bg-secondary p-12 text-center">
            <div className="w-16 h-16 bg-bg-tertiary rounded-xl flex items-center justify-center mx-auto mb-4">
              <UsersIcon className="w-8 h-8 text-text-muted" />
            </div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">No admins yet</h3>
            <p className="text-text-tertiary mb-6 max-w-sm mx-auto">
              Get started by adding your first administrator account.
            </p>
            <button
              onClick={handleCreate}
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent-secondary !text-white px-5 py-2.5 rounded-lg font-medium transition-colors"
            >
              <PlusIcon className="w-4 h-4" />
              Add Your First Admin
            </button>
          </div>
        ) : (
          <div className="rounded-xl border border-border-primary bg-bg-secondary overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border-primary">
                    <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                      Admin
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider hidden md:table-cell">
                      Contact Info
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider hidden lg:table-cell">
                      Created
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-text-muted uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {admins.map((admin, idx) => (
                    <tr
                      key={admin.id}
                      className={`hover:bg-bg-hover transition-colors ${
                        idx !== admins.length - 1 ? "border-b border-border-secondary" : ""
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-accent-muted flex items-center justify-center flex-shrink-0">
                            <span className="text-xs font-medium text-accent">
                              {admin.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .toUpperCase()
                                .slice(0, 2)}
                            </span>
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-text-primary truncate">
                              {admin.name}
                            </p>
                            <p className="text-xs text-text-tertiary truncate md:hidden">
                              {admin.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 hidden md:table-cell">
                        <p className="text-sm text-text-secondary">{admin.email}</p>
                        {admin.contactEmail && (
                          <p className="text-xs text-text-muted">Contact: {admin.contactEmail}</p>
                        )}
                        {admin.contactPhone && (
                          <p className="text-xs text-text-muted">{admin.contactPhone}</p>
                        )}
                      </td>
                      <td className="px-6 py-4 hidden lg:table-cell">
                        <p className="text-sm text-text-tertiary">
                          {new Date(admin.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleEdit(admin)}
                            className="inline-flex items-center gap-1 text-text-secondary hover:text-accent text-sm font-medium transition-colors"
                          >
                            <PencilIcon className="w-4 h-4" />
                            <span className="hidden sm:inline">Edit</span>
                          </button>
                          {admin.id !== session?.user.id && (
                            <button
                              onClick={() => handleDelete(admin)}
                              className="inline-flex items-center gap-1 text-text-secondary hover:text-error text-sm font-medium transition-colors ml-2"
                            >
                              <TrashIcon className="w-4 h-4" />
                              <span className="hidden sm:inline">Delete</span>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Admin Form Modal */}
      {showForm && (
        <AdminForm
          admin={editingAdmin}
          onClose={handleFormClose}
          onSuccess={handleFormSuccess}
        />
      )}
    </div>
  );
}

function UsersIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
      />
    </svg>
  );
}

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  );
}

function PencilIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
      />
    </svg>
  );
}

function TrashIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
      />
    </svg>
  );
}

