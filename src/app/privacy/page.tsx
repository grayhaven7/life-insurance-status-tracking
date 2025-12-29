import type { Metadata } from "next";

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

export const metadata: Metadata = {
  title: "Privacy Policy | Emerald Tide Financial",
  description: "Privacy policy for taxfreepensions.com, including SMS/text messaging terms.",
};

export default function PrivacyPage() {
  const supportEmail = getSupportEmail();
  const supportPhone = getSupportPhone();

  return (
    <div className="bg-bg-primary">
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-semibold text-text-primary">Privacy Policy</h1>
          <p className="text-sm text-text-tertiary mt-2">
            Emerald Tide Financial &mdash; taxfreepensions.com
          </p>
        </div>

        <div className="rounded-xl border border-border-primary bg-bg-secondary p-5 sm:p-7 space-y-8">
          <section>
            <h2 className="text-base sm:text-lg font-semibold text-text-primary">Information We Collect</h2>
            <ul className="mt-3 space-y-2 text-sm text-text-secondary list-disc pl-5">
              <li>Name, email, phone number provided during client onboarding</li>
              <li>Application status and related documents</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base sm:text-lg font-semibold text-text-primary">How We Use Your Information</h2>
            <ul className="mt-3 space-y-2 text-sm text-text-secondary list-disc pl-5">
              <li>To process your Tax-Free Pension application</li>
              <li>To communicate application status updates via email and SMS</li>
              <li>To provide customer support</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base sm:text-lg font-semibold text-text-primary">SMS/Text Messaging Terms</h2>
            <p className="mt-3 text-sm text-text-secondary">
              By providing your phone number to Emerald Tide Financial, you consent to receive transactional SMS
              messages regarding your Tax-Free Pension application status.
            </p>
            <ul className="mt-3 space-y-2 text-sm text-text-secondary list-disc pl-5">
              <li>Message frequency varies based on application activity</li>
              <li>Message and data rates may apply</li>
              <li>Reply STOP to opt out at any time</li>
              <li>Reply HELP for assistance</li>
              <li>
                For support, contact us at{" "}
                <a className="text-accent hover:text-accent-secondary font-medium" href={`mailto:${supportEmail}`}>
                  {supportEmail}
                </a>{" "}
                or{" "}
                <a className="text-accent hover:text-accent-secondary font-medium" href={`tel:${supportPhone}`}>
                  {supportPhone}
                </a>
                .
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-base sm:text-lg font-semibold text-text-primary">Data Security</h2>
            <p className="mt-3 text-sm text-text-secondary">
              We implement appropriate security measures to protect your personal information.
            </p>
          </section>

          <section>
            <h2 className="text-base sm:text-lg font-semibold text-text-primary">Contact Us</h2>
            <p className="mt-3 text-sm text-text-secondary">
              For questions about this privacy policy, contact Emerald Tide Financial at{" "}
              <a className="text-accent hover:text-accent-secondary font-medium" href={`mailto:${supportEmail}`}>
                {supportEmail}
              </a>{" "}
              or{" "}
              <a className="text-accent hover:text-accent-secondary font-medium" href={`tel:${supportPhone}`}>
                {supportPhone}
              </a>
              .
            </p>
          </section>

          <section className="pt-2">
            <p className="text-xs text-text-muted">
              This page is provided for general informational purposes and may be updated from time to time.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}





