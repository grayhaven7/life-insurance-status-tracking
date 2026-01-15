import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Our Team",
  description:
    "Meet the dedicated professionals at Emerald Tide Financial, committed to helping you achieve your tax-free retirement goals.",
};

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
      "Neil was a semi-finalist on the Jeopardy! Teen Tournament in 1988. He won $5,000 — along with Creamettes, Hormel Chili, Mazola No-Stick, Fiber Bran All Flakes, Kikkoman Soy Sauce, Matrix Hair Essentials, and a Bissell vacuum cleaner.",
      "Neil was the first person in his family to graduate college. He graduated from Yale University in 1993 and the University of Southern California Law School in 1996.",
      "Neil met his wife at a swing dance concert in midtown Manhattan. He walked across the room, extended his hand and said: \"Come dance with me.\" She did. They are happily married and live with their 3 children in Weston, Connecticut.",
      "He purchased his first four multifamily properties in Brooklyn with next to no money down.",
      "Neil has spoken in front of thousands of people about preparing for retirement and not outliving your money. He has been seen on ABC, CBS, NBC, FOX and PBS.",
      "When Neil was 9 years old, he was disqualified from the school spelling bee for \"misspelling\" the word \"judgment.\" He immediately searched for the word in a dictionary and showed the teacher that his spelling, \"judgement,\" was also acceptable. After the judges allowed him to rejoin, he won the spelling bee!",
      "Before working in financial services, Neil was president of a commercial real estate brokerage. He procured $3.1 billion in commercial real estate for private wealth offices, private equity groups and publicly traded companies.",
      "Neil started his career as a trial attorney in private practice and the Bronx District Attorney's Office. He tried and managed 24 jury trials from inception to verdict, with 17 victories.",
      "Neil walked away from a robust pension and benefits package to fulfill his vision of serving clients first — not any particular company or product. As Founder & CEO of Emerald Tide Financial, Neil's independent financial services platform delivers services and strategies most advisors and their accountants don't know about or can't access.",
      "Neil has a severe weakness for Italian food, Indian food, KozyShack rice pudding, Häagen-Dazs vanilla bean ice cream, and Sweet Sam's pound cake.",
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
      "Brendan played for 3 different sports teams in high school. As captain of the tennis team, he led his school to win the New Hampshire state championship.",
      "He graduated Plymouth State University with a degree in Business Management. Brendan followed in the footsteps of his father, who not only graduated from PSU, but also was chosen \"Mr. Plymouth State University\" by the school newspaper.",
      "Brendan coaches soccer every week during soccer season for his local youth league.",
      "He has spoken to thousands of financial advisors at public events about strategies for maximizing tax-free pensions for clients.",
      "In his spare time, Brendan loves to boat, tube, jet ski, and hike.",
    ],
  },
];

const hubertBio = {
  name: "Hubert",
  title: "Chief Morale Boosting Officer (CMBO)",
  image: "/images/team/hubert.gif",
  facts: [
    "Hubert is a 5 year-old goldendoodle.",
    "For the 5th year in a row, Hubert has served as Chief Morale Boosting Officer (CMBO) of Emerald Tide Financial, while also still holding the coveted title of \"World's Best Doggie\"!",
    "He is very fond of cheese, cooked meat and chicken, and Kirkland Signature Grain-Free Dental Chews Dog Treats. Once you give Hubert one of these treats, he will run away quickly – despite repeated, calm assurances that you will not take back his treat.",
    "Hubert is very partial to belly rubs and back scratches.",
    "He warmly receives positive affirmations that he is a \"good doggie,\" a \"very good doggie,\" or \"best doggie in the world.\"",
    "He loves walks, meeting new people, and going for rides with family.",
    "He is much less fond of delivery men and their delivery trucks – despite repeated assurances that they mean him no harm.",
    "His close friend and companion is a 5 year-old cat named Cat.",
    "After Hubert comes back from the groomer, he walks with an extra spring in his step; he loves to be told how much handsomer he looks, freshly washed.",
    "He likes going to the dog park and is partial to smaller dogs and other doodles.",
  ],
};

const PawPrintIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
  </svg>
);

