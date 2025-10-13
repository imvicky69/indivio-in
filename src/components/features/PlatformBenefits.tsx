// src/components/PlatformBenefits.tsx
import { SectionHeading } from '@/components/SectionHeading';
import { SlidersHorizontal, Zap, ShieldCheck, TrendingUp } from 'lucide-react';

// Data for the platform benefits
const benefitsData = [
	{
		icon: <SlidersHorizontal className="h-12 w-12 text-accent" />,
		title: 'Simple Content Dashboard',
		description:
			'No more waiting for a developer. From your admin panel, you can update notices, upload photos, and change homepage content in minutes. If you can use email, you can manage your school’s website.',
	},
	{
		icon: <Zap className="h-12 w-12 text-accent" />,
		title: 'Blazing-Fast Performance',
		description:
			'A slow website frustrates parents. We use the latest web technology and a global CDN to ensure your site loads instantly, keeping parents engaged and improving your Google ranking.',
	},
	{
		icon: <ShieldCheck className="h-12 w-12 text-accent" />,
		title: 'All-Inclusive Hosting & Security',
		description:
			"Forget the technical headaches of domain renewals, SSL certificates, and security updates. We handle all of it. It's all included in your simple annual plan, so you can focus on education.",
	},
	{
		icon: <TrendingUp className="h-12 w-12 text-accent" />,
		title: 'SEO-Ready from Day One',
		description:
			'Our platform is built to be loved by Google. This helps parents in your city who are searching for schools find your institution more easily, leading to a direct increase in admission inquiries.',
	},
];

export function PlatformBenefits() {
	return (
		// We reuse the gradient background for visual rhythm
		<section className="bg-hero-gradient py-20 sm:py-28">
			<div className="container mx-auto px-6">
				<SectionHeading>
					The All-in-One Platform Designed for Educational Success
				</SectionHeading>

				{/* Responsive grid for the benefit blocks */}
				<div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-x-12 gap-y-16 md:grid-cols-2">
					{benefitsData.map((benefit, index) => (
						<div
							key={index}
							className="flex flex-col items-start gap-6 text-center sm:flex-row sm:text-left"
						>
							<div className="mx-auto flex-shrink-0 sm:mx-0">
								{benefit.icon}
							</div>
							<div>
								<h3 className="text-dark mb-2 font-display text-xl font-bold">
									{benefit.title}
								</h3>
								<p className="text-dark/70">{benefit.description}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
