'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQ {
	question: string;
	answer: string;
}

export function PricingFAQ() {
	const [openIndex, setOpenIndex] = useState<number | null>(0);

	const faqs: FAQ[] = [
		{
			question: 'How is pricing structured for school websites?',
			answer:
				'Our pricing has two components: a one-time setup fee to design and build your custom website, and an annual fee that covers hosting, maintenance, security updates, and support. The annual fee is typically around half of the initial setup cost.',
		},
		{
			question: 'Can I upgrade my plan later?',
			answer:
				"Yes! As your school grows, you can upgrade to a higher-tier plan. We'll apply a portion of your original setup fee as credit toward the new setup cost, making the transition cost-effective.",
		},
		{
			question: 'Are there any hidden costs?',
			answer:
				"No hidden costs. The prices you see include everything needed for your school website. The only potential additional cost would be if you request custom features beyond what's included in your chosen plan.",
		},
		{
			question: 'Do I need to purchase a domain name separately?',
			answer:
				"You can either use your existing domain or we can help you purchase and set up a new one (additional domain registration fees may apply, typically ₹800-1500/year depending on the domain type).",
		},
		{
			question: 'How long does it take to build my school website?',
			answer:
				'The Starter Site typically takes 2-3 weeks, Growth Site 3-4 weeks, and Enterprise Site 4-6 weeks, depending on content readiness and feedback cycles.',
		},
		{
			question: 'What happens if I need help after the website launches?',
			answer:
				"All plans include different levels of ongoing support. For technical issues, security, and hosting-related matters, we provide support for all plans. Content updates are handled through your dashboard, with varying levels of assistance depending on your plan.",
		},
	];

	const toggleFAQ = (index: number) => {
		setOpenIndex(openIndex === index ? null : index);
	};

	return (
		<section className="bg-white py-16">
			<div className="container mx-auto px-6">
				<div className="mb-12 text-center">
					<h2 className="font-display text-3xl font-bold">
						Frequently Asked Questions
					</h2>
					<p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
						Got questions about our school website pricing? We&apos;ve got answers.
					</p>
				</div>

				<div className="mx-auto max-w-3xl">
					{faqs.map((faq, index) => (
						<div key={index} className="mb-4">
							<button
								onClick={() => toggleFAQ(index)}
								className={`flex w-full items-center justify-between rounded-lg p-5 text-left ${
									openIndex === index ? 'bg-primary/10' : 'bg-gray-50'
								} transition-colors hover:bg-primary/5`}
							>
								<span className="text-lg font-medium">{faq.question}</span>
								{openIndex === index ? (
									<ChevronUp className="h-5 w-5 flex-shrink-0" />
								) : (
									<ChevronDown className="h-5 w-5 flex-shrink-0" />
								)}
							</button>

							{openIndex === index && (
								<div className="mt-1 rounded-b-lg border border-gray-100 bg-white p-5">
									<p className="text-gray-600">{faq.answer}</p>
								</div>
							)}
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
