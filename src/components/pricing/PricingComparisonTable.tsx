'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import type { Plan } from '@/lib/plans';

interface PricingComparisonTableProps {
	plans: Plan[];
}

// Define comparison features
const comparisonFeatures = [
	{
		category: 'Website Features',
		items: [
			{ label: 'Pages Included', key: 'pages' },
			{ label: 'Custom Domain Setup', key: 'customDomain' },
			{ label: 'Admin Dashboard', key: 'adminDashboard' },
			{ label: 'Mobile Responsive', key: 'mobileResponsive' },
		],
	},
	{
		category: 'SEO & Performance',
		items: [
			{ label: 'SEO Optimization', key: 'seo' },
			{ label: 'Page Speed Optimization', key: 'pageSpeed' },
			{ label: 'Analytics Integration', key: 'analytics' },
		],
	},
	{
		category: 'Support & Maintenance',
		items: [
			{ label: 'Hosting Included', key: 'hosting' },
			{ label: 'SSL Certificate', key: 'ssl' },
			{ label: 'Technical Support', key: 'support' },
			{ label: 'Regular Updates', key: 'updates' },
		],
	},
	{
		category: 'Timeline',
		items: [{ label: 'Delivery Time', key: 'deliveryTime' }],
	},
];

// Feature values mapping for each plan
const featureValues: Record<string, Record<string, string | boolean>> = {
	starter: {
		pages: '5 pages',
		customDomain: '₹1,500',
		adminDashboard: true,
		mobileResponsive: true,
		seo: 'Basic',
		pageSpeed: true,
		analytics: 'Basic',
		hosting: true,
		ssl: true,
		support: 'Email',
		updates: true,
		deliveryTime: '3–5 days',
	},
	professional: {
		pages: '10 pages',
		customDomain: 'Free',
		adminDashboard: true,
		mobileResponsive: true,
		seo: 'Advanced',
		pageSpeed: true,
		analytics: 'Advanced',
		hosting: true,
		ssl: true,
		support: 'Priority',
		updates: true,
		deliveryTime: '1–3 weeks',
	},
	enterprise: {
		pages: 'Unlimited',
		customDomain: 'Free',
		adminDashboard: true,
		mobileResponsive: true,
		seo: 'Premium',
		pageSpeed: true,
		analytics: 'Premium',
		hosting: true,
		ssl: true,
		support: '24/7 Dedicated',
		updates: true,
		deliveryTime: '4–6 weeks',
	},
};

