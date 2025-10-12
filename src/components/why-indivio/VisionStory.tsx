// src/components/why-indivio/VisionStory.tsx
import { SectionHeading } from '../SectionHeading';
import { Heart, Lightbulb, Rocket } from 'lucide-react';

export function VisionStory() {
  return (
    <section className="bg-hero-gradient py-20 sm:py-28">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-4xl text-center">
          <SectionHeading>Our Vision: Transforming Education, One School at a Time</SectionHeading>

          {/* The Vision Story - Emotional and Mission-Driven */}
          <div className="mt-12 space-y-8 text-left">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 rounded-full bg-white p-4 shadow-lg">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="mb-3 font-display text-2xl font-bold text-primary">
                  We Believe in Educational Excellence
                </h3>
                <p className="text-lg leading-relaxed text-dark/80">
                  Every school, regardless of size or budget, deserves access to
                  world-class digital tools. We believe that education technology
                  shouldn't be a luxury reserved for elite institutions — it should be
                  an accessible foundation for every educational institution that dreams
                  of making a difference.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 rounded-full bg-white p-4 shadow-lg">
                <Lightbulb className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="mb-3 font-display text-2xl font-bold text-primary">
                  Born from Real Understanding
                </h3>
                <p className="text-lg leading-relaxed text-dark/80">
                  Indivio wasn't created in a corporate boardroom — it was built from
                  real conversations with educators who struggled with expensive,
                  complicated systems. We've seen firsthand how technology can
                  overwhelm instead of empower. That's why we created something
                  different: powerful, affordable, and genuinely supportive.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 rounded-full bg-white p-4 shadow-lg">
                <Rocket className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="mb-3 font-display text-2xl font-bold text-primary">
                  Building the Future Together
                </h3>
                <p className="text-lg leading-relaxed text-dark/80">
                  This is just the beginning. Today, we're helping schools establish
                  their digital presence. Tomorrow, we're building a complete ecosystem
                  — online admissions, smart attendance, integrated payments, parent
                  portals, and beyond. We're not just creating software; we're building
                  the infrastructure for India's educational future, and we want you to
                  be part of this journey.
                </p>
              </div>
            </div>
          </div>

          {/* Closing Statement */}
          <div className="mt-16 rounded-2xl border-2 border-primary/20 bg-white p-8 shadow-xl">
            <p className="font-display text-2xl font-semibold leading-relaxed text-primary">
              "We're not here to sell you a product. We're here to build a
              partnership that transforms how your school connects with families,
              manages operations, and shapes the minds of tomorrow."
            </p>
            <p className="mt-4 text-lg text-dark/70">
              — The Indivio Team
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
