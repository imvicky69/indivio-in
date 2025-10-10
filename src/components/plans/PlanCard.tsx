'use client';

import { Button } from '@/components/ui/Button';
import { Check, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Plan } from '@/lib/plans';

interface Props {
	plan: Plan;
}

export default function PlanCard({ plan }: Props) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 50 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.6, delay: 0.1 * plan.order }}
			whileHover={{ y: -10, transition: { duration: 0.3 } }}
			className={`relative flex flex-col justify-between overflow-hidden rounded-2xl border p-8 transition-all duration-300 ease-in-out hover:shadow-2xl ${
				plan.isMostPopular
					? 'border-primary bg-gradient-to-b from-white to-primary/5 shadow-lg'
					: 'border-border bg-card hover:border-primary/50'
			}`}
		>
			{plan.isMostPopular && (
				<div className="absolute left-1/2 top-0 z-10 -translate-x-1/2">
					<span className="flex -translate-y-1/2 transform items-center rounded-full bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground shadow-md">
						<Star className="mr-1.5 h-4 w-4" />
						Most Popular
					</span>
				</div>
			)}

			<div className="relative z-0 flex flex-1 flex-col justify-between">
				<div>
					<h3 className="font-display text-2xl font-bold text-foreground">
						{plan.name}
					</h3>
					<p className="mt-2 text-muted-foreground">
						{plan.short || plan.description}
					</p>

					<div className="mt-8 flex flex-col space-y-6">
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
						{plan.features.slice(0, 6).map((feature) => (
							<li key={feature} className="flex items-start gap-3">
								<Check className="mt-1 h-5 w-5 flex-shrink-0 text-green-500" />
								<span className="text-foreground">{feature}</span>
							</li>
						))}
					</ul>
				</div>

				<div className="mt-8">
					<Button
						href={`/plans/${plan.id}`}
						variant={plan.isMostPopular ? 'primary' : 'secondary'}
						className={`w-full rounded-full py-4 text-base transition-all duration-300 ${
							plan.isMostPopular
								? 'bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 hover:shadow-xl'
								: 'border-2 hover:bg-muted'
						}`}
						aria-label={`View details for ${plan.name} plan`}
					>
						View Plan Details
					</Button>
				</div>
			</div>
		</motion.div>
	);
}
