// src/components/ui/V2TeaserBanner.tsx
'use client';

import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Rocket } from 'lucide-react';
import { Button } from './Button';

export function V2TeaserBanner() {
	return (
		<section className="section-padding relative overflow-hidden bg-gradient-to-br from-primary/5 via-accent/5 to-success/5">
			{/* Animated Background Elements */}
			<div className="absolute inset-0 -z-10">
				<div className="absolute right-1/4 top-10 h-72 w-72 animate-pulse rounded-full bg-accent/10 blur-3xl" />
				<div
					className="absolute bottom-10 left-1/4 h-72 w-72 animate-pulse rounded-full bg-success/10 blur-3xl"
					style={{ animationDelay: '1.5s' }}
				/>
			</div>

			<div className="container mx-auto px-6">
				<motion.div
					initial={{ opacity: 0, scale: 0.95 }}
					whileInView={{ opacity: 1, scale: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="relative overflow-hidden rounded-3xl border-2 border-primary/10 bg-gradient-to-br from-card via-card to-muted/30 p-8 shadow-2xl md:p-12"
				>
					{/* Top Badge */}
					<motion.div
						initial={{ opacity: 0, y: -20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: 0.2 }}
						className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-sm font-semibold text-accent-foreground backdrop-blur-sm"
					>
						<Sparkles className="h-4 w-4 text-accent" />
						<span className="text-accent">Coming Soon</span>
					</motion.div>

					<div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
						{/* Left Content */}
						<motion.div
							initial={{ opacity: 0, x: -20 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6, delay: 0.3 }}
						>
							<h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
								🚀 Indivio V2 is Coming!
							</h2>

							<p className="mb-6 text-lg text-muted-foreground md:text-xl">
								We&apos;re building something extraordinary! The next generation
								of Indivio will feature a stunning showcase site, enhanced
								management tools, and powerful new capabilities to transform
								your school&apos;s digital presence.
							</p>

							<div className="mb-8 space-y-3">
								<motion.div
									initial={{ opacity: 0, x: -10 }}
									whileInView={{ opacity: 1, x: 0 }}
									viewport={{ once: true }}
									transition={{ duration: 0.4, delay: 0.5 }}
									className="flex items-start gap-3"
								>
									<div className="mt-1 flex-shrink-0 rounded-full bg-success/20 p-1">
										<div className="h-2 w-2 rounded-full bg-success" />
									</div>
									<p className="text-muted-foreground">
										<strong className="text-foreground">
											Interactive Showcase:
										</strong>{' '}
										Explore our journey and innovation
									</p>
								</motion.div>

								<motion.div
									initial={{ opacity: 0, x: -10 }}
									whileInView={{ opacity: 1, x: 0 }}
									viewport={{ once: true }}
									transition={{ duration: 0.4, delay: 0.6 }}
									className="flex items-start gap-3"
								>
									<div className="mt-1 flex-shrink-0 rounded-full bg-success/20 p-1">
										<div className="h-2 w-2 rounded-full bg-success" />
									</div>
									<p className="text-muted-foreground">
										<strong className="text-foreground">
											Enhanced Features:
										</strong>{' '}
										More powerful tools for growth
									</p>
								</motion.div>

								<motion.div
									initial={{ opacity: 0, x: -10 }}
									whileInView={{ opacity: 1, x: 0 }}
									viewport={{ once: true }}
									transition={{ duration: 0.4, delay: 0.7 }}
									className="flex items-start gap-3"
								>
									<div className="mt-1 flex-shrink-0 rounded-full bg-success/20 p-1">
										<div className="h-2 w-2 rounded-full bg-success" />
									</div>
									<p className="text-muted-foreground">
										<strong className="text-foreground">Better Experience:</strong>{' '}
										Refined UI/UX for everyone
									</p>
								</motion.div>
							</div>

							<motion.div
								initial={{ opacity: 0, y: 10 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5, delay: 0.8 }}
								className="flex flex-col gap-4 sm:flex-row sm:items-center"
							>
								<Button href="/contact" variant="primary" className="group">
									<span>Get Early Access</span>
									<ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
								</Button>
								<p className="text-sm text-muted-foreground">
									Be the first to experience V2!
								</p>
							</motion.div>
						</motion.div>

						{/* Right Visual Element */}
						<motion.div
							initial={{ opacity: 0, scale: 0.9 }}
							whileInView={{ opacity: 1, scale: 1 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6, delay: 0.4 }}
							className="relative hidden lg:block"
						>
							<div className="relative">
								{/* Main Card */}
								<div className="relative z-10 rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-background to-muted p-6 shadow-xl">
									<div className="mb-4 flex items-center justify-between">
										<div className="flex items-center gap-2">
											<Rocket className="h-6 w-6 text-accent" />
											<h3 className="text-xl font-bold text-foreground">
												Indivio V2
											</h3>
										</div>
										<div className="rounded-full bg-success/20 px-3 py-1 text-xs font-semibold text-success">
											Beta Preview
										</div>
									</div>

									<div className="space-y-3">
										<div className="rounded-lg border border-border bg-card p-4 shadow-sm">
											<div className="mb-2 flex items-center gap-2">
												<div className="h-3 w-3 rounded-full bg-green-500" />
												<span className="text-sm font-semibold text-foreground">
													Showcase Site
												</span>
											</div>
											<div className="h-2 w-full rounded-full bg-muted">
												<motion.div
													initial={{ width: 0 }}
													whileInView={{ width: '85%' }}
													viewport={{ once: true }}
													transition={{ duration: 1, delay: 1 }}
													className="h-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500"
												/>
											</div>
										</div>

										<div className="rounded-lg border border-border bg-card p-4 shadow-sm">
											<div className="mb-2 flex items-center gap-2">
												<div className="h-3 w-3 rounded-full bg-blue-500" />
												<span className="text-sm font-semibold text-foreground">
													New Features
												</span>
											</div>
											<div className="h-2 w-full rounded-full bg-muted">
												<motion.div
													initial={{ width: 0 }}
													whileInView={{ width: '72%' }}
													viewport={{ once: true }}
													transition={{ duration: 1, delay: 1.2 }}
													className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"
												/>
											</div>
										</div>

										<div className="rounded-lg border border-border bg-card p-4 shadow-sm">
											<div className="mb-2 flex items-center gap-2">
												<div className="h-3 w-3 rounded-full bg-purple-500" />
												<span className="text-sm font-semibold text-foreground">
													Enhanced Performance
												</span>
											</div>
											<div className="h-2 w-full rounded-full bg-muted">
												<motion.div
													initial={{ width: 0 }}
													whileInView={{ width: '90%' }}
													viewport={{ once: true }}
													transition={{ duration: 1, delay: 1.4 }}
													className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
												/>
											</div>
										</div>
									</div>
								</div>

								{/* Floating Badge */}
								<motion.div
									initial={{ opacity: 0, scale: 0.8, rotate: -15 }}
									whileInView={{ opacity: 1, scale: 1, rotate: -12 }}
									viewport={{ once: true }}
									transition={{ duration: 0.5, delay: 1.6 }}
									className="absolute -right-4 -top-4 rounded-2xl bg-gradient-to-br from-accent to-accent/80 px-4 py-3 text-white shadow-xl"
								>
									<p className="text-xs font-medium">Preview</p>
									<p className="text-2xl font-bold">V2.0</p>
								</motion.div>
							</div>
						</motion.div>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
