// src/components/why-indivio/BenefitsGrid.tsx
import { SectionHeading } from '../SectionHeading';
import {
  Globe,
  Zap,
  Shield,
  TrendingUp,
  Users,
  Infinity,
} from 'lucide-react';

// {Icon: Revolution}, {Image: Partnership} - placeholders for future visual enhancements
const benefitsData = [
  {
    icon: <Globe className="h-12 w-12 text-primary" />,
    title: 'Complete Digital Identity',
    description:
      'Transform your school website into a powerful digital campus. Showcase your values, achievements, and vision to attract modern families seeking quality education.',
    seoKeyword: 'school website',
  },
  {
    icon: <Zap className="h-12 w-12 text-primary" />,
    title: 'Lightning-Fast Performance',
    description:
      'Built with cutting-edge technology, your EdTech platform loads instantly on any device. Better performance means higher Google rankings and more admissions.',
    seoKeyword: 'EdTech platform',
  },
  {
    icon: <Shield className="h-12 w-12 text-primary" />,
    title: 'Enterprise-Grade Security',
    description:
      'Protect student data with bank-level security. Our school management system is built on Google Cloud with automatic backups and SSL encryption included.',
    seoKeyword: 'school management system',
  },
  {
    icon: <TrendingUp className="h-12 w-12 text-primary" />,
    title: 'Growth-Ready Architecture',
    description:
      'Start with a beautiful website today. Add online admissions, fee payments, and student portals tomorrow. Our platform grows with your digital transformation journey.',
    seoKeyword: 'digital transformation for schools',
  },
  {
    icon: <Users className="h-12 w-12 text-primary" />,
    title: 'Dedicated Partnership Support',
    description:
      "You're not buying software — you're gaining a technology partner. From setup to scaling, we're personally invested in your school's success.",
    seoKeyword: 'education technology',
  },
  {
    icon: <Infinity className="h-12 w-12 text-primary" />,
    title: 'Infinite Possibilities Ahead',
    description:
      "Online attendance, parent communication, exam results, digital library — we're building the complete school ERP ecosystem, and you're part of the journey.",
    seoKeyword: 'school ERP',
  },
];

export function BenefitsGrid() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <SectionHeading>
            Why Educational Institutions Choose Indivio
          </SectionHeading>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-dark/70">
            More than a technology provider — we're your partner in educational
            excellence and digital innovation
          </p>
        </div>

        {/* Responsive 3-column grid for benefits */}
        <div className="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {benefitsData.map((benefit, index) => (
            <div
              key={index}
              className="group flex flex-col items-start gap-4 rounded-xl border border-slate-200 bg-slate-50 p-8 transition-all duration-300 hover:border-primary/30 hover:shadow-xl"
            >
              <div className="flex-shrink-0 rounded-lg bg-primary/10 p-3 transition-colors group-hover:bg-primary/20">
                {benefit.icon}
              </div>
              <div>
                <h3 className="mb-3 font-display text-xl font-bold text-dark">
                  {benefit.title}
                </h3>
                <p className="leading-relaxed text-dark/70">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
