// src/components/features/FeaturesHero.tsx
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';
import SplitText from '../SplitText';

const CompositeImagePlaceholder = () => (
	<div className="relative mx-auto mt-12 w-full max-w-lg md:mx-0 md:mt-0">
		<motion.div
			initial={{ opacity: 0, x: -30 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{ duration: 0.6, delay: 0.4 }}
			className="relative z-0 h-auto w-[85%] rounded-2xl border border-border bg-card p-3 shadow-xl"
		>
			{/* School Website Preview */}
			<div className="rounded-lg bg-white">
				<div className="flex items-center justify-between border-b border-gray-200 p-2">
					<div className="flex items-center gap-1">
						<div className="h-3 w-3 rounded-full bg-red-500"></div>
						<div className="h-3 w-3 rounded-full bg-yellow-500"></div>
						<div className="h-3 w-3 rounded-full bg-green-500"></div>
					</div>
					<div className="h-4 w-1/2 rounded-full bg-gray-200"></div>
					<div></div>
				</div>
				<div className="p-4">
					<div className="flex h-24 items-center justify-center rounded-lg bg-blue-100">
						<p className="font-bold text-blue-800">School Hero Image</p>
					</div>
					<div className="mt-4 space-y-2">
						<div className="h-4 w-3/4 rounded-full bg-gray-200"></div>
						<div className="h-4 w-1/2 rounded-full bg-gray-200"></div>
					</div>
				</div>
			</div>
		</motion.div>
		<motion.div
			initial={{ opacity: 0, x: 30 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{ duration: 0.6, delay: 0.6 }}
			className="absolute -bottom-8 -right-4 z-10 h-auto w-[90%] rounded-2xl border border-border bg-card p-3 shadow-2xl"
		>
			{/* Admin Dashboard Preview */}
			<div className="h-52 rounded-lg bg-slate-50 p-4">
				<p className="mb-2 text-sm font-bold text-slate-800">Admin Dashboard</p>
				<div className="grid grid-cols-3 gap-2">
					<div className="col-span-1 space-y-2">
						<div className="flex h-8 items-center justify-center rounded-lg bg-blue-200/50 text-xs font-bold text-blue-800">
							Menu
						</div>
						<div className="h-10 rounded-lg bg-gray-200/60"></div>
						<div className="h-10 rounded-lg bg-gray-200/60"></div>
						<div className="h-10 rounded-lg bg-gray-200/60"></div>
					</div>
					<div className="col-span-2 space-y-2">
						<div className="flex h-8 items-center justify-center rounded-lg bg-green-200/50 text-xs font-bold text-green-800">
							Content Editor
						</div>
						<div className="h-28 space-y-1 rounded-lg border border-gray-200 bg-white p-2">
							<div className="h-3 w-3/4 rounded-full bg-gray-200"></div>
							<div className="h-3 w-full rounded-full bg-gray-200"></div>
							<div className="h-3 w-1/2 rounded-full bg-gray-200"></div>
						</div>
					</div>
				</div>
			</div>
			<div className="absolute -bottom-2 left-0 h-2 w-full rounded-b-lg bg-border"></div>
		</motion.div>
	</div>
);

const quickFeatures = [
	'Complete educational website solution',
	'User-friendly management tools',
	'Mobile responsive design',
	'For schools, colleges & coaching centers',
];

export function FeaturesHero() {
	return (
		<section className="flex min-h-screen items-center bg-gradient-to-b from-background via-muted/20 to-background pb-20 pt-32 md:pb-12 md:pt-24">
			<div className="container mx-auto px-6">
				<div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
					<div className="text-center md:text-left">
						<SplitText
							text="More Than a Website. It's Your Educational Institute's Digital Hub."
							tag="h1"
							className="site-hero-title text-foreground"
							delay={50}
							duration={0.8}
							from={{ opacity: 0, y: 40 }}
							to={{ opacity: 1, y: 0 }}
							splitType="chars"
							threshold={0.1}
						/>
						<motion.p
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.6, delay: 0.2 }}
							className="mt-6 text-lg text-muted-foreground md:text-xl"
						>
							Attract new admissions with a stunning, high-performance website
							today, built on a platform ready to manage your entire educational
							institution tomorrow - whether it&apos;s a school, college,
							coaching center, or tutoring institute.
						</motion.p>

						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.6, delay: 0.3 }}
							className="mt-8 flex flex-col items-center justify-center space-y-3 md:items-start"
						>
							<ul className="grid grid-cols-1 gap-x-8 gap-y-2 text-left sm:grid-cols-2">
								{quickFeatures.map((feature, index) => (
									<li key={index} className="flex items-center">
										<CheckCircle className="mr-2 h-5 w-5 text-emerald-500" />
										<span className="text-sm font-medium text-muted-foreground md:text-base">
											{feature}
										</span>
									</li>
								))}
							</ul>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.4 }}
							className="mt-10 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 md:justify-start"
						>
							<Link
								href="/pricing"
								className="btn-primary flex items-center justify-center"
							>
								View Pricing Plans <ArrowRight className="ml-2 h-4 w-4" />
							</Link>
							<Link href="#demo-section" className="btn-secondary">
								See Live Demo
							</Link>
						</motion.div>
					</div>

					<div className="flex items-center justify-center">
						<CompositeImagePlaceholder />
					</div>
				</div>
			</div>
		</section>
	);
}
