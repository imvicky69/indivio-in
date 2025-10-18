'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

export function Testimonials() {
	const testimonials = [
		{
			id: 1,
			name: 'Dr. Rajesh Kumar',
			designation: "Principal, St. Mary's School",
			content:
				'Indivio transformed our online presence. The website is beautiful, easy to manage, and parents love it. Best investment we made this year!',
			rating: 5,
			school: "St. Mary's School, Mumbai",
		},
		{
			id: 2,
			name: 'Priya Sharma',
			designation: 'Director, Bright Minds Academy',
			content:
				'The Professional plan was perfect for us. Setup was smooth, and the support team is always responsive. Our admissions increased by 40% this year.',
			rating: 5,
			school: 'Bright Minds Academy, Delhi',
		},
		{
			id: 3,
			name: 'Amit Patel',
			designation: 'Administrator, Global Kids School',
			content:
				'We started with the Starter plan and upgraded to Enterprise as we grew. The scalability and features are exactly what a growing institution needs.',
			rating: 5,
			school: 'Global Kids School, Bangalore',
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
		<section className="bg-gradient-to-b from-primary/5 to-background py-20">
			<div className="container mx-auto px-6">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="mb-16 text-center"
				>
					<h2 className="mb-4 font-display text-3xl font-bold text-foreground sm:text-4xl">
						Success Stories
					</h2>
					<p className="mx-auto max-w-2xl text-lg text-muted-foreground">
						Hear from schools that transformed their digital presence with
						Indivio
					</p>
				</motion.div>

				<motion.div
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
					className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
				>
					{testimonials.map((testimonial, index) => (
						<motion.div
							key={testimonial.id}
							variants={itemVariants}
							whileHover={{
								y: -8,
								transition: { duration: 0.3 },
							}}
							className="relative flex flex-col overflow-hidden rounded-2xl border-2 border-border bg-card p-6 shadow-lg transition-all duration-300 hover:border-primary/50 hover:shadow-xl"
						>
							{/* Quote Icon */}
							<div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
								<Quote className="h-5 w-5 text-primary" />
							</div>

							{/* Rating */}
							<div className="mb-4 flex gap-1">
								{[...Array(testimonial.rating)].map((_, i) => (
									<Star
										key={i}
										className="h-4 w-4 fill-yellow-400 text-yellow-400"
									/>
								))}
							</div>

							{/* Content */}
							<blockquote className="mb-6 flex-1 text-sm leading-relaxed text-muted-foreground">
								&quot;{testimonial.content}&quot;
							</blockquote>

							{/* Author Info */}
							<div className="border-t border-border pt-4">
								<p className="font-semibold text-foreground">
									{testimonial.name}
								</p>
								<p className="text-sm text-muted-foreground">
									{testimonial.designation}
								</p>
								<p className="mt-1 text-xs text-primary">
									{testimonial.school}
								</p>
							</div>

							{/* Decorative Element */}
							<div className="absolute right-0 top-0 h-20 w-20 translate-x-8 -translate-y-8 rounded-full bg-primary/5"></div>
						</motion.div>
					))}
				</motion.div>

				{/* CTA */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.6 }}
					className="mt-12 text-center"
				>
					<p className="text-muted-foreground">
						Join hundreds of satisfied schools.{' '}
						<a
							href="/contact"
							className="font-semibold text-primary hover:underline"
						>
							Start your journey today
						</a>
					</p>
				</motion.div>
			</div>
		</section>
	);
}
