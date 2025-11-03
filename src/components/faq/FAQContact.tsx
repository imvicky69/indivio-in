// src/components/faq/FAQContact.tsx
'use client';

import { motion } from 'framer-motion';
import { MessageCircle, Mail, Phone } from 'lucide-react';

export function FAQContact() {
	const contactMethods = [
		{
			icon: Phone,
			title: 'Call Us',
			description: 'Speak directly with our team',
			action: 'tel:+919211641566',
			buttonText: '+91 9211641566',
			color: 'from-green-500/10 to-green-600/5',
		},
		{
			icon: Mail,
			title: 'Email Us',
			description: 'Send us a detailed message',
			action: 'mailto:indivio.in@gmail.com',
			buttonText: 'indivio.in@gmail.com',
			color: 'from-blue-500/10 to-blue-600/5',
		},
		{
			icon: MessageCircle,
			title: 'WhatsApp',
			description: 'Chat with us instantly',
			action: 'https://wa.me/919211641566',
			buttonText: 'Start Chat',
			color: 'from-green-600/10 to-green-700/5',
		},
	];

	return (
		<section className="section-padding bg-gradient-to-b from-muted/30 to-background">
			<div className="container mx-auto px-6">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="mb-12 text-center"
				>
					<h2 className="mb-4 font-display text-3xl font-bold text-foreground sm:text-4xl">
						Still Have Questions?
					</h2>
					<p className="mx-auto max-w-2xl text-lg text-muted-foreground">
						Can&apos;t find the answer you&apos;re looking for? Our team is here
						to help!
					</p>
				</motion.div>

				<div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
					{contactMethods.map((method, index) => {
						const IconComponent = method.icon;
						return (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5, delay: index * 0.1 }}
								className={`group rounded-2xl border border-border bg-gradient-to-br ${method.color} p-8 text-center shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl`}
							>
								<div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 transition-transform duration-300 group-hover:scale-110">
									<IconComponent className="h-8 w-8 text-primary" />
								</div>

								<h3 className="mb-2 font-display text-xl font-bold text-foreground">
									{method.title}
								</h3>

								<p className="mb-6 text-sm text-muted-foreground">
									{method.description}
								</p>

								<a
									href={method.action}
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:shadow-lg"
								>
									{method.buttonText}
								</a>
							</motion.div>
						);
					})}
				</div>

				{/* Additional CTA */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.4 }}
					className="mt-16 text-center"
				>
					<p className="mb-4 text-lg text-muted-foreground">
						Ready to get started with Indivio?
					</p>
					<a
						href="/pricing"
						className="inline-flex items-center justify-center rounded-full bg-green-600 px-8 py-4 font-semibold text-white transition-all duration-300 hover:bg-green-700 hover:shadow-lg"
					>
						View Pricing Plans
					</a>
				</motion.div>
			</div>
		</section>
	);
}
