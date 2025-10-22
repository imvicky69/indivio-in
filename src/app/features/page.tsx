// src/app/features/page.tsx
import type { Metadata } from 'next';
import { PlatformBenefits } from '@/components//features/PlatformBenefits';
import { FutureReady } from '@/components/features/FutureReady';
import { CtaSection } from '@/components/ui/CtaSection';
import { FeaturesHero } from '@/components/features/FeaturesHero';
import { IncludedFeatures } from '@/components/features/IncludedFeatures';
import { DetailedFeatureList } from '@/components/features/DetailedFeatureList';
import { AdmissionBooster } from '@/components/features/AdmissionBooster';
import { V2TechnologyStack } from '@/components/features/V2TechnologyStack';

// Revalidate every 1 minute (60 seconds)
export const revalidate = 60;

export const metadata: Metadata = {
	title: 'Indivio: Modern School Website Features & Management Platform',
	description:
		"Discover Indivio's comprehensive features. From dynamic toppers grids to easy content management, attract more admissions with a fast, secure, and affordable online presence for your school.",
	keywords:
		'school website features, school management system, school website platform, education website, school digital platform',
};

const featuresCtaProps = {
	heading: 'Experience the Indivio Advantage Today!',
	subheading:
		'Join us in transforming education with our innovative solutions.',
	buttons: [
		{ text: 'View Pricing Plans', href: '/pricing', primary: true },
		{ text: 'See Live Demo', href: 'https://demo.indivio.in', primary: false },
	],
};

export default function FeaturesPage() {
	return (
		<>
			<FeaturesHero />
			<IncludedFeatures />
			<AdmissionBooster />
			<DetailedFeatureList />
			<PlatformBenefits />
			<FutureReady />
			<V2TechnologyStack />
			<CtaSection {...featuresCtaProps} />
		</>
	);
}
