"use client";

import ContactForm from "@/components/emerald/ContactForm";
import Image from "next/image";

const CALENDLY_URL = "https://calendly.com/d/cmd8-9f4-5jf/tax-free-pension-tfp";

const CheckIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.5 12.75l6 6 9-13.5"
    />
  </svg>
);

const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
    />
  </svg>
);

const PhoneIcon = ({ className }: { className?: string }) => (
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
      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
    />
  </svg>
);

const EmailIcon = ({ className }: { className?: string }) => (
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
      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
    />
  </svg>
);

const LocationIcon = ({ className }: { className?: string }) => (
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
      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
    />
  </svg>
);

// Decorative bubble component for Frutiger Aero effect
const Bubble = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <div
    className={`absolute rounded-full pointer-events-none ${className || ''}`}
    style={{
      background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8) 0%, rgba(0, 180, 216, 0.15) 40%, transparent 70%)',
      ...style,
    }}
  />
);

// Tropical bubble variant
const TropicalBubble = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <div
    className={`absolute rounded-full pointer-events-none ${className || ''}`}
    style={{
      background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.9) 0%, rgba(64, 224, 208, 0.25) 40%, transparent 70%)',
      ...style,
    }}
  />
);

// Wave decoration component
const WaveDecoration = ({ position = 'bottom', className }: { position?: 'top' | 'bottom'; className?: string }) => (
  <svg
    className={`absolute left-0 right-0 w-full pointer-events-none ${position === 'top' ? 'top-0' : 'bottom-0'} ${className || ''}`}
    viewBox="0 0 1440 80"
    preserveAspectRatio="none"
    style={{ height: '80px' }}
  >
    <path
      fill="rgba(64, 224, 208, 0.12)"
      d={position === 'bottom'
        ? "M0,40 C360,80 720,0 1080,40 C1260,60 1350,50 1440,40 L1440,80 L0,80 Z"
        : "M0,40 C360,0 720,80 1080,40 C1260,20 1350,30 1440,40 L1440,0 L0,0 Z"
      }
    />
    <path
      fill="rgba(0, 180, 216, 0.08)"
      d={position === 'bottom'
        ? "M0,50 C240,20 480,70 720,50 C960,30 1200,60 1440,50 L1440,80 L0,80 Z"
        : "M0,30 C240,60 480,10 720,30 C960,50 1200,20 1440,30 L1440,0 L0,0 Z"
      }
    />
  </svg>
);

// Frutiger Aero Style Icons for Key Benefits
const GrowthIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none">
    {/* Glossy background circle */}
    <defs>
      <linearGradient id="growthGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#7FDBDA" />
        <stop offset="50%" stopColor="#40E0D0" />
        <stop offset="100%" stopColor="#20B2AA" />
      </linearGradient>
      <linearGradient id="leafGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#9ACD32" />
        <stop offset="100%" stopColor="#7CB518" />
      </linearGradient>
    </defs>
    {/* Upward trending chart with tropical plant */}
    <path d="M8 36 L16 28 L24 32 L40 16" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <circle cx="40" cy="16" r="4" fill="url(#leafGrad)" />
    {/* Growing leaves */}
    <path d="M32 24 Q36 20 40 16 Q36 18 32 18 Q34 22 32 24Z" fill="url(#leafGrad)" />
    <path d="M36 20 Q38 16 40 16 Q38 18 36 18 Q37 20 36 20Z" fill="#B8E05C" />
    {/* Sparkle */}
    <circle cx="12" cy="20" r="2" fill="white" opacity="0.6" />
  </svg>
);

const IncomeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none">
    <defs>
      <linearGradient id="coinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFD700" />
        <stop offset="50%" stopColor="#FFA500" />
        <stop offset="100%" stopColor="#FF8C00" />
      </linearGradient>
      <linearGradient id="sunGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FF8C42" />
        <stop offset="100%" stopColor="#FF6B6B" />
      </linearGradient>
    </defs>
    {/* Sun rays */}
    <circle cx="36" cy="12" r="6" fill="url(#sunGrad)" opacity="0.8" />
    <path d="M36 4 L36 6 M44 12 L42 12 M36 20 L36 18 M28 12 L30 12" stroke="#FF8C42" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
    {/* Coins stack */}
    <ellipse cx="20" cy="32" rx="12" ry="4" fill="url(#coinGrad)" />
    <ellipse cx="20" cy="28" rx="12" ry="4" fill="url(#coinGrad)" />
    <ellipse cx="20" cy="24" rx="12" ry="4" fill="url(#coinGrad)" />
    {/* Coin shine */}
    <ellipse cx="16" cy="24" rx="4" ry="1.5" fill="white" opacity="0.4" />
    {/* Dollar sign */}
    <text x="20" y="30" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">$</text>
  </svg>
);

const ShieldIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none">
    <defs>
      <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#48CAE4" />
        <stop offset="50%" stopColor="#00B4D8" />
        <stop offset="100%" stopColor="#0096C7" />
      </linearGradient>
      <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#40E0D0" />
        <stop offset="100%" stopColor="#7FDBDA" />
      </linearGradient>
    </defs>
    {/* Shield */}
    <path d="M24 4 L40 10 L40 24 C40 34 24 44 24 44 C24 44 8 34 8 24 L8 10 L24 4Z" fill="url(#shieldGrad)" />
    {/* Shield highlight */}
    <path d="M24 6 L38 11 L38 14 L24 9 L10 14 L10 11 L24 6Z" fill="white" opacity="0.4" />
    {/* Wave inside shield */}
    <path d="M12 26 Q18 22 24 26 Q30 30 36 26" stroke="url(#waveGrad)" strokeWidth="3" strokeLinecap="round" fill="none" />
    <path d="M12 32 Q18 28 24 32 Q30 36 36 32" stroke="url(#waveGrad)" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6" />
    {/* Checkmark */}
    <path d="M16 20 L22 26 L32 14" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const UnlimitedIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none">
    <defs>
      <linearGradient id="infinityGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#7CB518" />
        <stop offset="50%" stopColor="#40E0D0" />
        <stop offset="100%" stopColor="#00B4D8" />
      </linearGradient>
    </defs>
    {/* Infinity symbol */}
    <path
      d="M14 24 C14 20 10 16 6 20 C2 24 2 28 6 32 C10 36 14 32 18 28 L30 20 C34 16 38 16 42 20 C46 24 46 28 42 32 C38 36 34 36 30 32 L18 24 C14 28 10 32 6 28 C2 24 2 20 6 16 C10 12 14 16 18 20 L30 28 C34 32 38 32 42 28 C46 24 46 20 42 16 C38 12 34 12 30 16 L18 24"
      stroke="url(#infinityGrad)"
      strokeWidth="4"
      strokeLinecap="round"
      fill="none"
    />
    {/* Simplified infinity */}
    <path d="M8 24 C8 18 14 18 18 24 C22 30 26 30 30 24 C34 18 40 18 40 24 C40 30 34 30 30 24 C26 18 22 18 18 24 C14 30 8 30 8 24Z"
      stroke="white" strokeWidth="4" strokeLinecap="round" fill="none" />
    {/* Sparkles */}
    <circle cx="24" cy="10" r="2" fill="#40E0D0" />
    <circle cx="10" cy="14" r="1.5" fill="#7CB518" opacity="0.7" />
    <circle cx="38" cy="14" r="1.5" fill="#00B4D8" opacity="0.7" />
  </svg>
);

const LegacyIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none">
    <defs>
      <linearGradient id="treeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#9ACD32" />
        <stop offset="100%" stopColor="#228B22" />
      </linearGradient>
      <linearGradient id="heartGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FF6B6B" />
        <stop offset="100%" stopColor="#FF8C42" />
      </linearGradient>
    </defs>
    {/* Tree trunk */}
    <rect x="22" y="28" width="4" height="16" rx="1" fill="#8B4513" />
    {/* Tree foliage - palm style */}
    <ellipse cx="24" cy="20" rx="14" ry="12" fill="url(#treeGrad)" />
    <ellipse cx="24" cy="18" rx="10" ry="8" fill="#B8E05C" opacity="0.5" />
    {/* Heart in center */}
    <path d="M24 26 C24 26 18 20 18 16 C18 12 22 12 24 16 C26 12 30 12 30 16 C30 20 24 26 24 26Z" fill="url(#heartGrad)" />
    {/* Family figures */}
    <circle cx="14" cy="40" r="3" fill="white" />
    <circle cx="24" cy="38" r="4" fill="white" />
    <circle cx="34" cy="40" r="3" fill="white" />
    {/* Connection lines */}
    <path d="M14 40 L24 38 L34 40" stroke="white" strokeWidth="1.5" opacity="0.6" />
  </svg>
);

const FlexibleIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none">
    <defs>
      <linearGradient id="keyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFD700" />
        <stop offset="100%" stopColor="#FFA500" />
      </linearGradient>
      <linearGradient id="doorGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#40E0D0" />
        <stop offset="100%" stopColor="#20B2AA" />
      </linearGradient>
    </defs>
    {/* Door frame */}
    <rect x="22" y="8" width="20" height="32" rx="2" fill="url(#doorGrad)" />
    <rect x="24" y="10" width="16" height="28" rx="1" fill="white" opacity="0.3" />
    {/* Door handle */}
    <circle cx="36" cy="24" r="2" fill="#20B2AA" />
    {/* Key */}
    <circle cx="12" cy="20" r="8" stroke="url(#keyGrad)" strokeWidth="4" fill="none" />
    <rect x="18" y="18" width="14" height="4" rx="1" fill="url(#keyGrad)" />
    <rect x="26" y="22" width="2" height="4" fill="url(#keyGrad)" />
    <rect x="30" y="22" width="2" height="3" fill="url(#keyGrad)" />
    {/* Sparkle */}
    <circle cx="8" cy="16" r="2" fill="white" opacity="0.8" />
    {/* Wave at bottom */}
    <path d="M6 40 Q14 36 22 40 Q30 44 38 40 L42 40 L42 44 L6 44 Z" fill="rgba(64, 224, 208, 0.3)" />
  </svg>
);

// Map icon names to components
const benefitIcons: Record<string, React.FC<{ className?: string }>> = {
  growth: GrowthIcon,
  income: IncomeIcon,
  shield: ShieldIcon,
  unlimited: UnlimitedIcon,
  legacy: LegacyIcon,
  flexible: FlexibleIcon,
};

const benefits = [
  {
    title: "Tax-Free Growth",
    description:
      "Watch your retirement funds grow without the burden of annual taxes eating into your returns.",
    icon: "growth",
  },
  {
    title: "Tax-Free Income",
    description:
      "Access your money in retirement completely tax-free, maximizing every dollar you've saved.",
    icon: "income",
  },
  {
    title: "Market Protection",
    description:
      "Sleep soundly knowing your principal is protected from market downturns.",
    icon: "shield",
  },
  {
    title: "No Contribution Limits",
    description:
      "Unlike traditional retirement accounts, there are no government-imposed limits.",
    icon: "unlimited",
  },
  {
    title: "Legacy Planning",
    description:
      "Pass on wealth to your loved ones efficiently, with tax advantages that preserve your legacy.",
    icon: "legacy",
  },
  {
    title: "Flexible Access",
    description:
      "Access your funds when you need them without penalties or restrictions.",
    icon: "flexible",
  },
];

const values = [
  {
    title: "Client First",
    description:
      "Your financial success is our primary goal. We put your interests ahead of everything.",
  },
  {
    title: "Independence",
    description:
      "Access to strategies and services most advisors can't offer.",
  },
  {
    title: "Education",
    description:
      "We empower you with knowledge for informed financial decisions.",
  },
  {
    title: "Transparency",
    description:
      "No hidden fees, no surprises. Clear, honest guidance every step.",
  },
];

interface TeamMember {
  name: string;
  title: string;
  image: string;
  bio: string[];
}

