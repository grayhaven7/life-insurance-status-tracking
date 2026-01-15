"use client";

import ContactForm from "@/components/emerald/ContactForm";

const CALENDLY_URL = "https://calendly.com/d/cmd8-9f4-5jf/tax-free-pension-tfp";

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

const PhoneIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
    />
  </svg>
);

const EmailIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
    />
  </svg>
);

const LocationIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
    />
  </svg>
);

const CalendarIcon = ({ className }: { className?: string }) => (
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
      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
    />
  </svg>
);

export default function ContactPage() {
  return (
    <div>
      {/* Hero Section - Frutiger Aero sky gradient */}
      <section
        className="emerald-hero py-20 md:py-28 relative overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, #E0F7FA 0%, #F0F9FF 40%, #FFFFFF 100%)',
        }}
      >
        <Bubble className="hidden sm:block w-36 h-36 top-10 right-10 opacity-50" />
        <Bubble className="hidden sm:block w-24 h-24 bottom-20 left-20 opacity-40" style={{ background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.9) 0%, rgba(124, 181, 24, 0.15) 40%, transparent 70%)' }} />

        <div className="emerald-container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <p className="emerald-eyebrow mx-auto">Contact</p>
            <h1 className="emerald-title mb-8">
              Get in{" "}
              <span className="emerald-highlight">Touch</span>
            </h1>
            <p className="emerald-lead text-[var(--text-body)]">
              Have questions about Tax-Free Pensions? We&apos;re here to help. Reach
              out to our team or book a free consultation.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        className="emerald-section relative overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, #FFFFFF 0%, #F0F9FF 50%, #FFFFFF 100%)',
        }}
      >
        <Bubble className="hidden sm:block w-28 h-28 bottom-40 -right-10 opacity-30" />
        <Bubble className="hidden sm:block w-20 h-20 top-20 left-10 opacity-25" style={{ background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8) 0%, rgba(124, 181, 24, 0.1) 40%, transparent 70%)' }} />

        <div className="emerald-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* Left - Contact Info */}
            <div>
              <p className="emerald-eyebrow">Reach Out</p>
              <h2 className="emerald-section-title mb-8">
                Contact Information
              </h2>

              <div className="space-y-6 mb-10">
                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="emerald-icon-box flex-shrink-0">
                    <PhoneIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[var(--text-dark)] mb-1 uppercase text-sm tracking-wide">
                      Phone
                    </h3>
                    <a
                      href="tel:+15753637253"
                      className="text-[var(--sky-blue)] hover:underline text-lg font-semibold"
                    >
                      (575) 363-7253
                    </a>
                    <p className="text-sm text-[var(--text-muted)] mt-1">
                      575.EMERALD
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="emerald-icon-box flex-shrink-0">
                    <EmailIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[var(--text-dark)] mb-1 uppercase text-sm tracking-wide">
                      Email
                    </h3>
                    <a
                      href="mailto:neil@emeraldtidefinancial.com"
                      className="text-[var(--sky-blue)] hover:underline font-semibold"
                    >
                      neil@emeraldtidefinancial.com
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="emerald-icon-box flex-shrink-0">
                    <LocationIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[var(--text-dark)] mb-1 uppercase text-sm tracking-wide">
                      Address
                    </h3>
                    <p className="text-[var(--text-muted)]">
                      500 West Putnam Avenue
                      <br />
                      Suite 400
                      <br />
                      Greenwich, CT 06830
                    </p>
                  </div>
                </div>
              </div>

              {/* Google Map - Glass frame with responsive height */}
              <div
                className="rounded-2xl overflow-hidden mb-10 aspect-video md:aspect-auto"
                style={{
                  boxShadow: '0 8px 32px rgba(0, 180, 216, 0.12), 0 2px 8px rgba(0, 0, 0, 0.04)',
                  border: '1px solid rgba(0, 180, 216, 0.15)',
                }}
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3006.0037384562164!2d-73.6302!3d41.0349!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c298a0c3af7e4b%3A0x4a2e5d0a6b6b1c6a!2s500%20W%20Putnam%20Ave%2C%20Greenwich%2C%20CT%2006830!5e0!3m2!1sen!2sus!4v1699999999999!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  className="w-full h-full min-h-[200px] md:min-h-[250px]"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Emerald Tide Financial Location"
                />
              </div>

              {/* Book a Call CTA - Glass card */}
              <div className="emerald-glass-card">
                <h3 className="emerald-heading text-xl mb-3">
                  Prefer to schedule directly?
                </h3>
                <p className="text-[var(--text-muted)] mb-6">
                  Book a free consultation to speak with our team about your
                  retirement goals.
                </p>
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="emerald-btn-primary inline-flex items-center gap-2"
                >
                  <CalendarIcon className="w-5 h-5" />
                  Book Your Free Consultation
                </a>
              </div>
            </div>

            {/* Right - Contact Form */}
            <div>
              <div className="emerald-card">
                <h2 className="emerald-section-title mb-8">
                  Send Us a Message
                </h2>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
