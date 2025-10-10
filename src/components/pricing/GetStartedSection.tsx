'use client';

import { ArrowRight, CheckCircle, Clock } from 'lucide-react';
import { Button } from '../ui/Button';
import { motion } from 'framer-motion';

export function GetStartedSection() {
	const steps = [
		{
			title: 'Book a Consultation',
			description:
				"Schedule a free consultation to discuss your school's website needs and goals.",
			icon: <Clock className="h-8 w-8 text-primary" />,
			estimate: '15-30 minutes',
		},
		{
			title: 'Customize Your Plan',
			description:
				"We'll help you select and customize the perfect plan for your school.",
			icon: <CheckCircle className="h-8 w-8 text-green-500" />,
			estimate: '1-2 days',
		},
		{
			title: 'Design & Development',
			description: 'Our team designs and builds your custom school website.',
			icon: <ArrowRight className="h-8 w-8 text-blue-500" />,
			estimate: '2-6 weeks (plan dependent)',
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

	const stepVariants = {
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
		<section className="border-t border-border bg-card py-16">
			<div className="container mx-auto px-6">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="mb-12 text-center"
				>
					<h2 className="font-display text-3xl font-bold text-foreground">
						Your Journey to a Professional School Website
					</h2>
					<p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
						From consultation to launch, we&apos;ve got you covered every step
						of the way.
					</p>
				</motion.div>

				<motion.div
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
					className="mx-auto mb-12 grid max-w-5xl gap-8 md:grid-cols-3"
				>
					{steps.map((step, index) => (
						<motion.div
							key={index}
							variants={stepVariants}
							whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
							className="relative rounded-lg border border-border bg-muted/50 p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl"
						>
							<motion.div
								initial={{ scale: 0 }}
								whileInView={{ scale: 1 }}
								viewport={{ once: true }}
								transition={{
									delay: 0.3 + index * 0.2,
									type: 'spring',
									stiffness: 200,
								}}
								className="absolute -right-3 -top-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground shadow-lg"
							>
								{index + 1}
							</motion.div>
							<div className="mb-4">{step.icon}</div>
							<h3 className="mb-2 text-xl font-semibold text-foreground">
								{step.title}
							</h3>
							<p className="mb-4 text-muted-foreground">{step.description}</p>
							<div className="flex items-center text-sm text-muted-foreground">
								<Clock className="mr-1 h-4 w-4" />
								<span>{step.estimate}</span>
							</div>
						</motion.div>
					))}
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.4 }}
					className="text-center"
				>
					<Button
						href="/contact"
						variant="primary"
						className="px-10 py-4 text-lg shadow-lg transition-shadow duration-300 hover:shadow-xl"
					>
						Book Your Free Consultation
					</Button>
					<p className="mt-4 text-sm text-muted-foreground">
						No obligation, just a friendly chat to explore your options.
					</p>
				</motion.div>
			</div>
		</section>
	);
}
