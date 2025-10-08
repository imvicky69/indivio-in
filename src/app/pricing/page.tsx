import type { Metadata } from 'next';
import { getPricingPlans } from '@/lib/plans';
import siteContent from '@/lib/siteContent';
import { PricingSection } from '@/components/pricing/PricingSection';
import { ServiceHighlights } from '@/components/pricing/ServiceHighlights';
import { ComparisonTable } from '@/components/pricing/ComparisonTable';
import { PricingFAQ } from '@/components/pricing/PricingFAQ';
// import { TestimonialSection } from '@/components/pricing/TestimonialSection';
import { GetStartedSection } from '@/components/pricing/GetStartedSection';
import { PageHero } from '@/components/ui/PageHero';
import { CtaSection } from '@/components/ui/CtaSection';

// Ensure this page is rendered dynamically on every request
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
	title: 'School Website Solutions | Indivio',
	description:
		'Professional, affordable website solutions for schools with hassle-free hosting, security, support, and easy content management. Choose from three tailored plans.',
	keywords: [
		'school website solutions',
		'school website design',
		'affordable school websites',
		'school website pricing plans',
		'education website development',
		'school CMS system',
		'school website hosting',
		'SEO for schools',
		'educational website builder',
		'school website maintenance',
	],
	openGraph: {
		title: 'Professional School Website Solutions | Transparent Pricing',
		description:
			'Get a professional website for your school with hassle-free hosting, management dashboard, and ongoing support. Choose from three tailored plans.',
		images: [
			{
				url: '/pricing-plans.png',
				width: 1200,
				height: 630,
				alt: 'Indivio School Website Solutions',
			},
		],
	},
};

export default async function PricingPage() {
	// Fetch data on the server
	const plans = await getPricingPlans();

	return (
		<>
			{/* Hero Section */}
			<PageHero
				title="School Website Solutions"
				subtitle="Professional websites for educational institutions with transparent pricing and everything included."
			/>

			{/* Main pricing section with cards */}
			<PricingSection plans={plans} content={siteContent} />

			{/* What's included in all plans */}
			<ServiceHighlights />

			{/* Detailed comparison table */}
			<ComparisonTable plans={plans} />

			{/* Testimonials */}
			{/* <TestimonialSection /> */}

			{/* Pricing FAQs */}
			<PricingFAQ />

			{/* Get Started Steps */}
			<GetStartedSection />

			{/* Final CTA */}
			<CtaSection
				heading="Ready to Transform Your School's Online Presence?"
				subheading="Get a professional website that reflects your school's values and meets your community's needs."
				buttons={[
					{ text: 'Contact Us Today', href: '/contact', primary: true },
				]}
			/>
		</>
	);
}
