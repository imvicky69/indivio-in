'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Users, ThumbsUp, LineChart } from 'lucide-react';

const stats = [
	{
		icon: <TrendingUp className="h-8 w-8 text-emerald-600" />,
		value: '68%',
		label: 'Average increase in admission inquiries',
	},
	{
		icon: <Users className="h-8 w-8 text-blue-600" />,
		value: '5.2x',
		label: 'More website visitors per month',
	},
	{
		icon: <ThumbsUp className="h-8 w-8 text-amber-600" />,
		value: '94%',
		label: 'Parent satisfaction with online experience',
	},
	{
		icon: <LineChart className="h-8 w-8 text-purple-600" />,
		value: '27%',
		label: 'Higher conversion from visits to applications',
	},
];

export function AdmissionBooster() {
	return (
		<section className="bg-white py-20 sm:py-28">
			<div className="container mx-auto px-6">
				<div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6 }}
						className="order-2 lg:order-1"
					>
						<h2 className="mb-6 text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
							Turn Your Website Into an Admission Magnet
						</h2>

						<p className="mb-8 text-lg text-muted-foreground">
							In today&apos;s digital-first world, your school's website is the
							most important tool for attracting new students. An
							Indivio-powered website makes an outstanding first impression,
							providing parents with the seamless experience and essential
							information they expect. This directly translates into more
							inquiries and higher admission rates.
						</p>

						<div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
							{stats.map((stat, index) => (
								<div
									key={index}
									className="rounded-lg border border-border bg-card p-4 shadow-sm"
								>
									<div className="mb-2">{stat.icon}</div>
									<div className="text-3xl font-bold text-foreground">
										{stat.value}
									</div>
									<div className="text-sm text-muted-foreground">
										{stat.label}
									</div>
								</div>
							))}
						</div>

						<div className="mt-8 text-sm text-muted-foreground">
							*Based on average results from schools using Indivio platform for
							at least 6 months
						</div>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						className="order-1 lg:order-2"
					>
						<div className="relative rounded-xl bg-gradient-to-br from-primary/5 to-muted/30 p-6 shadow-xl">
							<div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-gray-200 bg-white p-4 shadow-inner">
								{/* Placeholder for an admissions-related image */}
								<div className="mb-4 flex items-center justify-between">
									<h3 className="font-bold text-gray-800">
										New Admission Inquiries
									</h3>
									<div className="text-sm text-gray-500">This Month</div>
								</div>
								<div className="space-y-3">
									<div className="rounded-lg border border-green-200 bg-green-50 p-3">
										<p className="font-semibold text-green-800">Aarav Sharma</p>
										<p className="text-sm text-green-700">Class 5 Admission</p>
									</div>
									<div className="rounded-lg border border-blue-200 bg-blue-50 p-3">
										<p className="font-semibold text-blue-800">Priya Patel</p>
										<p className="text-sm text-blue-700">Class 9 Admission</p>
									</div>
									<div className="rounded-lg border border-yellow-200 bg-yellow-50 p-3">
										<p className="font-semibold text-yellow-800">Rohan Mehta</p>
										<p className="text-sm text-yellow-700">Class 1 Admission</p>
									</div>
								</div>
							</div>
							<div className="absolute -bottom-4 -right-4 w-48 rounded-lg border border-gray-200 bg-white p-3 shadow-lg">
								<p className="text-sm font-bold text-gray-800">
									Conversion Rate
								</p>
								<div className="mt-1 text-3xl font-bold text-green-600">
									27%
								</div>
								<div className="mt-2 h-2 w-full rounded-full bg-gray-200">
									<div
										className="h-2 rounded-full bg-green-500"
										style={{ width: '27%' }}
									></div>
								</div>
							</div>
							<div className="absolute -left-4 -top-4 -rotate-12 transform rounded-full bg-primary px-4 py-2 text-sm font-bold text-white">
								Boost Admissions
							</div>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
