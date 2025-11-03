// src/components/about/AboutHero.tsx
'use client';

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export function AboutHero() {
	return (
		<section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden bg-gradient-to-br from-primary/5 via-background to-green-500/5 pb-20 pt-32">
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
					className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-6 py-3"
				>
					<Sparkles className="h-5 w-5 text-primary" />
					<span className="font-semibold text-primary">About Indivio</span>
				</motion.div>

				<motion.h1
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.2 }}
					className="mb-6 font-display text-4xl font-bold text-foreground sm:text-5xl md:text-6xl"
				>
					Empowering Education Through
					<span className="bg-gradient-to-r from-primary to-green-600 bg-clip-text text-transparent">
						{' '}
						Innovation
					</span>
				</motion.h1>

				<motion.p
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.4 }}
					className="mx-auto max-w-3xl text-lg text-muted-foreground md:text-xl"
				>
					We believe every educational institution deserves a professional
					digital presence. Our mission is to make affordable, cutting-edge
					technology accessible to schools and colleges across India.
				</motion.p>

				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.6 }}
					className="mt-12 flex flex-wrap items-center justify-center gap-8"
				>
					<div className="text-center">
						<div className="mb-2 font-display text-4xl font-bold text-primary">
							200+
						</div>
						<div className="text-sm text-muted-foreground">
							Schools Transformed
						</div>
					</div>
					<div className="h-12 w-px bg-border" />
					<div className="text-center">
						<div className="mb-2 font-display text-4xl font-bold text-primary">
							50K+
						</div>
						<div className="text-sm text-muted-foreground">Active Users</div>
					</div>
					<div className="h-12 w-px bg-border" />
					<div className="text-center">
						<div className="mb-2 font-display text-4xl font-bold text-primary">
							98%
						</div>
						<div className="text-sm text-muted-foreground">
							Client Satisfaction
						</div>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