const teamMembers: TeamMember[] = [
  {
    name: "Neil Gronowetter",
    title: "Founder & CEO",
    image: "/images/team/neil.gif",
    bio: [
      "Neil was a semi-finalist on the Jeopardy! Teen Tournament in 1988, winning $5,000 along with an assortment of prizes including Creamettes, Hormel Chili, and a Bissell vacuum cleaner.",
      "He was the first person in his family to graduate college, earning his degree from Yale University in 1993 and his law degree from the University of Southern California Law School in 1996.",
      "Neil met his wife at a swing dance concert in midtown Manhattan. He walked across the room, extended his hand and said: 'Come dance with me.' She did. They are happily married and live with their 3 children in Weston, Connecticut.",
      "Before working in financial services, Neil was president of a commercial real estate brokerage. He procured $3.1 billion in commercial real estate for private wealth offices, private equity groups and publicly traded companies.",
      "Neil started his career as a trial attorney in private practice and the Bronx District Attorney's Office. He tried and managed 24 jury trials from inception to verdict, with 17 victories.",
      "He has spoken in front of thousands of people about preparing for retirement and not outliving your money. He has been seen on ABC, CBS, NBC, FOX and PBS.",
      "Neil walked away from a robust pension and benefits package to fulfill his vision of serving clients first—not any particular company or product. As Founder & CEO of Emerald Tide Financial, Neil's independent financial services platform delivers services and strategies most advisors and their accountants don't know about or can't access.",
    ],
  },
  {
    name: "Brendan O'Donnell",
    title: "Vice President",
    image: "/images/team/brendan.gif",
    bio: [
      "Brendan previously worked for the 2nd largest distributor of US financial products for 13 years. During that time, he grew a book of business from 2 financial service professionals to 582 financial service professionals!",
      "Under Brendan's leadership, his financial service professionals provided over $470 million in financial services to their clients.",
      "Brendan started his career at Putnam Investments. At the height of the 2008 Global Financial Crisis, and in less than 3 years, he procured over $90 million in new assets.",
      "He has been happily married to his wife, Rachael, for 7 years. They share a healthy, active, fun-loving 4-year-old son, Alex. They live in the suburbs of Raleigh, North Carolina.",
      "Brendan's grandfather was Chief Counsel on the Senate Permanent Subcommittee of Investigations on Organized Crime. He replaced Sen. Robert F. Kennedy.",
      "He graduated Plymouth State University with a degree in Business Management, following in the footsteps of his father, who was chosen 'Mr. Plymouth State University' by the school newspaper.",
      "He has spoken to thousands of financial advisors at public events about strategies for maximizing tax-free pensions for clients.",
    ],
  },
];

const hubertBio = {
  name: "Hubert",
  title: "Chief Morale Boosting Officer (CMBO)",
  image: "/images/team/hubert.gif",
  facts: [
    "Hubert is a 5 year-old goldendoodle.",
    'For the 5th year in a row, Hubert has served as Chief Morale Boosting Officer (CMBO) of Emerald Tide Financial, while also still holding the coveted title of "World\'s Best Doggie"!',
    "He is very fond of cheese, cooked meat and chicken, and Kirkland Signature Grain-Free Dental Chews Dog Treats. Once you give Hubert one of these treats, he will run away quickly – despite repeated, calm assurances that you will not take back his treat.",
    "Hubert is very partial to belly rubs and back scratches.",
    'He warmly receives positive affirmations that he is a "good doggie," a "very good doggie," or "best doggie in the world."',
    "He loves walks, meeting new people, and going for rides with family.",
    "He is much less fond of delivery men and their delivery trucks – despite repeated assurances that they mean him no harm.",
    "His close friend and companion is a 5 year-old cat named Cat.",
    "After Hubert comes back from the groomer, he walks with an extra spring in his step; he loves to be told how much handsomer he looks, freshly washed.",
    "He likes going to the dog park and is partial to smaller dogs and other doodles.",
  ],
};

