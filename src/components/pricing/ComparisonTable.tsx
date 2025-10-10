'use client';

import { Plan } from '@/lib/plans';
import { Check, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface ComparisonTableProps {
	plans: Plan[];
}

export function ComparisonTable({ plans }: ComparisonTableProps) {
	// Sort plans by order
	const sortedPlans = [...plans].sort((a, b) => a.order - b.order);

	// Define comparison categories and features
	const comparisonData = [
		{
			category: 'Website Features',
			features: [
				{
					name: 'Custom Pages',
					values: {
						basic: '4-5 pages',
						advanced: 'Up to 12 pages',
						business: 'Unlimited',
					},
				},
				{
					name: 'Mobile Responsive',
					values: {
						basic: true,
						advanced: true,
						business: true,
					},
				},
				{
					name: 'CMS Dashboard',
					values: {
						basic: 'Basic',
						advanced: 'Advanced',
						business: 'Full Featured',
					},
				},
				{
					name: 'Custom Domain',
					values: {
						basic: true,
						advanced: true,
						business: true,
					},
				},
			],
		},
		{
			category: 'SEO & Performance',
			features: [
				{
					name: 'SEO Setup',
					values: {
						basic: 'Basic',
						advanced: 'Advanced',
						business: 'Premium',
					},
				},
				{
					name: 'Site Speed Optimization',
					values: {
						basic: 'Standard',
						advanced: 'Enhanced',
						business: 'Maximum',
					},
				},
				{
					name: 'Analytics Integration',
					values: {
						basic: 'Basic',
						advanced: 'Standard',
						business: true,
					},
				},
				{
					name: 'Custom Metadata',
					values: {
						basic: false,
						advanced: true,
						business: true,
					},
				},
			],
		},
		{
			category: 'Content & Resources',
			features: [
				{
					name: 'News/Blog Section',
					values: {
						basic: 'Basic',
						advanced: 'Advanced',
						business: 'Full Featured',
					},
				},
				{
					name: 'Downloads Section',
					values: {
						basic: false,
						advanced: true,
						business: true,
					},
				},
				{
					name: 'Photo Galleries',
					values: {
						basic: 'Simple',
						advanced: 'Advanced',
						business: 'Unlimited',
					},
				},
				{
					name: 'Events Calendar',
					values: {
						basic: false,
						advanced: true,
						business: true,
					},
				},
			],
		},
		{
			category: 'Support & Maintenance',
			features: [
				{
					name: 'Support Response',
					values: {
						basic: 'Standard',
						advanced: 'Priority',
						business: 'Dedicated',
					},
				},
				{
					name: 'Site Reviews',
					values: {
						basic: 'Annual',
						advanced: 'Quarterly',
						business: 'Monthly',
					},
				},
				{
					name: 'Content Updates',
					values: {
						basic: 'Self-service',
						advanced: 'Self-service + Basic Support',
						business: 'Full Support',
					},
				},
				{
					name: 'Training',
					values: {
						basic: 'Documentation',
						advanced: 'Documentation + 1 Session',
						business: 'Documentation + Multiple Sessions',
					},
				},
			],
		},
	];

	// Helper function to render cell value
	const renderCellValue = (value: string | boolean) => {
		if (typeof value === 'boolean') {
			return value ? (
				<Check className="mx-auto h-5 w-5 text-green-500" />
			) : (
				<X className="mx-auto h-5 w-5 text-red-500" />
			);
		}
		return <span className="text-sm">{value}</span>;
	};

	return (
		<section className="bg-muted/30 py-16">
			<div className="container mx-auto px-4">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="mb-12 text-center"
				>
					<h2 className="mb-4 font-display text-3xl font-bold text-foreground">
						Detailed Plan Comparison
					</h2>
					<p className="mx-auto max-w-2xl text-lg text-muted-foreground">
						Compare features side-by-side to choose the best plan for your
						school.
					</p>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, scale: 0.95 }}
					whileInView={{ opacity: 1, scale: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.2 }}
					className="overflow-x-auto"
				>
					<table className="w-full rounded-lg border border-border bg-card shadow-lg">
						<thead>
							<tr className="bg-muted">
								<th className="w-1/4 px-4 py-4 text-left font-medium text-foreground">
									Features
								</th>
								{sortedPlans.map((plan) => (
									<th
										key={plan.id}
										className={`px-4 py-4 text-center transition-colors duration-300 ${
											plan.isMostPopular ? 'bg-primary/10 text-primary' : ''
										}`}
									>
										<span className="block text-lg font-bold text-foreground">
											{plan.name}
										</span>
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							{comparisonData.map((category, index) => (
								<tr
									key={`category-${index}`}
									className="border-t border-border bg-muted/50"
								>
									<td
										colSpan={sortedPlans.length + 1}
										className="px-4 py-3 font-semibold text-foreground"
									>
										{category.category}
									</td>
								</tr>
							))}
							{comparisonData.map((category, categoryIndex) =>
								category.features.map((feature, featureIndex) => (
									<tr
										key={`feature-${categoryIndex}-${featureIndex}`}
										className={`border-t border-border transition-colors duration-300 hover:bg-muted/30 ${
											featureIndex % 2 === 0 ? 'bg-card' : 'bg-muted/20'
										}`}
									>
										<td className="px-4 py-3 text-foreground">
											{feature.name}
										</td>
										{sortedPlans.map((plan) => (
											<td
												key={`${plan.id}-${feature.name}`}
												className={`px-4 py-3 text-center transition-colors duration-300 ${
													plan.isMostPopular
														? 'bg-primary/5 hover:bg-primary/10'
														: 'hover:bg-muted/50'
												}`}
											>
												{renderCellValue(
													feature.values[plan.id as keyof typeof feature.values]
												)}
											</td>
										))}
									</tr>
								))
							)}
						</tbody>
					</table>
				</motion.div>
			</div>
		</section>
	);
}
