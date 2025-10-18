import type { Metadata } from 'next';
import { getPricingPlans } from '@/lib/plans';
import { getOffers } from '@/lib/offers';
import { getSiteContentBySection, PricingContent } from '@/lib/siteContent';
import { PricingCard } from '@/components/pricing/PricingCard';
import { PricingFAQ } from '@/components/pricing/PricingFAQ';
import { OffersSection } from '@/components/pricing/OffersSection';
import { ServiceHighlights } from '@/components/pricing/ServiceHighlights';
import { AddOnsSection } from '@/components/pricing/AddOnsSection';

// Ensure this page is rendered dynamically on every request
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
	title: 'Educational Website Solutions - Transparent Pricing | Indivio',
	description:
		'Professional, affordable website solutions for educational institutions with hassle-free hosting, security, support, and easy content management. Choose from three tailored plans: Starter, Professional, and Enterprise.',
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
	],
	openGraph: {
		title: 'Professional Educational Website Solutions | Transparent Pricing',
		description:
			'Get a professional website for your educational institution with hassle-free hosting, management dashboard, and ongoing support. Choose from three tailored plans.',
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
			<section className="bg-gradient-to-b from-white to-muted/30 py-20">
				<div className="container mx-auto px-6">
					<div className="mb-16 text-center">
						<h2 className="mb-4 font-display text-3xl font-bold text-foreground sm:text-4xl">
							Choose Your Perfect Plan
						</h2>
						<p className="mx-auto max-w-2xl text-lg text-muted-foreground">
							{content.sectionIntro}
						</p>
					</div>

					<div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-3">
						{plans.map((plan, index) => (
							<PricingCard key={plan.id} plan={plan} index={index} />
						))}
					</div>

					{/* Help Text */}
					<div className="mt-12 text-center">
						<p className="text-muted-foreground">
							Need help choosing?{' '}
							<a
								href="/contact"
								className="font-semibold text-primary hover:underline"
							>
								Contact our team
							</a>{' '}
							for personalized recommendations.
						</p>
					</div>
				</div>
			</section>

			{/* Service Highlights */}
			<ServiceHighlights />

			{/* Add-ons Section */}
			<AddOnsSection plans={plans} />

			{/* Current Offers */}
			{offers && offers.length > 0 && <OffersSection offers={offers} />}

			{/* Pricing FAQs */}
			<PricingFAQ />


		</>
	);
}
