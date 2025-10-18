import type { Metadata } from 'next';
import { getPricingPlans } from '@/lib/plans';
import { getOffers } from '@/lib/offers';
import { getSiteContentBySection, PricingContent } from '@/lib/siteContent';
import { PricingCard } from '@/components/pricing/PricingCard';
import { PricingFAQ } from '@/components/pricing/PricingFAQ';
import { OffersSection } from '@/components/pricing/OffersSection';
import { ServiceHighlights } from '@/components/pricing/ServiceHighlights';
import { AddOnsSection } from '@/components/pricing/AddOnsSection';
import { PricingComparisonTable } from '@/components/pricing/PricingComparisonTable';
import { HowItWorks } from '@/components/pricing/HowItWorks';
import { BuiltWithIndivio } from '@/components/pricing/BuiltWithIndivio';
import { Testimonials } from '@/components/pricing/Testimonials';
import { SectionDivider } from '@/components/ui/SectionDivider';

// Ensure this page is rendered dynamically on every request
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
	title: 'Educational Website Solutions - Transparent Pricing | Indivio',
	description:
		"Compare Indivio's website solutions for schools — from Starter to Enterprise plans. Transparent pricing, no hidden costs. Professional design, hosting, and support included.",
	keywords: [
		'education website solutions',
		'educational website design',
		'affordable education websites',
		'education website pricing plans',
		'educational institution website development',
		'education CMS system',
		'educational website hosting',
		'SEO for educational institutions',
		'educational website builder',
		'educational website maintenance',
		'school website pricing',
		'education website comparison',
	],
	openGraph: {
		title: 'Professional Educational Website Solutions | Transparent Pricing',
		description:
			"Compare Indivio's website solutions for schools — from Starter to Enterprise plans. Transparent pricing, no hidden costs.",
		images: [
			{
				url: '/pricing-plans.png',
				width: 1200,
				height: 630,
				alt: 'Indivio Educational Website Solutions',
			},
		],
	},
};

export default async function PricingPage() {
	// Fetch data on the server from Firestore
	console.log('Fetching pricing page data...');

	// Add error handling to see what might be failing
	let plans: Array<import('@/lib/plans').Plan> = [];
	let offers: Array<import('@/lib/offers').Offer> = [];
	let content: PricingContent;

	try {
		plans = await getPricingPlans();
		console.log('Plans fetched:', plans.length, plans);
	} catch (error) {
		console.error('Error fetching plans:', error);
		plans = [];
	}

	try {
		offers = await getOffers();
		console.log('Offers fetched:', offers.length);
	} catch (error) {
		console.error('Error fetching offers:', error);
		offers = [];
	}

	try {
		content = await getSiteContentBySection<PricingContent>('pricing');
		console.log('Content fetched successfully');
	} catch (error) {
		console.error('Error fetching content:', error);
		// Fallback to default content from the import
		content = (await import('@/lib/siteContent')).defaultSiteContent.pricing;
	}

	return (
		<>
			{/* Fixed top padding to accommodate navbar */}
			<div className="h-20"></div>

			{/* Hero Section */}
			<section className="bg-gradient-to-br from-primary/5 via-white to-primary/10 pb-16 pt-12 sm:pb-20 sm:pt-16">
				<div className="container mx-auto px-6 text-center">
					<div className="mx-auto max-w-4xl">
						{/* Offer Banner */}
						{content.offerBanner?.enabled && (
							<div className="mb-8 inline-block rounded-full border-2 border-primary/20 bg-primary/10 px-6 py-3 text-sm font-semibold text-primary shadow-lg">
								{content.offerBanner.text}
							</div>
						)}

						<h1 className="mb-6 font-display text-4xl font-bold text-foreground sm:text-5xl md:text-6xl">
							{content.heroTitle}
						</h1>
						<p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground md:text-xl">
							{content.heroSubtitle}
						</p>

						{/* Trust Badges */}
						{content.trustBadges && (
							<div className="mt-12 flex flex-wrap items-center justify-center gap-6">
								{content.trustBadges.map((badge) => (
									<div
										key={badge}
										className="flex items-center gap-2 text-sm font-medium text-muted-foreground"
									>
										<svg
											className="h-5 w-5 text-green-500"
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
										{badge}
									</div>
								))}
							</div>
						)}
					</div>
				</div>
			</section>

			{/* Pricing Cards Section */}
			<section className="bg-gradient-to-b from-white via-background to-muted/30 py-20">
				<div className="container mx-auto px-6">
					<header className="mb-16 text-center">
						<h2 className="mb-4 font-display text-3xl font-bold leading-tight text-foreground sm:text-4xl lg:text-5xl">
							Choose Your Perfect Plan
						</h2>
						<p className="mx-auto max-w-2xl text-base text-muted-foreground md:text-lg">
							{content.sectionIntro}
						</p>
					</header>

					<div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-3">
						{plans.map((plan, index) => (
							<PricingCard key={plan.id} plan={plan} index={index} />
						))}
					</div>

					{/* Help Text */}
					<div className="mt-16 text-center">
						<p className="text-base text-muted-foreground md:text-lg">
							Need help choosing?{' '}
							<a
								href="/contact"
								className="font-semibold text-primary transition-colors hover:text-primary/80 hover:underline"
							>
								Contact our team
							</a>{' '}
							for personalized recommendations.
						</p>
					</div>
				</div>
			</section>

			{/* Pricing Comparison Table */}
			<PricingComparisonTable plans={plans} />

			<SectionDivider />

			{/* How It Works Section */}
			<HowItWorks />

			<SectionDivider />

			{/* Service Highlights */}
			<ServiceHighlights />

			<SectionDivider />

			{/* Built with Indivio Showcase */}
			<BuiltWithIndivio />

			<SectionDivider />

			{/* Add-ons Section */}
			<AddOnsSection plans={plans} />

			{/* Current Offers */}
			{offers && offers.length > 0 && (
				<>
					<SectionDivider />
					<OffersSection offers={offers} />
				</>
			)}

			<SectionDivider />

			{/* Testimonials */}
			<Testimonials />

			<SectionDivider />

			{/* Pricing FAQs */}
			<PricingFAQ />

			{/* Final CTA Section */}
			<section className="bg-gradient-to-b from-background to-primary/10 py-20">
				<div className="container mx-auto px-6">
					<div className="mx-auto max-w-4xl rounded-3xl border-2 border-primary/20 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-12 text-center shadow-2xl">
						<h2 className="mb-4 font-display text-3xl font-bold text-foreground sm:text-4xl">
							Ready to Transform Your School's Digital Presence?
						</h2>
						<p className="mb-8 text-lg text-muted-foreground">
							Join hundreds of schools building trust and visibility with
							professional websites
						</p>
						<div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
							<a
								href="/contact"
								className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
							>
								Get Started Today
								<svg
									className="h-5 w-5"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M13 7l5 5m0 0l-5 5m5-5H6"
									/>
								</svg>
							</a>
							<a
								href="/contact"
								className="inline-flex items-center gap-2 rounded-xl border-2 border-primary bg-transparent px-8 py-4 text-base font-semibold text-primary transition-all duration-300 hover:bg-primary/5"
							>
								Schedule a Call
								<svg
									className="h-5 w-5"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
									/>
								</svg>
							</a>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
