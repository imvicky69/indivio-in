// src/components/home/V2TeaserSection.tsx
'use client';

import { motion } from 'framer-motion';
import { Sparkles, Rocket, Bell, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function V2TeaserSection() {
	return (
		<section className="section-padding relative overflow-hidden bg-gradient-to-br from-accent/5 via-background to-primary/5">
			{/* Animated Background Elements */}
			<div className="absolute inset-0 -z-10">
				<div className="absolute right-1/4 top-0 h-96 w-96 animate-pulse rounded-full bg-accent/20 blur-3xl" />
				<div
					className="absolute bottom-0 left-1/4 h-96 w-96 animate-pulse rounded-full bg-primary/20 blur-3xl"
					style={{ animationDelay: '1.5s' }}
				/>
			</div>

			<div className="container mx-auto px-6">
				<div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border-2 border-accent/20 bg-gradient-to-br from-card via-background to-muted/30 p-8 shadow-2xl md:p-12">
					{/* Decorative corner accents */}
					<div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent/10 blur-2xl" />
					<div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-primary/10 blur-2xl" />

					<div className="relative z-10">
						{/* Badge */}
						<motion.div
							initial={{ opacity: 0, y: -20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5 }}
							className="mb-6 flex justify-center"
						>
							<div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-6 py-2.5 shadow-md">
								<Sparkles className="h-5 w-5 animate-pulse text-accent" />
								<span className="font-semibold text-accent">
									Coming Soon
								</span>
							</div>
						</motion.div>

						{/* Main Heading */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6, delay: 0.1 }}
							className="mb-6 text-center"
						>
							<h2 className="mb-4 font-display text-4xl font-bold text-foreground md:text-5xl lg:text-6xl">
								<span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
									Indivio V2
								</span>{' '}
								is on the Horizon
							</h2>
						</motion.div>

						{/* Description */}
						<motion.p
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 1 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6, delay: 0.2 }}
							className="mx-auto mb-8 max-w-2xl text-center text-lg leading-relaxed text-muted-foreground md:text-xl"
						>
							We're building the next generation of Indivio with powerful new
							features, enhanced performance, and a revolutionary user
							experience. Be the first to explore our journey and witness the
							future of school management.
						</motion.p>

						{/* Features Grid */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6, delay: 0.3 }}
							className="mb-10 grid gap-6 md:grid-cols-3"
						>
							{[
								{
									icon: Rocket,
									title: 'Revolutionary Features',
									description: 'Advanced tools designed for modern education',
								},
								{
									icon: Sparkles,
									title: 'Enhanced Experience',
									description: 'Intuitive interface with seamless workflows',
								},
								{
									icon: Bell,
									title: 'Early Access',
									description: 'Get notified when V2 launches',
								},
							].map((feature, index) => {
								const IconComponent = feature.icon;
								return (
									<motion.div
										key={index}
										initial={{ opacity: 0, y: 20 }}
										whileInView={{ opacity: 1, y: 0 }}
										viewport={{ once: true }}
										transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
										className="group rounded-xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-accent/50 hover:shadow-lg"
									>
										<IconComponent className="mb-3 h-8 w-8 text-accent transition-transform duration-300 group-hover:scale-110" />
										<h3 className="mb-2 font-display text-base font-semibold text-foreground">
											{feature.title}
										</h3>
										<p className="text-sm leading-relaxed text-muted-foreground">
											{feature.description}
										</p>
									</motion.div>
								);
							})}
						</motion.div>

						{/* CTA Buttons */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6, delay: 0.6 }}
							className="flex flex-col items-center justify-center gap-4 sm:flex-row"
						>
							<Button
								href="/contact"
								variant="accent"
								className="group min-w-[200px]"
							>
								<Bell className="mr-2 h-5 w-5" />
								<span>Get Early Access</span>
								<ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
							</Button>
							<Button
								href="/features"
								variant="secondary"
								className="min-w-[200px]"
							>
								Explore Current Features
							</Button>
						</motion.div>

						{/* Bottom Note */}
						<motion.p
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 1 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6, delay: 0.7 }}
							className="mt-8 text-center text-sm text-muted-foreground"
						>
							Stay tuned for exciting announcements and exclusive previews
						</motion.p>
					</div>
				</div>
			</div>
		</section>
	);
}
