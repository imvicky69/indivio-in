// src/components/home/TestimonialsSection.tsx
'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { SectionHeading } from '../SectionHeading';
import Image from 'next/image';

const testimonials = [
	{
		name: 'Dr. Rajesh Kumar',
		role: 'Principal, St. Mary\'s School',
		image: '/profile-photo.jpeg',
		content:
			'Indivio transformed our school\'s digital presence. The website is beautiful, fast, and our parents love the ease of online fee payments. Highly recommended!',
		rating: 5,
		school: 'Mumbai, Maharashtra',
	},
	{
		name: 'Mrs. Priya Sharma',
		role: 'Director, Bright Future Academy',
		image: '/profile-photo.jpeg',
		content:
			'The management dashboard is incredibly intuitive. We saw a 40% increase in admission inquiries within the first month of launch. Best investment for our school!',
		rating: 5,
		school: 'Delhi NCR',
	},
	{
		name: 'Mr. Anil Verma',
		role: 'Administrator, Global Public School',
		image: '/profile-photo.jpeg',
		content:
			'Affordable, professional, and with excellent customer support. Indivio helped us go digital without breaking the bank. Our entire admission process is now streamlined.',
		rating: 5,
		school: 'Bangalore, Karnataka',
	},
];

export function TestimonialsSection() {
	return (
		<section className="section-padding bg-gradient-to-b from-muted/30 to-background">
			<div className="container mx-auto px-6">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
				>
					<SectionHeading>What School Leaders Say About Us</SectionHeading>
					<p className="mx-auto mt-4 max-w-2xl text-center text-lg text-muted-foreground">
						Join hundreds of educational institutions that trust Indivio for
						their digital transformation
					</p>
				</motion.div>

				<div className="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-3">
					{testimonials.map((testimonial, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
							className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
						>
							{/* Quote Icon */}
							<div className="absolute right-4 top-4 text-primary/10 transition-all group-hover:text-primary/20">
								<Quote className="h-16 w-16" />
							</div>

							{/* Rating */}
							<div className="mb-4 flex items-center gap-1">
								{[...Array(testimonial.rating)].map((_, i) => (
									<Star
										key={i}
										className="h-5 w-5 fill-yellow-400 text-yellow-400"
									/>
								))}
							</div>

							{/* Content */}
							<p className="relative mb-6 text-muted-foreground">
								&quot;{testimonial.content}&quot;
							</p>

							{/* Author */}
							<div className="flex items-center gap-4">
								<div className="relative h-12 w-12 overflow-hidden rounded-full ring-2 ring-primary/20">
									<Image
										src={testimonial.image}
										alt={testimonial.name}
										fill
										className="object-cover"
									/>
								</div>
								<div>
									<h4 className="font-semibold text-foreground">
										{testimonial.name}
									</h4>
									<p className="text-sm text-muted-foreground">
										{testimonial.role}
									</p>
									<p className="text-xs text-primary">{testimonial.school}</p>
								</div>
							</div>

							{/* Hover effect gradient */}
							<div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
						</motion.div>
					))}
				</div>

				{/* Trust Badge */}
				<motion.div
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.4 }}
					className="mt-12 text-center"
				>
					<p className="text-sm text-muted-foreground">
						<span className="font-semibold text-foreground">200+</span> schools
						trust Indivio for their digital presence
					</p>
				</motion.div>
			</div>
		</section>
	);
}
