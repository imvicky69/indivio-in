// src/components/features/V2TechnologyStack.tsx
'use client';

import { motion } from 'framer-motion';
import { Cloud, Zap, Shield, Globe2 } from 'lucide-react';
import { SectionHeading } from '../SectionHeading';

const techStackFeatures = [
	{
		icon: Cloud,
		title: 'Google Cloud Infrastructure',
		description:
			'Powered by Google Cloud Platform for maximum reliability, scalability, and global reach',
		color: 'from-blue-500/10 to-blue-500/5',
		iconColor: 'text-blue-600',
	},
	{
		icon: Zap,
		title: 'Modern React Architecture',
		description:
			'Built with latest React and Next.js for lightning-fast performance and seamless user experience',
		color: 'from-cyan-500/10 to-cyan-500/5',
		iconColor: 'text-cyan-600',
	},
	{
		icon: Shield,
		title: 'Enterprise-Grade Security',
		description:
			'Bank-level security with data encryption, secure authentication, and compliance with data protection laws',
		color: 'from-green-500/10 to-green-500/5',
		iconColor: 'text-green-600',
	},
	{
		icon: Globe2,
		title: 'Infinite Scalability',
		description:
			'Grows with your institution - from 100 to 10,000+ students without performance degradation',
		color: 'from-purple-500/10 to-purple-500/5',
		iconColor: 'text-purple-600',
	},
];

export function V2TechnologyStack() {
	return (
		<section className="section-padding bg-gradient-to-b from-background via-primary/5 to-background">
			<div className="container mx-auto px-6">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="text-center"
				>
					<SectionHeading>Built on World-Class Technology</SectionHeading>
					<p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground">
						Indivio V2 leverages cutting-edge technology stack to deliver an
						unparalleled experience. Modern, secure, and infinitely scalable -
						enterprise-grade solutions at affordable pricing for every school in
						India.
					</p>
				</motion.div>

				<div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2">
					{techStackFeatures.map((feature, index) => {
						const IconComponent = feature.icon;
						return (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5, delay: index * 0.1 }}
								className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-lg transition-all duration-300 hover:border-primary/20 hover:shadow-2xl"
							>
								<div
									className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
								/>
								<div className="relative flex items-start gap-6">
									<div className="flex-shrink-0 rounded-xl bg-background p-4 shadow-sm">
										<IconComponent
											className={`h-8 w-8 ${feature.iconColor}`}
										/>
									</div>
									<div className="flex-1">
										<h3 className="mb-3 font-display text-xl font-bold text-foreground">
											{feature.title}
										</h3>
										<p className="leading-relaxed text-muted-foreground">
											{feature.description}
										</p>
									</div>
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
					className="mx-auto mt-16 max-w-4xl rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 via-primary/5 to-background p-10 text-center shadow-xl"
				>
					<h3 className="mb-4 font-display text-3xl font-bold text-foreground">
						Most Affordable EdTech in India
					</h3>
					<p className="mx-auto max-w-2xl text-lg text-muted-foreground">
						World-class technology shouldn&apos;t come with enterprise prices.
						Indivio V2 brings enterprise-grade school management solutions at
						prices designed for Indian schools - making digital transformation
						accessible to tier 2 and tier 3 city institutions.
					</p>
					<div className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-white">
						Starting at just ₹999/month
						<span className="text-xs opacity-80">(Estimated)</span>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
