// src/components/PageHero.tsx
'use client';
import { motion } from 'framer-motion';

type PageHeroProps = {
	title: string;
	subtitle: string;
};

export function PageHero({ title, subtitle }: PageHeroProps) {
	return (
		<section className="bg-hero-gradient pb-20 pt-32 sm:pb-28 sm:pt-40">
			<div className="container mx-auto px-6 text-center">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, ease: 'easeOut' }}
					className="mx-auto max-w-3xl"
				>
					<motion.h1
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.8, delay: 0.2 }}
						className="font-display text-4xl font-bold text-primary sm:text-5xl"
					>
						{title}
					</motion.h1>
					<motion.p
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.8, delay: 0.4 }}
						className="text-dark/70 mt-6 font-sans text-lg"
					>
						{subtitle}
					</motion.p>
				</motion.div>
			</div>
		</section>
	);
}
