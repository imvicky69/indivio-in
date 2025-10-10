'use client';

import { motion } from 'framer-motion';
import { Globe, Palette, Check, X } from 'lucide-react';
import type { Plan } from '@/lib/plans';

interface AddOnsSectionProps {
	plans: Plan[];
}

export function AddOnsSection({ plans }: AddOnsSectionProps) {
	const addOns = [
		{
			id: 'customDomain',
			name: 'Custom Domain',
			icon: Globe,
			description:
				'Use your own professional domain name (e.g., www.yourschool.com)',
			details: [
				'Professional email addresses',
				'Better brand recognition',
				'Improved SEO rankings',
				'Domain registration assistance',
			],
		},
		{
			id: 'customDesign',
			name: 'Custom Design',
			icon: Palette,
			description:
				"Fully bespoke design tailored to your school's unique brand identity",
			details: [
				'Unlimited design revisions',
				'Custom color schemes & typography',
				'Unique layouts & components',
				'Brand identity integration',
			],
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
		<section className="bg-gradient-to-b from-background to-muted/20 py-20">
			<div className="container mx-auto px-6">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="mb-16 text-center"
				>
					<h2 className="mb-4 font-display text-3xl font-bold text-foreground sm:text-4xl">
						Enhance Your Plan with Add-Ons
					</h2>
					<p className="mx-auto max-w-2xl text-lg text-muted-foreground">
						Customize your website with optional premium features. Available for
						all plans.
					</p>
				</motion.div>

				<motion.div
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
					className="grid gap-8 lg:grid-cols-2"
				>
					{addOns.map((addOn) => {
						const IconComponent = addOn.icon;

						return (
							<motion.div
								key={addOn.id}
								variants={itemVariants}
								whileHover={{
									scale: 1.02,
									transition: { duration: 0.3 },
								}}
								className="overflow-hidden rounded-3xl border border-border bg-card shadow-lg transition-all duration-300 hover:border-primary/50 hover:shadow-2xl"
							>
								{/* Add-on Header */}
								<div className="border-b border-border bg-gradient-to-r from-primary/10 to-primary/5 p-8">
									<div className="mb-4 inline-flex rounded-xl bg-primary/20 p-4">
										<IconComponent className="h-8 w-8 text-primary" />
									</div>
									<h3 className="mb-2 font-display text-2xl font-bold text-foreground">
										{addOn.name}
									</h3>
									<p className="text-base text-muted-foreground">
										{addOn.description}
									</p>
								</div>

								{/* Add-on Details */}
								<div className="p-8">
									<ul className="mb-6 space-y-3">
										{addOn.details.map((detail) => (
											<li key={detail} className="flex items-start gap-3">
												<div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
													<Check className="h-3.5 w-3.5 text-green-600" />
												</div>
												<span className="text-sm text-foreground">
													{detail}
												</span>
											</li>
										))}
									</ul>

									{/* Pricing per plan */}
									<div className="rounded-xl bg-muted/50 p-4">
										<p className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
											Availability & Pricing
										</p>
										<div className="space-y-2">
											{plans.map((plan) => {
												const addOnData =
													plan.addOns?.[addOn.id as keyof typeof plan.addOns];
												if (!addOnData) return null;

												return (
													<div
														key={plan.id}
														className="flex items-center justify-between rounded-lg border border-border bg-card p-3"
													>
														<span className="font-medium text-foreground">
															{plan.name}
														</span>
														{addOnData.available ? (
															addOnData.price === 0 ||
															addOnData.price === null ? (
																<span className="flex items-center gap-1 text-sm font-semibold text-green-600">
																	<Check className="h-4 w-4" />
																	Included FREE
																</span>
															) : (
																<span className="text-sm font-semibold text-foreground">
																	₹{addOnData.price.toLocaleString('en-IN')}
																</span>
															)
														) : (
															<span className="flex items-center gap-1 text-sm text-muted-foreground">
																<X className="h-4 w-4" />
																Not available
															</span>
														)}
													</div>
												);
											})}
										</div>
									</div>
								</div>
							</motion.div>
						);
					})}
				</motion.div>

				{/* Additional Info */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.4 }}
					className="mt-12 rounded-2xl border border-primary/20 bg-primary/5 p-8 text-center"
				>
					<p className="text-lg text-foreground">
						<strong>Need something else?</strong> We can accommodate custom
						requirements.{' '}
						<a
							href="/contact"
							className="font-semibold text-primary underline hover:text-primary/80"
						>
							Contact us
						</a>{' '}
						to discuss your specific needs.
					</p>
				</motion.div>
			</div>
		</section>
	);
}
