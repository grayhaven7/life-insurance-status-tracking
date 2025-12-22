import Link from "next/link";

function getSupportEmail(): string {
  return process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "support@taxfreepensions.com";
}

function getSupportPhone(): string {
  return (
    process.env.NEXT_PUBLIC_SUPPORT_PHONE ||
    process.env.TWILIO_FROM_NUMBER ||
    process.env.TWILIO_PHONE_NUMBER ||
    "+15551234567"
  );
}

export default function SiteFooter() {
  const supportEmail = getSupportEmail();
  const supportPhone = getSupportPhone();

  return (
    <footer className="border-t border-border-primary">
      <div className="px-4 py-4 sm:p-6 max-w-7xl mx-auto flex flex-col sm:flex-row gap-2 sm:gap-4 items-center justify-between text-xs text-text-muted">
        <p>
          &copy; {new Date().getFullYear()} Emerald Tide Financial. All rights reserved.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
          <Link href="/privacy" className="hover:text-text-secondary transition-colors">
            Privacy Policy
          </Link>
          <span className="text-text-muted/70">Support:</span>
          <a className="hover:text-text-secondary transition-colors" href={`mailto:${supportEmail}`}>
            {supportEmail}
          </a>
          <a className="hover:text-text-secondary transition-colors" href={`tel:${supportPhone}`}>
            {supportPhone}
          </a>
        </div>
      </div>
    </footer>
  );
}