export function PricingComparisonTable({ plans }: PricingComparisonTableProps) {
	const renderCellValue = (
		value: string | boolean,
		planId: string,
		isMostPopular: boolean
	) => {
		if (typeof value === 'boolean') {
			return value ? (
				<Check className="mx-auto h-5 w-5 text-green-600" />
			) : (
				<X className="mx-auto h-5 w-5 text-red-400" />
			);
		}
		return (
			<span
				className={`text-sm ${isMostPopular ? 'font-semibold text-foreground' : 'text-muted-foreground'}`}
			>
				{value}
			</span>
		);
	};

	return (
		<section className="bg-gradient-to-b from-muted/30 to-background py-20">
			<div className="container mx-auto px-6">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="mb-12 text-center"
				>
					<h2 className="mb-4 font-display text-3xl font-bold text-foreground sm:text-4xl">
						Compare Plans Side-by-Side
					</h2>
					<p className="mx-auto max-w-2xl text-lg text-muted-foreground">
						Find the perfect plan for your school with our detailed comparison
					</p>
				</motion.div>

				{/* Desktop Table View */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.2 }}
					className="hidden overflow-hidden rounded-2xl border border-border bg-card shadow-xl lg:block"
				>
					<div className="overflow-x-auto">
						<table className="w-full">
							{/* Table Header */}
							<thead className="bg-gradient-to-r from-primary/10 to-primary/5">
								<tr>
									<th className="border-r border-border p-6 text-left">
										<span className="text-lg font-bold text-foreground">
											Features
										</span>
									</th>
									{plans.map((plan) => (
										<th
											key={plan.id}
											className={`border-r border-border p-6 text-center last:border-r-0 ${
												plan.isMostPopular
													? 'bg-primary/20'
													: 'bg-transparent'
											}`}
										>
											<div className="flex flex-col items-center">
												{plan.isMostPopular && (
													<span className="mb-2 inline-block rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
														Most Popular
													</span>
												)}
												<span className="text-xl font-bold text-foreground">
													{plan.name}
												</span>
												<span className="mt-2 text-2xl font-extrabold text-primary">
													₹{plan.setupFee?.toLocaleString('en-IN')}
												</span>
												<span className="text-sm text-muted-foreground">
													setup fee
												</span>
											</div>
										</th>
									))}
								</tr>
							</thead>

							{/* Table Body */}
							<tbody>
								{comparisonFeatures.map((category, categoryIndex) => (
									<React.Fragment key={category.category}>
										{/* Category Header */}
										<tr className="bg-muted/50">
											<td
												colSpan={plans.length + 1}
												className="px-6 py-4 font-semibold text-foreground"
											>
												{category.category}
											</td>
										</tr>
										{/* Feature Rows */}
										{category.items.map((item, itemIndex) => (
											<tr
												key={item.key}
												className="border-t border-border transition-colors hover:bg-muted/30"
											>
												<td className="border-r border-border px-6 py-4 text-sm font-medium text-foreground">
													{item.label}
												</td>
												{plans.map((plan) => {
													const planValues =
														featureValues[plan.id.toLowerCase()] ||
														featureValues.starter;
													const value = planValues[item.key];
													return (
														<td
															key={plan.id}
															className={`border-r border-border px-6 py-4 text-center last:border-r-0 ${
																plan.isMostPopular
																	? 'bg-primary/5'
																	: 'bg-transparent'
															}`}
														>
															{renderCellValue(
																value,
																plan.id,
																plan.isMostPopular
															)}
														</td>
													);
												})}
											</tr>
										))}
									</React.Fragment>
								))}
							</tbody>
						</table>
					</div>
				</motion.div>

				{/* Mobile Stacked View */}
				<div className="space-y-6 lg:hidden">
					{plans.map((plan, index) => {
						const planValues =
							featureValues[plan.id.toLowerCase()] || featureValues.starter;
						return (
							<motion.div
								key={plan.id}
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.6, delay: index * 0.1 }}
								className={`overflow-hidden rounded-2xl border-2 bg-card shadow-lg ${
									plan.isMostPopular
										? 'border-primary/50'
										: 'border-border'
								}`}
							>
								{/* Mobile Card Header */}
								<div
									className={`p-6 ${
										plan.isMostPopular
											? 'bg-gradient-to-r from-primary/20 to-primary/10'
											: 'bg-muted/30'
									}`}
								>
									{plan.isMostPopular && (
										<span className="mb-2 inline-block rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
											Most Popular
										</span>
									)}
									<h3 className="mb-2 text-2xl font-bold text-foreground">
										{plan.name}
									</h3>
									<div className="flex items-baseline gap-2">
										<span className="text-3xl font-extrabold text-primary">
											₹{plan.setupFee?.toLocaleString('en-IN')}
										</span>
										<span className="text-sm text-muted-foreground">
											setup fee
										</span>
									</div>
								</div>

								{/* Mobile Features List */}
								<div className="p-6">
									{comparisonFeatures.map((category) => (
										<div key={category.category} className="mb-6 last:mb-0">
											<h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
												{category.category}
											</h4>
											<div className="space-y-2">
												{category.items.map((item) => {
													const value = planValues[item.key];
													return (
														<div
															key={item.key}
															className="flex items-center justify-between rounded-lg border border-border bg-muted/50 px-4 py-3"
														>
															<span className="text-sm font-medium text-foreground">
																{item.label}
															</span>
															<div>
																{renderCellValue(
																	value,
																	plan.id,
																	plan.isMostPopular
																)}
															</div>
														</div>
													);
												})}
											</div>
										</div>
									))}
								</div>
							</motion.div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
