'use client';

import { Plan, Offer } from '@/lib/plans';
import { Check, Star } from 'lucide-react';
import { Button } from '../ui/Button'; // Assuming your button component is improved

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
	const discountPercent = c.offerBanner?.discountPercent
		? Number(c.offerBanner.discountPercent)
		: 15; // Default 15% discount
	return (
		<section className="py-16 sm:py-20">
			<div className="container mx-auto px-6">
				<div className="mb-12 text-center">
					<div className="mb-4 inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
						Limited Time Offer: {discountPercent}% Off Setup Fee
					</div>
					<h2 className="font-display text-3xl font-bold sm:text-4xl">
						{c.heroTitle || 'Affordable Website Solutions for Schools'}
					</h2>
					<p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
						{c.heroSubtitle ||
							'One-time setup + simple annual fee. No hidden costs.'}
					</p>
				</div>

				<div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-3">
					{plans.map((plan) => (
						<div
							key={plan.id}
							className={`relative flex min-h-[580px] flex-col justify-between overflow-hidden rounded-2xl p-8 transition-shadow duration-200 ease-in-out hover:shadow-2xl ${
								plan.isMostPopular
									? 'border-2 border-primary bg-gradient-to-b from-white to-primary/5'
									: 'border border-border bg-white'
							}`}
						>
							{plan.isMostPopular && (
								<div className="absolute left-1/2 top-0 z-10 -translate-x-1/2">
									<span className="flex -translate-y-1/2 transform items-center rounded-full bg-black px-6 py-2 text-sm font-semibold text-white shadow-md">
										<Star className="mr-1.5 h-4 w-4" />
										Most Popular
									</span>
								</div>
							)}

							<div className="relative z-0 flex flex-1 flex-col justify-between">
								<h3 className="font-display text-2xl font-bold text-foreground">
									{plan.name}
								</h3>
								<p className="mt-2 text-muted-foreground">
									{plan.short || plan.description}
								</p>

								<div className="mt-8 flex flex-col space-y-6">
									{/* Setup fee with discount */}
									{plan.setupFee && (
										<div className="flex flex-col">
											<div className="flex items-baseline gap-2">
												<span className="text-sm text-muted-foreground line-through">
													₹{plan.setupFee.toLocaleString('en-IN')}
												</span>
												<span className="text-4xl font-extrabold text-foreground">
													₹
													{Math.round(
														(plan.setupFee * (100 - discountPercent)) / 100
													).toLocaleString('en-IN')}
												</span>
											</div>
											<div className="mt-1 flex items-center">
												<span className="rounded-md bg-green-50 px-2 py-0.5 text-sm font-medium text-green-600">
													{discountPercent}% off
												</span>
												<span className="ml-2 text-sm text-muted-foreground">
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
								</div>

								<ul className="mt-8 flex-1 space-y-4">
									{plan.features.slice(0, 4).map((feature) => (
										<li key={feature} className="flex items-start gap-3">
											<Check className="mt-1 h-5 w-5 flex-shrink-0 text-green-500" />
											<span className="text-foreground">{feature}</span>
										</li>
									))}
								</ul>

								<div className="mt-8 flex w-full gap-3">
									<Button
										href={`/checkout/${plan.id}`}
										variant={plan.isMostPopular ? 'primary' : 'secondary'}
										className={`flex-1 rounded-full py-4 text-base ${plan.isMostPopular ? 'bg-black text-white hover:bg-gray-800' : 'border-2 hover:bg-gray-50'}`}
									>
										{c.ctaPrimary || 'Book Now'}
									</Button>
									<Button
										href={`/pricing/${plan.id}`}
										variant="secondary"
										className="flex-1 rounded-full border py-4 text-base hover:bg-gray-50"
									>
										{c.ctaSecondary || 'Know More'}
									</Button>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
