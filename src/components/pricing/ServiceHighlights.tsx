'use client';

import { Globe, Server, Gauge, Shield, Award, Code } from 'lucide-react';
import { motion } from 'framer-motion';

export function ServiceHighlights() {
	const highlights = [
		{
			title: 'Professional School Website',
			description:
				'Get a professionally designed website optimized for educational institutions with all the essential pages and features.',
			icon: <Globe className="h-8 w-8 text-blue-500" />,
		},
		{
			title: 'Hassle-Free Hosting',
			description:
				"We take care of reliable hosting, SSL certificates, security updates, and technical maintenance so you don't have to.",
			icon: <Server className="h-8 w-8 text-green-500" />,
		},
		{
			title: 'Fast Performance',
			description:
				'Optimized code and content delivery ensures your website loads quickly and works seamlessly on all devices.',
			icon: <Gauge className="h-8 w-8 text-amber-500" />,
		},
		{
			title: 'Secure & Reliable',
			description:
				'Built with security best practices, regular backups, and protection against common vulnerabilities.',
			icon: <Shield className="h-8 w-8 text-red-500" />,
		},
		{
			title: 'SEO Optimized',
			description:
				'Built with search engine best practices to help parents and prospective students find your school online.',
			icon: <Award className="h-8 w-8 text-purple-500" />,
		},
		{
			title: 'Easy Content Management',
			description:
				'User-friendly dashboard lets you update content, announcements, photos, and more without technical skills.',
			icon: <Code className="h-8 w-8 text-indigo-500" />,
		},
	];

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				duration: 0.6,
				staggerChildren: 0.1,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 30 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.6,
			},
		},
	};

	return (
		<section className="bg-card py-16">
			<div className="container mx-auto px-6">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="mb-12 text-center"
				>
					<h2 className="font-display text-3xl font-bold text-foreground">
						What&apos;s Included in Every Plan
					</h2>
					<p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
						Every school website we build comes with these essential features
						and services, regardless of which plan you choose.
					</p>
				</motion.div>

				<motion.div
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
					className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
				>
					{highlights.map((highlight, index) => (
						<motion.div
							key={index}
							variants={itemVariants}
							whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
							className="rounded-lg border border-border bg-muted/50 p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-lg"
						>
							<motion.div
								initial={{ scale: 0 }}
								whileInView={{ scale: 1 }}
								viewport={{ once: true }}
								transition={{
									delay: 0.2 + index * 0.1,
									type: 'spring',
									stiffness: 200,
								}}
								className="mb-4"
							>
								{highlight.icon}
							</motion.div>
							<h3 className="mb-2 text-xl font-semibold text-foreground">
								{highlight.title}
							</h3>
							<p className="text-muted-foreground">{highlight.description}</p>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	);
}
