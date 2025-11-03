// src/components/features/InteractiveFeatureShowcase.tsx
'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import {
	Globe,
	Users,
	CreditCard,
	BarChart,
	Calendar,
	FileText,
	Shield,
	Smartphone,
} from 'lucide-react';
import { SectionHeading } from '../SectionHeading';

const features = [
	{
		id: 'website',
		icon: Globe,
		title: 'Professional Website',
		description: 'Modern, responsive website that works perfectly on all devices',
		benefits: [
			'Mobile-first responsive design',
			'Fast loading speed',
			'SEO optimized structure',
			'Custom domain support',
		],
		color: 'text-blue-600',
		bgColor: 'bg-blue-500/10',
	},
	{
		id: 'portal',
		icon: Users,
		title: 'Student & Parent Portal',
		description: 'Dedicated portals for students and parents to access information',
		benefits: [
			'Attendance tracking',
			'Grade reports access',
			'Assignment submissions',
			'Real-time notifications',
		],
		color: 'text-purple-600',
		bgColor: 'bg-purple-500/10',
	},
	{
		id: 'payments',
		icon: CreditCard,
		title: 'Online Fee Management',
		description: 'Secure online payment system with automated receipts',
		benefits: [
			'Multiple payment gateways',
			'Automated receipts',
			'Payment reminders',
			'Transaction history',
		],
		color: 'text-green-600',
		bgColor: 'bg-green-500/10',
	},
	{
		id: 'analytics',
		icon: BarChart,
		title: 'Analytics & Reports',
		description: 'Comprehensive insights into your school\'s performance',
		benefits: [
			'Admission statistics',
			'Financial reports',
			'Student performance metrics',
			'Custom report generation',
		],
		color: 'text-orange-600',
		bgColor: 'bg-orange-500/10',
	},
	{
		id: 'admission',
		icon: Calendar,
		title: 'Admission Management',
		description: 'Streamline your admission process from start to finish',
		benefits: [
			'Online application forms',
			'Document verification',
			'Automated follow-ups',
			'Admission tracking',
		],
		color: 'text-pink-600',
		bgColor: 'bg-pink-500/10',
	},
	{
		id: 'content',
		icon: FileText,
		title: 'Content Management',
		description: 'Easy-to-use dashboard to manage all your content',
		benefits: [
			'No coding required',
			'Drag & drop interface',
			'Media library',
			'Version control',
		],
		color: 'text-indigo-600',
		bgColor: 'bg-indigo-500/10',
	},
	{
		id: 'security',
		icon: Shield,
		title: 'Security & Backup',
		description: 'Enterprise-grade security for your data',
		benefits: [
			'SSL encryption',
			'Daily backups',
			'DDoS protection',
			'Role-based access',
		],
		color: 'text-red-600',
		bgColor: 'bg-red-500/10',
	},
	{
		id: 'mobile',
		icon: Smartphone,
		title: 'Mobile App Ready',
		description: 'Progressive web app that works like a native mobile app',
		benefits: [
			'Install on home screen',
			'Offline functionality',
			'Push notifications',
			'Native app feel',
		],
		color: 'text-teal-600',
		bgColor: 'bg-teal-500/10',
	},
];

export function InteractiveFeatureShowcase() {
	const [activeFeature, setActiveFeature] = useState(features[0]);

	return (
		<section className="section-padding bg-gradient-to-b from-background to-muted/30">
			<div className="container mx-auto px-6">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
				>
					<SectionHeading>Explore Our Powerful Features</SectionHeading>
					<p className="mx-auto mt-4 max-w-2xl text-center text-lg text-muted-foreground">
						Click on any feature to learn more about how it can benefit your
						school
					</p>
				</motion.div>

				<div className="mx-auto mt-16 max-w-7xl">
					<div className="grid gap-8 lg:grid-cols-12">
						{/* Feature Tabs */}
						<div className="lg:col-span-5">
							<div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-2">
								{features.map((feature, index) => {
									const IconComponent = feature.icon;
									const isActive = activeFeature.id === feature.id;

									return (
										<motion.button
											key={feature.id}
											initial={{ opacity: 0, y: 20 }}
											whileInView={{ opacity: 1, y: 0 }}
											viewport={{ once: true }}
											transition={{ duration: 0.3, delay: index * 0.05 }}
											onClick={() => setActiveFeature(feature)}
											className={`flex flex-col items-center gap-3 rounded-2xl border p-6 text-center transition-all duration-300 ${
												isActive
													? 'border-primary bg-primary/5 shadow-lg'
													: 'border-border bg-card hover:border-primary/30 hover:shadow-md'
											}`}
										>
											<div
												className={`flex h-12 w-12 items-center justify-center rounded-xl transition-all ${
													isActive ? feature.bgColor : 'bg-muted'
												}`}
											>
												<IconComponent
													className={`h-6 w-6 ${isActive ? feature.color : 'text-muted-foreground'}`}
												/>
											</div>
											<span
												className={`text-sm font-semibold ${
													isActive ? 'text-primary' : 'text-foreground'
												}`}
											>
												{feature.title}
											</span>
										</motion.button>
									);
								})}
							</div>
						</div>

						{/* Feature Details */}
						<div className="lg:col-span-7">
							<motion.div
								key={activeFeature.id}
								initial={{ opacity: 0, x: 20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.4 }}
								className="rounded-2xl border border-border bg-card p-8 shadow-2xl lg:p-12"
							>
								<div
									className={`mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl ${activeFeature.bgColor}`}
								>
									<activeFeature.icon
										className={`h-8 w-8 ${activeFeature.color}`}
									/>
								</div>

								<h3 className="mb-4 font-display text-3xl font-bold text-foreground">
									{activeFeature.title}
								</h3>

								<p className="mb-8 text-lg text-muted-foreground">
									{activeFeature.description}
								</p>

								<h4 className="mb-4 font-semibold text-foreground">
									Key Benefits:
								</h4>

								<ul className="space-y-3">
									{activeFeature.benefits.map((benefit, index) => (
										<motion.li
											key={index}
											initial={{ opacity: 0, x: -20 }}
											animate={{ opacity: 1, x: 0 }}
											transition={{ duration: 0.3, delay: index * 0.1 }}
											className="flex items-center gap-3"
										>
											<div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
												<svg
													className="h-4 w-4 text-green-600"
													fill="none"
													viewBox="0 0 24 24"
													stroke="currentColor"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M5 13l4 4L19 7"
													/>
												</svg>
											</div>
											<span className="text-muted-foreground">{benefit}</span>
										</motion.li>
									))}
								</ul>

								<div className="mt-8">
									<a
										href="/pricing"
										className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 font-semibold text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:shadow-lg"
									>
										Get Started Today
									</a>
								</div>
							</motion.div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
