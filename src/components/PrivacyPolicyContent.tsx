// src/components/PrivacyPolicyContent.tsx

// A styled heading component for use within the policy text
const PolicyHeading = ({ children }: { children: React.ReactNode }) => (
	<h2 className="mb-4 mt-12 font-display text-2xl font-bold text-primary">
		{children}
	</h2>
);

export function PrivacyPolicyContent() {
	return (
		<section className="bg-white py-20 sm:py-28">
			<div className="container mx-auto max-w-4xl px-6">
				{/* Main Content Area */}
				<div className="prose prose-lg max-w-none">
					<p className="text-dark/60 text-sm">Last Updated: October 8, 2025</p>
					<p className="lead">
						This Privacy Policy outlines how Indivio collects, uses, and
						protects information when visitors access this website and utilize
						the services offered. Data privacy and security are fundamental to
						the platform.
					</p>

					<PolicyHeading>1. Information Collection</PolicyHeading>
					<p>
						Information may be collected in various ways when users interact
						with the platform:
					</p>
					<ul>
						<li>
							<strong>Personal Information:</strong> Name, school name, email
							address, and telephone number provided voluntarily through
							contact forms or service registration.
						</li>
						<li>
							<strong>Technical Information:</strong> IP address, browser type,
							operating system, and usage data automatically collected by
							servers when accessing the website.
						</li>
					</ul>

					<PolicyHeading>2. Information Usage</PolicyHeading>
					<p>
						Collected information enables the platform to deliver efficient and
						customized services. Information may be used to:
					</p>
					<ul>
						<li>Create and manage user accounts</li>
						<li>Send account and service-related communications</li>
						<li>Process payments and transactions</li>
						<li>Provide customer support and service updates</li>
						<li>
							Analyze usage patterns to enhance platform functionality and user
							experience
						</li>
					</ul>

					<PolicyHeading>3. Data Sharing</PolicyHeading>
					<p>
						Personal data is not sold, traded, or rented to third parties.
						Information may be shared with service providers that support
						platform operations, including cloud hosting (Google Cloud &
						Firebase), payment processing, and data analysis services. These
						providers are bound by confidentiality agreements.
					</p>

					<PolicyHeading>4. Data Security</PolicyHeading>
					<p>
						Administrative, technical, and physical security measures protect
						user information. The platform operates on Google Cloud
						infrastructure and implements industry-standard security protocols
						to safeguard data against unauthorized access.
					</p>

					<PolicyHeading>5. User Rights</PolicyHeading>
					<p>
						Under applicable Indian law, users have the right to access,
						correct, or request deletion of their personal data. Requests may be
						submitted using the contact information provided below.
					</p>

					<PolicyHeading>6. Cookies</PolicyHeading>
					<p>
						The website may use cookies and similar tracking technologies to
						enhance user experience and analyze site usage. Cookies are small
						data files stored on user devices that help improve site
						functionality.
					</p>

					<PolicyHeading>7. Policy Updates</PolicyHeading>
					<p>
						This Privacy Policy may be updated periodically. Changes will be
						reflected by updating the &quot;Last Updated&quot; date at the top of this
						document.
					</p>

					<PolicyHeading>8. Contact Information</PolicyHeading>
					<p>
						For questions or concerns regarding this Privacy Policy, contact:
					</p>
					<a
						href="mailto:hello@indivio.in"
						className="font-semibold text-primary hover:underline"
					>
						hello@indivio.in
					</a>
				</div>
			</div>
		</section>
	);
}
