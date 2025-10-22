// src/components/IndivioDifference.tsx

"use client"; // <-- THE FIX: Add this directive at the very top

import { SectionHeading } from '../SectionHeading';
// import { motion } from 'framer-motion'; // Import motion from framer-motion
import { AnimatedElement } from '../ui/AnimatedElement'; // <-- IMPORT OUR NEW ANIMATION COMPONENT
import { Handshake, Zap, ShieldCheck, PackageCheck, Layers3, CloudCog } from 'lucide-react';

// Data for the key differentiators
const differenceData = [
  { icon: <Handshake className="w-10 h-10 text-accent" />, title: 'Dedicated Partnership & Support', description: 'You\'re not just buying software; you\'re gaining a technical partner committed to your success. Personal support, not automated responses.' },
  { icon: <Zap className="w-10 h-10 text-accent" />, title: 'Blazing-Fast Modern Technology', description: 'We use the latest React-based technology powered by Google Cloud for lightning-fast performance and reliability that parents and students will love.' },
  { icon: <ShieldCheck className="w-10 h-10 text-accent" />, title: 'Honest & Transparent Pricing', description: 'No hidden fees. No confusing contracts. Just straightforward, affordable pricing designed for Indian schools. Most competitive rates in the market.' },
  { icon: <PackageCheck className="w-10 h-10 text-accent" />, title: 'Built for Your Needs', description: 'From a smart toppers grid to an easy-to-update events calendar, every feature is designed understanding real school needs and challenges.' },
  { icon: <Layers3 className="w-10 h-10 text-accent" />, title: 'A Platform That Grows With You', description: 'Start with a professional website today. Expand to complete school management with Indivio V2 tomorrow - attendance, PTM, classes, assignments, and more.' },
  { icon: <CloudCog className="w-10 h-10 text-accent" />, title: 'Secure & Reliable Foundation', description: 'Built on Google\'s trusted cloud infrastructure with enterprise-grade security. Your data is safe, backed up, and always accessible.' },
];export function IndivioDifference() {
  return (
    <section className="bg-secondary text-secondary-foreground py-20 sm:py-28">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <SectionHeading>Why Schools Choose to Partner with Us</SectionHeading>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mt-16">
          {differenceData.map((item, index) => (
            
            // We use our new component. The animation will repeat by default.
            <AnimatedElement 
              key={index}
              delay={index * 0.1}
              className="bg-card p-6 rounded-xl border h-full"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">{item.icon}</div>
                <div>
                  <h3 className="text-lg font-bold font-display text-card-foreground">{item.title}</h3>
                  <p className="mt-2 text-muted-foreground text-sm">{item.description}</p>
                </div>
              </div>
            </AnimatedElement>

          ))}
        </div>
      </div>
    </section>
  );
}