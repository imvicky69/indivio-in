'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import Image from 'next/image';

interface Testimonial {
	quote: string;
	name: string;
	role: string;
	school: string;
	image: string;
}

export function TestimonialSection() {
	const [currentIndex, setCurrentIndex] = useState(0);

	const testimonials: Testimonial[] = [
		{
			quote:
				'Our new school website has transformed how we communicate with parents and students. The setup was smooth and the ongoing maintenance is completely hassle-free.',
			name: 'Ravi Sharma',
			role: 'Principal',
			school: 'Delhi Public School, Noida',
			image: '/profile-photo.jpeg', // Using placeholder image
		},
		{
			quote:
				'Indivio delivered our website ahead of schedule and their support team is incredibly responsive. The content management system makes updates so simple.',
			name: 'Priya Patel',
			role: 'IT Administrator',
			school: 'St. Joseph&apos;s High School, Mumbai',
			image: '/profile-photo.jpeg', // Using placeholder image
		},
		{
			quote:
				'Parents and staff have given amazing feedback about our new website. It&apos;s modern, fast, and makes finding information intuitive. Worth every rupee!',
			name: 'Ananya Gupta',
			role: 'Vice Principal',
			school: 'Global Indian International School, Bangalore',
			image: '/profile-photo.jpeg', // Using placeholder image
		},
	];

	const nextTestimonial = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
		);
	};

	const prevTestimonial = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
		);
	};

	return (
		<section className="bg-gray-50 py-16">
			<div className="container mx-auto px-6">
				<div className="mb-12 text-center">
					<h2 className="font-display text-3xl font-bold">What Schools Say</h2>
					<p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
						Hear from education leaders who&apos;ve transformed their online
						presence with our website solutions.
					</p>
				</div>

				<div className="relative mx-auto max-w-4xl">
					<div className="rounded-xl bg-white p-8 shadow-lg md:p-12">
						<div className="absolute left-8 top-8 opacity-20">
							<Quote className="h-16 w-16 text-primary" />
						</div>

						<div className="relative z-10">
							<blockquote className="mb-8 text-xl font-medium italic md:text-2xl">
								&ldquo;{testimonials[currentIndex].quote}&rdquo;
							</blockquote>

							<div className="flex items-center">
								<Image
									src={testimonials[currentIndex].image}
									alt={testimonials[currentIndex].name}
									width={64}
									height={64}
									className="mr-4 h-16 w-16 rounded-full object-cover"
								/>
								<div>
									<div className="text-lg font-bold">
										{testimonials[currentIndex].name}
									</div>
									<div className="text-gray-600">
										{testimonials[currentIndex].role}
									</div>
									<div className="font-medium text-primary">
										{testimonials[currentIndex].school}
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="mt-8 flex justify-center gap-4">
						<button
							onClick={prevTestimonial}
							className="rounded-full bg-white p-2 shadow hover:bg-gray-100"
							aria-label="Previous testimonial"
						>
							<ChevronLeft className="h-5 w-5" />
						</button>

						{testimonials.map((_, index) => (
							<button
								key={index}
								onClick={() => setCurrentIndex(index)}
								className={`h-3 w-3 rounded-full ${
									currentIndex === index ? 'bg-primary' : 'bg-gray-300'
								}`}
								aria-label={`Go to testimonial ${index + 1}`}
							/>
						))}

						<button
							onClick={nextTestimonial}
							className="rounded-full bg-white p-2 shadow hover:bg-gray-100"
							aria-label="Next testimonial"
						>
							<ChevronRight className="h-5 w-5" />
						</button>
					</div>
				</div>
			</div>
		</section>
	);
}
