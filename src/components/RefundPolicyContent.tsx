// src/components/RefundPolicyContent.tsx
'use client';

// A styled heading component for use within the policy text
const PolicyHeading = ({ children }: { children: React.ReactNode }) => (
	<h2 className="mb-4 mt-8 font-display text-2xl font-bold text-foreground">
		{children}
	</h2>
);

export function RefundPolicyContent() {
	return (
		<section className="py-12 md:py-16 lg:py-20">
			<div className="container mx-auto max-w-4xl px-6">
				<div className="prose prose-lg mx-auto max-w-none">
					<p className="lead mb-6 text-lg font-medium text-muted-foreground md:text-xl">
						This Refund Policy outlines how Indivio processes refunds for its
						services. Please read this policy carefully before making any
						purchases.
					</p>

					<PolicyHeading>1. Refund Eligibility</PolicyHeading>
					<p>Indivio offers refunds under the following circumstances:</p>
					<ul>
						<li>
							<strong>Service Not Delivered</strong>: If we fail to deliver the
							service as specified in your plan within 30 days of payment.
						</li>
						<li>
							<strong>Major Service Deficiency</strong>: If the delivered
							service has critical functionality issues that substantially
							impair the core functionality, despite our reasonable attempts to
							fix the issues.
						</li>
						<li>
							<strong>Free Trial Upgrades</strong>: If you upgrade from a free
							trial to a paid plan and request a refund within 7 days of the
							upgrade.
						</li>
					</ul>

					<PolicyHeading>2. Refund Process</PolicyHeading>
					<p>
						To request a refund, please contact our support team at{' '}
						<a href="mailto:support@indivio.in">support@indivio.in</a> with the
						following information:
					</p>
					<ul>
						<li>Your account details</li>
						<li>Date of purchase</li>
						<li>Reason for requesting a refund</li>
						<li>Any relevant documentation or screenshots</li>
					</ul>
					<p>
						We will review your request and respond within 5 business days. If
						approved, refunds will be processed to the original payment method
						used for the purchase.
					</p>

					<PolicyHeading>3. Non-Refundable Items</PolicyHeading>
					<p>The following are not eligible for refunds:</p>
					<ul>
						<li>
							Services that have been used extensively beyond the evaluation
							period
						</li>
						<li>Custom development work that has been completed</li>
						<li>Domain registration fees</li>
						<li>Add-on services or modules after they have been implemented</li>
						<li>
							Monthly subscriptions that have already been used (prorated
							refunds may apply)
						</li>
					</ul>

					<PolicyHeading>4. Refund Timeframes</PolicyHeading>
					<p>
						Approved refunds will typically be processed within 7-14 business
						days. Please note that your financial institution may require
						additional time to process the refund and display it on your
						account.
					</p>

					<PolicyHeading>5. Cancellations</PolicyHeading>
					<p>
						For subscription services, you may cancel your subscription at any
						time:
					</p>
					<ul>
						<li>
							For monthly plans, cancellations will take effect at the end of
							the current billing cycle
						</li>
						<li>
							For annual plans, cancellations will take effect at the end of the
							current annual period unless otherwise specified
						</li>
					</ul>
					<p>
						No refunds will be provided for the unused portion of a subscription
						period unless required by law.
					</p>

					<PolicyHeading>6. Special Circumstances</PolicyHeading>
					<p>
						In exceptional cases, Indivio management may consider refund
						requests that fall outside of this policy. These will be evaluated
						on a case-by-case basis and are at the sole discretion of Indivio.
					</p>

					<PolicyHeading>7. Changes to This Policy</PolicyHeading>
					<p>
						Indivio reserves the right to modify this refund policy at any time.
						Changes will be effective upon posting on our website, and will
						apply to all purchases made after the posting date.
					</p>

					<p className="mt-8 font-medium">Last Updated: October 16, 2025</p>

					<p className="mt-4 text-muted-foreground">
						If you have any questions or concerns about our Refund Policy,
						please contact us at{' '}
						<a href="mailto:support@indivio.in">support@indivio.in</a>.
					</p>
				</div>
			</div>
		</section>
	);
}
