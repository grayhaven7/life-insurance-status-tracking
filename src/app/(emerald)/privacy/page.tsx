import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Emerald Tide Financial privacy policy and data protection practices.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#CBE4F6]">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <Link
          href="/l1"
          className="inline-flex items-center gap-2 mb-8 px-6 py-3 bg-[#123375] rounded-lg shadow-lg hover:bg-[#0A1D42] hover:shadow-xl transition-all"
          style={{ color: "#ffffff", fontWeight: 700 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m12 19-7-7 7-7" />
            <path d="M19 12H5" />
          </svg>
          Back to Homepage
        </Link>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-4xl font-bold text-[#123375] mb-8">
            Privacy Policy
          </h1>

          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="text-gray-500 mb-8">
              Last updated: January 2026
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#123375] mb-4">
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
              <h2 className="text-2xl font-semibold text-[#123375] mb-4">
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
              <h2 className="text-2xl font-semibold text-[#123375] mb-4">
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
              <h2 className="text-2xl font-semibold text-[#123375] mb-4">
                SMS Communications &amp; Terms
              </h2>
              <p className="mb-4">
                By providing your phone number to Tax Free Pensions and/or
                Emerald Tide Financial, you consent to receive transactional
                SMS messages related to your inquiry, appointment reminders,
                and service updates.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Message frequency varies</strong> — You may receive
                  SMS messages related to your inquiry, scheduled consultations,
                  and service-related updates. The number of messages depends on
                  your interactions with us.
                </li>
                <li>
                  <strong>Message and data rates may apply</strong> — Standard
                  messaging rates from your wireless carrier may apply to SMS
                  messages sent and received.
                </li>
                <li>
                  <strong>Reply STOP to opt out</strong> — You may opt out of
                  receiving SMS messages at any time by replying STOP to any
                  message you receive from us. After opting out, you will
                  receive a confirmation message and will no longer receive SMS
                  communications from us.
                </li>
                <li>
                  <strong>Reply HELP for assistance</strong> — If you need help
                  or have questions about our SMS communications, reply HELP to
                  any message or contact us at{" "}
                  <a
                    href="mailto:neil@emeraldtidefinancial.com"
                    className="text-[#123375] hover:underline"
                  >
                    neil@emeraldtidefinancial.com
                  </a>{" "}
                  or call (575) 363-7253.
                </li>
              </ul>
              <p className="mt-4">
                We do not share your phone number or SMS opt-in data with third
                parties for marketing purposes. Your consent to receive SMS
                messages is not a condition of purchasing any goods or services
                from Emerald Tide Financial.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#123375] mb-4">
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
              <h2 className="text-2xl font-semibold text-[#123375] mb-4">
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
              <h2 className="text-2xl font-semibold text-[#123375] mb-4">
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
              <h2 className="text-2xl font-semibold text-[#123375] mb-4">
                Contact Us
              </h2>
              <p className="mb-4">
                If you have questions about this Privacy Policy or our privacy
                practices, please contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p>
                  <strong>Tax Free Pensions</strong>
                </p>
                <p>500 West Putnam Avenue, Suite 400</p>
                <p>Greenwich, CT 06830</p>
                <p>
                  Email:{" "}
                  <a
                    href="mailto:neil@emeraldtidefinancial.com"
                    className="text-[#123375] hover:underline"
                  >
                    neil@emeraldtidefinancial.com
                  </a>
                </p>
                <p>Phone: (575) 363-7253</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#123375] mb-4">
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

        <footer className="text-center py-6 text-gray-600 text-sm">
          <p>&copy; 2026 Tax Free Pensions. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
