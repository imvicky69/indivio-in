// src/components/why-indivio/DigitalIndia.tsx
'use client';

import { motion } from 'framer-motion';
import { MapPin, TrendingUp, Heart, Sparkles } from 'lucide-react';
import { SectionHeading } from '../SectionHeading';

const targetAudience = [
	{
		icon: MapPin,
		title: 'Tier 2 & 3 Cities',
		description:
			'Bringing world-class education technology to schools across India, not just metros',
		stats: '10,000+ Schools',
	},
	{
		icon: TrendingUp,
		title: 'Growth & Modernization',
		description:
			'Helping traditional schools embrace digital transformation without breaking the bank',
		stats: '300% Efficiency',
	},
	{
		icon: Heart,
		title: 'Built for India',
		description:
			'Designed understanding Indian schools, their challenges, budgets, and aspirations',
		stats: 'India First',
	},
];

export function DigitalIndia() {
	return (
		<section className="section-padding bg-gradient-to-b from-muted/30 to-background">
			<div className="container mx-auto px-6">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="text-center"
				>
					<div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-6 py-2 text-sm font-semibold text-primary">
						<Sparkles className="h-4 w-4" />
						Our Mission
					</div>
					<SectionHeading>
						Digitalizing Education Across India
					</SectionHeading>
					<p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground">
						Our vision extends beyond metro cities. Indivio V2 is dedicated to
						modernizing and digitalizing schools in tier 2 and tier 3 cities,
						making cutting-edge education technology accessible and affordable for
						every school in India.
					</p>
				</motion.div>

				<div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
					{targetAudience.map((item, index) => {
						const IconComponent = item.icon;
						return (
							<motion.div
								key={index}
								initial={{ opacity: 0, scale: 0.9 }}
								whileInView={{ opacity: 1, scale: 1 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5, delay: index * 0.1 }}
								className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 text-center shadow-lg transition-all duration-300 hover:border-primary/30 hover:shadow-2xl"
							>
								<div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
								<div className="relative">
									<div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110">
										<IconComponent className="h-8 w-8 text-primary" />
									</div>
									<div className="mb-2 inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
										{item.stats}
									</div>
									<h3 className="mb-4 font-display text-xl font-bold text-foreground">
										{item.title}
									</h3>
									<p className="leading-relaxed text-muted-foreground">
										{item.description}
									</p>
								</div>
							</motion.div>
						);
					})}
				</div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.4 }}
					className="mx-auto mt-16 max-w-4xl rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 p-8 text-center"
				>
					<h3 className="mb-4 font-display text-2xl font-bold text-foreground">
						Affordable Pricing for Every School
					</h3>
					<p className="mx-auto max-w-2xl text-lg text-muted-foreground">
						We believe every school deserves access to modern technology. That&apos;s
						why Indivio V2 offers the{' '}
						<span className="font-semibold text-primary">
							most competitive pricing in India
						</span>
						, designed specifically for tier 2 and tier 3 city schools. Quality
						technology at prices that make sense for your budget.
					</p>
					<div className="mt-8 flex flex-wrap items-center justify-center gap-4">
						<div className="rounded-lg border border-primary/20 bg-background px-6 py-3 text-center">
							<div className="text-2xl font-bold text-primary">₹999+</div>
							<div className="text-sm text-muted-foreground">Starting Price</div>
						</div>
						<div className="rounded-lg border border-primary/20 bg-background px-6 py-3 text-center">
							<div className="text-2xl font-bold text-primary">50%</div>
							<div className="text-sm text-muted-foreground">Cheaper</div>
						</div>
						<div className="rounded-lg border border-primary/20 bg-background px-6 py-3 text-center">
							<div className="text-2xl font-bold text-primary">0</div>
							<div className="text-sm text-muted-foreground">Setup Fees</div>
						</div>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
