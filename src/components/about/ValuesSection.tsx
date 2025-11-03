// src/components/about/ValuesSection.tsx
'use client';

import { motion } from 'framer-motion';
import { Heart, Zap, Users, Shield, TrendingUp, Award } from 'lucide-react';

const values = [
	{
		icon: Heart,
		title: 'Customer First',
		description: 'Every decision we make starts with our customers\' needs',
	},
	{
		icon: Zap,
		title: 'Innovation',
		description: 'We constantly evolve to bring the best solutions',
	},
	{
		icon: Users,
		title: 'Collaboration',
		description: 'We succeed when our clients succeed',
	},
	{
		icon: Shield,
		title: 'Integrity',
		description: 'Transparent, honest, and reliable in everything we do',
	},
	{
		icon: TrendingUp,
		title: 'Excellence',
		description: 'We strive for the highest quality in our products',
	},
	{
		icon: Award,
		title: 'Affordability',
		description: 'Premium solutions at prices schools can afford',
	},
];

export function ValuesSection() {
	return (
		<section className="section-padding bg-gradient-to-b from-muted/30 to-background">
			<div className="container mx-auto px-6">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="mb-16 text-center"
				>
					<h2 className="mb-4 font-display text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
						Our Core Values
					</h2>
					<p className="mx-auto max-w-2xl text-lg text-muted-foreground">
						The principles that guide everything we do
					</p>
				</motion.div>

				<div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{values.map((value, index) => {
						const IconComponent = value.icon;
						return (
							<motion.div
								key={index}
								initial={{ opacity: 0, scale: 0.9 }}
								whileInView={{ opacity: 1, scale: 1 }}
								viewport={{ once: true }}
								transition={{ duration: 0.4, delay: index * 0.05 }}
								className="group flex flex-col items-center rounded-2xl border border-border bg-card p-8 text-center shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-primary/30 hover:shadow-2xl"
							>
								<div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110">
									<IconComponent className="h-8 w-8 text-primary" />
								</div>

								<h3 className="mb-3 font-display text-xl font-bold text-foreground">
									{value.title}
								</h3>

								<p className="text-muted-foreground">{value.description}</p>
							</motion.div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
