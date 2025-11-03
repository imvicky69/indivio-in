// src/components/home/HeroSection.tsx
'use client';

import Image from 'next/image';
import { Button } from '../ui/Button';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import CircularText from '../CircularText';
import SplitText from '../SplitText';

export function HeroSection() {
	return (
		<section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-background via-muted/20 to-background pb-20 pt-32">
			{/* Animated Background Elements */}
			<div className="absolute inset-0 -z-10">
				<div className="absolute right-1/4 top-20 h-96 w-96 animate-pulse rounded-full bg-green-500/10 blur-3xl" />
				<div
					className="absolute bottom-20 left-1/4 h-96 w-96 animate-pulse rounded-full bg-primary/10 blur-3xl"
					style={{ animationDelay: '1s' }}
				/>
			</div>

			<div className="container mx-auto px-6 text-center">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="mb-12 flex flex-col items-center justify-center gap-8 md:gap-10"
				>
					<motion.div
						initial={{ scale: 0.8, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						transition={{ duration: 0.5, delay: 0.2 }}
						className="relative"
					>
						{/* Circular Text Animation */}
						<div className="absolute inset-0 -mt-2 flex items-center justify-center">
							<CircularText
								text="INDIVIO • INDIVIO • INDIVIO • "
								spinDuration={20}
								onHover="speedUp"
								className="font-bold text-primary/60"
							/>
						</div>
						<Image
							src="/fevicon.png"
							alt="Indivio Logo"
							width={100}
							height={100}
							className="relative z-10 drop-shadow-lg"
						/>
					</motion.div>

					<SplitText
						text="Your All-in-One School Website & Management Portal"
						tag="h1"
						className="site-hero-title max-w-5xl text-foreground"
						delay={50}
						duration={0.8}
						from={{ opacity: 0, y: 40 }}
						to={{ opacity: 1, y: 0 }}
						splitType="chars"
						threshold={0.1}
					/>
				</motion.div>

				<motion.p
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.6, delay: 0.5 }}
					className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl"
				>
					We handle the technology so you can focus on education. Effortlessly
					manage admissions, fees, and parent communication.
				</motion.p>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.7 }}
					className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
				>
					<Button href="/pricing" variant="primary" className="group">
						<span>View Pricing Plans</span>
						<ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
					</Button>

					<Button href="https://demo.indivio.in" variant="secondary">
						See Live Demo
					</Button>
				</motion.div>

				{/* Launch Offer Badge */}
				<motion.div
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.6, delay: 0.9 }}
					className="mt-8 inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-50 px-6 py-3 shadow-lg"
				>
					<Sparkles className="h-5 w-5 text-green-600" />
					<span className="font-semibold text-green-700">
						🎉 Launch Offer: Get 17% OFF on all plans!
					</span>
				</motion.div>

				{/* Scroll indicator */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1, y: [0, 10, 0] }}
					transition={{ 
						opacity: { duration: 0.6, delay: 1.1 },
						y: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
					}}
					className="mt-16"
				>
					<div className="flex flex-col items-center gap-2 text-muted-foreground">
						<span className="text-sm">Scroll to explore</span>
						<svg
							className="h-6 w-6"
							fill="none"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
						</svg>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
