'use client';

import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

interface Testimonial {
	name: string;
	role: string;
	school: string;
	content: string;
	image?: string;
}

export function TestimonialsSection() {
	const testimonials: Testimonial[] = [
		{
			name: 'Dr. Rajesh Kumar',
			role: 'Principal',
			school: 'Delhi Public School, Mumbai',
			content:
				"Indivio transformed our school's online presence. The website is beautiful, easy to manage, and parents love how they can access information anytime. Best investment we've made!",
		},
		{
			name: 'Mrs. Priya Sharma',
			role: 'Administrator',
			school: 'Greenwood International School',
			content:
				'The team at Indivio understood our needs perfectly. From admission forms to notice boards, everything works seamlessly. Our inquiries increased by 40% within 2 months!',
		},
		{
			name: 'Mr. Anil Verma',
			role: 'Director',
			school: 'Cambridge Academy, Bangalore',
			content:
				'Professional, affordable, and reliable. The support team is always available to help. We upgraded from Starter to Professional and the transition was smooth.',
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
		<section className="bg-white py-20">
			<div className="container mx-auto px-6">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="mb-16 text-center"
				>
					<h2 className="mb-4 font-display text-3xl font-bold text-foreground sm:text-4xl">
						Trusted by Schools Across India
					</h2>
					<p className="mx-auto max-w-2xl text-lg text-muted-foreground">
						See what school administrators are saying about Indivio
					</p>
				</motion.div>

				<motion.div
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
					className="grid gap-8 md:grid-cols-3"
				>
					{testimonials.map((testimonial) => (
						<motion.div
							key={testimonial.name}
							variants={itemVariants}
							whileHover={{ y: -5, transition: { duration: 0.3 } }}
							className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-card to-muted/30 p-8 shadow-lg transition-all hover:shadow-2xl"
						>
							{/* Quote Icon */}
							<div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3">
								<Quote className="h-6 w-6 text-primary" />
							</div>

							{/* Testimonial Content */}
							<p className="mb-6 text-foreground">{testimonial.content}</p>

							{/* Author Info */}
							<div className="flex items-center gap-4 border-t border-border pt-6">
								<div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/20 font-bold text-primary">
									{testimonial.name.charAt(0)}
								</div>
								<div>
									<p className="font-semibold text-foreground">
										{testimonial.name}
									</p>
									<p className="text-sm text-muted-foreground">
										{testimonial.role}
									</p>
									<p className="text-xs text-muted-foreground">
										{testimonial.school}
									</p>
								</div>
							</div>

							{/* Decorative Element */}
							<div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/5" />
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	);
}
