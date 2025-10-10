'use client';

import { motion } from 'framer-motion';
import { Sparkles, Clock, TrendingDown } from 'lucide-react';

export function LaunchOfferBanner() {
	return (
		<motion.div
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6 }}
			className="sticky top-16 z-30 border-b border-accent/20 bg-gradient-to-r from-accent/5 via-accent/10 to-accent/5 py-4 shadow-sm"
		>
			<div className="container mx-auto px-6">
				<div className="flex flex-col items-center justify-center gap-4 text-center sm:flex-row sm:gap-8">
					<motion.div
						initial={{ scale: 0.9 }}
						animate={{ scale: 1 }}
						transition={{ duration: 0.5, delay: 0.2 }}
						className="flex items-center gap-2 rounded-full bg-accent px-4 py-2 shadow-md"
					>
						<Sparkles className="h-5 w-5 text-white" />
						<span className="font-bold text-white">Limited Offer</span>
					</motion.div>
					<div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-6">
						<div className="flex items-center gap-2">
							<TrendingDown className="h-6 w-6 text-accent" />
							<span className="text-base font-semibold text-foreground sm:text-lg">
								Save <span className="text-2xl font-bold text-accent">17%</span>{' '}
								on all plans
							</span>
						</div>
						<div className="flex items-center gap-2 text-muted-foreground">
							<Clock className="h-4 w-4" />
							<span className="text-sm font-medium">
								Ends December 31, 2025
							</span>
						</div>
					</div>
				</div>
			</div>
		</motion.div>
	);
}
