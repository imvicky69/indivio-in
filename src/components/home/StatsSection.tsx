'use client';

import { motion, useAnimationControls } from 'framer-motion';
import { School, Users, Globe, Award } from 'lucide-react';
import { useEffect, useState } from 'react';
import { GlassmorphicCard } from '../ui/GlassmorphicCard';
import { FloatingElement } from '../ui/FloatingElement';

export function StatsSection() {
	const stats = [
		{
			icon: School,
			value: '50+',
			label: 'Schools Served',
			description: 'Across India',
			color: 'from-blue-500 to-cyan-500',
		},
		{
			icon: Users,
			value: '100K+',
			label: 'Students Reached',
			description: 'Through our platform',
			color: 'from-purple-500 to-pink-500',
		},
		{
			icon: Globe,
			value: '99.9%',
			label: 'Uptime',
			description: 'Guaranteed reliability',
			color: 'from-green-500 to-emerald-500',
		},
		{
			icon: Award,
			value: '4.9/5',
			label: 'Client Rating',
			description: 'Satisfaction score',
			color: 'from-orange-500 to-red-500',
		},
	];

	return (
		<section className="section-padding relative overflow-hidden bg-gradient-to-br from-purple-900/10 via-background to-pink-900/10">
			{/* Decorative Background Elements */}
			<div className="absolute inset-0 -z-10 opacity-30">
				<div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl" />
				<div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-pink-500/20 blur-3xl" />
				<div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-3xl" />
			</div>

			<div className="container relative z-10 mx-auto px-6">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="mb-16 text-center"
				>
					<h2 className="section-heading mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
						Empowering Education, One School at a Time
					</h2>
					<p className="mx-auto max-w-2xl text-lg text-muted-foreground">
						Join a growing community of educational institutions transforming
						their digital presence
					</p>
				</motion.div>

				<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
					{stats.map((stat, index) => {
						const IconComponent = stat.icon;
						return (
							<FloatingElement
								key={stat.label}
								delay={index * 0.2}
								duration={3 + index * 0.5}
							>
								<GlassmorphicCard delay={index * 0.15} hoverEffect={true}>
									<div className="text-center">
										<motion.div
											initial={{ scale: 0, rotate: -180 }}
											whileInView={{ scale: 1, rotate: 0 }}
											viewport={{ once: true }}
											transition={{
												duration: 0.6,
												delay: index * 0.15,
												type: 'spring',
											}}
											className="mb-4 flex justify-center"
										>
											<div
												className={`rounded-2xl bg-gradient-to-br ${stat.color} p-4 shadow-lg`}
											>
												<IconComponent className="h-8 w-8 text-white" />
											</div>
										</motion.div>
										<motion.div
											initial={{ opacity: 0, y: 20 }}
											whileInView={{ opacity: 1, y: 0 }}
											viewport={{ once: true }}
											transition={{
												duration: 0.5,
												delay: index * 0.15 + 0.2,
											}}
										>
											<AnimatedCounter
												value={stat.value}
												delay={index * 0.15 + 0.3}
											/>
											<p className="mt-2 font-display text-lg font-semibold text-foreground">
												{stat.label}
											</p>
											<p className="mt-1 text-sm text-muted-foreground">
												{stat.description}
											</p>
										</motion.div>
									</div>
								</GlassmorphicCard>
							</FloatingElement>
						);
					})}
				</div>
			</div>
		</section>
	);
}

function AnimatedCounter({
	value,
	delay,
}: {
	value: string;
	delay: number;
}) {
	const [displayValue, setDisplayValue] = useState('0');
	const [hasAnimated, setHasAnimated] = useState(false);

	useEffect(() => {
		if (hasAnimated) return;

		const timer = setTimeout(() => {
			setHasAnimated(true);
			// For values with numbers, animate the counter
			const numberMatch = value.match(/\d+/);
			if (numberMatch) {
				const targetNumber = parseInt(numberMatch[0]);
				const duration = 2000; // 2 seconds
				const steps = 60;
				const increment = targetNumber / steps;
				let current = 0;

				const interval = setInterval(() => {
					current += increment;
					if (current >= targetNumber) {
						setDisplayValue(value);
						clearInterval(interval);
					} else {
						setDisplayValue(
							value.replace(/\d+/, Math.floor(current).toString())
						);
					}
				}, duration / steps);

				return () => clearInterval(interval);
			} else {
				setDisplayValue(value);
			}
		}, delay * 1000);

		return () => clearTimeout(timer);
	}, [value, delay, hasAnimated]);

	return (
		<motion.h3
			className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text font-display text-4xl font-bold text-transparent"
			animate={{
				scale: [1, 1.05, 1],
			}}
			transition={{
				duration: 2,
				repeat: Infinity,
				ease: 'easeInOut',
			}}
		>
			{displayValue}
		</motion.h3>
	);
}
