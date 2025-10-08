'use client';

import { Globe, Server, Gauge, Shield, Award, Code } from 'lucide-react';

export function ServiceHighlights() {
	const highlights = [
		{
			title: 'Professional School Website',
			description:
				'Get a professionally designed website optimized for educational institutions with all the essential pages and features.',
			icon: <Globe className="h-8 w-8 text-blue-500" />,
		},
		{
			title: 'Hassle-Free Hosting',
			description:
				"We take care of reliable hosting, SSL certificates, security updates, and technical maintenance so you don't have to.",
			icon: <Server className="h-8 w-8 text-green-500" />,
		},
		{
			title: 'Fast Performance',
			description:
				'Optimized code and content delivery ensures your website loads quickly and works seamlessly on all devices.',
			icon: <Gauge className="h-8 w-8 text-amber-500" />,
		},
		{
			title: 'Secure & Reliable',
			description:
				'Built with security best practices, regular backups, and protection against common vulnerabilities.',
			icon: <Shield className="h-8 w-8 text-red-500" />,
		},
		{
			title: 'SEO Optimized',
			description:
				'Built with search engine best practices to help parents and prospective students find your school online.',
			icon: <Award className="h-8 w-8 text-purple-500" />,
		},
		{
			title: 'Easy Content Management',
			description:
				'User-friendly dashboard lets you update content, announcements, photos, and more without technical skills.',
			icon: <Code className="h-8 w-8 text-indigo-500" />,
		},
	];

	return (
		<section className="bg-white py-16">
			<div className="container mx-auto px-6">
				<div className="mb-12 text-center">
					<h2 className="font-display text-3xl font-bold">All Plans Include</h2>
					<p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
						Every school website we build comes with these essential features
						and services, regardless of which plan you choose.
					</p>
				</div>

				<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
					{highlights.map((highlight, index) => (
						<div
							key={index}
							className="rounded-lg border border-gray-100 bg-gray-50 p-6 transition-shadow hover:shadow-md"
						>
							<div className="mb-4">{highlight.icon}</div>
							<h3 className="mb-2 text-xl font-semibold">{highlight.title}</h3>
							<p className="text-gray-600">{highlight.description}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
