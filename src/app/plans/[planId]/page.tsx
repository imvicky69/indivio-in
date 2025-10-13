import Link from 'next/link';
import { getPlanById, getPricingPlans } from '@/lib/plans';
import {
	Check,
	ArrowLeft,
	Star,
	Clock,
	Users,
	Sparkles,
	Package,
	Globe,
	Palette,
	X,
} from 'lucide-react';
import type { Metadata } from 'next';

// Revalidate every 1 minute (60 seconds)
export const revalidate = 60;

interface PlanPageProps {
	params: Promise<{ planId: string }>;
}

// Generate metadata for SEO
export async function generateMetadata({
	params,
}: PlanPageProps): Promise<Metadata> {
	const { planId } = await params;
	const plan = await getPlanById(planId);

	if (!plan) {
		return {
			title: 'Plan Not Found | Indivio',
			description: 'The requested plan could not be found.',
		};
	}

	return {
		title: `${plan.name} Plan - Professional School Website | Indivio`,
		description: `${plan.description} Get a professional school website with ${plan.name} plan. Includes setup fee ₹${plan.setupFee?.toLocaleString('en-IN')} + ₹${plan.price.toLocaleString('en-IN')}/year maintenance. ${plan.deliveryTime} delivery.`,
		keywords: [
			`${plan.name.toLowerCase()} school website plan`,
			'school website pricing',
			'educational website solutions',
			`${plan.name.toLowerCase()} plan features`,
			'school website development',
		],
		openGraph: {
			title: `${plan.name} Plan - Professional School Website Solutions`,
			description: plan.description,
			images: [
				{
					url: '/pricing-plans.png',
					width: 1200,
					height: 630,
					alt: `${plan.name} Plan - Indivio School Solutions`,
				},
			],
		},
	};
}

// Generate static params for all plans
export async function generateStaticParams() {
	const plans = await getPricingPlans();
	return plans.map((plan) => ({
		planId: plan.id,
	}));
}

