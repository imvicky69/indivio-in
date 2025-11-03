// src/components/about/TimelineSection.tsx
'use client';

import { motion } from 'framer-motion';
import { Rocket, TrendingUp, Award, Globe } from 'lucide-react';

const milestones = [
	{
		icon: Rocket,
		year: '2023',
		title: 'The Beginning',
		description:
			'Indivio was founded with a vision to make professional school websites and management systems accessible to every educational institution.',
	},
	{
		icon: TrendingUp,
		year: '2024',
		title: 'Rapid Growth',
		description:
			'Reached 100+ schools across India, launched advanced features, and received overwhelming positive feedback from educators.',
	},
	{
		icon: Award,
		year: 'Q1 2025',
		title: 'Recognition',
		description:
			'Achieved 200+ school partnerships, 98% client satisfaction rate, and became a trusted name in EdTech solutions.',
	},
	{
		icon: Globe,
		year: 'Future',
		title: 'Expanding Horizons',
		description:
			'Planning to expand across India, introduce AI-powered features, and revolutionize how schools manage their digital presence.',
	},
];

export function TimelineSection() {
	return (
		<section className="section-padding relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-green-500/5">
			{/* Background decoration */}
			<div className="absolute inset-0 -z-10">
				<div className="absolute left-1/4 top-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
				<div className="absolute bottom-20 right-1/4 h-64 w-64 rounded-full bg-green-500/5 blur-3xl" />
			</div>

			<div className="container mx-auto px-6">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="mb-16 text-center"
				>
					<h2 className="mb-4 font-display text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
						Our Journey
					</h2>
					<p className="mx-auto max-w-2xl text-lg text-muted-foreground">
						From a simple idea to transforming education across India
					</p>
				</motion.div>

				<div className="relative mx-auto max-w-5xl">
					{/* Timeline line */}
					<div className="absolute left-1/2 top-0 h-full w-1 -translate-x-1/2 bg-gradient-to-b from-primary via-green-500 to-primary" />

					{/* Timeline items */}
					<div className="space-y-16">
						{milestones.map((milestone, index) => {
							const IconComponent = milestone.icon;
							const isEven = index % 2 === 0;

							return (
								<motion.div
									key={index}
									initial={{ opacity: 0, x: isEven ? -50 : 50 }}
									whileInView={{ opacity: 1, x: 0 }}
									viewport={{ once: true }}
									transition={{ duration: 0.6, delay: index * 0.1 }}
									className={`relative flex items-center ${isEven ? 'flex-row' : 'flex-row-reverse'} gap-8`}
								>
									{/* Content card */}
									<div
										className={`w-5/12 ${isEven ? 'text-right' : 'text-left'}`}
									>
										<div className="rounded-2xl border border-border bg-card p-6 shadow-lg transition-all duration-300 hover:shadow-2xl">
											<div
												className={`mb-2 text-sm font-bold text-primary ${isEven ? 'text-right' : 'text-left'}`}
											>
												{milestone.year}
											</div>
											<h3 className="mb-3 font-display text-xl font-bold text-foreground">
												{milestone.title}
											</h3>
											<p className="text-muted-foreground">
												{milestone.description}
											</p>
										</div>
									</div>

									{/* Center icon */}
									<div className="relative z-10 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full border-4 border-background bg-gradient-to-br from-primary to-green-500 shadow-lg">
										<IconComponent className="h-8 w-8 text-white" />
									</div>

									{/* Spacer for the other side */}
									<div className="w-5/12" />
								</motion.div>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	);
}
