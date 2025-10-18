'use client';

import { motion } from 'framer-motion';
import {
	ClipboardCheck,
	FileText,
	Palette,
	Rocket,
	ArrowRight,
} from 'lucide-react';

export function HowItWorks() {
	const steps = [
		{
			number: 1,
			icon: ClipboardCheck,
			title: 'Choose Your Plan',
			description:
				"Select the perfect plan that fits your school's needs and budget",
			color: 'text-blue-500',
			bgColor: 'bg-blue-500/10',
		},
		{
			number: 2,
			icon: FileText,
			title: 'Share Your Details',
			description:
				'Provide school information, branding, and content you want on your website',
			color: 'text-green-500',
			bgColor: 'bg-green-500/10',
		},
		{
			number: 3,
			icon: Palette,
			title: 'Design & Review',
			description:
				'We design your website and collaborate with you through review cycles',
			color: 'text-purple-500',
			bgColor: 'bg-purple-500/10',
		},
		{
			number: 4,
			icon: Rocket,
			title: 'Launch & Celebrate 🎉',
			description:
				'Your professional website goes live with full training and support',
			color: 'text-orange-500',
			bgColor: 'bg-orange-500/10',
		},
	];

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				duration: 0.6,
				staggerChildren: 0.2,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 30 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.6,
			},
		},
	};

	return (
		<section className="bg-gradient-to-b from-background to-primary/5 py-20">
			<div className="container mx-auto px-6">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="mb-16 text-center"
				>
					<h2 className="mb-4 font-display text-3xl font-bold text-foreground sm:text-4xl">
						How It Works
					</h2>
					<p className="mx-auto max-w-2xl text-lg text-muted-foreground">
						Get your school website up and running in four simple steps
					</p>
				</motion.div>

				{/* Desktop Timeline View */}
				<motion.div
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
					className="hidden lg:block"
				>
					<div className="relative">
						{/* Connection Line */}
						<div className="absolute left-0 right-0 top-1/2 h-1 -translate-y-1/2 bg-gradient-to-r from-blue-500 via-green-500 via-purple-500 to-orange-500 opacity-20"></div>

						<div className="grid grid-cols-4 gap-8">
							{steps.map((step, index) => {
								const IconComponent = step.icon;
								return (
									<motion.div
										key={step.number}
										variants={itemVariants}
										className="relative"
									>
										{/* Connecting Arrow */}
										{index < steps.length - 1 && (
											<div className="absolute -right-4 top-1/4 z-10 hidden xl:block">
												<ArrowRight className="h-6 w-6 text-muted-foreground/50" />
											</div>
										)}

										{/* Step Card */}
										<motion.div
											whileHover={{
												scale: 1.05,
												transition: { duration: 0.3 },
											}}
											className="relative z-20 flex h-full flex-col items-center rounded-2xl border-2 border-border bg-card p-6 shadow-lg transition-all duration-300 hover:border-primary/50 hover:shadow-xl"
										>
											{/* Step Number Badge */}
											<div className="absolute -top-4 left-1/2 -translate-x-1/2">
												<div
													className={`flex h-8 w-8 items-center justify-center rounded-full ${step.bgColor} border-2 border-border bg-card font-bold ${step.color}`}
												>
													{step.number}
												</div>
											</div>

											{/* Icon */}
											<div
												className={`mb-4 mt-2 rounded-xl ${step.bgColor} p-4`}
											>
												<IconComponent className={`h-8 w-8 ${step.color}`} />
											</div>

											{/* Content */}
											<h3 className="mb-2 text-center text-xl font-bold text-foreground">
												{step.title}
											</h3>
											<p className="text-center text-sm text-muted-foreground">
												{step.description}
											</p>
										</motion.div>
									</motion.div>
								);
							})}
						</div>
					</div>
				</motion.div>

				{/* Mobile Vertical Timeline */}
				<motion.div
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
					className="relative lg:hidden"
				>
					{/* Vertical Connection Line */}
					<div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-green-500 via-purple-500 to-orange-500 opacity-20"></div>

					<div className="space-y-8">
						{steps.map((step) => {
							const IconComponent = step.icon;
							return (
								<motion.div
									key={step.number}
									variants={itemVariants}
									className="relative flex gap-6"
								>
									{/* Step Number */}
									<div className="relative z-10 flex-shrink-0">
										<div
											className={`flex h-16 w-16 items-center justify-center rounded-full ${step.bgColor} border-4 border-card font-bold shadow-lg ${step.color}`}
										>
											<IconComponent className="h-6 w-6" />
										</div>
										<div
											className={`absolute -bottom-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full ${step.bgColor} border-2 border-card text-xs font-bold ${step.color}`}
										>
											{step.number}
										</div>
									</div>

									{/* Content Card */}
									<motion.div
										whileHover={{ scale: 1.02 }}
										className="flex-1 rounded-xl border-2 border-border bg-card p-6 shadow-lg"
									>
										<h3 className="mb-2 text-lg font-bold text-foreground">
											{step.title}
										</h3>
										<p className="text-sm text-muted-foreground">
											{step.description}
										</p>
									</motion.div>
								</motion.div>
							);
						})}
					</div>
				</motion.div>

				{/* CTA */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.8 }}
					className="mt-16 text-center"
				>
					<p className="mb-4 text-lg text-muted-foreground">
						Ready to get started?
					</p>
					<a
						href="/contact"
						className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
					>
						Schedule a Free Consultation
						<ArrowRight className="h-5 w-5" />
					</a>
				</motion.div>
			</div>
		</section>
	);
}
