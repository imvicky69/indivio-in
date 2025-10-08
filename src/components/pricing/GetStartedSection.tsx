'use client';

import { ArrowRight, CheckCircle, Clock } from 'lucide-react';
import { Button } from '../ui/Button';

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

	return (
		<section className="border-t border-gray-100 bg-white py-16">
			<div className="container mx-auto px-6">
				<div className="mb-12 text-center">
					<h2 className="font-display text-3xl font-bold">
						Ready to Get Started?
					</h2>
					<p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
						Getting your school online is easier than you think. Here&apos;s our
						simple process:
					</p>
				</div>

				<div className="mx-auto mb-12 grid max-w-5xl gap-8 md:grid-cols-3">
					{steps.map((step, index) => (
						<div
							key={index}
							className="relative rounded-lg border border-gray-100 bg-gray-50 p-6"
						>
							<div className="absolute -right-3 -top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black font-bold text-white">
								{index + 1}
							</div>
							<div className="mb-4">{step.icon}</div>
							<h3 className="mb-2 text-xl font-semibold">{step.title}</h3>
							<p className="mb-4 text-gray-600">{step.description}</p>
							<div className="flex items-center text-sm text-gray-500">
								<Clock className="mr-1 h-4 w-4" />
								<span>{step.estimate}</span>
							</div>
						</div>
					))}
				</div>

				<div className="text-center">
					<Button
						href="/contact"
						variant="primary"
						className="px-10 py-4 text-lg shadow-lg"
					>
						Book Your Free Consultation
					</Button>
					<p className="mt-4 text-sm text-gray-500">
						No obligation, just a friendly chat to explore your options.
					</p>
				</div>
			</div>
		</section>
	);
}
