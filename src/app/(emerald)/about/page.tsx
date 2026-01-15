import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Emerald Tide Financial and our mission to help clients build tax-free retirement income through Tax-Free Pensions.",
};

const CALENDLY_URL = "https://calendly.com/d/cmd8-9f4-5jf/tax-free-pension-tfp";

const CheckIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

// Decorative bubble component
const Bubble = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <div
    className={`absolute rounded-full pointer-events-none ${className || ''}`}
    style={{
      background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8) 0%, rgba(0, 180, 216, 0.15) 40%, transparent 70%)',
      ...style,
    }}
  />
);

const valueProps = [
  {
    title: "Security",
    description:
      "Your principal is protected from market downturns. Sleep soundly knowing your retirement funds are secure, regardless of market conditions.",
  },
  {
    title: "Expertise",
    description:
      "Our team has decades of combined experience in financial services. We leverage strategies most advisors don't know about or can't access.",
  },
  {
    title: "Personalized Service",
    description:
      "We take the time to understand your unique situation and goals. Your Tax-Free Pension strategy is tailored specifically to you.",
  },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero Section - Frutiger Aero sky gradient */}
      <section
        className="emerald-hero py-20 md:py-28 relative overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, #E0F7FA 0%, #F0F9FF 40%, #FFFFFF 100%)',
        }}
      >
        <Bubble className="hidden sm:block w-32 h-32 top-10 right-10 opacity-50" />
        <Bubble className="hidden sm:block w-20 h-20 bottom-10 left-20 opacity-40" style={{ background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.9) 0%, rgba(124, 181, 24, 0.15) 40%, transparent 70%)' }} />

        <div className="emerald-container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <p className="emerald-eyebrow mx-auto">Our Story</p>
            <h1 className="emerald-title mb-8">
              About{" "}
              <span className="emerald-highlight">
                Emerald Tide Financial
              </span>
            </h1>
            <p className="emerald-lead text-[var(--text-body)]">
              We are dedicated to helping individuals and families create robust,
              tax-free pensions that provide financial security for life.
            </p>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section
        className="emerald-section"
        style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #F0F9FF 100%)' }}
      >
        <div className="emerald-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="emerald-eyebrow">Our Focus</p>
              <h2 className="emerald-section-title mb-6">
                Specializing in{" "}
                <span className="emerald-highlight">
                  Tax-Free Pensions
                </span>
              </h2>
              <p className="emerald-lead text-[var(--text-body)] mb-4">
                At Emerald Tide Financial, we specialize exclusively in Tax-Free
                Pension strategies. We believe that everyone deserves access to
                sophisticated retirement strategies that were once reserved for
                the wealthy.
              </p>
              <p className="text-[var(--text-muted)] mb-4">
                Our founder, Neil Gronowetter, walked away from a robust pension
                and benefits package to fulfill his vision of serving clients
                first—not any particular company or product. This independence
                allows us to deliver services and strategies that most advisors
                and their accountants don&apos;t know about or can&apos;t access.
              </p>
              <p className="text-[var(--text-muted)]">
                When you work with Emerald Tide Financial, you&apos;re partnering with
                a team that puts your interests first, always.
              </p>
            </div>
            <div className="relative">
              <Bubble className="hidden sm:block w-24 h-24 -top-5 -right-5 opacity-30" style={{ background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8) 0%, rgba(124, 181, 24, 0.15) 40%, transparent 70%)' }} />
              <div className="emerald-card">
                <h3 className="emerald-heading text-2xl mb-6">
                  The Tax-Free Pension Advantage
                </h3>
                <ul className="space-y-4">
                  {[
                    "Tax-free growth on your contributions",
                    "Tax-free income in retirement",
                    "Principal protected from market losses",
                    "No government contribution limits",
                    "Flexible access to your funds",
                    "Legacy benefits for your loved ones",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{
                          background: 'linear-gradient(135deg, #9ACD32 0%, #7CB518 50%, #5A8A0F 100%)',
                          boxShadow: '0 2px 6px rgba(124, 181, 24, 0.3), inset 0 1px 0 rgba(255,255,255,0.3)',
                        }}
                      >
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      </div>
                      <span className="text-[var(--text-body)]">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section
        className="emerald-section relative overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, #F0FDF4 0%, #F0F9FF 50%, #FFFFFF 100%)',
        }}
      >
        <Bubble className="hidden sm:block w-40 h-40 top-10 -left-10 opacity-30" />
        <Bubble className="hidden sm:block w-28 h-28 bottom-20 right-10 opacity-25" style={{ background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8) 0%, rgba(124, 181, 24, 0.1) 40%, transparent 70%)' }} />

        <div className="emerald-container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <p className="emerald-eyebrow mx-auto">Our Purpose</p>
            <h2 className="emerald-section-title mb-6">
              Our Mission
            </h2>
            <p className="emerald-lead text-[var(--text-body)] mb-5">
              To help every client build a tax-free retirement income stream
              that provides financial security and peace of mind for life.
            </p>
            <p className="text-[var(--text-muted)] leading-relaxed">
              We accomplish this through personalized service, independent
              advice, and access to strategies that most financial professionals
              simply don&apos;t know exist.
            </p>
          </div>
        </div>
      </section>

      {/* Value Propositions */}
      <section
        className="emerald-section"
        style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #F0F9FF 100%)' }}
      >
        <div className="emerald-container">
          <div className="text-center mb-16">
            <p className="emerald-eyebrow mx-auto">Why Us</p>
            <h2 className="emerald-section-title mb-5">
              Why Choose Emerald Tide Financial?
            </h2>
            <p className="emerald-lead max-w-2xl mx-auto">
              What sets us apart in helping you achieve your tax-free retirement
              goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {valueProps.map((prop, index) => (
              <div
                key={index}
                className="emerald-feature-card"
              >
                <div className="emerald-icon-box mb-4">
                  <CheckIcon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[var(--text-dark)] mb-2">
                  {prop.title}
                </h3>
                <p className="text-[var(--text-muted)]">
                  {prop.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Ocean gradient */}
      <section
        className="emerald-section relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0077B6 0%, #023E8A 50%, #03045E 100%)',
        }}
      >
        <Bubble className="hidden sm:block w-32 h-32 top-10 right-20 opacity-20" />
        <Bubble className="hidden sm:block w-24 h-24 bottom-10 left-10 opacity-15" />

        <div className="emerald-container relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="emerald-section-title mb-4 text-white">
              Ready to Get Started?
            </h2>
            <p className="emerald-lead mb-8 text-white/80">
              Book a free consultation to learn how a Tax-Free Pension can work
              for your specific situation.
            </p>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="emerald-btn-primary text-lg px-8 py-4 inline-flex items-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                />
              </svg>
              Book Your Free Consultation
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
