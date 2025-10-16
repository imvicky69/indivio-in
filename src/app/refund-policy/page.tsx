// src/app/refund-policy/page.tsx
import type { Metadata } from 'next';
import { PageHero } from '@/components/ui/PageHero';
import { RefundPolicyContent } from '@/components/RefundPolicyContent';

// Revalidate every 1 minute (60 seconds)
export const revalidate = 60;

export const metadata: Metadata = {
	title: 'Refund Policy | Indivio',
	description:
		"Learn about Indivio's refund policy for our school management system and website solutions. Understand eligibility, process, and timeframes for refunds.",
};

export default function RefundPolicyPage() {
	return (
		<>
			<PageHero
				title="Refund Policy"
				subtitle="Our commitment to fair and transparent refund practices."
			/>
			<RefundPolicyContent />
		</>
	);
}
