// src/components/home/HowItWorksSection.tsx
'use client';

import React from 'react';
import { SectionHeading } from '../SectionHeading';
import { ClipboardCheck, ServerCog, Rocket, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const stepsData = [
	{
		icon: ClipboardCheck,
		title: 'Choose Your Plan',
		description:
			'Go to the pricing page and book your preferred plan by paying the advance amount.',
	},
	{
		icon: ServerCog,
		title: 'We Handle the Full Setup',
		description:
			'We start your project setup, design, code, and everything else — completely hassle-free.',
	},
	{
		icon: Rocket,
		title: 'Go Live & Manage with Ease',
		description:
			'Make the remaining payment and get your InDashboard to access and manage your page changes.',
	},
];

export function HowItWorksSection() {
	return (
		<section className="section-padding bg-background">
			<div className="container mx-auto px-6">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
				>
					<SectionHeading>How It Works</SectionHeading>
				</motion.div>

				<div className="mt-16 flex flex-col items-center justify-center gap-y-12 lg:flex-row lg:gap-x-12">
					{stepsData.map((step, index) => {
						const IconComponent = step.icon;
						return (
							<React.Fragment key={index}>
								<motion.div
									initial={{ opacity: 0, scale: 0.9 }}
									whileInView={{ opacity: 1, scale: 1 }}
									viewport={{ once: true }}
									transition={{ duration: 0.5, delay: index * 0.2 }}
									className="flex max-w-xs flex-col items-center text-center"
								>
									{/* Step Number Badge */}
									<div className="relative mb-6">
										<div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/5 backdrop-blur-sm transition-all duration-300 hover:bg-primary/10">
											<IconComponent className="h-10 w-10 text-primary" />
										</div>
										<div className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
											{index + 1}
										</div>
									</div>

									<h3 className="mb-3 font-display text-xl font-bold text-foreground">
										{step.title}
									</h3>
									<p className="leading-relaxed text-muted-foreground">
										{step.description}
									</p>
								</motion.div>

								{index < stepsData.length - 1 && (
									<motion.div
										initial={{ opacity: 0, x: -20 }}
										whileInView={{ opacity: 1, x: 0 }}
										viewport={{ once: true }}
										transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
										className="hidden items-center text-muted-foreground/30 lg:flex"
									>
										<ArrowRight className="h-8 w-8 flex-shrink-0" />
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
