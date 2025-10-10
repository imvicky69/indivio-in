'use client';

import { Plan, Offer } from '@/lib/plans';
import { Check, Star } from 'lucide-react';
import { Button } from '../ui/Button';
import { motion } from 'framer-motion';

interface PricingContent {
	pricing?: {
		heroTitle?: string;
		heroSubtitle?: string;
		ctaPrimary?: string;
		ctaSecondary?: string;
		sectionIntro?: string;
		offerBanner?: {
			enabled?: boolean;
			text?: string;
			discountPercent?: number;
			appliesTo?: string;
		};
	};
}

interface PricingSectionProps {
	plans: Plan[];
	offers?: Offer[];
	content?: PricingContent;
}

export function PricingSection({ plans, content }: PricingSectionProps) {
	const c = content?.pricing || {};

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

	const cardVariants = {
		hidden: { opacity: 0, y: 50 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.6,
			},
		},
	};

	return (
		<section className="bg-gradient-to-b from-background to-muted/20 py-16 sm:py-20">
			<div className="container mx-auto px-6">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="mb-12 text-center"
				>
					<h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
						{c.heroTitle || 'Choose the Perfect Plan for Your Institution'}
					</h2>
					<p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
						{c.heroSubtitle ||
							'Transparent pricing with no hidden fees. One-time setup plus annual maintenance.'}
					</p>
				</motion.div>

				<motion.div
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
					className="mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-3"
				>
					{plans.map((plan) => (
						<motion.div
							key={plan.id}
							variants={cardVariants}
							whileHover={{ y: -10, transition: { duration: 0.3 } }}
							className={`relative flex min-h-[580px] flex-col justify-between overflow-hidden rounded-2xl border p-8 transition-all duration-300 ease-in-out hover:shadow-2xl ${
								plan.isMostPopular
									? 'border-primary bg-gradient-to-b from-white to-primary/5 shadow-lg'
									: 'border-border bg-card hover:border-primary/50'
							}`}
						>
							{plan.isMostPopular && (
								<motion.div
									initial={{ scale: 0 }}
									animate={{ scale: 1 }}
									transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
									className="absolute left-1/2 top-0 z-10 -translate-x-1/2"
								>
									<span className="flex -translate-y-1/2 transform items-center rounded-full bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground shadow-md">
										<Star className="mr-1.5 h-4 w-4" />
										Most Popular
									</span>
								</motion.div>
							)}

							<div className="relative z-0 flex flex-1 flex-col justify-between">
								<motion.h3
									initial={{ opacity: 0 }}
									whileInView={{ opacity: 1 }}
									viewport={{ once: true }}
									transition={{ delay: 0.2 }}
									className="font-display text-2xl font-bold text-foreground"
								>
									{plan.name}
								</motion.h3>
								<motion.p
									initial={{ opacity: 0 }}
									whileInView={{ opacity: 1 }}
									viewport={{ once: true }}
									transition={{ delay: 0.3 }}
									className="mt-2 text-muted-foreground"
								>
									{plan.short || plan.description}
								</motion.p>

								<motion.div
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ delay: 0.4 }}
									className="mt-8 flex flex-col space-y-6"
								>
									{/* Setup fee without discount */}
									{plan.setupFee && (
										<div className="flex flex-col">
											<div className="flex items-baseline">
												<span className="text-4xl font-extrabold text-foreground">
													₹{plan.setupFee.toLocaleString('en-IN')}
												</span>
											</div>
											<div className="mt-1">
												<span className="text-sm text-muted-foreground">
													one-time setup
												</span>
											</div>
										</div>
									)}

									{/* Yearly fee */}
									<div className="flex flex-col">
										<div className="flex items-baseline">
											<span className="text-2xl font-semibold text-foreground">
												₹{plan.price.toLocaleString('en-IN')}
											</span>
											<span className="ml-2 text-sm text-muted-foreground">
												{plan.pricePeriod}
											</span>
										</div>
										<div className="mt-1">
											<span className="text-sm text-muted-foreground">
												(includes hosting & maintenance)
											</span>
										</div>
									</div>
								</motion.div>

								<motion.ul
									initial={{ opacity: 0 }}
									whileInView={{ opacity: 1 }}
									viewport={{ once: true }}
									transition={{ delay: 0.5 }}
									className="mt-8 flex-1 space-y-4"
								>
									{plan.features.slice(0, 4).map((feature, index) => (
										<motion.li
											key={feature}
											initial={{ opacity: 0, x: -20 }}
											whileInView={{ opacity: 1, x: 0 }}
											viewport={{ once: true }}
											transition={{ delay: 0.6 + index * 0.1 }}
											className="flex items-start gap-3"
										>
											<Check className="mt-1 h-5 w-5 flex-shrink-0 text-green-500" />
											<span className="text-foreground">{feature}</span>
										</motion.li>
									))}
								</motion.ul>

								<motion.div
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ delay: 0.8 }}
									className="mt-8 flex w-full gap-3"
								>
									<Button
										href={`/checkout/${plan.id}`}
										variant={plan.isMostPopular ? 'primary' : 'secondary'}
										className={`flex-1 rounded-full py-4 text-base transition-all duration-300 ${
											plan.isMostPopular
												? 'bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 hover:shadow-xl'
												: 'border-2 hover:bg-muted'
										}`}
										aria-label={`Book ${plan.name} plan`}
									>
										{c.ctaPrimary || 'Book Now'}
									</Button>
									<Button
										href={`/pricing/${plan.id}`}
										variant="secondary"
										className="flex-1 rounded-full border py-4 text-base transition-all duration-300 hover:bg-muted"
										aria-label={`Learn more about ${plan.name} plan`}
									>
										{c.ctaSecondary || 'Know More'}
									</Button>
								</motion.div>
							</div>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	);
}
