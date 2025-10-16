'use client';
import { Gift } from 'lucide-react';
import { Offer } from '@/lib/offers';
import { motion } from 'framer-motion';

interface OffersSectionProps {
	offers: Offer[];
}

export function OffersSection({ offers }: OffersSectionProps) {
	if (!offers || offers.length === 0) {
		return null; // Don't render anything if there are no offers
	}

	const handleCopyCode = (code: string) => {
		navigator.clipboard.writeText(code);
		// You could add a toast notification here for better UX
		alert(`Code "${code}" copied to clipboard!`);
	};

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				duration: 0.6,
				staggerChildren: 0.2,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 30 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.6,
			},
		},
	};

	return (
		<section className="bg-muted/50 py-20">
			<div className="container mx-auto px-6 text-center">
				<motion.div
					initial={{ opacity: 0, scale: 0.8 }}
					whileInView={{ opacity: 1, scale: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="mb-8 flex items-center justify-center gap-3 sm:gap-4"
				>
					<motion.div
						animate={{ rotate: 360 }}
						transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
					>
						<Gift className="h-8 w-8 text-primary" />
					</motion.div>
					<h2 className="font-display text-3xl font-bold text-primary sm:text-4xl">
						Exclusive Offers & Discounts
					</h2>
				</motion.div>

				<motion.div
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
					className="mx-auto max-w-2xl space-y-6"
				>
					{offers.map((offer) => (
						<motion.div
							key={offer.id}
							variants={itemVariants}
							whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
							className="flex flex-col items-start justify-between gap-4 rounded-lg border-2 border-primary/50 bg-card p-6 text-left shadow-lg transition-shadow duration-300 hover:shadow-xl sm:flex-row sm:items-center"
						>
							<div>
								<h3 className="text-lg font-bold text-foreground">
									{offer.title}
								</h3>
								<p className="mt-1 text-muted-foreground">
									{offer.description}
								</p>
							</div>
							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								onClick={() => handleCopyCode(offer.code)}
								className="whitespace-nowrap rounded-md border border-dashed border-primary bg-primary/10 px-4 py-2 font-mono text-primary transition-colors duration-300 hover:bg-primary/20"
								aria-label={`Copy offer code ${offer.code}`}
							>
								{offer.code}
							</motion.button>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	);
}
