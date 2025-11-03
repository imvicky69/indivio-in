// src/components/about/MissionVision.tsx
'use client';

import { motion } from 'framer-motion';
import { Target, Eye, Lightbulb } from 'lucide-react';

export function MissionVision() {
	const items = [
		{
			icon: Target,
			title: 'Our Mission',
			description:
				'To democratize access to quality education technology by providing affordable, professional school management systems and websites to institutions of all sizes across India.',
			gradient: 'from-blue-500/10 to-blue-600/5',
			iconBg: 'bg-blue-500/10',
			iconColor: 'text-blue-600',
		},
		{
			icon: Eye,
			title: 'Our Vision',
			description:
				'To become India\'s most trusted education technology partner, enabling every school to have a strong digital presence and streamlined operations that enhance the learning experience.',
			gradient: 'from-purple-500/10 to-purple-600/5',
			iconBg: 'bg-purple-500/10',
			iconColor: 'text-purple-600',
		},
		{
			icon: Lightbulb,
			title: 'Our Approach',
			description:
				'We combine cutting-edge technology with deep understanding of educational needs to create solutions that are powerful yet simple, comprehensive yet affordable, and innovative yet practical.',
			gradient: 'from-green-500/10 to-green-600/5',
			iconBg: 'bg-green-500/10',
			iconColor: 'text-green-600',
		},
	];

	return (
		<section className="section-padding bg-gradient-to-b from-background to-muted/30">
			<div className="container mx-auto px-6">
				<div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-3">
					{items.map((item, index) => {
						const IconComponent = item.icon;
						return (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5, delay: index * 0.1 }}
								className={`group relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br ${item.gradient} p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl`}
							>
								<div
									className={`mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl ${item.iconBg} transition-transform duration-300 group-hover:scale-110`}
								>
									<IconComponent className={`h-8 w-8 ${item.iconColor}`} />
								</div>

								<h3 className="mb-4 font-display text-2xl font-bold text-foreground">
									{item.title}
								</h3>

								<p className="leading-relaxed text-muted-foreground">
									{item.description}
								</p>

								{/* Decorative element */}
								<div className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
							</motion.div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
