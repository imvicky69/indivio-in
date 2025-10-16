// src/app/shipping-policy/page.tsx
import type { Metadata } from 'next';
import { PageHero } from '@/components/ui/PageHero';
import { ShippingPolicyContent } from '@/components/ShippingPolicyContent';

// Revalidate every 1 minute (60 seconds)
export const revalidate = 60;

export const metadata: Metadata = {
	title: 'Shipping & Delivery Policy | Indivio',
	description:
		'Understand how Indivio delivers its digital services, including implementation timelines, service activation, and technical requirements for optimal performance.',
};

export default function ShippingPolicyPage() {
	return (
		<>
			<PageHero
				title="Shipping & Delivery Policy"
				subtitle="How we deliver our digital services and solutions to educational institutions."
			/>
			<ShippingPolicyContent />
		</>
	);
}
