// src/app/about/page.tsx
import type { Metadata } from 'next';
import { AboutHero } from '@/components/about/AboutHero';
import { MissionVision } from '@/components/about/MissionVision';
import { TeamSection } from '@/components/about/TeamSection';
import { TimelineSection } from '@/components/about/TimelineSection';
import { ValuesSection } from '@/components/about/ValuesSection';
import { CtaSection } from '@/components/ui/CtaSection';

export const metadata: Metadata = {
	title: 'About Indivio | Transforming Education Through Technology',
	description:
		'Learn about Indivio\'s mission to make quality school management systems and websites accessible to every educational institution in India. Meet our team and discover our story.',
	keywords: [
		'about indivio',
		'edtech company',
		'school management team',
		'education technology india',
		'school website company',
	],
};

const aboutCtaProps = {
	heading: 'Join Our Growing Community',
	subheading:
		'Be part of the education technology revolution. Let\'s build the future together.',
	buttons: [
		{ text: 'Get Started Today', href: '/pricing', primary: true },
		{ text: 'Contact Our Team', href: '/contact', primary: false },
	],
};

export default function AboutPage() {
	return (
		<>
			<AboutHero />
			<MissionVision />
			<ValuesSection />
			<TimelineSection />
			<TeamSection />
			<CtaSection {...aboutCtaProps} />
		</>
	);
}
