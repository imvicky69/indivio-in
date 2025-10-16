import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
	title: 'Payment Successful - Indivio',
	description: 'Your payment was successful and your account has been created.',
};

export default function SuccessPage() {
	return (
		<>
			{/* Fixed top padding to accommodate navbar */}
			<div className="h-20"></div>

			<div className="flex min-h-[calc(100vh-5rem)] items-center bg-gradient-to-b from-white to-muted/30">
				<div className="container mx-auto px-6 py-16">
					<div className="mx-auto max-w-2xl text-center">
						{/* Success Icon */}
						<div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
							<svg
								className="h-16 w-16 text-green-600"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M5 13l4 4L19 7"
								/>
							</svg>
						</div>

						<h1 className="mb-4 font-display text-3xl font-bold text-foreground sm:text-4xl">
							Payment Successful!
						</h1>

						<p className="mb-6 text-lg text-muted-foreground">
							Your account has been created successfully. We've sent you an
							email with your login details.
						</p>

						<div className="mb-8 rounded-lg bg-muted/30 p-6 text-left">
							<h2 className="mb-4 text-xl font-semibold">What happens next?</h2>

							<ol className="space-y-3">
								<li className="flex items-start gap-3">
									<div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/20 text-sm font-medium text-primary">
										1
									</div>
									<p>
										Our team will review your order and contact you within 24
										hours.
									</p>
								</li>

								<li className="flex items-start gap-3">
									<div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/20 text-sm font-medium text-primary">
										2
									</div>
									<p>
										We'll gather all necessary information and materials from
										you.
									</p>
								</li>

								<li className="flex items-start gap-3">
									<div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/20 text-sm font-medium text-primary">
										3
									</div>
									<p>Our design team will start working on your website.</p>
								</li>

								<li className="flex items-start gap-3">
									<div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/20 text-sm font-medium text-primary">
										4
									</div>
									<p>
										You can track progress and provide feedback through your
										admin dashboard.
									</p>
								</li>
							</ol>
						</div>

						<div className="mb-8 rounded-lg border border-primary/30 bg-primary/5 p-4">
							<p className="text-lg font-medium">
								You can now login at:{' '}
								<a
									href="https://admin.indivio.in"
									className="font-bold text-primary hover:underline"
								>
									admin.indivio.in
								</a>
							</p>
						</div>

						<div className="flex flex-col justify-center gap-4 sm:flex-row">
							<Button href="/" variant="secondary">
								Return to Homepage
							</Button>
							<Button href="https://admin.indivio.in" variant="primary">
								Go to Admin Dashboard
							</Button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
