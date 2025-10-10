// src/components/home/TechStackSection.tsx
'use client';

import Image from 'next/image';
import { SectionHeading } from '../SectionHeading';
import { Lock } from 'lucide-react';
import { motion } from 'framer-motion';

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
	},
	{
		name: 'Secured API',
		icon: <Lock className="h-12 w-12 text-primary" />,
		power: 'Protects all data communication with modern security.',
	},
];

export function TechStackSection() {
	return (
		<section>
			{/* Top part with the heading */}
			<div className="section-padding bg-gradient-to-b from-background to-muted/30">
				<div className="container mx-auto px-6 text-center">
					<SectionHeading>Built with Modern Technology</SectionHeading>
					<motion.p
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
						className="mx-auto max-w-2xl text-lg text-muted-foreground"
					>
						We use industry-leading frameworks and infrastructure to build fast,
						scalable, and secure solutions.
					</motion.p>
				</div>
			</div>

			{/* Bottom part with the tech logos */}
			<div className="bg-background py-16">
				<div className="container mx-auto px-6">
					<div className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 md:grid-cols-5">
						{techData.map((tech, index) => (
							<motion.div
								key={tech.name}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5, delay: index * 0.1 }}
								whileHover={{ scale: 1.1 }}
								className="group relative flex flex-col items-center gap-3"
							>
								{/* Icon */}
								<div className="rounded-xl bg-muted/50 p-4 transition-all duration-300 group-hover:bg-primary/10 group-hover:shadow-lg">
									{tech.icon}
								</div>
								{/* Name */}
								<span className="font-medium text-foreground">{tech.name}</span>
								{/* Hover Tooltip (the "power") */}
								<div className="pointer-events-none absolute -top-20 z-10 w-max max-w-xs rounded-lg border border-border bg-card p-3 text-sm text-foreground opacity-0 shadow-xl transition-opacity duration-300 group-hover:opacity-100">
									{tech.power}
									{/* Tooltip Arrow */}
									<div className="absolute left-1/2 top-full h-0 w-0 -translate-x-1/2 border-8 border-transparent border-t-card"></div>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
