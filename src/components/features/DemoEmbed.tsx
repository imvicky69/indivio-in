'use client';

import { useState, useEffect } from 'react';
import { SectionHeading } from '@/components/SectionHeading';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export function DemoEmbed() {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		// Set a timeout to ensure we show loading state for at least 1 second
		const timer = setTimeout(() => {
			setIsLoading(false);
		}, 1000);

		return () => clearTimeout(timer);
	}, []);

	return (
		<section
			id="demo-section"
			className="bg-gradient-to-b from-muted/30 to-background py-20 sm:py-28"
		>
			<div className="container mx-auto px-6 text-center">
				<SectionHeading>See Indivio in Action</SectionHeading>
				<p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground md:text-xl">
					Experience our demo school website to see how your institution could
					look. Browse through pages, explore features, and imagine your school
					with this powerful digital presence.
				</p>

				<div className="relative mx-auto mt-12 max-w-5xl">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="rounded-xl border-2 border-primary/20 bg-background shadow-2xl"
					>
						<div className="relative h-[600px] w-full overflow-hidden rounded-xl">
							{isLoading && (
								<div className="absolute inset-0 flex items-center justify-center bg-muted/10 backdrop-blur-sm">
									<Loader2 className="h-12 w-12 animate-spin text-primary" />
								</div>
							)}
							<iframe
								src="https://demo.indivio.in"
								title="Indivio Demo School Website"
								className="h-full w-full"
								onLoad={() => setIsLoading(false)}
								loading="lazy"
							/>
						</div>
					</motion.div>

					<div className="mx-auto mt-8 max-w-md rounded-lg border border-muted bg-muted/20 p-4 text-sm text-muted-foreground shadow-md">
						<p>
							This is a live demo of our platform. Feel free to explore and
							interact with it just like a real visitor would.
						</p>
					</div>
				</div>

				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.6, delay: 0.4 }}
					className="mx-auto mt-12 flex flex-col items-center justify-center space-y-3 sm:flex-row sm:space-x-6 sm:space-y-0"
				>
					<a
						href="https://demo.indivio.in"
						target="_blank"
						rel="noreferrer"
						className="btn-primary"
					>
						Open Demo in New Tab
					</a>
					<a href="/pricing" className="btn-secondary">
						View Pricing Plans
					</a>
				</motion.div>
			</div>
		</section>
	);
}
