import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CCPA Disclosure",
  description:
    "California Consumer Privacy Act (CCPA) disclosure for Emerald Tide Financial.",
};

export default function CCPAPage() {
  return (
    <div className="emerald-section bg-white">
      <div className="emerald-container">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-[var(--emerald-text-dark)] mb-8">
            California Consumer Privacy Act (CCPA) Disclosure
          </h1>

          <div className="prose prose-lg max-w-none text-[var(--emerald-text-body)]">
            <p className="text-[var(--emerald-text-muted)] mb-8">
              Last updated: January 2026
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[var(--emerald-text-dark)] mb-4">
                Your California Privacy Rights
              </h2>
              <p>
                If you are a California resident, the California Consumer
                Privacy Act (CCPA) provides you with specific rights regarding
                your personal information. This disclosure explains those rights
                and how to exercise them.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[var(--emerald-text-dark)] mb-4">
                Categories of Personal Information We Collect
              </h2>
              <p className="mb-4">
                In the preceding 12 months, we may have collected the following
                categories of personal information:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Identifiers:</strong> Name, email address, phone
                  number, mailing address
                </li>
                <li>
                  <strong>Financial Information:</strong> Information about your
                  financial situation as relevant to our services
                </li>
                <li>
                  <strong>Internet Activity:</strong> Browsing history on our
                  website, interactions with our online services
                </li>
                <li>
                  <strong>Geolocation Data:</strong> General location based on
                  IP address
                </li>
                <li>
                  <strong>Professional Information:</strong> Employment and
                  professional background as relevant to financial planning
                </li>
                <li>
                  <strong>Inferences:</strong> Profile reflecting your
                  preferences and financial goals
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[var(--emerald-text-dark)] mb-4">
                How We Use Personal Information
              </h2>
              <p className="mb-4">
                We use personal information for the following business purposes:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>To provide financial services and consultations</li>
                <li>To respond to your inquiries</li>
                <li>To improve our website and services</li>
                <li>To send marketing communications (with your consent)</li>
                <li>To comply with legal obligations</li>
                <li>To detect and prevent fraud</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[var(--emerald-text-dark)] mb-4">
                Sale of Personal Information
              </h2>
              <p>
                <strong>
                  Emerald Tide Financial does not sell your personal information
                  to third parties.
                </strong>{" "}
                We have not sold personal information in the preceding 12
                months.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[var(--emerald-text-dark)] mb-4">
                Your CCPA Rights
              </h2>
              <p className="mb-4">
                As a California resident, you have the following rights:
              </p>

              <div className="space-y-4">
                <div className="bg-[var(--emerald-bg-off-white)] p-4 rounded-lg">
                  <h3 className="font-semibold text-[var(--emerald-text-dark)] mb-2">
                    Right to Know
                  </h3>
                  <p className="text-sm">
                    You have the right to request that we disclose the
                    categories and specific pieces of personal information we
                    have collected about you, the categories of sources, our
                    business purposes for collecting the information, and the
                    categories of third parties with whom we share the
                    information.
                  </p>
                </div>

                <div className="bg-[var(--emerald-bg-off-white)] p-4 rounded-lg">
                  <h3 className="font-semibold text-[var(--emerald-text-dark)] mb-2">
                    Right to Delete
                  </h3>
                  <p className="text-sm">
                    You have the right to request that we delete personal
                    information we have collected from you, subject to certain
                    exceptions.
                  </p>
                </div>

                <div className="bg-[var(--emerald-bg-off-white)] p-4 rounded-lg">
                  <h3 className="font-semibold text-[var(--emerald-text-dark)] mb-2">
                    Right to Opt-Out of Sale
                  </h3>
                  <p className="text-sm">
                    You have the right to opt-out of the sale of your personal
                    information. As noted above, we do not sell personal
                    information.
                  </p>
                </div>

                <div className="bg-[var(--emerald-bg-off-white)] p-4 rounded-lg">
                  <h3 className="font-semibold text-[var(--emerald-text-dark)] mb-2">
                    Right to Non-Discrimination
                  </h3>
                  <p className="text-sm">
                    You have the right not to receive discriminatory treatment
                    for exercising your CCPA rights.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[var(--emerald-text-dark)] mb-4">
                How to Exercise Your Rights
              </h2>
              <p className="mb-4">
                To exercise your CCPA rights, you may submit a request by:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>
                  Emailing us at{" "}
                  <a
                    href="mailto:neil@emeraldtidefinancial.com"
                    className="text-[var(--emerald-primary)]"
                  >
                    neil@emeraldtidefinancial.com
                  </a>
                </li>
                <li>Calling us at (575) 363-7253</li>
                <li>
                  Writing to us at: 500 West Putnam Avenue, Suite 400,
                  Greenwich, CT 06830
                </li>
              </ul>
              <p>
                We will verify your identity before responding to your request.
                You may designate an authorized agent to make a request on your
                behalf.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[var(--emerald-text-dark)] mb-4">
                Response Timing
              </h2>
              <p>
                We will respond to verifiable consumer requests within 45 days.
                If we need more time (up to 90 days total), we will notify you
                in writing.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[var(--emerald-text-dark)] mb-4">
                Contact for More Information
              </h2>
              <p className="mb-4">
                For questions about this CCPA disclosure or our privacy
                practices:
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
          </div>
        </div>
      </div>
    </div>
  );
}
