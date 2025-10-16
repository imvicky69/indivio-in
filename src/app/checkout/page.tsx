import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getPlanById } from '@/lib/plans';
import { CheckoutForm } from '@/components/checkout/CheckoutForm';

export const metadata: Metadata = {
	title: 'Checkout - Indivio',
	description:
		'Complete your purchase of Indivio educational website solutions',
};

interface CheckoutPageProps {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function CheckoutPage({
	searchParams,
}: CheckoutPageProps) {
	// Await searchParams since it's now a Promise in Next.js 15
	const resolvedSearchParams = await searchParams;
	const planParam = resolvedSearchParams.plan;
	const planId = Array.isArray(planParam) ? planParam[0] : planParam;

	if (!planId) {
		redirect('/pricing');
	}

	const plan = await getPlanById(planId);

	if (!plan) {
		redirect('/pricing');
	}

	return (
		<>
			{/* Fixed top padding to accommodate navbar */}
			<div className="h-20"></div>

			<div className="bg-gradient-to-b from-white to-muted/30 py-12 sm:py-20">
				<div className="container mx-auto px-6">
					<h1 className="mb-8 text-center font-display text-3xl font-bold text-foreground sm:text-4xl">
						Complete Your Order
					</h1>

					<div className="mb-8 text-center">
						<p className="mx-auto max-w-2xl text-muted-foreground">
							You're just a few steps away from launching your professional
							educational website.
						</p>
					</div>

					<CheckoutForm plan={plan} />
				</div>
			</div>
		</>
	);
}
