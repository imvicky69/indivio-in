// src/components/home/FeaturesSection.tsx
'use client';

import { SectionHeading } from '../SectionHeading';
import { Globe, Pencil, IndianRupee, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';

const featuresData = [
	{
		icon: Globe,
		title: 'Professional Showcase Website',
		description:
			'Attract new admissions and build your brand with a fast, modern, and mobile-friendly website.',
	},
	{
		icon: Pencil,
		title: 'Customization on Your Fingertips',
		description:
			'Indivio offers hassle-free site manipulation without touching a single line of code. Just use InDashboard.',
	},
	{
		icon: IndianRupee,
		title: 'Online Fee Payments',
		description:
			'Accept fee payments online with secure payment gateways. Track transactions and send automated receipts.',
	},
	{
		icon: Rocket,
		title: 'Grow Digitally with Infinite Possibilities',
		description:
			'Scale your operations with features like online admissions, student portal, and parent communication.',
	},
];

export function FeaturesSection() {
	return (
		<section className="section-padding bg-gradient-to-b from-background to-muted/30">
			<div className="container mx-auto px-6">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
				>
					<SectionHeading>
						Everything You Need to Manage and Grow Online
					</SectionHeading>
				</motion.div>

				<div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2">
					{featuresData.map((feature, index) => {
						const IconComponent = feature.icon;
						return (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5, delay: index * 0.1 }}
								whileHover={{ y: -8, transition: { duration: 0.3 } }}
								className="group flex items-start gap-6 rounded-2xl border border-border bg-card p-8 shadow-lg transition-all duration-300 hover:border-primary/20 hover:shadow-2xl"
							>
								<div className="flex-shrink-0 rounded-xl bg-primary/5 p-4 transition-all duration-300 group-hover:bg-primary/10">
									<IconComponent className="h-8 w-8 text-primary" />
								</div>
								<div className="flex-1">
									<h3 className="mb-3 font-display text-xl font-bold text-foreground">
										{feature.title}
									</h3>
									<p className="leading-relaxed text-muted-foreground">
										{feature.description}
									</p>
								</div>
							</motion.div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
