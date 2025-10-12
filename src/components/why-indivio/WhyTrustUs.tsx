// src/components/why-indivio/WhyTrustUs.tsx
import { SectionHeading } from '../SectionHeading';
import { Eye, MessageCircle, Code, Shield } from 'lucide-react';

const trustFactors = [
  {
    icon: <Eye className="h-10 w-10 text-accent" />,
    title: 'Complete Transparency',
    description:
      "We're upfront about pricing, timelines, and capabilities. No hidden fees, no surprises. What you see is what you get — and it's built with integrity.",
  },
  {
    icon: <MessageCircle className="h-10 w-10 text-accent" />,
    title: 'Direct Communication',
    description:
      'As a founder-led company, you get direct access to the people building your platform. No ticket queues, no endless transfers — just real, responsive support.',
  },
  {
    icon: <Code className="h-10 w-10 text-accent" />,
    title: 'Modern, Proven Technology',
    description:
      'We use the same cutting-edge tech stack as industry leaders: React, Next.js, and Google Firebase. Your school runs on battle-tested, enterprise-grade infrastructure.',
  },
  {
    icon: <Shield className="h-10 w-10 text-accent" />,
    title: 'Long-Term Commitment',
    description:
      "We're not a fly-by-night startup. We're building for the long haul — creating an ecosystem that will serve Indian education for decades. Your investment is protected.",
  },
];

export function WhyTrustUs() {
  return (
    <section className="bg-secondary py-20 text-secondary-foreground sm:py-28">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <SectionHeading>New Brand, Proven Vision</SectionHeading>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-dark/70">
            We're transparent about being a new brand. But that's our strength —
            we're agile, dedicated, and personally invested in every school we
            partner with.
          </p>
        </div>

        {/* The Trust Statement */}
        <div className="mx-auto mt-12 max-w-4xl rounded-2xl border-2 border-primary/20 bg-white p-8 shadow-lg">
          <h3 className="mb-4 text-center font-display text-2xl font-bold text-primary">
            Why Schools Trust Us From Day One
          </h3>
          <p className="text-center text-lg leading-relaxed text-dark/80">
            While we may not have decades of history, we have something more
            valuable: clarity of purpose, modern expertise, and an unwavering
            commitment to your success. Every feature we build, every line of code
            we write, is designed with your school's needs at the heart of it.
          </p>
          <p className="mt-4 text-center text-lg leading-relaxed text-dark/80">
            You're not joining a faceless corporation — you're partnering with a
            team that genuinely cares about educational excellence and is excited
            to grow alongside you.
          </p>
        </div>

        {/* Trust Factors Grid */}
        <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2">
          {trustFactors.map((factor, index) => (
            <div
              key={index}
              className="flex items-start gap-6 rounded-xl border border-border bg-card p-8 shadow-lg"
            >
              <div className="flex-shrink-0 rounded-lg bg-accent/10 p-3">
                {factor.icon}
              </div>
              <div>
                <h3 className="mb-2 font-display text-xl font-bold text-card-foreground">
                  {factor.title}
                </h3>
                <p className="text-muted-foreground">{factor.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Promise Statement */}
        <div className="mx-auto mt-16 max-w-3xl text-center">
          <p className="font-display text-xl font-semibold italic text-primary">
            "We earn your trust not through testimonials from the past, but through
            exceptional service today and a shared vision for tomorrow."
          </p>
        </div>
      </div>
    </section>
  );
}
