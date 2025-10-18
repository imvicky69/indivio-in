'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Award, Star } from 'lucide-react';
import Image from 'next/image';

export function BuiltWithIndivio() {
	const demoSites = [
		{
			id: 'demo1',
			name: 'Greenwood International School',
			tagline: 'Modern education, powered by innovation',
			plan: 'Professional Plan',
			image: '/demo-placeholder-1.jpg',
			demoUrl: 'https://demo.indivio.in',
			features: ['10+ Pages', 'Admin Dashboard', 'SEO Optimized'],
		},
		{
			id: 'demo2',
			name: 'Sunshine Public School',
			tagline: 'Nurturing young minds for a bright future',
			plan: 'Enterprise Plan',
			image: '/demo-placeholder-2.jpg',
			demoUrl: 'https://demo.indivio.in',
			features: ['Custom Design', 'Advanced Analytics', 'Priority Support'],
		},
		{
			id: 'demo3',
			name: 'Little Stars Preschool',
			tagline: 'Where learning begins with joy',
			plan: 'Starter Plan',
			image: '/demo-placeholder-3.jpg',
			demoUrl: 'https://demo.indivio.in',
			features: ['5 Pages', 'Mobile Responsive', 'Fast Setup'],
		},
	];

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				duration: 0.6,
				staggerChildren: 0.2,
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
		<section className="bg-card py-20">
			<div className="container mx-auto px-6">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="mb-16 text-center"
				>
					<div className="mb-4 inline-flex items-center gap-2 rounded-full border-2 border-primary/20 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
						<Award className="h-4 w-4" />
						<span>Showcase</span>
					</div>
					<h2 className="mb-4 font-display text-3xl font-bold text-foreground sm:text-4xl">
						Built with Indivio
					</h2>
					<p className="mx-auto max-w-2xl text-lg text-muted-foreground">
						See how schools are transforming their digital presence with our
						platform
					</p>
				</motion.div>

				<motion.div
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
					className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
				>
					{demoSites.map((site, index) => (
						<motion.div
							key={site.id}
							variants={itemVariants}
							whileHover={{
								y: -8,
								transition: { duration: 0.3 },
							}}
							className="group relative overflow-hidden rounded-2xl border-2 border-border bg-card shadow-lg transition-all duration-300 hover:border-primary/50 hover:shadow-2xl"
						>
							{/* Image/Placeholder */}
							<div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5">
								{/* Placeholder pattern - can be replaced with actual image */}
								<div className="absolute inset-0 flex items-center justify-center">
									<div className="text-center">
										<div className="mb-2 flex justify-center">
											{[1, 2, 3, 4, 5].map((star) => (
												<Star
													key={star}
													className="h-5 w-5 fill-primary text-primary"
												/>
											))}
										</div>
										<p className="text-sm font-semibold text-primary">
											Demo Website
										</p>
									</div>
								</div>

								{/* Hover Overlay */}
								<motion.div
									initial={{ opacity: 0 }}
									whileHover={{ opacity: 1 }}
									className="absolute inset-0 flex items-center justify-center bg-primary/90 backdrop-blur-sm"
								>
									<a
										href={site.demoUrl}
										target="_blank"
										rel="noopener noreferrer"
										className="flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-primary shadow-lg transition-all duration-300 hover:scale-105"
									>
										View Demo
										<ExternalLink className="h-5 w-5" />
									</a>
								</motion.div>
							</div>

							{/* Content */}
							<div className="p-6">
								{/* Plan Badge */}
								<div className="mb-3 inline-block rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
									{site.plan}
								</div>

								{/* School Name */}
								<h3 className="mb-2 text-xl font-bold text-foreground">
									{site.name}
								</h3>

								{/* Tagline */}
								<p className="mb-4 text-sm text-muted-foreground">
									{site.tagline}
								</p>

								{/* Features */}
								<div className="flex flex-wrap gap-2">
									{site.features.map((feature) => (
										<span
											key={feature}
											className="rounded-lg border border-border bg-muted/50 px-3 py-1 text-xs font-medium text-foreground"
										>
											{feature}
										</span>
									))}
								</div>
							</div>

							{/* Bottom accent */}
							<div className="h-1 bg-gradient-to-r from-primary via-primary/50 to-transparent"></div>
						</motion.div>
					))}
				</motion.div>

				{/* Additional Info */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.6 }}
					className="mt-12 text-center"
				>
					<p className="text-muted-foreground">
						Want to see your school here?{' '}
						<a
							href="/contact"
							className="font-semibold text-primary hover:underline"
						>
							Get started today
						</a>
					</p>
				</motion.div>
			</div>
		</section>
	);
}
