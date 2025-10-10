'use client';

import { motion } from 'framer-motion';
import { School, Users, Globe, Award } from 'lucide-react';

export function StatsSection() {
	const stats = [
		{
			icon: School,
			value: '50+',
			label: 'Schools Served',
			description: 'Across India',
		},
		{
			icon: Users,
			value: '100K+',
			label: 'Students Reached',
			description: 'Through our platform',
		},
		{
			icon: Globe,
			value: '99.9%',
			label: 'Uptime',
			description: 'Guaranteed reliability',
		},
		{
			icon: Award,
			value: '4.9/5',
			label: 'Client Rating',
			description: 'Satisfaction score',
		},
	];

	return (
		<section className="section-padding relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-muted/20">
			{/* Decorative Background Elements */}
			<div className="absolute inset-0 -z-10 opacity-30">
				<div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
				<div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-green-500/10 blur-3xl" />
			</div>

			<div className="container mx-auto px-6">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="mb-16 text-center"
				>
					<h2 className="section-heading mb-4 text-foreground">
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
							<motion.div
								key={stat.label}
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5, delay: index * 0.1 }}
								whileHover={{ y: -10, transition: { duration: 0.3 } }}
								className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 text-center shadow-lg transition-all hover:border-primary/30 hover:shadow-2xl"
							>
								{/* Background Gradient on Hover */}
								<div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

								{/* Content */}
								<div className="relative z-10">
									<div className="mb-4 inline-flex rounded-xl bg-primary/10 p-4 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20">
										<IconComponent className="h-8 w-8 text-primary" />
									</div>
									<p className="mb-2 font-display text-4xl font-extrabold text-foreground">
										{stat.value}
									</p>
									<p className="mb-1 text-lg font-semibold text-foreground">
										{stat.label}
									</p>
									<p className="text-sm text-muted-foreground">
										{stat.description}
									</p>
								</div>

								{/* Decorative Corner Element */}
								<div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-primary/5 transition-all duration-300 group-hover:scale-150 group-hover:bg-primary/10" />
							</motion.div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
