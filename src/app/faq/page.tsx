// src/app/faq/page.tsx
import type { Metadata } from 'next';
import { FAQHero } from '@/components/faq/FAQHero';
import { FAQAccordion } from '@/components/faq/FAQAccordion';
import { FAQContact } from '@/components/faq/FAQContact';

export const metadata: Metadata = {
	title: 'Frequently Asked Questions | Indivio School Management System',
	description:
		'Find answers to common questions about Indivio\'s school management system, pricing, features, setup process, and support. Get the information you need to make an informed decision.',
	keywords: [
		'school management faq',
		'indivio questions',
		'school website faq',
		'pricing questions',
		'setup process',
		'support information',
	],
};

export default function FAQPage() {
	return (
		<>
			<FAQHero />
			<FAQAccordion />
			<FAQContact />
		</>
	);
}
