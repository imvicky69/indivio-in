// src/components/home/IndivioV2Announcement.tsx
'use client';

import { motion } from 'framer-motion';
import { Sparkles, CloudCog, IndianRupee, Target } from 'lucide-react';
import { SectionHeading } from '../SectionHeading';

export function IndivioV2Announcement() {
	return (
		<section className="section-padding bg-gradient-to-b from-primary/5 via-background to-background">
			<div className="container mx-auto px-6">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="text-center"
				>
					<div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-6 py-2 text-sm font-semibold text-primary">
						<Sparkles className="h-4 w-4" />
						Coming Soon After Successful Launch
					</div>
					<SectionHeading>
						Introducing Indivio V2: Complete School Digital Transformation
					</SectionHeading>
					<p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground">
						After the successful launch of our website service, we're bringing the
						complete digital transformation for schools. Indivio V2 will transform
						every aspect of school operations - from online attendance to PTM,
						assignments, tests, and live classes. All powered by modern React and
						Google Cloud Services.
					</p>
				</motion.div>

				<div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: 0.1 }}
						className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 text-center shadow-lg transition-all duration-300 hover:border-primary/20 hover:shadow-2xl"
					>
						<div className="absolute right-4 top-4 text-4xl opacity-10 transition-opacity group-hover:opacity-20">
							<CloudCog className="h-16 w-16 text-primary" />
						</div>
						<div className="relative">
							<div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
								<CloudCog className="h-7 w-7 text-primary" />
							</div>
							<h3 className="mb-3 font-display text-xl font-bold text-foreground">
								Modern Technology Stack
							</h3>
							<p className="text-muted-foreground">
								Built with modern React web services and powered by Google Cloud for
								scalability, security, and performance
							</p>
						</div>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: 0.2 }}
						className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 text-center shadow-lg transition-all duration-300 hover:border-primary/20 hover:shadow-2xl"
					>
						<div className="absolute right-4 top-4 text-4xl opacity-10 transition-opacity group-hover:opacity-20">
							<IndianRupee className="h-16 w-16 text-primary" />
						</div>
						<div className="relative">
							<div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
								<IndianRupee className="h-7 w-7 text-primary" />
							</div>
							<h3 className="mb-3 font-display text-xl font-bold text-foreground">
								Most Affordable in India
							</h3>
							<p className="text-muted-foreground">
								Comprehensive school management at the cheapest pricing in India.
								Quality EdTech accessible to all
							</p>
						</div>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: 0.3 }}
						className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 text-center shadow-lg transition-all duration-300 hover:border-primary/20 hover:shadow-2xl"
					>
						<div className="absolute right-4 top-4 text-4xl opacity-10 transition-opacity group-hover:opacity-20">
							<Target className="h-16 w-16 text-primary" />
						</div>
						<div className="relative">
							<div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
								<Target className="h-7 w-7 text-primary" />
							</div>
							<h3 className="mb-3 font-display text-xl font-bold text-foreground">
								Tier 2 & 3 City Focus
							</h3>
							<p className="text-muted-foreground">
								Modernizing and digitalizing schools in tier 2 and tier 3 cities
								across India with affordable technology
							</p>
						</div>
					</motion.div>
				</div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.4 }}
					className="mt-12 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 p-8 text-center"
				>
					<h3 className="mb-4 font-display text-2xl font-bold text-foreground">
						Early Adopter Benefits
					</h3>
					<p className="mx-auto max-w-2xl text-lg text-muted-foreground">
						Schools already connected with Indivio will receive{' '}
						<span className="font-semibold text-primary">
							free trials and exclusive benefits
						</span>{' '}
						when V2 launches. Join now to secure your spot for the future of
						education technology.
					</p>
				</motion.div>
			</div>
		</section>
	);
}
