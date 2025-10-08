'use client';

import { Plan } from '@/lib/plans';
import { Check, X } from 'lucide-react';

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
						'starter-site': '4-5 pages',
						'growth-site': 'Up to 12 pages',
						'enterprise-site': 'Unlimited',
					},
				},
				{
					name: 'Mobile Responsive',
					values: {
						'starter-site': true,
						'growth-site': true,
						'enterprise-site': true,
					},
				},
				{
					name: 'CMS Dashboard',
					values: {
						'starter-site': 'Basic',
						'growth-site': 'Advanced',
						'enterprise-site': 'Full Featured',
					},
				},
				{
					name: 'Custom Domain',
					values: {
						'starter-site': true,
						'growth-site': true,
						'enterprise-site': true,
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
						'starter-site': 'Basic',
						'growth-site': 'Advanced',
						'enterprise-site': 'Premium',
					},
				},
				{
					name: 'Site Speed Optimization',
					values: {
						'starter-site': 'Standard',
						'growth-site': 'Enhanced',
						'enterprise-site': 'Maximum',
					},
				},
				{
					name: 'Analytics Integration',
					values: {
						'starter-site': 'Basic',
						'growth-site': 'Standard',
						'enterprise-site': true,
					},
				},
				{
					name: 'Custom Metadata',
					values: {
						'starter-site': false,
						'growth-site': true,
						'enterprise-site': true,
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
						'starter-site': 'Basic',
						'growth-site': 'Advanced',
						'enterprise-site': 'Full Featured',
					},
				},
				{
					name: 'Downloads Section',
					values: {
						'starter-site': false,
						'growth-site': true,
						'enterprise-site': true,
					},
				},
				{
					name: 'Photo Galleries',
					values: {
						'starter-site': 'Simple',
						'growth-site': 'Advanced',
						'enterprise-site': 'Unlimited',
					},
				},
				{
					name: 'Events Calendar',
					values: {
						'starter-site': false,
						'growth-site': true,
						'enterprise-site': true,
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
						'starter-site': 'Standard',
						'growth-site': 'Priority',
						'enterprise-site': 'Dedicated',
					},
				},
				{
					name: 'Site Reviews',
					values: {
						'starter-site': 'Annual',
						'growth-site': 'Quarterly',
						'enterprise-site': 'Monthly',
					},
				},
				{
					name: 'Content Updates',
					values: {
						'starter-site': 'Self-service',
						'growth-site': 'Self-service + Basic Support',
						'enterprise-site': 'Full Support',
					},
				},
				{
					name: 'Training',
					values: {
						'starter-site': 'Documentation',
						'growth-site': 'Documentation + 1 Session',
						'enterprise-site': 'Documentation + Multiple Sessions',
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
		<section className="bg-gray-50 py-16">
			<div className="container mx-auto px-4">
				<div className="mb-12 text-center">
					<h2 className="mb-4 font-display text-3xl font-bold">
						Compare Plans in Detail
					</h2>
					<p className="mx-auto max-w-2xl text-lg text-gray-600">
						See exactly what each plan includes to find the perfect fit for your
						school&apos;s website needs.
					</p>
				</div>

				<div className="overflow-x-auto">
					<table className="w-full rounded-lg border border-gray-200 bg-white shadow-sm">
						<thead>
							<tr className="bg-gray-100">
								<th className="w-1/4 px-4 py-4 text-left font-medium text-gray-700">
									Features
								</th>
								{sortedPlans.map((plan) => (
									<th
										key={plan.id}
										className={`px-4 py-4 text-center ${plan.isMostPopular ? 'bg-primary/10' : ''}`}
									>
										<span className="block text-lg font-bold text-gray-800">
											{plan.name}
										</span>
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							{comparisonData.map((category, index) => (
								<>
									<tr
										key={`category-${index}`}
										className="border-t border-gray-200 bg-gray-50"
									>
										<td
											colSpan={sortedPlans.length + 1}
											className="px-4 py-3 font-semibold text-gray-800"
										>
											{category.category}
										</td>
									</tr>
									{category.features.map((feature, fidx) => (
										<tr
											key={`feature-${index}-${fidx}`}
											className={`border-t border-gray-200 ${fidx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}
										>
											<td className="px-4 py-3 text-gray-700">
												{feature.name}
											</td>
											{sortedPlans.map((plan) => (
												<td
													key={`${plan.id}-${feature.name}`}
													className={`px-4 py-3 text-center ${plan.isMostPopular ? 'bg-primary/5' : ''}`}
												>
													{renderCellValue(
														feature.values[
															plan.id as keyof typeof feature.values
														]
													)}
												</td>
											))}
										</tr>
									))}
								</>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</section>
	);
}
