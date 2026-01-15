import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Emerald Tide Financial privacy policy and data protection practices.",
};

export default function PrivacyPage() {
  return (
    <div className="emerald-section bg-white">
      <div className="emerald-container">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-[var(--emerald-text-dark)] mb-8">
            Privacy Policy
          </h1>

          <div className="prose prose-lg max-w-none text-[var(--emerald-text-body)]">
            <p className="text-[var(--emerald-text-muted)] mb-8">
              Last updated: January 2026
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[var(--emerald-text-dark)] mb-4">
                Introduction
              </h2>
              <p>
                Emerald Tide Financial (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) respects your
                privacy and is committed to protecting your personal
                information. This Privacy Policy explains how we collect, use,
                disclose, and safeguard your information when you visit our
                website or use our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[var(--emerald-text-dark)] mb-4">
                Information We Collect
              </h2>
              <p className="mb-4">
                We may collect personal information that you provide directly to
                us, including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Contact information (name, email address, phone number,
                  mailing address)
                </li>
                <li>Financial information relevant to our services</li>
                <li>
                  Communications you send to us (emails, contact form
                  submissions)
                </li>
                <li>Information provided during consultations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[var(--emerald-text-dark)] mb-4">
                How We Use Your Information
              </h2>
              <p className="mb-4">We use your information to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide and improve our financial services</li>
                <li>Respond to your inquiries and requests</li>
                <li>Send you information about our services (with your consent)</li>
                <li>Comply with legal and regulatory requirements</li>
                <li>Protect against fraud and unauthorized transactions</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[var(--emerald-text-dark)] mb-4">
                SMS Communications
              </h2>
              <p className="mb-4">
                If you opt-in to receive SMS text messages from us:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  We will send you text messages related to your inquiry or our
                  services
                </li>
                <li>Message frequency varies based on your interactions</li>
                <li>Message and data rates may apply</li>
                <li>You can opt-out at any time by replying STOP to any message</li>
                <li>
                  For help, reply HELP or contact us at
                  neil@emeraldtidefinancial.com
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[var(--emerald-text-dark)] mb-4">
                Information Sharing
              </h2>
              <p className="mb-4">
                We do not sell your personal information. We may share your
                information with:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Service providers who assist us in operating our business
                </li>
                <li>
                  Financial institutions as necessary to provide our services
                </li>
                <li>
                  Legal authorities when required by law or to protect our
                  rights
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[var(--emerald-text-dark)] mb-4">
                Data Security
              </h2>
              <p>
                We implement appropriate technical and organizational measures
                to protect your personal information against unauthorized
                access, alteration, disclosure, or destruction. However, no
                method of transmission over the Internet or electronic storage
                is 100% secure.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[var(--emerald-text-dark)] mb-4">
                Your Rights
              </h2>
              <p className="mb-4">
                Depending on your location, you may have the right to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Opt-out of certain data uses</li>
                <li>Withdraw consent for marketing communications</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[var(--emerald-text-dark)] mb-4">
                Contact Us
              </h2>
              <p className="mb-4">
                If you have questions about this Privacy Policy or our privacy
                practices, please contact us:
              </p>
              <div className="bg-[var(--emerald-bg-off-white)] p-4 rounded-lg">
                <p>
                  <strong>Emerald Tide Financial</strong>
                </p>
                <p>500 West Putnam Avenue, Suite 400</p>
                <p>Greenwich, CT 06830</p>
                <p>
                  Email:{" "}
                  <a
                    href="mailto:neil@emeraldtidefinancial.com"
                    className="text-[var(--emerald-primary)]"
                  >
                    neil@emeraldtidefinancial.com
                  </a>
                </p>
                <p>Phone: (575) 363-7253</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[var(--emerald-text-dark)] mb-4">
                Changes to This Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time. We will
                notify you of any changes by posting the new Privacy Policy on
                this page and updating the &quot;Last updated&quot; date.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
