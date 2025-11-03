// src/components/home/ComparisonSection.tsx
'use client';

import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { SectionHeading } from '../SectionHeading';

const comparisonData = [
	{
		feature: 'Professional Website',
		traditional: false,
		indivio: true,
	},
	{
		feature: 'Mobile Responsive Design',
		traditional: false,
		indivio: true,
	},
	{
		feature: 'Online Fee Payments',
		traditional: false,
		indivio: true,
	},
	{
		feature: 'Easy Content Management',
		traditional: false,
		indivio: true,
	},
	{
		feature: 'Student & Parent Portal',
		traditional: false,
		indivio: true,
	},
	{
		feature: 'SEO Optimization',
		traditional: false,
		indivio: true,
	},
	{
		feature: 'Regular Updates & Support',
		traditional: false,
		indivio: true,
	},
	{
		feature: 'Affordable Pricing',
		traditional: false,
		indivio: true,
	},
	{
		feature: 'Quick Setup (24-48 hrs)',
		traditional: false,
		indivio: true,
	},
];

export function ComparisonSection() {
	return (
		<section className="section-padding bg-gradient-to-b from-background to-muted/30">
			<div className="container mx-auto px-6">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
				>
					<SectionHeading>Why Choose Indivio Over Traditional Methods?</SectionHeading>
					<p className="mx-auto mt-4 max-w-2xl text-center text-lg text-muted-foreground">
						See how we stack up against expensive, outdated solutions
					</p>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.2 }}
					className="mx-auto mt-16 max-w-4xl overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
				>
					{/* Header */}
					<div className="grid grid-cols-3 gap-4 border-b border-border bg-gradient-to-r from-muted/50 to-muted/30 p-6">
						<div className="text-left">
							<h3 className="font-display text-lg font-bold text-foreground">
								Features
							</h3>
						</div>
						<div className="text-center">
							<h3 className="font-display text-lg font-bold text-muted-foreground">
								Traditional Method
							</h3>
							<p className="mt-1 text-xs text-muted-foreground">
								Expensive & Complex
							</p>
						</div>
						<div className="text-center">
							<h3 className="font-display text-lg font-bold text-primary">
								Indivio
							</h3>
							<p className="mt-1 text-xs text-green-600">
								Modern & Affordable
							</p>
						</div>
					</div>

					{/* Comparison Rows */}
					<div className="divide-y divide-border">
						{comparisonData.map((item, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, x: -20 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.3, delay: index * 0.05 }}
								className="grid grid-cols-3 gap-4 p-6 transition-colors hover:bg-muted/30"
							>
								<div className="flex items-center text-left">
									<p className="font-medium text-foreground">{item.feature}</p>
								</div>
								<div className="flex items-center justify-center">
									{item.traditional ? (
										<div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
											<Check className="h-5 w-5 text-green-600" />
										</div>
									) : (
										<div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100">
											<X className="h-5 w-5 text-red-600" />
										</div>
									)}
								</div>
								<div className="flex items-center justify-center">
									{item.indivio ? (
										<div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
											<Check className="h-5 w-5 text-green-600" />
										</div>
									) : (
										<div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100">
											<X className="h-5 w-5 text-red-600" />
										</div>
									)}
								</div>
							</motion.div>
						))}
					</div>

					{/* Footer CTA */}
					<div className="bg-gradient-to-r from-primary/5 to-green-500/5 p-8 text-center">
						<p className="mb-4 text-lg font-semibold text-foreground">
							Ready to upgrade your school&apos;s digital presence?
						</p>
						<a
							href="/pricing"
							className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 font-semibold text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:shadow-lg"
						>
							View Pricing Plans
						</a>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
