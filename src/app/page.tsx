// src/app/page.tsx
import { HeroSection } from '@/components/home/HeroSection';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import { TechStackSection } from '@/components/home/TechStackSection';
import { HowItWorksSection } from '@/components/home/HowItWorksSection';
import { DemoShowcase } from '@/components/home/DemoShowcase';
import { CtaSection } from '@/components/ui/CtaSection';
import { TechAdvantageSection } from '@/components/home/TechAdvantageSection';
import { IndivioV2Announcement } from '@/components/home/IndivioV2Announcement';
import type { Metadata } from 'next';

// Revalidate every 1 minute (60 seconds)
export const revalidate = 60;

// Page-specific SEO metadata
export const metadata: Metadata = {
	title: 'Indivio | Affordable School Management System & Website Solution',
	description:
		"Transform your educational institution with Indivio's cost-effective all-in-one school management system and professional website solution. Indivio V2 coming soon with online attendance, PTM, classes, and more. Perfect for schools, colleges, and institutes of all sizes.",
	keywords: [
		'affordable school management system',
		'school website builder',
		'education management software',
		'online school administration',
		'low-cost school software',
		'digital campus solutions',
		'integrated school platform',
		'online attendance system',
		'virtual PTM',
		'online classes India',
		'tier 2 tier 3 city schools',
		'Google Cloud education',
	],
	openGraph: {
		title: "Indivio - Transform Your School's Digital Presence",
		description:
			'Get a professional school website and complete management system at an affordable price. V2 launching soon with comprehensive EdTech solutions. Designed for Indian educational institutions.',
		images: [
			{
				url: '/indivio.png',
				width: 1200,
				height: 630,
				alt: 'Indivio School Management Platform',
			},
		],
	},
};

export default function HomePage() {
	return (
		<>
			<HeroSection />
			<FeaturesSection />
			<IndivioV2Announcement />
			<DemoShowcase />
			<TechAdvantageSection />
			<HowItWorksSection />
			<TechStackSection />
			<CtaSection
				heading="Ready to Transform Your School's Digital Presence?"
				subheading="Get 17% OFF on all plans! Limited time launch offer. Join schools building their digital future with Indivio."
				buttons={[
					{ text: 'View Pricing Plans', href: '/pricing', primary: true },
					{
						text: 'View Live Demo',
						href: 'https://demo.indivio.in',
						primary: false,
					},
				]}
			/>
		</>
	);
}
