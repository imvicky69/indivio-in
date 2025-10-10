// src/components/PlatformBenefits.tsx
import { SectionHeading } from '@/components/SectionHeading';
import { SlidersHorizontal, Zap, ShieldCheck, TrendingUp } from 'lucide-react';

// Data for the platform benefits
const benefitsData = [
	{
		icon: <SlidersHorizontal className="h-12 w-12 text-accent" />,
		title: 'Simple Content Dashboard',
		description:
			'No more waiting for a developer. From your admin panel, you can update text and upload photos in minutes. If you can use email, you can use Indivio.',
	},
	{
		icon: <Zap className="h-12 w-12 text-accent" />,
		title: 'Blazing-Fast Performance',
		description:
			'We use the latest React-based technology and a global hosting network to ensure your site loads instantly, which improves your ranking on Google.',
	},
	{
		icon: <ShieldCheck className="h-12 w-12 text-accent" />,
		title: 'All-Inclusive Hosting & Security',
		description:
			"Forget the technical headaches. We handle your domain name, secure hosting (with SSL), and all software updates. It's all included in your plan.",
	},
	{
		icon: <TrendingUp className="h-12 w-12 text-accent" />,
		title: 'SEO-Ready from Day One',
		description:
			'Our platform is built to be loved by Google, helping potential students and parents in your city find your institution more easily, leading to more inquiries.',
	},
];

export function PlatformBenefits() {
	return (
		// We reuse the gradient background for visual rhythm
		<section className="bg-hero-gradient py-20 sm:py-28">
			<div className="container mx-auto px-6">
				<SectionHeading>
					Effortless Management for All Educational Institutions
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
