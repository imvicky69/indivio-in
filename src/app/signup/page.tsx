import type { Metadata } from 'next';
import { getPricingPlans } from '@/lib/plans';
import { PricingCard } from '@/components/pricing/PricingCard';

// Ensure this page is rendered dynamically on every request
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
	title: 'Get Started - Choose Your Plan | Indivio',
	description:
		'Sign up for Indivio and choose the perfect website solution plan for your educational institution. Get started with professional website hosting, support, and management.',
	keywords: [
		'sign up',
		'get started',
		'education website solutions',
		'educational website pricing',
		'choose plan',
		'school website signup',
	],
};

export default async function SignupPage() {
	// Fetch pricing plans from Firestore
	let plans: Array<import('@/lib/plans').Plan> = [];

	try {
		plans = await getPricingPlans();
		console.log('Plans fetched for signup page:', plans.length);
	} catch (error) {
		console.error('Error fetching plans:', error);
		plans = [];
	}

	return (
		<>
			{/* Fixed top padding to accommodate navbar */}
			<div className="h-20"></div>

			{/* Hero Section */}
			<section className="bg-gradient-to-br from-primary/5 via-white to-primary/10 pb-16 pt-12 sm:pb-20 sm:pt-16">
				<div className="container mx-auto px-6 text-center">
					<div className="mx-auto max-w-4xl">
						<h1 className="mb-6 font-display text-4xl font-bold text-foreground sm:text-5xl md:text-6xl">
							Get Started with Indivio
						</h1>
						<p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground md:text-xl">
							Choose the perfect plan for your educational institution and take
							the first step towards a professional online presence.
						</p>

						{/* Trust Badges */}
						<div className="mt-12 flex flex-wrap items-center justify-center gap-6">
							<div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
								<svg
									className="h-5 w-5 text-green-500"
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
								No Hidden Fees
							</div>
							<div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
								<svg
									className="h-5 w-5 text-green-500"
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
								24/7 Support
							</div>
							<div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
								<svg
									className="h-5 w-5 text-green-500"
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
								Secure Payments
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Pricing Cards Section */}
			<section className="bg-gradient-to-b from-white to-muted/30 py-20">
				<div className="container mx-auto px-6">
					<div className="mb-16 text-center">
						<h2 className="mb-4 font-display text-3xl font-bold text-foreground sm:text-4xl">
							Choose Your Perfect Plan
						</h2>
						<p className="mx-auto max-w-2xl text-lg text-muted-foreground">
							Select the plan that best fits your institution's needs. You can
							upgrade or modify your plan anytime.
						</p>
					</div>

					<div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-3">
						{plans.map((plan, index) => (
							<PricingCard key={plan.id} plan={plan} index={index} />
						))}
					</div>

					{/* Help Text */}
					<div className="mt-12 text-center">
						<p className="text-muted-foreground">
							Need help choosing?{' '}
							<a
								href="/contact"
								className="font-semibold text-primary hover:underline"
							>
								Contact our team
							</a>{' '}
							for personalized recommendations.
						</p>
					</div>

					{/* Additional Information */}
					<div className="mx-auto mt-16 max-w-3xl rounded-2xl border border-border bg-card p-8">
						<h3 className="mb-4 text-center text-xl font-semibold text-foreground">
							What Happens Next?
						</h3>
						<div className="space-y-4">
							<div className="flex items-start gap-4">
								<div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
									1
								</div>
								<div>
									<h4 className="font-medium text-foreground">
										Select Your Plan
									</h4>
									<p className="text-sm text-muted-foreground">
										Choose the plan that fits your institution's needs
									</p>
								</div>
							</div>
							<div className="flex items-start gap-4">
								<div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
									2
								</div>
								<div>
									<h4 className="font-medium text-foreground">
										Fill in Your Details
									</h4>
									<p className="text-sm text-muted-foreground">
										Provide your institution's information and create your account
									</p>
								</div>
							</div>
							<div className="flex items-start gap-4">
								<div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
									3
								</div>
								<div>
									<h4 className="font-medium text-foreground">
										Complete Payment
									</h4>
									<p className="text-sm text-muted-foreground">
										Securely complete your payment through our trusted payment gateway
									</p>
								</div>
							</div>
							<div className="flex items-start gap-4">
								<div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
									4
								</div>
								<div>
									<h4 className="font-medium text-foreground">Get Started</h4>
									<p className="text-sm text-muted-foreground">
										Your account will be activated and we'll begin setting up your website
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
