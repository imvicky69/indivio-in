// src/components/faq/FAQAccordion.tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { useState } from 'react';

const faqCategories = [
	{
		category: 'General',
		questions: [
			{
				question: 'What is Indivio?',
				answer:
					'Indivio is an all-in-one school management system that provides professional websites and comprehensive management solutions for educational institutions. We help schools digitize their operations, enhance communication, and establish a strong online presence at affordable prices.',
			},
			{
				question: 'Who can use Indivio?',
				answer:
					'Indivio is designed for all types of educational institutions including schools, colleges, coaching centers, and training institutes of any size. Whether you\'re a small school or a large educational organization, our platform scales to meet your needs.',
			},
			{
				question: 'Is Indivio suitable for small schools?',
				answer:
					'Absolutely! Indivio is specifically designed to be affordable and accessible for schools of all sizes. Our Starter plan is perfect for small schools, and you can upgrade as you grow.',
			},
		],
	},
	{
		category: 'Pricing & Plans',
		questions: [
			{
				question: 'What are the pricing plans?',
				answer:
					'We offer three flexible plans: Starter (₹15,999/year), Professional (₹24,999/year), and Enterprise (₹39,999/year). All plans include a professional website, hosting, and management features. Currently, we\'re offering 17% off on all plans!',
			},
			{
				question: 'Are there any hidden charges?',
				answer:
					'No hidden charges at all! All our pricing is transparent. The plan you choose includes everything mentioned - website, hosting, support, and all features. The only optional add-ons are clearly listed separately.',
			},
			{
				question: 'Can I upgrade or downgrade my plan?',
				answer:
					'Yes! You can upgrade your plan anytime. For downgrades, please contact our support team, and we\'ll help you transition smoothly at your next renewal period.',
			},
			{
				question: 'Do you offer refunds?',
				answer:
					'Yes, we offer a 7-day money-back guarantee. If you\'re not satisfied with our service, contact us within 7 days of purchase for a full refund. Please refer to our refund policy for complete details.',
			},
		],
	},
	{
		category: 'Features & Functionality',
		questions: [
			{
				question: 'What features are included?',
				answer:
					'All plans include: Professional website, mobile-responsive design, online fee payment integration, student/parent portal, admission management, content management dashboard, SEO optimization, SSL certificate, 24/7 hosting, and email support. Higher plans include additional features like custom domain, advanced analytics, and priority support.',
			},
			{
				question: 'Can I customize my website?',
				answer:
					'Yes! We provide an easy-to-use dashboard (InDashboard) where you can customize content, images, colors, and more without any coding knowledge. Professional and Enterprise plans offer more customization options.',
			},
			{
				question: 'Is online fee payment secure?',
				answer:
					'Absolutely! We integrate with trusted payment gateways that use bank-level encryption and security. All transactions are PCI DSS compliant, ensuring complete security for your parents\' financial information.',
			},
		],
	},
	{
		category: 'Setup & Support',
		questions: [
			{
				question: 'How long does setup take?',
				answer:
					'Your website can be live within 24-48 hours after you provide all necessary content and information. We handle all the technical setup, so you can focus on your school.',
			},
			{
				question: 'Do I need technical knowledge?',
				answer:
					'Not at all! Our platform is designed to be user-friendly. You can manage everything through our intuitive dashboard. We also provide complete training and documentation to help you get started.',
			},
			{
				question: 'What kind of support do you provide?',
				answer:
					'All plans include email support. Professional plan adds chat support, and Enterprise plan includes priority support with dedicated account manager. We also provide comprehensive documentation and video tutorials.',
			},
			{
				question: 'Do you provide training?',
				answer:
					'Yes! We provide complete training on how to use the InDashboard, manage content, and handle day-to-day operations. Professional and Enterprise plans include personalized training sessions.',
			},
		],
	},
];

export function FAQAccordion() {
	const [openItems, setOpenItems] = useState<Record<string, number | null>>({});

	const toggleItem = (category: string, index: number) => {
		setOpenItems((prev) => ({
			...prev,
			[category]: prev[category] === index ? null : index,
		}));
	};

	return (
		<section className="section-padding bg-gradient-to-b from-background to-muted/30">
			<div className="container mx-auto px-6">
				<div className="mx-auto max-w-4xl space-y-12">
					{faqCategories.map((category, categoryIndex) => (
						<motion.div
							key={categoryIndex}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
						>
							{/* Category Header */}
							<h2 className="mb-6 font-display text-2xl font-bold text-foreground">
								{category.category}
							</h2>

							{/* Questions */}
							<div className="space-y-4">
								{category.questions.map((item, index) => {
									const isOpen = openItems[category.category] === index;

									return (
										<div
											key={index}
											className="overflow-hidden rounded-2xl border border-border bg-card shadow-lg transition-all duration-300 hover:shadow-xl"
										>
											<button
												onClick={() => toggleItem(category.category, index)}
												className="flex w-full items-center justify-between gap-4 p-6 text-left transition-colors hover:bg-muted/30"
											>
												<span className="font-semibold text-foreground">
													{item.question}
												</span>
												<div className="flex-shrink-0">
													{isOpen ? (
														<Minus className="h-5 w-5 text-primary" />
													) : (
														<Plus className="h-5 w-5 text-primary" />
													)}
												</div>
											</button>

											<AnimatePresence>
												{isOpen && (
													<motion.div
														initial={{ height: 0, opacity: 0 }}
														animate={{ height: 'auto', opacity: 1 }}
														exit={{ height: 0, opacity: 0 }}
														transition={{ duration: 0.3 }}
													>
														<div className="border-t border-border bg-muted/20 p-6 text-muted-foreground">
															{item.answer}
														</div>
													</motion.div>
												)}
											</AnimatePresence>
										</div>
									);
								})}
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
