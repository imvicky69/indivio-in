// src/components/why-indivio/CEOMessage.tsx
import { SectionHeading } from '../SectionHeading';
import { Briefcase } from 'lucide-react';

const HeadshotPlaceholder = () => (
  <div className="relative mx-auto flex h-48 w-48 items-center justify-center overflow-hidden rounded-full border-4 border-primary/20 bg-white shadow-xl lg:h-64 lg:w-64">
    {/* Use lucide-react Briefcase icon as a stylized CEO headshot placeholder */}
    <Briefcase
      className="h-28 w-28 text-primary/70 lg:h-36 lg:w-36"
      aria-hidden="true"
    />
    <span className="sr-only">CEO headshot</span>
  </div>
);

export function CEOMessage() {
  return (
    <section className="bg-hero-gradient py-20 sm:py-28">
      <div className="container mx-auto px-6">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-3">
          {/* Column 1: The Message - Reversed order from FounderMessage */}
          <div className="text-center lg:col-span-2 lg:text-left">
            <SectionHeading>
              Building Tomorrow&apos;s Education Infrastructure
            </SectionHeading>

            {/* Business-focused dedication message */}
            <blockquote className="text-dark/80 mt-4 text-lg leading-relaxed">
              &quot;At Indivio, we&apos;re not just building software—we&apos;re
              building the foundation for India&apos;s educational future.{' '}
              <strong>Our dedication is to every school that trusts us</strong>{' '}
              with their digital transformation journey.
              <br />
              <br />
              From day one, our business philosophy has been simple: deliver
              excellence, maintain transparency, and grow together with our
              partners. Every feature we develop, every system we integrate,
              is driven by one question—how can this make schools more
              effective and families more connected?&quot;
            </blockquote>

            {/* Signature Block */}
            <div className="mt-8">
              <p className="font-display text-xl font-bold text-primary">
                Ashish Kumar
              </p>
              <p className="text-dark/70">Co-Founder & CEO</p>
            </div>
          </div>

          {/* Column 2: The Headshot - Reversed order from FounderMessage */}
          <div className="flex justify-center lg:order-last">
            <HeadshotPlaceholder />
          </div>
        </div>
      </div>
    </section>
  );
}
