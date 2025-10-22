// src/app/why-indivio/page.tsx
import type { Metadata } from 'next';
import { WhyIndivioHero } from '@/components/why-indivio/WhyIndivioHero';
import { BenefitsGrid } from '@/components/why-indivio/BenefitsGrid';
import { VisionStory } from '@/components/why-indivio/VisionStory';
import { OurStory } from '@/components/why-indivio/OurStory';
import { IndivioDifference } from '@/components/why-indivio/IndivioDifference';
import { LaunchProcess } from '@/components/why-indivio/LaunchProcess';
import { FounderMessage } from '@/components/why-indivio/FounderMessage';
import { WhyTrustUs } from '@/components/why-indivio/WhyTrustUs';
import { CtaSection } from '@/components/ui/CtaSection';

import { ValueSection } from '@/components/why-indivio/ValueSection';
import { UnifiedAdvantage } from '@/components/why-indivio/UnifiedAdvantage';
import { FindYourFit } from '@/components/why-indivio/FindYourFit';
import { DigitalIndia } from '@/components/why-indivio/DigitalIndia';
// Step 1: Set the page-specific SEO metadata
// Revalidate every 1 minute (60 seconds)
export const revalidate = 60;
export const metadata: Metadata = {
	title:
		'Why Indivio? | School Website & Management System for Digital Transformation',
	description:
		"Transform your school with Indivio's EdTech platform. Modern school websites, management systems, and complete school ERP solutions. Join India's education technology revolution with affordable, powerful digital transformation for schools.",
	keywords: [
		'school website',
		'school management system',
		'EdTech platform',
		'school ERP',
		'education technology',
		'digital transformation for schools',
		'school website India',
		'online school management',
		'school admin dashboard',
		'education software India',
	],
};

const whyIndivioCtaProps = {
	heading: "Start Your School's Digital Journey Today",
	subheading:
		"Join the revolution in education technology. Let's build the future of your school together.",
	buttons: [
		{ text: 'Explore Features', href: '/features', primary: false }, // Outlined button
		{ text: 'View Pricing Plans', href: '/pricing', primary: true }, // Filled button
	],
};

// Step 3: Assemble the page with the section placeholders
export default function WhyIndivioPage() {
	return (
		<div className="relative min-h-screen">
			<WhyIndivioHero />
			<BenefitsGrid />
			<VisionStory />
			<OurStory />
			<ValueSection />
			<IndivioDifference />
			<DigitalIndia />
			<WhyTrustUs />
			<FounderMessage />
			<UnifiedAdvantage />
			<LaunchProcess />
			<FindYourFit />
			<CtaSection {...whyIndivioCtaProps} />
		</div>
	);
}
