'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Users, Award, Clock } from 'lucide-react';

export function WhyChooseIndivio() {
	return (
		<section className="bg-muted/30 py-20">
			<div className="container mx-auto px-6">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="mb-16 text-center"
				>
					<h2 className="mb-4 font-display text-3xl font-bold text-foreground sm:text-4xl">
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
						},
						{
							icon: Users,
							title: 'Expert Team',
							description:
								'Dedicated professionals with 10+ years in education technology.',
						},
						{
							icon: Award,
							title: 'Award Winning',
							description:
								'Recognized for excellence in educational website solutions.',
						},
						{
							icon: Clock,
							title: 'Fast Delivery',
							description:
								'Professional websites delivered in 1-6 weeks, not months.',
						},
					].map((item, index) => (
						<motion.div
							key={item.title}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6, delay: index * 0.1 }}
							className="text-center"
						>
							<div className="mb-4 flex justify-center">
								<div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
									<item.icon className="h-8 w-8 text-primary" />
								</div>
							</div>
							<h3 className="mb-2 font-semibold text-foreground">
								{item.title}
							</h3>
							<p className="text-sm text-muted-foreground">
								{item.description}
							</p>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
