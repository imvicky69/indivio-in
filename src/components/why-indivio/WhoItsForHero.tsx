// src/components/WhoItsForHero.tsx
'use client';

import { School, Landmark, User } from 'lucide-react';
import SplitText from '../SplitText';

// Data for the interactive icons
const segments = [
	{ name: 'K-12 Schools', icon: <School className="h-10 w-10" /> },
	{ name: 'Coaching Centers', icon: <Landmark className="h-10 w-10" /> },
	{ name: 'Individual Tutors', icon: <User className="h-10 w-10" /> },
];

export function WhoItsForHero() {
	return (
		<section className="bg-hero-gradient pb-20 pt-32 sm:pb-28 sm:pt-40">
			<div className="container mx-auto px-6 text-center">
				<div className="mx-auto max-w-4xl">
					<SplitText
						text="For the Visionaries Shaping Tomorrow's Minds."
						tag="h1"
						className="font-display text-4xl font-bold text-primary sm:text-5xl md:text-6xl"
						delay={50}
						duration={0.8}
						from={{ opacity: 0, y: 40 }}
						to={{ opacity: 1, y: 0 }}
						splitType="chars"
						threshold={0.1}
					/>
					<p className="text-dark/70 mt-6 font-sans text-lg md:text-xl">
						Indivio is designed for the unique needs of modern educational
						institutions. Whether you&apos;re a bustling school, a focused
						coaching center, or a passionate individual tutor, our platform is
						built to help you connect, manage, and grow.
					</p>
				</div>

				{/* Interactive Icons Section */}
				<div className="mt-16 flex flex-col items-center justify-center gap-8 sm:flex-row sm:gap-12">
					{segments.map((segment, index) => (
						<div
							key={index}
							className="group flex cursor-pointer flex-col items-center gap-3 text-primary"
						>
							<div className="rounded-full border-2 border-primary/20 bg-white p-5 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:border-accent group-hover:shadow-xl">
								{segment.icon}
							</div>
							<span className="text-dark/80 font-semibold transition-colors group-hover:text-primary">
								{segment.name}
							</span>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
