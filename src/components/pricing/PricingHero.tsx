// src/components/pricing/PricingHero.tsx
'use client';

import { motion } from 'framer-motion';
import SplitText from '../SplitText';

export function PricingHero() {
	return (
		<section className="section-padding relative overflow-hidden bg-gradient-to-b from-background via-muted/20 to-background pt-32">
			{/* Decorative Background */}
			<div className="absolute inset-0 -z-10">
				<div className="absolute right-1/4 top-20 h-96 w-96 animate-pulse rounded-full bg-green-500/10 blur-3xl" />
				<div
					className="absolute bottom-20 left-1/4 h-96 w-96 animate-pulse rounded-full bg-primary/10 blur-3xl"
					style={{ animationDelay: '1s' }}
				/>
			</div>

			<div className="container mx-auto px-6 text-center">
				<div className="mx-auto max-w-4xl">
					<SplitText
						text="Simple, Transparent Pricing for Every Educational Institution"
						tag="h1"
						className="site-hero-title text-foreground"
						delay={50}
						duration={0.8}
						from={{ opacity: 0, y: 40 }}
						to={{ opacity: 1, y: 0 }}
						splitType="chars"
						threshold={0.1}
					/>
					<motion.p
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						className="mt-6 text-lg text-muted-foreground md:text-xl"
					>
						Find the perfect plan to build your institution&apos;s digital
						presence and connect with your community. No hidden fees, ever.
					</motion.p>
				</div>
			</div>
		</section>
	);
}
