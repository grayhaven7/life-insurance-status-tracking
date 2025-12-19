import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg-primary flex flex-col">
      {/* Header with theme toggle */}
      <header className="p-6 flex justify-end">
        <ThemeToggle />
      </header>
      
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-bg-secondary border border-border-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">🔍</span>
          </div>
          <h1 className="text-5xl font-bold text-text-primary mb-2">404</h1>
          <h2 className="text-xl font-semibold text-text-primary mb-3">Page Not Found</h2>
          <p className="text-text-tertiary mb-8">
            The page you are looking for does not exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-secondary text-white px-5 py-2.5 rounded-lg font-medium transition-colors"
            >
              Client Login
            </Link>
            <Link
              href="/admin/login"
              className="inline-flex items-center justify-center gap-2 bg-bg-secondary hover:bg-bg-hover border border-border-primary text-text-secondary hover:text-text-primary px-5 py-2.5 rounded-lg font-medium transition-colors"
            >
              Admin Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
