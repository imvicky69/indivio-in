// src/components/home/TechStackSection.tsx
'use client';

import Image from 'next/image';
import { SectionHeading } from '../SectionHeading';
import { Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import { GlassmorphicCard } from '../ui/GlassmorphicCard';
import { FloatingElement } from '../ui/FloatingElement';

const techData = [
	{
		name: 'React',
		icon: (
			<div className="flex h-12 w-12 items-center justify-center">
				<Image
					src="/icons8-react-96.png"
					alt="React Logo"
					width={48}
					height={48}
					className="h-12 w-12"
				/>
			</div>
		),
		power: 'Powers a dynamic and fast user-interface.',
		color: 'from-cyan-500 to-blue-500',
	},
	{
		name: 'Next.js',
		icon: (
			<div className="flex h-12 w-12 items-center justify-center">
				<Image
					src="/icons8-vercel-50.png"
					alt="Vercel / Next.js Logo"
					width={40}
					height={40}
					className="h-12 w-12"
				/>
			</div>
		),
		power: 'Enables server-side rendering for top-tier SEO.',
		color: 'from-gray-700 to-gray-900',
	},
	{
		name: 'TypeScript',
		icon: (
			<div className="flex h-12 w-12 items-center justify-center">
				<Image
					src="/icons8-typescript-48.png"
					alt="TypeScript Logo"
					width={40}
					height={40}
					className="h-12 w-12 rounded-lg"
				/>
			</div>
		),
		power: 'Ensures code is robust, scalable, and error-free.',
		color: 'from-blue-600 to-blue-700',
	},
	{
		name: 'Google Cloud',
		icon: (
			<div className="flex h-12 w-12 items-center justify-center">
				<Image
					src="/Google-Cloud.png"
					alt="Google Cloud Logo"
					width={48}
					height={48}
					className="h-12 w-12"
				/>
			</div>
		),
		power: 'Provides reliable and scalable backend infrastructure.',
		color: 'from-red-500 to-yellow-500',
	},
	{
		name: 'Secured API',
		icon: <Lock className="h-12 w-12 text-white" />,
		power: 'Protects all data communication with modern security.',
		color: 'from-green-500 to-emerald-600',
	},
];

export function TechStackSection() {
	return (
		<section className="relative overflow-hidden">
			{/* Decorative blobs */}
			<div className="absolute left-0 top-1/4 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
			<div className="absolute bottom-1/4 right-0 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl" />

			{/* Top part with the heading */}
			<div className="section-padding relative z-10 bg-gradient-to-b from-background via-purple-950/5 to-background">
				<div className="container mx-auto px-6 text-center">
					<motion.div
						initial={{ opacity: 0, scale: 0.9 }}
						whileInView={{ opacity: 1, scale: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
					>
						<SectionHeading>
							<span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
								Built with Modern Technology
							</span>
						</SectionHeading>
					</motion.div>
					<motion.p
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6, delay: 0.2 }}
						className="mx-auto max-w-2xl text-lg text-muted-foreground"
					>
						We use industry-leading frameworks and infrastructure to build fast,
						scalable, and secure solutions.
					</motion.p>
				</div>
			</div>

			{/* Bottom part with the tech logos */}
			<div className="relative z-10 bg-background py-16">
				<div className="container mx-auto px-6">
					<div className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 md:grid-cols-5">
						{techData.map((tech, index) => (
							<FloatingElement
								key={tech.name}
								delay={index * 0.2}
								duration={3 + index * 0.3}
							>
								<motion.div
									initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
									whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
									viewport={{ once: true }}
									transition={{
										duration: 0.6,
										delay: index * 0.1,
										type: 'spring',
									}}
									whileHover={{ scale: 1.15, rotate: 5 }}
									className="group relative flex flex-col items-center gap-3"
								>
									{/* Icon with gradient background */}
									<motion.div
										className={`rounded-2xl bg-gradient-to-br ${tech.color} p-4 shadow-lg transition-all duration-300 group-hover:shadow-2xl`}
										whileHover={{
											boxShadow: '0 0 30px rgba(139, 92, 246, 0.5)',
										}}
									>
										{tech.icon}
									</motion.div>
									{/* Name */}
									<span className="font-medium text-foreground">
										{tech.name}
									</span>
									{/* Hover Tooltip (the "power") */}
									<motion.div
										initial={{ opacity: 0, y: 10 }}
										whileHover={{ opacity: 1, y: 0 }}
										className="pointer-events-none absolute -top-24 z-10 w-max max-w-xs rounded-xl border border-white/20 bg-gradient-to-br from-purple-900/90 to-pink-900/90 p-4 text-sm text-white opacity-0 shadow-2xl backdrop-blur-xl transition-all duration-300 group-hover:opacity-100"
									>
										{tech.power}
										{/* Tooltip Arrow */}
										<div className="absolute left-1/2 top-full h-0 w-0 -translate-x-1/2 border-8 border-transparent border-t-purple-900"></div>
									</motion.div>
								</motion.div>
							</FloatingElement>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
