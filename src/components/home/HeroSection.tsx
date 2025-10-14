// src/components/home/HeroSection.tsx
'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Zap, Rocket } from 'lucide-react';
import CircularText from '../CircularText';
import { MagneticButton } from '../ui/MagneticButton';
import { ParticleBackground } from '../ui/ParticleBackground';
import { FloatingElement } from '../ui/FloatingElement';
import { AnimatedGradientText } from '../ui/AnimatedGradientText';

export function HeroSection() {
	return (
		<section className="relative flex min-h-screen items-center justify-center overflow-hidden pb-20 pt-32">
			{/* Animated Background with Particles */}
			<div className="absolute inset-0 -z-10 bg-gradient-to-br from-purple-900/20 via-background to-pink-900/20">
				<ParticleBackground />
				<div className="absolute right-1/4 top-20 h-96 w-96 animate-pulse rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-3xl" />
				<div
					className="absolute bottom-20 left-1/4 h-96 w-96 animate-pulse rounded-full bg-gradient-to-r from-blue-500/20 to-teal-500/20 blur-3xl"
					style={{ animationDelay: '1s' }}
				/>
				<div
					className="absolute left-1/2 top-1/2 h-96 w-96 animate-pulse rounded-full bg-gradient-to-r from-green-500/10 to-yellow-500/10 blur-3xl"
					style={{ animationDelay: '2s' }}
				/>
			</div>

			<div className="container relative z-10 mx-auto px-6 text-center">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="mb-12 flex flex-col items-center justify-center gap-8 md:gap-10"
				>
					<FloatingElement delay={0} duration={4}>
						<motion.div
							initial={{ scale: 0.8, opacity: 0, rotate: -180 }}
							animate={{ scale: 1, opacity: 1, rotate: 0 }}
							transition={{ duration: 0.8, delay: 0.2, type: 'spring' }}
							className="relative"
						>
							{/* Circular Text Animation with Glow */}
							<div className="absolute inset-0 -mt-2 flex items-center justify-center">
								<CircularText
									text="INDIVIO • INDIVIO • INDIVIO • "
									spinDuration={20}
									onHover="speedUp"
									className="font-bold text-primary/60"
								/>
							</div>
							<motion.div
								animate={{
									boxShadow: [
										'0 0 20px rgba(139, 92, 246, 0.3)',
										'0 0 60px rgba(139, 92, 246, 0.6)',
										'0 0 20px rgba(139, 92, 246, 0.3)',
									],
								}}
								transition={{ duration: 2, repeat: Infinity }}
								className="relative z-10 rounded-full"
							>
								<Image
									src="/fevicon.png"
									alt="Indivio Logo"
									width={100}
									height={100}
									className="drop-shadow-2xl"
								/>
							</motion.div>
						</motion.div>
					</FloatingElement>

					<motion.div
						initial={{ opacity: 0, y: 40 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.4 }}
					>
						<h1 className="site-hero-title max-w-5xl">
							<AnimatedGradientText className="text-5xl font-black leading-tight md:text-7xl">
								Your All-in-One School Website & Management Portal
							</AnimatedGradientText>
						</h1>
					</motion.div>
				</motion.div>

				<motion.p
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.6, delay: 0.6 }}
					className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl"
				>
					<span className="font-semibold text-purple-600">Revolutionize</span>{' '}
					your educational institution with{' '}
					<span className="font-semibold text-pink-600">cutting-edge</span>{' '}
					technology. Effortlessly manage admissions, fees, and parent
					communication.
				</motion.p>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.8 }}
					className="mt-12 flex flex-col items-center justify-center gap-6 sm:flex-row"
				>
					<MagneticButton href="/pricing" variant="primary">
						<span className="flex items-center gap-2">
							<Rocket className="h-5 w-5" />
							View Pricing Plans
							<ArrowRight className="h-5 w-5" />
						</span>
					</MagneticButton>

					<MagneticButton href="https://demo.indivio.in" variant="secondary">
						<span className="flex items-center gap-2">
							<Zap className="h-5 w-5" />
							See Live Demo
						</span>
					</MagneticButton>
				</motion.div>

				{/* Launch Offer Badge with Enhanced Animation */}
				<FloatingElement delay={0.5} duration={3.5}>
					<motion.div
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.6, delay: 1 }}
						whileHover={{ scale: 1.05 }}
						className="mt-12 inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-gradient-to-r from-green-400/10 via-emerald-400/10 to-teal-400/10 px-8 py-4 shadow-2xl backdrop-blur-sm"
					>
						<motion.div
							animate={{ rotate: 360 }}
							transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
						>
							<Sparkles className="h-6 w-6 text-green-600" />
						</motion.div>
						<span className="bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-lg font-bold text-transparent">
							🎉 Launch Offer: Get 17% OFF on all plans!
						</span>
					</motion.div>
				</FloatingElement>
			</div>
		</section>
	);
}
