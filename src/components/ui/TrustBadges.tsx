// src/components/ui/TrustBadges.tsx
'use client';

import { motion } from 'framer-motion';
import { Shield, Lock, Award, Users, Clock, HeadphonesIcon } from 'lucide-react';

const badges = [
	{
		icon: Shield,
		text: 'Secure & Reliable',
		description: 'Bank-level security',
	},
	{
		icon: Lock,
		text: 'SSL Protected',
		description: 'Encrypted data',
	},
	{
		icon: Award,
		text: '98% Satisfaction',
		description: 'Happy clients',
	},
	{
		icon: Users,
		text: '200+ Schools',
		description: 'Trust us',
	},
	{
		icon: Clock,
		text: '24-48 Hour Setup',
		description: 'Quick launch',
	},
	{
		icon: HeadphonesIcon,
		text: '24/7 Support',
		description: 'Always here',
	},
];

export function TrustBadges() {
	return (
		<section className="border-y border-border bg-muted/30 py-12">
			<div className="container mx-auto px-6">
				<div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
					{badges.map((badge, index) => {
						const IconComponent = badge.icon;
						return (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.4, delay: index * 0.05 }}
								className="flex flex-col items-center text-center"
							>
								<div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
									<IconComponent className="h-6 w-6 text-primary" />
								</div>
								<p className="mb-1 text-sm font-semibold text-foreground">
									{badge.text}
								</p>
								<p className="text-xs text-muted-foreground">
									{badge.description}
								</p>
							</motion.div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
