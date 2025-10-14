'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Users, Award, Clock } from 'lucide-react';
import { GlassmorphicCard } from '../ui/GlassmorphicCard';
import { TiltCard } from '../ui/TiltCard';

export function WhyChooseIndivio() {
	return (
		<section className="relative overflow-hidden bg-gradient-to-br from-purple-950/10 via-background to-pink-950/10 py-20">
			{/* Decorative elements */}
			<div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl" />
			<div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-pink-500/10 blur-3xl" />

			<div className="container relative z-10 mx-auto px-6">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="mb-16 text-center"
				>
					<h2 className="mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text font-display text-3xl font-bold text-transparent sm:text-4xl">
						Why Choose Indivio?
					</h2>
					<p className="mx-auto max-w-2xl text-lg text-muted-foreground">
						We&apos;re not just another website builder. We&apos;re your digital
						transformation partner.
					</p>
				</motion.div>

				<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
					{[
						{
							icon: CheckCircle,
							title: 'Proven Results',
							description:
								'Helped 200+ schools improve their online presence and admissions.',
							gradient: 'from-blue-500 to-cyan-500',
						},
						{
							icon: Users,
							title: 'Expert Team',
							description:
								'Dedicated professionals with 10+ years in education technology.',
							gradient: 'from-purple-500 to-pink-500',
						},
						{
							icon: Award,
							title: 'Award Winning',
							description:
								'Recognized for excellence in educational website solutions.',
							gradient: 'from-orange-500 to-red-500',
						},
						{
							icon: Clock,
							title: 'Fast Delivery',
							description:
								'Professional websites delivered in 1-6 weeks, not months.',
							gradient: 'from-green-500 to-emerald-500',
						},
					].map((item, index) => (
						<TiltCard key={item.title}>
							<GlassmorphicCard delay={index * 0.1}>
								<div className="text-center">
									<motion.div
										initial={{ scale: 0, rotate: -180 }}
										whileInView={{ scale: 1, rotate: 0 }}
										viewport={{ once: true }}
										transition={{
											duration: 0.6,
											delay: index * 0.1,
											type: 'spring',
										}}
										className="mb-4 flex justify-center"
									>
										<div
											className={`flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br ${item.gradient} shadow-lg`}
										>
											<item.icon className="h-8 w-8 text-white" />
										</div>
									</motion.div>
									<motion.h3
										initial={{ opacity: 0, y: 10 }}
										whileInView={{ opacity: 1, y: 0 }}
										viewport={{ once: true }}
										transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
										className="mb-2 font-semibold text-foreground"
									>
										{item.title}
									</motion.h3>
									<motion.p
										initial={{ opacity: 0 }}
										whileInView={{ opacity: 1 }}
										viewport={{ once: true }}
										transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
										className="text-sm text-muted-foreground"
									>
										{item.description}
									</motion.p>
								</div>
							</GlassmorphicCard>
						</TiltCard>
					))}
				</div>
			</div>
		</section>
	);
}