export default async function PlanDetailPage({ params }: PlanPageProps) {
	const { planId } = await params;
	const plan = await getPlanById(planId);
	const allPlans = await getPricingPlans();

	if (!plan) {
		return (
			<div className="flex min-h-screen items-center justify-center">
				<div className="text-center">
					<h1 className="text-2xl font-bold text-foreground">Plan Not Found</h1>
					<p className="mt-2 text-muted-foreground">
						The requested plan could not be found.
					</p>
					<Link
						href="/pricing"
						className="mt-4 inline-block text-primary hover:underline"
					>
						View All Plans
					</Link>
				</div>
			</div>
		);
	}

	return (
		<>
			{/* Hero Section */}
			<section className="bg-gradient-to-br from-primary/10 via-white to-primary/5 pb-16 pt-32 sm:pb-20 sm:pt-40">
				<div className="container mx-auto px-6">
					<div className="mb-8">
						<Link
							href="/pricing"
							className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
						>
							<ArrowLeft className="h-4 w-4" />
							Back to All Plans
						</Link>
					</div>{' '}
					<div className="grid gap-12 lg:grid-cols-2 lg:items-center">
						{/* Left Column - Plan Info */}
						<div>
							{plan.badge && (
								<div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
									<Star className="h-4 w-4" />
									{plan.badge}
								</div>
							)}

							<h1 className="mb-4 font-display text-4xl font-bold text-foreground sm:text-5xl">
								{plan.name} Plan
							</h1>

							{plan.tagline && (
								<p className="mb-4 text-xl font-medium text-primary">
									{plan.tagline}
								</p>
							)}

							<p className="mb-8 text-lg text-muted-foreground">
								{plan.description}
							</p>

							{/* Quick Info */}
							<div className="mb-8 flex flex-wrap gap-6">
								{plan.deliveryTime && (
									<div className="flex items-center gap-2 text-muted-foreground">
										<Clock className="h-5 w-5 text-primary" />
										<span className="text-sm">
											<strong className="text-foreground">Delivery:</strong>{' '}
											{plan.deliveryTime}
										</span>
									</div>
								)}
								{plan.bestFor && (
									<div className="flex items-center gap-2 text-muted-foreground">
										<Users className="h-5 w-5 text-primary" />
										<span className="text-sm">
											<strong className="text-foreground">Best for:</strong>{' '}
											{plan.bestFor[0]}
										</span>
									</div>
								)}
							</div>

							<div className="flex flex-col gap-4 sm:flex-row">
								<Link
									href={`/booking/${plan.id}`}
									className="rounded-full bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl"
								>
									Choose {plan.name}
								</Link>
								<Link
									href="/contact"
									className="rounded-full border-2 border-border bg-background px-8 py-4 text-base font-semibold text-foreground transition-all hover:border-primary/30 hover:bg-muted"
								>
									Schedule a Call
								</Link>
							</div>
						</div>

						{/* Right Column - Pricing Card */}
						<div className="lg:ml-auto lg:max-w-md">
							<div
								className={`overflow-hidden rounded-3xl border-2 p-8 shadow-2xl ${
									plan.isMostPopular
										? 'border-primary bg-gradient-to-br from-white to-primary/10'
										: 'border-border bg-card'
								}`}
							>
								<h3 className="mb-6 text-center text-2xl font-bold text-foreground">
									Pricing Breakdown
								</h3>

								{/* Setup Fee */}
								<div className="mb-6 rounded-2xl border border-border bg-muted/30 p-6">
									<p className="mb-2 text-sm font-medium uppercase tracking-wider text-muted-foreground">
										One-Time Setup
									</p>
									<div className="flex items-baseline">
										<span className="text-5xl font-extrabold text-foreground">
											₹{plan.setupFee?.toLocaleString('en-IN')}
										</span>
									</div>
									<p className="mt-2 text-xs text-muted-foreground">
										Design, development, and deployment
									</p>
								</div>

								{/* Year 1 Maintenance */}
								<div className="mb-6 rounded-2xl border border-primary/30 bg-primary/5 p-6">
									<p className="mb-2 text-sm font-medium uppercase tracking-wider text-primary">
										Year 1 Maintenance
									</p>
									<div className="flex items-baseline">
										<span className="text-4xl font-bold text-foreground">
											₹{plan.price.toLocaleString('en-IN')}
										</span>
										<span className="ml-2 text-muted-foreground">
											{plan.pricePeriod}
										</span>
									</div>
									<p className="mt-2 text-xs text-muted-foreground">
										Hosting, security, updates & support
									</p>
								</div>

								{/* Renewal Price */}
								{plan.renewalPrice && (
									<div className="mb-6 flex items-center gap-3 rounded-2xl border border-green-200 bg-green-50 p-6">
										<Sparkles className="h-6 w-6 flex-shrink-0 text-green-600" />
										<div>
											<p className="mb-1 text-sm font-medium text-green-900">
												Renewal from Year 2
											</p>
											<p className="text-2xl font-bold text-green-900">
												₹{plan.renewalPrice.toLocaleString('en-IN')}
												<span className="text-sm font-normal">/year</span>
											</p>
										</div>
									</div>
								)}

								{/* Total First Year */}
								<div className="border-t border-border pt-6">
									<p className="mb-2 text-sm font-medium text-muted-foreground">
										Total First Year Investment
									</p>
									<p className="text-3xl font-extrabold text-foreground">
										₹
										{((plan.setupFee || 0) + plan.price).toLocaleString(
											'en-IN'
										)}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className="bg-white py-20">
				<div className="container mx-auto px-6">
					<div className="mb-16 text-center">
						<h2 className="mb-4 font-display text-3xl font-bold text-foreground sm:text-4xl">
							Everything Included
						</h2>
						<p className="mx-auto max-w-2xl text-lg text-muted-foreground">
							All the features and services you need for a successful school
							website
						</p>
					</div>

					<div className="grid gap-8 lg:grid-cols-2">
						{/* Key Features */}
						<div className="rounded-2xl border border-border bg-card p-8 shadow-lg">
							<div className="mb-6 flex items-center gap-3">
								<div className="rounded-xl bg-primary/10 p-3">
									<Package className="h-6 w-6 text-primary" />
								</div>
								<h3 className="text-2xl font-bold text-foreground">
									Key Features
								</h3>
							</div>
							<ul className="space-y-4">
								{plan.features.map((feature, idx) => (
									<li key={feature} className="flex items-start gap-3">
										<div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
											<Check className="h-4 w-4 text-green-600" />
										</div>
										<span className="text-foreground">{feature}</span>
									</li>
								))}
							</ul>
						</div>

						{/* What's Included */}
						{plan.included && (
							<div className="rounded-2xl border border-border bg-gradient-to-br from-primary/5 to-transparent p-8 shadow-lg">
								<div className="mb-6 flex items-center gap-3">
									<div className="rounded-xl bg-primary/10 p-3">
										<Star className="h-6 w-6 text-primary" />
									</div>
									<h3 className="text-2xl font-bold text-foreground">
										What&apos;s Included
									</h3>
								</div>
								<div className="space-y-4">
									{Object.entries(plan.included).map(([key, value]) => (
										<div
											key={key}
											className="rounded-lg border border-border bg-white p-4"
										>
											<p className="mb-1 text-sm font-semibold capitalize text-primary">
												{key.replace(/([A-Z])/g, ' $1').trim()}
											</p>
											<p className="text-sm text-muted-foreground">{value}</p>
										</div>
									))}
								</div>
							</div>
						)}
					</div>
				</div>
			</section>

			{/* Add-ons Section */}
			{plan.addOns && (
				<section className="bg-gradient-to-b from-muted/30 to-white py-20">
					<div className="container mx-auto px-6">
						<div className="mb-12 text-center">
							<h2 className="mb-4 font-display text-3xl font-bold text-foreground sm:text-4xl">
								Available Add-Ons
							</h2>
							<p className="mx-auto max-w-2xl text-lg text-muted-foreground">
								Customize your plan with these optional premium features
							</p>
						</div>

						<div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
							{/* Custom Domain */}
							<div className="overflow-hidden rounded-2xl border border-border bg-card shadow-lg">
								<div className="border-b border-border bg-gradient-to-r from-blue-50 to-transparent p-6">
									<div className="mb-3 inline-flex rounded-lg bg-blue-100 p-3">
										<Globe className="h-6 w-6 text-blue-600" />
									</div>
									<h3 className="mb-2 text-xl font-bold text-foreground">
										Custom Domain
									</h3>
									<p className="text-sm text-muted-foreground">
										{plan.addOns.customDomain.description}
									</p>
								</div>
								<div className="p-6">
									{plan.addOns.customDomain.available ? (
										<div>
											{plan.addOns.customDomain.price === 0 ||
											plan.addOns.customDomain.price === null ? (
												<div className="flex items-center gap-2 text-green-600">
													<Check className="h-5 w-5" />
													<span className="font-bold">Included FREE</span>
												</div>
											) : (
												<div>
													<span className="text-3xl font-bold text-foreground">
														₹
														{plan.addOns.customDomain.price.toLocaleString(
															'en-IN'
														)}
													</span>
													<p className="mt-1 text-sm text-muted-foreground">
														One-time setup fee
													</p>
												</div>
											)}
										</div>
									) : (
										<div className="flex items-center gap-2 text-muted-foreground">
											<X className="h-5 w-5" />
											<span>Not available for this plan</span>
										</div>
									)}
								</div>
							</div>

							{/* Custom Design */}
							<div className="overflow-hidden rounded-2xl border border-border bg-card shadow-lg">
								<div className="border-b border-border bg-gradient-to-r from-purple-50 to-transparent p-6">
									<div className="mb-3 inline-flex rounded-lg bg-purple-100 p-3">
										<Palette className="h-6 w-6 text-purple-600" />
									</div>
									<h3 className="mb-2 text-xl font-bold text-foreground">
										Custom Design
									</h3>
									<p className="text-sm text-muted-foreground">
										{plan.addOns.customDesign.description}
									</p>
								</div>
								<div className="p-6">
									{plan.addOns.customDesign.available ? (
										<div>
											{plan.addOns.customDesign.price === 0 ||
											plan.addOns.customDesign.price === null ? (
												<div className="flex items-center gap-2 text-green-600">
													<Check className="h-5 w-5" />
													<span className="font-bold">Included FREE</span>
												</div>
											) : (
												<div>
													<span className="text-3xl font-bold text-foreground">
														₹
														{plan.addOns.customDesign.price.toLocaleString(
															'en-IN'
														)}
													</span>
													<p className="mt-1 text-sm text-muted-foreground">
														One-time design fee
													</p>
												</div>
											)}
										</div>
									) : (
										<div className="flex items-center gap-2 text-muted-foreground">
											<X className="h-5 w-5" />
											<span>Not available for this plan</span>
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				</section>
			)}

			{/* Best For Section */}
			{plan.bestFor && (
				<section className="bg-white py-20">
					<div className="container mx-auto px-6">
						<div className="mx-auto max-w-4xl text-center">
							<h2 className="mb-4 font-display text-3xl font-bold text-foreground sm:text-4xl">
								Who Is This Plan For?
							</h2>
							<p className="mb-12 text-lg text-muted-foreground">
								The {plan.name} plan is perfect for:
							</p>

							<div className="grid gap-6 sm:grid-cols-2">
								{plan.bestFor.map((item, idx) => (
									<div
										key={item}
										className="flex items-center gap-4 rounded-xl border border-primary/20 bg-primary/5 p-6 text-left"
									>
										<div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
											<Check className="h-6 w-6" />
										</div>
										<span className="text-foreground">{item}</span>
									</div>
								))}
							</div>
						</div>
					</div>
				</section>
			)}

			{/* Compare Other Plans */}
			<section className="bg-muted/30 py-20">
				<div className="container mx-auto px-6">
					<div className="mb-12 text-center">
						<h2 className="mb-4 font-display text-3xl font-bold text-foreground sm:text-4xl">
							Compare With Other Plans
						</h2>
						<p className="mx-auto max-w-2xl text-lg text-muted-foreground">
							Not sure if this is the right fit? Check out our other plans.
						</p>
					</div>

					<div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2">
						{allPlans
							.filter((p) => p.id !== plan.id)
							.map((otherPlan) => (
								<Link
									key={otherPlan.id}
									href={`/plans/${otherPlan.id}`}
									className="group overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-lg transition-all duration-300 hover:border-primary hover:shadow-2xl"
								>
									{otherPlan.badge && (
										<div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
											{otherPlan.badge}
										</div>
									)}
									<h3 className="mb-2 text-2xl font-bold text-foreground group-hover:text-primary">
										{otherPlan.name} Plan
									</h3>
									<p className="mb-4 text-sm text-muted-foreground">
										{otherPlan.short}
									</p>
									<div className="flex items-baseline gap-2">
										<span className="text-3xl font-bold text-foreground">
											₹{otherPlan.setupFee?.toLocaleString('en-IN')}
										</span>
										<span className="text-sm text-muted-foreground">
											setup + ₹{otherPlan.price.toLocaleString('en-IN')}
											{otherPlan.pricePeriod}
										</span>
									</div>
									<div className="mt-4 text-sm font-medium text-primary group-hover:underline">
										View Details →
									</div>
								</Link>
							))}
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="bg-gradient-to-br from-primary/10 to-primary/5 py-20">
				<div className="container mx-auto px-6 text-center">
					<h2 className="mb-4 font-display text-3xl font-bold text-foreground sm:text-4xl">
						Ready to Get Started?
					</h2>
					<p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
						Let&apos;s build your school&apos;s perfect website together. Get in
						touch and we&apos;ll guide you through the process.
					</p>
					<div className="flex flex-col justify-center gap-4 sm:flex-row">
						<Link
							href="/contact"
							className="rounded-full bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl"
						>
							Start Your Project
						</Link>
						<Link
							href="/pricing"
							className="rounded-full border-2 border-border bg-background px-8 py-4 text-lg font-semibold text-foreground transition-all hover:border-primary/30 hover:bg-muted"
						>
							Compare All Plans
						</Link>
					</div>
				</div>
			</section>
		</>
	);
}
