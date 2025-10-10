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
							Boost Your School&apos;s Admission Numbers
						</h2>

						<p className="mb-8 text-lg text-muted-foreground">
							In today&apos;s digital world, parents research schools online
							before making decisions. A professional website doesn&apos;t just
							look good—it directly impacts your admission numbers by making an
							excellent first impression and providing the information parents
							need.
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
							<div className="relative aspect-square h-auto w-full overflow-hidden rounded-lg bg-muted">
								{/* Placeholder for an admissions-related image */}
								<div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-muted">
									<p className="text-center font-medium text-muted-foreground">
										Admission Dashboard Preview
									</p>
								</div>
							</div>
							<div className="absolute -right-3 -top-3 rounded-full bg-primary px-4 py-2 text-sm font-bold text-white">
								New Feature
							</div>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