export default function EmeraldHome() {
  return (
    <div>
      {/* Hero Section - Tropical Frutiger Aero with beach background */}
      <section
        id="home"
        className="emerald-hero emerald-hero-tropical py-20 md:py-28 lg:py-32 relative overflow-hidden"
      >

        <div className="emerald-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left - Content */}
            <div className="emerald-animate-in emerald-hero-text">
              <p className="emerald-eyebrow">Emerald Tide Financial</p>

              <h1 className="emerald-title-lg mb-6">
                Home of the{" "}
                <span className="emerald-highlight">
                  Tax-Free Pension
                </span>
              </h1>

              <p className="emerald-lead mb-10 max-w-xl">
                Create a robust, 6- or 7-figure, tax-free pension for life.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="emerald-btn-primary"
                >
                  Book Free Consultation
                  <ArrowRightIcon className="w-4 h-4" />
                </a>
                <a href="#about" className="emerald-btn-secondary">
                  Learn More
                </a>
              </div>
            </div>

            {/* Right - Feature Card - Glass morphism */}
            <div className="emerald-animate-in emerald-delay-2 hidden lg:block">
              <div className="emerald-card">
                <span className="emerald-badge-primary mb-6">Tax-Free Benefits</span>
                <h3 className="emerald-heading text-2xl mb-6">
                  Your Tax-Free Future Starts Here
                </h3>
                <div className="space-y-4">
                  {[
                    "Zero taxes on growth",
                    "Zero taxes on retirement income",
                    "Zero market risk to principal",
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{
                          background: 'linear-gradient(135deg, #9ACD32 0%, #7CB518 50%, #5A8A0F 100%)',
                          boxShadow: '0 2px 8px rgba(124, 181, 24, 0.3), inset 0 1px 0 rgba(255,255,255,0.3)',
                        }}
                      >
                        <CheckIcon className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-[var(--text-dark)] font-semibold">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section - Tropical Glass cards with turquoise ocean background */}
      <section
        className="emerald-section emerald-bg-turquoise-ocean relative overflow-hidden"
      >
        {/* Tropical decorations - hidden on small screens */}
        <TropicalBubble className="hidden sm:block w-32 h-32 top-20 right-10 opacity-50" />
        <TropicalBubble className="hidden sm:block w-20 h-20 bottom-40 left-10 opacity-40" />
        <TropicalBubble className="hidden md:block w-16 h-16 top-1/2 right-1/4 opacity-30" />
        <WaveDecoration position="bottom" />

        {/* Sun rays decoration */}
        <div
          className="absolute -top-20 right-0 w-80 h-80 pointer-events-none opacity-30"
          style={{
            background: 'radial-gradient(circle at center, rgba(255, 140, 66, 0.3) 0%, rgba(255, 140, 66, 0.1) 40%, transparent 70%)',
          }}
        />

        <div className="emerald-container relative z-10">
          <div className="max-w-2xl mb-14">
            <p className="emerald-eyebrow">Key Benefits</p>
            <h2 className="emerald-section-title mb-4">
              Why Choose a Tax-Free Pension?
            </h2>
            <p className="emerald-lead max-w-2xl">
              Discover the advantages that make Tax-Free Pensions the smart
              choice for building lasting wealth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => {
              const IconComponent = benefitIcons[benefit.icon];
              return (
                <div key={index} className="emerald-tropical-card group">
                  <div className="emerald-icon-tropical">
                    {IconComponent && <IconComponent className="w-10 h-10" />}
                  </div>
                  <h3 className="text-xl font-bold text-[var(--text-dark)] mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-[var(--text-muted)]">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Section - Palm beach tropical background */}
      <section
        id="about"
        className="emerald-section emerald-bg-palm-beach relative overflow-hidden"
      >
        {/* Decorative elements - hidden on small screens */}
        <Bubble className="hidden sm:block w-48 h-48 -top-10 -right-10 opacity-30" style={{ background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8) 0%, rgba(124, 181, 24, 0.1) 40%, transparent 70%)' }} />
        <Bubble className="hidden sm:block w-32 h-32 bottom-20 -left-10 opacity-30" />

        <div className="emerald-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <p className="emerald-eyebrow">About Us</p>
              <h2 className="emerald-section-title mb-6">
                About{" "}
                <span className="emerald-highlight">
                  Emerald Tide Financial
                </span>
              </h2>
              <p className="emerald-lead mb-4 text-[var(--text-body)]">
                We are dedicated to helping individuals and families create
                robust, tax-free pensions that provide financial security for
                life.
              </p>
              <p className="text-[var(--text-muted)] mb-4">
                At Emerald Tide Financial, we believe that everyone deserves
                access to sophisticated retirement strategies that were once
                reserved for the wealthy.
              </p>
              <p className="text-[var(--text-muted)]">
                Our founder, Neil Gronowetter, walked away from a robust pension
                and benefits package to fulfill his vision of serving clients
                first—not any particular company or product.
              </p>
            </div>

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
                        background: 'linear-gradient(135deg, #48CAE4 0%, #00B4D8 50%, #0096C7 100%)',
                        boxShadow: '0 2px 6px rgba(0, 180, 216, 0.3), inset 0 1px 0 rgba(255,255,255,0.3)',
                      }}
                    >
                      <CheckIcon className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-[var(--text-body)]">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Values */}
          <div className="mt-20">
            <div className="mb-12">
              <h3 className="emerald-section-title mb-4">Our Values</h3>
              <p className="emerald-lead max-w-2xl">
                The principles that guide everything we do at Emerald Tide
                Financial.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <div key={index} className="emerald-feature-card">
                  <span className="emerald-step-number mb-4">{index + 1}</span>
                  <h4 className="text-lg font-bold text-[var(--text-dark)] mb-2">
                    {value.title}
                  </h4>
                  <p className="text-sm text-[var(--text-muted)]">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section - Crystal clear water background */}
      <section
        id="team"
        className="emerald-section emerald-bg-crystal-water"
      >
        <div className="emerald-container">
          <div className="max-w-2xl mb-14">
            <p className="emerald-eyebrow">Our Team</p>
            <h2 className="emerald-section-title mb-4">
              Meet Our{" "}
              <span className="emerald-highlight">Team</span>
            </h2>
            <p className="emerald-lead">
              The dedicated professionals behind Emerald Tide Financial,
              committed to helping you achieve your tax-free retirement goals.
            </p>
          </div>

          <div className="space-y-20">
            {teamMembers.map((member, index) => (
              <div
                key={member.name}
                className={`grid grid-cols-1 lg:grid-cols-3 gap-8 items-start ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Photo */}
                <div
                  className={`${index % 2 === 1 ? "lg:order-2" : "lg:order-1"}`}
                >
                  <div className="emerald-team-card max-w-sm mx-auto lg:mx-0">
                    <div className="relative aspect-square bg-gradient-to-br from-[#F0F9FF] to-[#E0F7FA]">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-[var(--text-dark)]">
                        {member.name}
                      </h3>
                      <p className="text-[var(--sky-blue)] font-semibold">
                        {member.title}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <div
                  className={`lg:col-span-2 ${index % 2 === 1 ? "lg:order-1" : "lg:order-2"}`}
                >
                  <h3 className="emerald-heading text-2xl mb-2 lg:hidden">
                    {member.name}
                  </h3>
                  <p className="text-[var(--sky-blue)] font-semibold mb-6 lg:hidden">
                    {member.title}
                  </p>
                  <h4 className="emerald-heading text-2xl mb-6">
                    10 Things You Didn&apos;t Know About{" "}
                    {member.name.split(" ")[0]}
                  </h4>
                  <div className="space-y-4">
                    {member.bio.map((paragraph, pIndex) => (
                      <div key={pIndex} className="flex gap-4">
                        <span className="emerald-step-number-sm flex-shrink-0">
                          {pIndex + 1}
                        </span>
                        <p className="text-[var(--text-muted)]">
                          {paragraph}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Hubert Section - Warm green accent */}
          <div className="mt-20">
            <div className="mb-8">
              <h3 className="emerald-heading text-3xl">And Introducing...</h3>
            </div>

            <div className="max-w-4xl">
              <div
                className="emerald-card overflow-hidden p-0"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(240,253,244,0.95) 100%)',
                }}
              >
                <div className="grid grid-cols-1 md:grid-cols-3">
                  {/* Photo */}
                  <div className="relative aspect-square bg-gradient-to-br from-[#F0FDF4] to-[#D9F99D]">
                    <Image
                      src={hubertBio.image}
                      alt={hubertBio.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>

                  {/* Content */}
                  <div className="md:col-span-2 p-6 md:p-8">
                    <span className="emerald-badge-accent mb-4">CMBO</span>
                    <h4 className="emerald-heading text-2xl mb-1">
                      {hubertBio.name}
                    </h4>
                    <p className="font-semibold mb-6" style={{ color: '#7CB518' }}>
                      {hubertBio.title}
                    </p>

                    <h5 className="text-lg font-bold text-[var(--text-dark)] mb-4">
                      10 Things You Didn&apos;t Know About Our CMBO
                    </h5>

                    <div className="space-y-3 max-h-[50vh] md:max-h-72 overflow-y-auto pr-2 scrollbar-thin">
                      {hubertBio.facts.map((fact, index) => (
                        <div key={index} className="flex gap-3">
                          <span
                            className="flex-shrink-0 w-6 h-6 rounded-lg text-white text-xs font-bold flex items-center justify-center mt-0.5"
                            style={{
                              background: 'linear-gradient(135deg, #9ACD32 0%, #7CB518 100%)',
                            }}
                          >
                            {index + 1}
                          </span>
                          <p className="text-sm text-[var(--text-muted)]">
                            {fact}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section - Tropical island background */}
      <section
        id="contact"
        className="emerald-section emerald-bg-island relative overflow-hidden"
      >
        {/* Decorative bubbles - hidden on small screens */}
        <Bubble className="hidden sm:block w-36 h-36 top-20 -right-10 opacity-40" />
        <Bubble className="hidden sm:block w-24 h-24 bottom-40 left-10 opacity-30" style={{ background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8) 0%, rgba(124, 181, 24, 0.15) 40%, transparent 70%)' }} />

        <div className="emerald-container relative z-10">
          <div className="max-w-2xl mb-14">
            <p className="emerald-eyebrow">Contact Us</p>
            <h2 className="emerald-section-title mb-4">
              Get in{" "}
              <span className="emerald-highlight">Touch</span>
            </h2>
            <p className="emerald-lead">
              Take the first step toward financial freedom. Book a free
              consultation with our team or fill out the form below.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left - Contact Info */}
            <div>
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

              {/* Book a Call CTA */}
              <div className="emerald-glass-card">
                <h3 className="emerald-heading text-xl mb-3">
                  Book a Free Consultation
                </h3>
                <p className="text-[var(--text-muted)] mb-6">
                  Speak directly with our team about your retirement goals.
                </p>
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="emerald-btn-primary"
                >
                  Schedule Your Call
                  <ArrowRightIcon className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Right - Contact Form */}
            <div className="emerald-card">
              <h3 className="emerald-heading text-2xl mb-6">
                Send Us a Message
              </h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators - Ocean gradient */}
      <section
        className="py-16 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0077B6 0%, #023E8A 50%, #03045E 100%)',
        }}
      >
        {/* Decorative wave */}
        <svg
          className="absolute top-0 left-0 w-full h-12"
          viewBox="0 0 1440 48"
          preserveAspectRatio="none"
          fill="none"
        >
          <path
            d="M0 24 Q 360 0 720 24 T 1440 24 V 0 H 0 Z"
            fill="rgba(255,255,255,0.05)"
          />
        </svg>

        <div className="emerald-container relative z-10">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-white/60 mb-8">
              As Seen On
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12 md:gap-16">
              {/* ABC Logo */}
              <div className="opacity-90 hover:opacity-100 transition-opacity">
                <Image
                  src="/images/logos/abc-logo.svg"
                  alt="ABC"
                  width={80}
                  height={40}
                  className="h-8 sm:h-9 md:h-10 w-auto brightness-0 invert"
                />
              </div>

              {/* CBS Logo */}
              <div className="opacity-90 hover:opacity-100 transition-opacity">
                <Image
                  src="/images/logos/cbs-logo.svg"
                  alt="CBS"
                  width={80}
                  height={40}
                  className="h-8 sm:h-9 md:h-10 w-auto brightness-0 invert"
                />
              </div>

              {/* NBC Logo */}
              <div className="opacity-90 hover:opacity-100 transition-opacity">
                <Image
                  src="/images/logos/nbc-logo.svg"
                  alt="NBC"
                  width={80}
                  height={40}
                  className="h-8 sm:h-9 md:h-10 w-auto"
                />
              </div>

              {/* FOX Logo */}
              <div className="opacity-90 hover:opacity-100 transition-opacity">
                <Image
                  src="/images/logos/fox-logo.svg"
                  alt="FOX"
                  width={80}
                  height={40}
                  className="h-8 sm:h-9 md:h-10 w-auto brightness-0 invert"
                />
              </div>

              {/* PBS Logo */}
              <div className="opacity-90 hover:opacity-100 transition-opacity">
                <Image
                  src="/images/logos/pbs-logo.svg"
                  alt="PBS"
                  width={80}
                  height={40}
                  className="h-8 sm:h-9 md:h-10 w-auto brightness-0 invert"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
