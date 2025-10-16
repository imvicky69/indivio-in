// src/components/ShippingPolicyContent.tsx
'use client';

// A styled heading component for use within the policy text
const PolicyHeading = ({ children }: { children: React.ReactNode }) => (
	<h2 className="mb-4 mt-8 font-display text-2xl font-bold text-foreground">
		{children}
	</h2>
);

export function ShippingPolicyContent() {
	return (
		<section className="py-12 md:py-16 lg:py-20">
			<div className="container mx-auto max-w-4xl px-6">
				<div className="prose prose-lg mx-auto max-w-none">
					<p className="lead mb-6 text-lg font-medium text-muted-foreground md:text-xl">
						This Shipping Policy outlines how Indivio delivers its digital
						products and services. As we primarily offer Software-as-a-Service
						(SaaS) solutions, this policy addresses digital delivery rather than
						physical shipping.
					</p>

					<PolicyHeading>1. Digital Product Delivery</PolicyHeading>
					<p>
						Indivio provides school management systems and website solutions as
						digital services:
					</p>
					<ul>
						<li>
							<strong>Access Provision</strong>: Upon successful payment
							processing, you will receive credentials to access your dashboard,
							admin portal, or school website within 24 hours.
						</li>
						<li>
							<strong>Implementation Timeline</strong>: For customized website
							solutions, the implementation timeline will be specified in your
							service agreement, typically ranging from 1-6 weeks depending on
							the complexity of your requirements.
						</li>
					</ul>

					<PolicyHeading>2. Service Activation Process</PolicyHeading>
					<p>Our digital service activation process includes:</p>
					<ul>
						<li>
							<strong>Account Setup</strong>: Creation of your school's account
							and user profiles as per your requirements
						</li>
						<li>
							<strong>Onboarding</strong>: Virtual onboarding session to help
							you navigate the platform
						</li>
						<li>
							<strong>Data Migration</strong>: If applicable, assistance with
							data migration from existing systems
						</li>
						<li>
							<strong>Customization</strong>: Implementation of any customized
							features included in your package
						</li>
					</ul>

					<PolicyHeading>3. Access and Availability</PolicyHeading>
					<p>Indivio ensures the following regarding service availability:</p>
					<ul>
						<li>
							<strong>Uptime Commitment</strong>: We strive to maintain 99.9%
							uptime for all our services
						</li>
						<li>
							<strong>Maintenance Windows</strong>: Scheduled maintenance is
							typically performed during non-peak hours (10 PM to 4 AM IST) with
							advance notice provided
						</li>
						<li>
							<strong>24/7 Access</strong>: Your school website and management
							system will be accessible 24/7, subject to our maintenance
							schedule
						</li>
					</ul>

					<PolicyHeading>4. Technical Requirements</PolicyHeading>
					<p>
						To ensure optimal delivery of our digital services, we recommend:
					</p>
					<ul>
						<li>
							Modern web browsers (Chrome, Firefox, Safari, or Edge - latest
							versions)
						</li>
						<li>
							Stable internet connection with minimum 2 Mbps download speed
						</li>
						<li>
							For admin functions: Desktop or laptop computer with at least 4GB
							RAM
						</li>
						<li>
							For basic access: Any modern smartphone or tablet with updated
							browser
						</li>
					</ul>

					<PolicyHeading>5. Domain and Hosting Services</PolicyHeading>
					<p>
						For website solutions that include domain registration and hosting:
					</p>
					<ul>
						<li>
							<strong>Domain Registration</strong>: Domain registration
							typically takes 24-48 hours to propagate fully across the internet
						</li>
						<li>
							<strong>Hosting Setup</strong>: Website hosting is established
							within 24 hours of payment confirmation
						</li>
						<li>
							<strong>SSL Certificate</strong>: SSL certificate installation is
							included and typically completed within 24-48 hours
						</li>
					</ul>

					<PolicyHeading>6. Training and Support Materials</PolicyHeading>
					<p>Delivery of training and support materials includes:</p>
					<ul>
						<li>
							<strong>Documentation</strong>: Comprehensive user guides and
							admin manuals delivered in digital format
						</li>
						<li>
							<strong>Video Tutorials</strong>: Access to our library of
							instructional videos
						</li>
						<li>
							<strong>Webinars</strong>: Schedule of upcoming training webinars
							shared upon service activation
						</li>
					</ul>

					<PolicyHeading>7. Changes to This Policy</PolicyHeading>
					<p>
						Indivio reserves the right to modify this shipping/delivery policy
						at any time. Changes will be effective upon posting on our website.
					</p>

					<p className="mt-8 font-medium">Last Updated: October 16, 2025</p>

					<p className="mt-4 text-muted-foreground">
						If you have any questions about our digital delivery process, please
						contact us at{' '}
						<a href="mailto:support@indivio.in">support@indivio.in</a>.
					</p>
				</div>
			</div>
		</section>
	);
}
