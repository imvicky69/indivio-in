'use client';

import { motion } from 'framer-motion';
import { Check, Sparkles, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Tooltip } from '@/components/ui/Tooltip';
import { planValuePoints, renewalTooltipText } from '@/lib/pricing-config';
import type { Plan } from '@/lib/plans';

interface PricingCardProps {
	plan: Plan;
	index: number;
}

export function PricingCard({ plan, index }: PricingCardProps) {
	const cardVariants = {
		hidden: { opacity: 0, y: 50 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.6,
				delay: index * 0.15,
			},
		},
	};

	return (
		<motion.div
			variants={cardVariants}
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true }}
			whileHover={{
				y: -12,
				transition: { duration: 0.3, ease: 'easeOut' },
			}}
			className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border-2 bg-gradient-to-br transition-all duration-300 ${
				plan.isMostPopular
					? 'border-primary/50 from-card via-primary/[0.02] to-primary/[0.05] shadow-2xl shadow-primary/10'
					: 'border-border from-card to-muted/30 hover:border-primary/30 hover:shadow-xl'
			}`}
		>
			{/* Popular Badge */}
			{plan.isMostPopular && (
				<motion.div
					initial={{ scale: 0, rotate: -10 }}
					animate={{ scale: 1, rotate: 0 }}
					transition={{
						delay: 0.5 + index * 0.15,
						type: 'spring',
						stiffness: 200,
					}}
					className="absolute -right-12 top-8 z-10 rotate-45 bg-gradient-to-r from-primary to-primary/80 px-16 py-2 text-sm font-bold text-primary-foreground shadow-lg"
				>
					Most Popular
				</motion.div>
			)}

			{/* Card Content */}
			<div className="flex flex-1 flex-col p-8">
				{/* Header */}
				<div className="mb-6">
					<h3 className="mb-2 font-display text-3xl font-extrabold leading-tight text-foreground lg:text-4xl">
						{plan.name}
					</h3>
					{plan.tagline && (
						<p className="text-sm font-semibold uppercase tracking-wide text-primary">
							{plan.tagline}
						</p>
					)}
					<p className="mt-3 text-base leading-relaxed text-muted-foreground">
						{plan.short}
					</p>
				</div>

				{/* Pricing */}
				<div className="mb-8 space-y-4 border-b border-border pb-8">
					{/* Setup Fee */}
					<div className="space-y-1">
						<div className="flex items-baseline gap-2">
							<span className="text-5xl font-extrabold text-foreground">
								₹{plan.setupFee?.toLocaleString('en-IN')}
							</span>
						</div>
						<p className="text-sm text-muted-foreground">One-time setup fee</p>
					</div>

					{/* Annual Maintenance */}
					<div className="flex items-center justify-between rounded-lg bg-muted/50 p-4">
						<div className="flex-1">
							<div className="flex items-center gap-2">
								<p className="text-sm font-medium text-muted-foreground">
									Annual Maintenance
								</p>
								<Tooltip content={renewalTooltipText.year1} />
							</div>
							<p className="text-2xl font-bold text-foreground">
								₹{plan.price.toLocaleString('en-IN')}
								<span className="text-sm font-normal text-muted-foreground">
									{plan.pricePeriod}
								</span>
							</p>
						</div>
					</div>

					{/* Renewal Price Info */}
					{plan.renewalPrice && (
						<div className="flex items-center gap-2 text-sm">
							<Sparkles className="h-4 w-4 text-primary" />
							<span className="text-muted-foreground">
								Renewal from year 2:{' '}
								<span className="font-semibold text-foreground">
									₹{plan.renewalPrice.toLocaleString('en-IN')}/year
								</span>
							</span>
							<Tooltip content={renewalTooltipText.year2Plus} />
						</div>
					)}
				</div>

				{/* Features List */}
				<div className="mb-6 flex-1">
					<h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
						Key Features
					</h4>
					<ul className="space-y-3">
						{plan.features.slice(0, 8).map((feature, idx) => (
							<motion.li
								key={feature}
								initial={{ opacity: 0, x: -10 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true }}
								transition={{ delay: 0.7 + idx * 0.05 }}
								className="flex items-start gap-3"
							>
								<div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
									<Check className="h-3.5 w-3.5 text-green-600" />
								</div>
								<span className="text-sm leading-relaxed text-foreground">
									{feature}
								</span>
							</motion.li>
						))}
					</ul>
				</div>

				{/* ROI/Value Points */}
				{planValuePoints[plan.id.toLowerCase()] && (
					<div className="mb-8 rounded-lg border-2 border-primary/20 bg-primary/5 p-4">
						<div className="mb-3 flex items-center gap-2">
							<TrendingUp className="h-4 w-4 text-primary" />
							<h4 className="text-sm font-semibold text-primary">
								Why Choose This Plan
							</h4>
						</div>
						<ul className="space-y-2">
							{planValuePoints[plan.id.toLowerCase()].map((point, idx) => (
								<motion.li
									key={idx}
									initial={{ opacity: 0, x: -10 }}
									whileInView={{ opacity: 1, x: 0 }}
									viewport={{ once: true }}
									transition={{ delay: 0.9 + idx * 0.05 }}
									className="flex items-start gap-2 text-xs text-foreground"
								>
									<span className="mt-0.5 text-primary">•</span>
									<span className="leading-relaxed">{point}</span>
								</motion.li>
							))}
						</ul>
					</div>
				)}

				{/* CTA Buttons */}
				<div className="space-y-3">
					<Button
						href={`/checkout?plan=${plan.id}`}
						variant={plan.isMostPopular ? 'primary' : 'secondary'}
						className={`w-full rounded-xl py-4 text-base font-bold shadow-lg transition-all duration-300 ${
							plan.isMostPopular
								? 'bg-primary text-primary-foreground hover:scale-[1.03] hover:shadow-2xl'
								: 'border-2 hover:scale-[1.02] hover:border-primary hover:bg-primary/5 hover:shadow-xl'
						}`}
					>
						Get Started with {plan.name}
					</Button>
					<Button
						href={`/plans/${plan.id}`}
						variant="secondary"
						className="w-full rounded-xl border border-border py-3 text-sm font-medium transition-all duration-300 hover:border-primary/50 hover:bg-muted"
					>
						View Full Details →
					</Button>
				</div>

				{/* Delivery Time */}
				{plan.deliveryTime && (
					<p className="mt-4 text-center text-xs text-muted-foreground">
						⚡ Delivery in {plan.deliveryTime}
					</p>
				)}
			</div>
		</motion.div>
	);
}
