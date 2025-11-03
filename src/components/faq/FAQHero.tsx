// src/components/faq/FAQHero.tsx
'use client';

import { motion } from 'framer-motion';
import { HelpCircle, Search } from 'lucide-react';
import { useState } from 'react';

export function FAQHero() {
	const [searchQuery, setSearchQuery] = useState('');

	return (
		<section className="relative flex min-h-[50vh] items-center justify-center overflow-hidden bg-gradient-to-br from-primary/5 via-background to-green-500/5 pb-20 pt-32">
			{/* Animated Background */}
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
					<HelpCircle className="h-5 w-5 text-primary" />
					<span className="font-semibold text-primary">
						Frequently Asked Questions
					</span>
				</motion.div>

				<motion.h1
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.2 }}
					className="mb-6 font-display text-4xl font-bold text-foreground sm:text-5xl md:text-6xl"
				>
					How Can We{' '}
					<span className="bg-gradient-to-r from-primary to-green-600 bg-clip-text text-transparent">
						Help You?
					</span>
				</motion.h1>

				<motion.p
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.4 }}
					className="mx-auto mb-12 max-w-2xl text-lg text-muted-foreground"
				>
					Find quick answers to common questions about Indivio&apos;s school
					management system and website solutions
				</motion.p>

				{/* Search Bar */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.6 }}
					className="mx-auto max-w-2xl"
				>
					<div className="relative">
						<Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
						<input
							type="text"
							placeholder="Search for answers..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="w-full rounded-full border border-border bg-card py-4 pl-12 pr-6 text-foreground shadow-lg transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
						/>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
