'use client';

import { TestPaymentCard } from './TestPaymentCard';

export function TestPaymentSection() {
	return (
		<section
			id="test-payment"
			className="bg-gradient-to-b from-white to-muted/30 py-12"
		>
			<div className="container mx-auto px-6">
				<div className="mb-8 text-center">
					<h2 className="mb-4 font-display text-2xl font-bold text-foreground">
						Test Payment Integration
					</h2>
					<p className="mx-auto max-w-2xl text-sm text-muted-foreground">
						Use this section to test the payment flow with a small ₹5
						transaction without creating an actual account. Perfect for
						developers and QA testing.
					</p>
				</div>

				<div className="mx-auto max-w-3xl">
					<TestPaymentCard />
				</div>
			</div>
		</section>
	);
}
