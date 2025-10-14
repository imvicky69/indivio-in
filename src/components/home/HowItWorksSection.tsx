// src/components/home/HowItWorksSection.tsx
'use client';

import React from 'react';
import { SectionHeading } from '../SectionHeading';
import { ClipboardCheck, ServerCog, Rocket, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { GlassmorphicCard } from '../ui/GlassmorphicCard';
import { FloatingElement } from '../ui/FloatingElement';

const stepsData = [
	{
		icon: ClipboardCheck,
		title: 'Choose Your Plan',
		description:
			'Go to the pricing page and book your preferred plan by paying the advance amount.',
		gradient: 'from-blue-500 to-cyan-500',
	},
	{
		icon: ServerCog,
		title: 'We Handle the Full Setup',
		description:
			'We start your project setup, design, code, and everything else — completely hassle-free.',
		gradient: 'from-purple-500 to-pink-500',
	},
	{
		icon: Rocket,
		title: 'Go Live & Manage with Ease',
		description:
			'Make the remaining payment and get your InDashboard to access and manage your page changes.',
		gradient: 'from-orange-500 to-red-500',
	},
];

export function HowItWorksSection() {
	return (
		<section className="section-padding relative overflow-hidden bg-gradient-to-b from-background via-purple-950/5 to-background">
			{/* Decorative elements */}
			<div className="absolute left-0 top-1/3 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl" />
			<div className="absolute bottom-1/3 right-0 h-96 w-96 rounded-full bg-pink-500/10 blur-3xl" />

			<div className="container relative z-10 mx-auto px-6">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
				>
					<SectionHeading>
						<span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
							How It Works
						</span>
					</SectionHeading>
				</motion.div>

				<div className="mt-16 flex flex-col items-center justify-center gap-y-12 lg:flex-row lg:gap-x-8">
					{stepsData.map((step, index) => {
						const IconComponent = step.icon;
						return (
							<React.Fragment key={index}>
								<FloatingElement delay={index * 0.3} duration={3.5 + index * 0.5}>
									<GlassmorphicCard delay={index * 0.2}>
										<motion.div
											initial={{ opacity: 0, scale: 0.9 }}
											whileInView={{ opacity: 1, scale: 1 }}
											viewport={{ once: true }}
											transition={{ duration: 0.5, delay: index * 0.2 }}
											className="flex max-w-xs flex-col items-center text-center"
										>
											{/* Step Number Badge with Gradient */}
											<div className="relative mb-6">
												<motion.div
													whileHover={{ rotate: 360, scale: 1.1 }}
													transition={{ duration: 0.6 }}
													className={`flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br ${step.gradient} shadow-lg`}
												>
													<IconComponent className="h-10 w-10 text-white" />
												</motion.div>
												<motion.div
													initial={{ scale: 0 }}
													whileInView={{ scale: 1 }}
													viewport={{ once: true }}
													transition={{
														duration: 0.5,
														delay: index * 0.2 + 0.3,
														type: 'spring',
													}}
													className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-pink-600 text-sm font-bold text-white shadow-lg"
												>
													{index + 1}
												</motion.div>
											</div>

											<motion.h3
												initial={{ opacity: 0, y: 10 }}
												whileInView={{ opacity: 1, y: 0 }}
												viewport={{ once: true }}
												transition={{ duration: 0.5, delay: index * 0.2 + 0.4 }}
												className="mb-3 font-display text-xl font-bold text-foreground"
											>
												{step.title}
											</motion.h3>
											<motion.p
												initial={{ opacity: 0 }}
												whileInView={{ opacity: 1 }}
												viewport={{ once: true }}
												transition={{ duration: 0.5, delay: index * 0.2 + 0.5 }}
												className="leading-relaxed text-muted-foreground"
											>
												{step.description}
											</motion.p>
										</motion.div>
									</GlassmorphicCard>
								</FloatingElement>

								{index < stepsData.length - 1 && (
									<motion.div
										initial={{ opacity: 0, scale: 0 }}
										whileInView={{ opacity: 1, scale: 1 }}
										viewport={{ once: true }}
										transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
										className="hidden items-center lg:flex"
									>
										<motion.div
											animate={{
												x: [0, 10, 0],
											}}
											transition={{
												duration: 1.5,
												repeat: Infinity,
												ease: 'easeInOut',
											}}
										>
											<ArrowRight className="h-10 w-10 flex-shrink-0 text-purple-500" />
										</motion.div>
									</motion.div>
								)}
							</React.Fragment>
						);
					})}
				</div>
			</div>
		</section>
	);
}