export default function TeamPage() {
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
        <Bubble className="hidden sm:block w-24 h-24 bottom-20 left-10 opacity-40" style={{ background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.9) 0%, rgba(124, 181, 24, 0.15) 40%, transparent 70%)' }} />

        <div className="emerald-container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <p className="emerald-eyebrow mx-auto">Our People</p>
            <h1 className="emerald-title mb-8">
              Meet Our{" "}
              <span className="emerald-highlight">Team</span>
            </h1>
            <p className="emerald-lead text-[var(--text-body)]">
              The dedicated professionals behind Emerald Tide Financial,
              committed to helping you achieve your tax-free retirement goals.
            </p>
          </div>
        </div>
      </section>

      {/* Team Members */}
      <section
        className="emerald-section"
        style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #F0F9FF 100%)' }}
      >
        <div className="emerald-container">
          <div className="space-y-24">
            {teamMembers.map((member, index) => (
              <div
                key={member.name}
                className={`grid grid-cols-1 lg:grid-cols-3 gap-8 items-start ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Photo Card */}
                <div
                  className={`${index % 2 === 1 ? "lg:order-2" : "lg:order-1"}`}
                >
                  <div className="emerald-team-card max-w-sm mx-auto lg:mx-0 overflow-hidden">
                    <div className="relative aspect-square bg-gradient-to-br from-[#F0F9FF] to-[#E0F7FA]">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <div className="p-6 text-center">
                      <h3 className="text-2xl font-bold text-[var(--text-dark)]">
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
                  <h3 className="emerald-heading text-3xl mb-2 lg:hidden">
                    {member.name}
                  </h3>
                  <p className="text-[var(--sky-blue)] font-semibold mb-6 lg:hidden">
                    {member.title}
                  </p>
                  <h4 className="emerald-heading text-xl mb-6">
                    10 Things You Didn&apos;t Know About{" "}
                    {member.name.split(" ")[0]}
                  </h4>
                  <div className="space-y-4">
                    {member.bio.map((paragraph, pIndex) => (
                      <div key={pIndex} className="flex gap-4">
                        <span className="emerald-step-number-sm flex-shrink-0">
                          {pIndex + 1}
                        </span>
                        <p className="text-[var(--text-muted)] pt-1">
                          {paragraph}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hubert Section - Warm green nature accent */}
      <section
        className="emerald-section relative overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, #F0FDF4 0%, #ECFDF5 50%, #F0F9FF 100%)',
        }}
      >
        <Bubble className="hidden sm:block w-32 h-32 top-10 -right-10 opacity-30" style={{ background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8) 0%, rgba(124, 181, 24, 0.15) 40%, transparent 70%)' }} />

        <div className="emerald-container">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-2">
              <PawPrintIcon className="w-6 h-6" style={{ color: '#7CB518' }} />
              <h2 className="emerald-heading text-2xl">
                And Introducing...
              </h2>
              <PawPrintIcon className="w-6 h-6" style={{ color: '#7CB518' }} />
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
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
                  {/* Paw print decorations */}
                  <div className="absolute top-4 right-4">
                    <PawPrintIcon className="w-8 h-8 opacity-30" style={{ color: '#7CB518' }} />
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <PawPrintIcon className="w-6 h-6 opacity-30" style={{ color: '#7CB518' }} />
                  </div>
                </div>

                {/* Content */}
                <div className="md:col-span-2 p-6 md:p-8">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="emerald-heading text-2xl">
                      {hubertBio.name}
                    </h3>
                    <PawPrintIcon className="w-5 h-5" style={{ color: '#7CB518' }} />
                  </div>
                  <p className="font-semibold mb-6" style={{ color: '#7CB518' }}>
                    {hubertBio.title}
                  </p>

                  <h4 className="emerald-heading text-lg mb-4">
                    10 Things You Didn&apos;t Know About Hubert
                  </h4>

                  <div className="space-y-3 max-h-[50vh] md:max-h-80 overflow-y-auto pr-2 scrollbar-thin">
                    {hubertBio.facts.map((fact, index) => (
                      <div key={index} className="flex gap-3">
                        <span
                          className="flex-shrink-0 w-6 h-6 rounded-lg text-white text-sm font-bold flex items-center justify-center mt-0.5"
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
      </section>

      {/* CTA Section - Ocean gradient */}
      <section
        className="emerald-section relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0077B6 0%, #023E8A 50%, #03045E 100%)',
        }}
      >
        <Bubble className="hidden sm:block w-28 h-28 top-10 right-20 opacity-15" />
        <Bubble className="hidden sm:block w-20 h-20 bottom-10 left-10 opacity-10" />

        <div className="emerald-container relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="emerald-section-title mb-5 text-white">
              Ready to Work With Our Team?
            </h2>
            <p className="emerald-lead mb-10 text-white/80">
              Book a free consultation to discuss how we can help you build your
              tax-free retirement income.
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
