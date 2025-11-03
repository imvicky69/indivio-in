// src/components/pricing/PricingComparison.tsx
'use client';

import { motion } from 'framer-motion';
import { Check, X, Info } from 'lucide-react';
import { SectionHeading } from '../SectionHeading';

const features = [
	{
		category: 'Website Features',
		items: [
			{
				feature: 'Professional Website',
				starter: true,
				professional: true,
				enterprise: true,
				tooltip: 'Modern, responsive website design',
			},
			{
				feature: 'Custom Domain',
				starter: false,
				professional: true,
				enterprise: true,
				tooltip: 'Use your own domain name',
			},
			{
				feature: 'SSL Certificate',
				starter: true,
				professional: true,
				enterprise: true,
				tooltip: 'Secure HTTPS encryption',
			},
			{
				feature: 'Mobile Responsive',
				starter: true,
				professional: true,
				enterprise: true,
				tooltip: 'Works perfectly on all devices',
			},
		],
	},
	{
		category: 'Management Features',
		items: [
			{
				feature: 'Content Management',
				starter: 'Basic',
				professional: 'Advanced',
				enterprise: 'Premium',
				tooltip: 'Dashboard to manage your content',
			},
			{
				feature: 'Online Payments',
				starter: true,
				professional: true,
				enterprise: true,
				tooltip: 'Accept fee payments online',
			},
			{
				feature: 'Student Portal',
				starter: false,
				professional: true,
				enterprise: true,
				tooltip: 'Dedicated portal for students',
			},
			{
				feature: 'Parent Portal',
				starter: false,
				professional: true,
				enterprise: true,
				tooltip: 'Keep parents informed',
			},
			{
				feature: 'Admission Management',
				starter: 'Basic',
				professional: 'Advanced',
				enterprise: 'Complete',
				tooltip: 'Streamline admissions process',
			},
		],
	},
	{
		category: 'Support & Maintenance',
		items: [
			{
				feature: 'Email Support',
				starter: true,
				professional: true,
				enterprise: true,
				tooltip: '24/7 email support',
			},
			{
				feature: 'Chat Support',
				starter: false,
				professional: true,
				enterprise: true,
				tooltip: 'Live chat support',
			},
			{
				feature: 'Priority Support',
				starter: false,
				professional: false,
				enterprise: true,
				tooltip: 'Dedicated support team',
			},
			{
				feature: 'Training Sessions',
				starter: '1 Session',
				professional: '3 Sessions',
				enterprise: 'Unlimited',
				tooltip: 'Personalized training',
			},
		],
	},
];

export function PricingComparison() {
	const renderCell = (value: boolean | string) => {
		if (typeof value === 'boolean') {
			return value ? (
				<div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
					<Check className="h-5 w-5 text-green-600" />
				</div>
			) : (
				<div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
					<X className="h-5 w-5 text-gray-400" />
				</div>
			);
		}
		return (
			<span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
				{value}
			</span>
		);
	};

	return (
		<section className="section-padding bg-gradient-to-b from-muted/30 to-background">
			<div className="container mx-auto px-6">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
				>
					<SectionHeading>Detailed Plan Comparison</SectionHeading>
					<p className="mx-auto mt-4 max-w-2xl text-center text-lg text-muted-foreground">
						Compare all features across our pricing plans
					</p>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.2 }}
					className="mx-auto mt-16 max-w-6xl overflow-x-auto"
				>
					<div className="min-w-[700px] overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
						{/* Header */}
						<div className="grid grid-cols-4 gap-4 border-b border-border bg-gradient-to-r from-muted/50 to-muted/30 p-6">
							<div className="font-semibold text-foreground">Features</div>
							<div className="text-center font-semibold text-foreground">
								Starter
							</div>
							<div className="text-center font-semibold text-foreground">
								Professional
							</div>
							<div className="text-center font-semibold text-foreground">
								Enterprise
							</div>
						</div>

						{/* Feature Categories */}
						{features.map((category, categoryIndex) => (
							<div key={categoryIndex}>
								{/* Category Header */}
								<div className="border-b border-border bg-muted/20 px-6 py-3">
									<h3 className="font-semibold text-foreground">
										{category.category}
									</h3>
								</div>

								{/* Category Items */}
								{category.items.map((item, itemIndex) => (
									<div
										key={itemIndex}
										className="grid grid-cols-4 gap-4 border-b border-border p-6 transition-colors hover:bg-muted/30"
									>
										<div className="flex items-center gap-2">
											<span className="text-foreground">{item.feature}</span>
											<div className="group relative">
												<Info className="h-4 w-4 text-muted-foreground" />
												<div className="pointer-events-none absolute left-0 top-6 z-10 hidden w-48 rounded-lg border border-border bg-card p-2 text-xs text-muted-foreground shadow-lg group-hover:block">
													{item.tooltip}
												</div>
											</div>
										</div>
										<div className="flex items-center justify-center">
											{renderCell(item.starter)}
										</div>
										<div className="flex items-center justify-center">
											{renderCell(item.professional)}
										</div>
										<div className="flex items-center justify-center">
											{renderCell(item.enterprise)}
										</div>
									</div>
								))}
							</div>
						))}
					</div>
				</motion.div>
			</div>
		</section>
	);
}
