'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function DemoShowcase() {
	return (
		<section className="bg-gradient-to-b from-muted/30 to-white py-20">
			<div className="container mx-auto px-6">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="mb-12 text-center"
				>
					<div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
						<Monitor className="h-4 w-4" />
						Live Demo
					</div>
					<h2 className="mb-4 font-display text-3xl font-bold text-foreground sm:text-4xl">
						See It In Action
					</h2>
					<p className="mx-auto max-w-2xl text-lg text-muted-foreground">
						Experience a fully functional school website built with our
						Professional Plan. This is what your school&apos;s website could
						look like.
					</p>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.2 }}
					className="mx-auto max-w-6xl"
				>
					{/* Demo Preview Card */}
					<div className="overflow-hidden rounded-3xl border-2 border-primary/20 bg-white shadow-2xl">
						{/* Header */}
						<div className="flex items-center justify-between border-b border-border bg-gradient-to-r from-primary/10 to-primary/5 p-6">
							<div>
								<h3 className="mb-1 text-xl font-bold text-foreground">
									Professional Plan Demo
								</h3>
								<p className="text-sm text-muted-foreground">
									Live school website with all features
								</p>
							</div>
							<a
								href="https://demo.indivio.in"
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl"
							>
								<ExternalLink className="h-4 w-4" />
								Open in New Tab
							</a>
						</div>

						{/* Iframe Container */}
						<div className="relative bg-muted/20 p-4">
							<div className="aspect-video w-full overflow-hidden rounded-xl border border-border bg-white shadow-inner">
								<iframe
									src="https://demo.indivio.in"
									className="h-full w-full"
									title="Indivio Demo School Website"
									loading="lazy"
									sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
								/>
							</div>
						</div>

						{/* Footer */}
						<div className="border-t border-border bg-muted/50 p-6">
							<div className="grid gap-6 sm:grid-cols-3">
								<div className="text-center">
									<p className="mb-1 text-2xl font-bold text-primary">12+</p>
									<p className="text-sm text-muted-foreground">Custom Pages</p>
								</div>
								<div className="text-center">
									<p className="mb-1 text-2xl font-bold text-primary">
										Full SEO
									</p>
									<p className="text-sm text-muted-foreground">
										Optimized & Fast
									</p>
								</div>
								<div className="text-center">
									<p className="mb-1 text-2xl font-bold text-primary">
										Mobile Ready
									</p>
									<p className="text-sm text-muted-foreground">
										Responsive Design
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* CTA */}
					<div className="mt-8 text-center">
						<p className="mb-4 text-muted-foreground">
							Want a website like this for your school?
						</p>
						<div className="flex flex-col justify-center gap-4 sm:flex-row">
							<Button
								href="/booking/professional"
								variant="primary"
								className="rounded-full px-8 py-4"
							>
								Book Professional Plan
							</Button>
							<Button
								href="/pricing"
								variant="secondary"
								className="rounded-full px-8 py-4"
							>
								View All Plans
							</Button>
						</div>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
