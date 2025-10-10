'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
				'Our pricing has two components: a one-time setup fee to design and build your custom website, and an annual maintenance fee that covers hosting, security updates, and support. From year 2 onwards, the annual renewal price is typically lower as the initial development work is complete.',
		},
		{
			question: 'What happens after the first year?',
			answer:
				'After the first year, you pay a reduced annual renewal fee (shown for each plan) which covers ongoing hosting, security updates, technical support, and maintenance. There are no surprises—the renewal price is clearly stated upfront.',
		},
		{
			question: 'Can I use my own domain name?',
			answer:
				'Absolutely! All plans support custom domains. The Starter plan has a small additional fee for domain setup, while Professional and Enterprise plans include FREE custom domain setup. You can either use an existing domain or we can help you register a new one.',
		},
		{
			question: 'What are the add-ons and how do they work?',
			answer:
				'Add-ons are optional premium features like custom domain setup and bespoke design. Availability and pricing vary by plan—some include these FREE while others offer them at an additional cost. Check each plan for specific details.',
		},
		{
			question: 'Can I upgrade my plan later?',
			answer:
				"Yes! As your school grows, you can upgrade to a higher-tier plan. We'll apply a portion of your original setup fee as credit toward the new setup cost, making the transition cost-effective.",
		},
		{
			question: 'Are there any hidden costs?',
			answer:
				"No hidden costs. The prices you see include everything needed for your school website. The only potential additional costs would be optional add-ons you choose or custom features beyond what's included in your plan.",
		},
		{
			question: 'How long does it take to build my school website?',
			answer:
				'The Starter plan typically takes 2-3 weeks, Professional plan 3-4 weeks, and Enterprise plan 4-6 weeks, depending on content readiness and feedback cycles. We provide a detailed timeline during onboarding.',
		},
		{
			question: 'What happens if I need help after the website launches?',
			answer:
				'All plans include ongoing support. For technical issues, security, and hosting-related matters, we provide email support for Starter, priority support for Professional, and 24/7 dedicated support for Enterprise. Content updates are handled through your easy-to-use dashboard.',
		},
		{
			question: 'What payment methods do you accept?',
			answer:
				'We accept bank transfers, UPI, credit/debit cards, and can also accommodate purchase orders for institutional payments. Payment terms can be discussed during the consultation.',
		},
		{
			question: 'Do you offer refunds?',
			answer:
				"We offer a satisfaction guarantee. If you're not happy with the initial design concepts within the first 2 weeks, we'll provide a full refund of your setup fee. After development begins, refunds are prorated based on work completed.",
		},
	];

	const toggleFAQ = (index: number) => {
		setOpenIndex(openIndex === index ? null : index);
	};

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				duration: 0.6,
				staggerChildren: 0.1,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.4,
			},
		},
	};

	return (
		<section className="bg-card py-16">
			<div className="container mx-auto px-6">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="mb-12 text-center"
				>
					<h2 className="font-display text-3xl font-bold text-foreground">
						Frequently Asked Questions
					</h2>
					<p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
						Everything you need to know about our pricing, plans, and process.
					</p>
				</motion.div>

				<motion.div
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
					className="mx-auto max-w-3xl"
				>
					{faqs.map((faq, index) => (
						<motion.div key={index} variants={itemVariants} className="mb-4">
							<motion.button
								whileHover={{ scale: 1.01 }}
								whileTap={{ scale: 0.99 }}
								onClick={() => toggleFAQ(index)}
								className={`flex w-full items-center justify-between rounded-lg p-5 text-left transition-all duration-300 ${
									openIndex === index
										? 'border-primary/20 bg-primary/10 shadow-md'
										: 'bg-muted/50 hover:bg-muted'
								} border border-border`}
							>
								<span className="text-lg font-medium text-foreground">
									{faq.question}
								</span>
								<motion.div
									animate={{ rotate: openIndex === index ? 180 : 0 }}
									transition={{ duration: 0.3 }}
								>
									{openIndex === index ? (
										<ChevronUp className="h-5 w-5 flex-shrink-0 text-primary" />
									) : (
										<ChevronDown className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
									)}
								</motion.div>
							</motion.button>

							<AnimatePresence>
								{openIndex === index && (
									<motion.div
										initial={{ opacity: 0, height: 0 }}
										animate={{ opacity: 1, height: 'auto' }}
										exit={{ opacity: 0, height: 0 }}
										transition={{ duration: 0.3 }}
										className="mt-1 rounded-b-lg border border-border bg-card p-5 shadow-sm"
									>
										<p className="text-muted-foreground">{faq.answer}</p>
									</motion.div>
								)}
							</AnimatePresence>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	);
}
