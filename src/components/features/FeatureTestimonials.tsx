'use client';

import { SectionHeading } from '@/components/SectionHeading';
import { motion } from 'framer-motion';
import { QuoteIcon } from 'lucide-react';

const testimonials = [
	{
		quote:
			'Indivio completely transformed our school&apos;s online presence. The website is not only beautiful but incredibly easy for our staff to update. Since launching, our admission inquiries have increased by over 60%.',
		author: 'Rajiv Sharma',
		position: 'Principal, Delhi Public School',
		image: '/profile-photo.jpeg',
	},
	{
		quote:
			'The ease of managing content has been a game-changer for us. I can update notices, photos, and events in minutes without any technical knowledge. Parents constantly tell us how much they love the new website.',
		author: 'Priya Mehta',
		position: 'Vice Principal, Sunshine International School',
		image: '/profile-photo.jpeg',
	},
	{
		quote:
			'As a small school with limited resources, we couldn&apos;t afford a large IT team. Indivio gave us a professional website that rivals much larger institutions, at a price point that worked for our budget.',
		author: 'Arun Nair',
		position: 'Director, Mount Litera Zee School',
		image: '/profile-photo.jpeg',
	},
];

export function FeatureTestimonials() {
	return (
		<section className="bg-gradient-to-b from-muted/10 to-background py-20 sm:py-28">
			<div className="container mx-auto px-6">
				<SectionHeading>What School Leaders Say</SectionHeading>
				<p className="mx-auto mt-4 max-w-3xl text-center text-lg text-muted-foreground md:text-xl">
					Hear from administrators who have transformed their schools&apos;
					online presence with Indivio.
				</p>

				<div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
					{testimonials.map((testimonial, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
							className="flex flex-col rounded-xl bg-card p-6 shadow-lg"
						>
							<div className="mb-4 text-primary">
								<QuoteIcon className="h-8 w-8" />
							</div>

							<p className="mb-6 flex-grow text-muted-foreground">
								&quot;{testimonial.quote}&quot;
							</p>

							<div className="mt-auto flex items-center">
								<div className="h-12 w-12 overflow-hidden rounded-full bg-muted">
									{/* This is a placeholder. In production, you would use an Image component */}
									<div className="h-full w-full bg-gradient-to-br from-primary/30 to-muted"></div>
								</div>
								<div className="ml-4">
									<p className="font-semibold text-foreground">
										{testimonial.author}
									</p>
									<p className="text-sm text-muted-foreground">
										{testimonial.position}
									</p>
								</div>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
