// src/components/home/StatsSection.tsx
'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Users, Building2, Award, TrendingUp } from 'lucide-react';

const stats = [
	{
		icon: Building2,
		value: 200,
		suffix: '+',
		label: 'Schools & Colleges',
		description: 'Trust our platform',
	},
	{
		icon: Users,
		value: 50000,
		suffix: '+',
		label: 'Students Enrolled',
		description: 'Active users',
	},
	{
		icon: Award,
		value: 98,
		suffix: '%',
		label: 'Satisfaction Rate',
		description: 'Happy clients',
	},
	{
		icon: TrendingUp,
		value: 40,
		suffix: '%',
		label: 'Admission Increase',
		description: 'Average growth',
	},
];

function Counter({ value, duration = 2 }: { value: number; duration?: number }) {
	const [count, setCount] = useState(0);
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true });

	useEffect(() => {
		if (!isInView) return;

		let startTime: number;
		const animate = (currentTime: number) => {
			if (!startTime) startTime = currentTime;
			const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
			
			setCount(Math.floor(progress * value));

			if (progress < 1) {
				requestAnimationFrame(animate);
			}
		};

		requestAnimationFrame(animate);
	}, [isInView, value, duration]);

	return <span ref={ref}>{count.toLocaleString()}</span>;
}

export function StatsSection() {
	return (
		<section className="section-padding relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary/5">
			{/* Background decorative elements */}
			<div className="absolute inset-0 -z-10">
				<div className="absolute left-1/4 top-20 h-64 w-64 rounded-full bg-green-500/5 blur-3xl" />
				<div className="absolute bottom-20 right-1/4 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
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
						Making a Real Impact in Education
					</h2>
					<p className="mx-auto max-w-2xl text-lg text-muted-foreground">
						Numbers that reflect our commitment to transforming educational
						institutions across India
					</p>
				</motion.div>

				<div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
					{stats.map((stat, index) => {
						const IconComponent = stat.icon;
						return (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5, delay: index * 0.1 }}
								className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 text-center shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-primary/30 hover:shadow-2xl"
							>
								{/* Icon with gradient background */}
								<div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-green-500/10 transition-all duration-300 group-hover:from-primary/20 group-hover:to-green-500/20">
									<IconComponent className="h-8 w-8 text-primary" />
								</div>

								{/* Stat Value */}
								<div className="mb-2 font-display text-4xl font-bold text-foreground md:text-5xl">
									<Counter value={stat.value} />
									<span className="text-primary">{stat.suffix}</span>
								</div>

								{/* Label */}
								<h3 className="mb-2 text-lg font-semibold text-foreground">
									{stat.label}
								</h3>

								{/* Description */}
								<p className="text-sm text-muted-foreground">
									{stat.description}
								</p>

								{/* Animated gradient overlay */}
								<div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/0 via-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
							</motion.div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
