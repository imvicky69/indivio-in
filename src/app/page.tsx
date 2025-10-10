// src/app/page.tsx
import { HeroSection } from '@/components/home/HeroSection';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import { TechStackSection } from '@/components/home/TechStackSection';
import { HowItWorksSection } from '@/components/home/HowItWorksSection';
import { DemoShowcase } from '@/components/home/DemoShowcase';
// import { StatsSection } from '@/components/home/StatsSection';
// import { TestimonialsSection } from '@/components/home/TestimonialsSection'; // Removed for launch
import { CtaSection } from '@/components/ui/CtaSection';
import { TechAdvantageSection } from '@/components/home/TechAdvantageSection';
import type { Metadata } from 'next';

// Page-specific SEO metadata
export const metadata: Metadata = {
	title: 'Indivio | Affordable School Management System & Website Solution',
	description:
		"Transform your educational institution with Indivio's cost-effective all-in-one school management system and professional website solution. Perfect for schools, colleges, and institutes of all sizes.",
	keywords: [
		'affordable school management system',
		'school website builder',
		'education management software',
		'online school administration',
		'low-cost school software',
		'digital campus solution',
		'integrated school platform',
	],
	openGraph: {
		title: "Indivio - Transform Your School's Digital Presence",
		description:
			'Get a professional school website and complete management system at an affordable price. Designed for Indian educational institutions.',
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
			{/* <StatsSection /> */}
			<FeaturesSection />
			<DemoShowcase />
			<TechAdvantageSection />
			<HowItWorksSection />
			{/* <TestimonialsSection /> - Removed for launch, will add once we have real testimonials */}
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
