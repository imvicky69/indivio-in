// src/components/home/FeaturesSection.tsx
'use client';

import { SectionHeading } from '../SectionHeading';
import { Globe, Pencil, IndianRupee, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';
import { GlassmorphicCard } from '../ui/GlassmorphicCard';
import { TiltCard } from '../ui/TiltCard';

const featuresData = [
	{
		icon: Globe,
		title: 'Professional Showcase Website',
		description:
			'Attract new admissions and build your brand with a fast, modern, and mobile-friendly website.',
		gradient: 'from-blue-500 to-cyan-500',
	},
	{
		icon: Pencil,
		title: 'Customization on Your Fingertips',
		description:
			'Indivio offers hassle-free site manipulation without touching a single line of code. Just use InDashboard.',
		gradient: 'from-purple-500 to-pink-500',
	},
	{
		icon: IndianRupee,
		title: 'Online Fee Payments',
		description:
			'Accept fee payments online with secure payment gateways. Track transactions and send automated receipts.',
		gradient: 'from-green-500 to-emerald-500',
	},
	{
		icon: Rocket,
		title: 'Grow Digitally with Infinite Possibilities',
		description:
			'Scale your operations with features like online admissions, student portal, and parent communication.',
		gradient: 'from-orange-500 to-red-500',
	},
];

export function FeaturesSection() {
	return (
		<section className="section-padding relative overflow-hidden bg-gradient-to-b from-background via-purple-950/5 to-background">
			{/* Decorative elements */}
			<div className="absolute left-0 top-1/4 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl" />
			<div className="absolute bottom-1/4 right-0 h-96 w-96 rounded-full bg-pink-500/10 blur-3xl" />

			<div className="container relative z-10 mx-auto px-6">
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

				<div className="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2">
					{featuresData.map((feature, index) => {
						const IconComponent = feature.icon;
						return (
							<TiltCard key={index}>
								<GlassmorphicCard delay={index * 0.15}>
									<div className="flex items-start gap-6">
										<motion.div
											initial={{ scale: 0 }}
											whileInView={{ scale: 1 }}
											viewport={{ once: true }}
											transition={{
												duration: 0.5,
												delay: index * 0.15 + 0.2,
												type: 'spring',
											}}
											className={`flex-shrink-0 rounded-2xl bg-gradient-to-br ${feature.gradient} p-4 shadow-lg`}
										>
											<IconComponent className="h-8 w-8 text-white" />
										</motion.div>
										<div className="flex-1">
											<motion.h3
												initial={{ opacity: 0, x: -20 }}
												whileInView={{ opacity: 1, x: 0 }}
												viewport={{ once: true }}
												transition={{
													duration: 0.5,
													delay: index * 0.15 + 0.3,
												}}
												className="mb-3 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text font-display text-xl font-bold text-transparent"
											>
												{feature.title}
											</motion.h3>
											<motion.p
												initial={{ opacity: 0 }}
												whileInView={{ opacity: 1 }}
												viewport={{ once: true }}
												transition={{
													duration: 0.5,
													delay: index * 0.15 + 0.4,
												}}
												className="leading-relaxed text-muted-foreground"
											>
												{feature.description}
											</motion.p>
										</div>
									</div>
								</GlassmorphicCard>
							</TiltCard>
						);
					})}
				</div>
			</div>
		</section>
	);
}
