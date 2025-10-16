'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
	Twitter,
	Linkedin,
	Instagram,
	Mail,
	Phone,
	MapPin,
	ArrowRight,
} from 'lucide-react';
import { useState } from 'react';
import { saveNewsletterSubscription } from '@/lib/firebase';

// Data for navigation links, consistent with the Navbar for better UX
const navLinks = [
	{ href: '/features', label: 'Features' },
	{ href: '/pricing', label: 'Pricing' },
	{ href: '/why-indivio', label: 'Why Indivio ?' },
	{ href: '/faq', label: 'FAQ' },
	{ href: '/contact', label: 'Contact' },
];

// Data for social media links
const socialLinks = [
	{
		href: 'https://twitter.com/indivio_in',
		icon: <Twitter className="h-5 w-5" />,
		label: 'Twitter',
	},
	{
		href: 'https://linkedin.com/company/indivio-tech',
		icon: <Linkedin className="h-5 w-5" />,
		label: 'LinkedIn',
	},
	{
		href: 'https://instagram.com/indivio.in',
		icon: <Instagram className="h-5 w-5" />,
		label: 'Instagram',
	},
];

export function Footer() {
	const currentYear = new Date().getFullYear();
	const [email, setEmail] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitStatus, setSubmitStatus] = useState<{
		type: 'success' | 'error' | null;
		message: string;
	}>({
		type: null,
		message: '',
	});

	const handleSubscribe = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		setSubmitStatus({ type: null, message: '' });

		try {
			await saveNewsletterSubscription(email, 'footer');
			setSubmitStatus({
				type: 'success',
				message: "Thank you for subscribing! We'll be in touch soon.",
			});
			setEmail('');
		} catch (error) {
			console.error('Newsletter subscription error:', error);
			setSubmitStatus({
				type: 'error',
				message: 'Failed to subscribe. Please try again later.',
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<footer className="relative bg-gradient-to-br from-gray-900 to-gray-950 text-gray-100">
			{/* Top Wave Effect */}
			<div className="absolute inset-x-0 top-0 h-16 w-full overflow-hidden leading-[0]">
				<svg
					data-name="Layer 1"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 1200 120"
					preserveAspectRatio="none"
					className="relative block h-[60px] w-full"
				>
					<path
						d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
						className="fill-white"
					></path>
				</svg>
			</div>

			{/* Main Footer Content */}
			<div className="container mx-auto px-6 py-24">
				{/* Newsletter Section */}
				<div className="mb-16 rounded-xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-8 backdrop-blur-sm">
					<div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
						<div>
							<h3 className="font-display text-2xl font-bold text-white">
								Stay Updated
							</h3>
							<p className="mt-2 max-w-md text-gray-300">
								Subscribe to our newsletter for the latest updates, educational
								insights, and special offers.
							</p>
						</div>
						<form
							onSubmit={handleSubscribe}
							className="w-full max-w-md flex-shrink-0"
						>
							<div className="flex flex-col gap-3 sm:flex-row">
								<input
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									placeholder="Your email address"
									required
									disabled={isSubmitting}
									className="flex-grow rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white placeholder-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
								/>
								<button
									type="submit"
									disabled={isSubmitting}
									className="flex items-center justify-center rounded-lg bg-primary px-6 py-2 font-medium text-white transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:cursor-not-allowed disabled:bg-gray-600"
								>
									{isSubmitting ? 'Subscribing...' : 'Subscribe'}
								</button>
							</div>
							{submitStatus.type && (
								<p
									className={`mt-2 text-sm ${submitStatus.type === 'success' ? 'text-green-400' : 'text-red-400'}`}
								>
									{submitStatus.message}
								</p>
							)}
						</form>
					</div>
				</div>

				{/* Footer Columns */}
				<div className="grid grid-cols-1 gap-12 md:grid-cols-12">
					{/* Column 1: Brand Section */}
					<div className="md:col-span-4 lg:col-span-4">
						<Link href="/" className="mb-4 inline-flex items-center gap-3">
							<div className="rounded-full bg-white p-1 shadow-lg shadow-primary/20">
								<Image
									src="/fevicon.png"
									alt="Indivio Logo"
									width={48}
									height={48}
								/>
							</div>
							<span className="font-display text-2xl font-bold text-white">
								Indivio
							</span>
						</Link>
						<p className="mt-4 text-gray-400">
							Transforming educational institutions with professional websites
							and comprehensive management solutions at affordable prices.
						</p>

						{/* Social Icons with modern hover effects */}
						<div className="mt-6 flex items-center gap-4">
							{socialLinks.map((social) => (
								<a
									key={social.href}
									href={social.href}
									target="_blank"
									rel="noopener noreferrer"
									aria-label={`Visit our ${social.label} profile (opens in a new tab)`}
									className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-800 text-gray-400 transition-all hover:bg-primary hover:text-white hover:shadow-lg hover:shadow-primary/20"
								>
									{social.icon}
								</a>
							))}
						</div>
					</div>

					{/* Column 2: Quick Links */}
					<div className="md:col-span-2 lg:col-span-2">
						<h3 className="mb-6 text-lg font-bold text-white after:mt-2 after:block after:h-1 after:w-12 after:rounded-full after:bg-primary">
							Explore
						</h3>
						<ul className="space-y-3">
							{navLinks.map((link) => (
								<li key={link.href} className="group flex items-center">
									<ArrowRight className="mr-2 h-3 w-0 text-primary opacity-0 transition-all group-hover:w-3 group-hover:opacity-100" />
									<Link
										href={link.href}
										className="text-gray-300 transition-colors hover:text-primary"
									>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Column 3: Contact Info with icons */}
					<div className="md:col-span-3 lg:col-span-3">
						<h3 className="mb-6 text-lg font-bold text-white after:mt-2 after:block after:h-1 after:w-12 after:rounded-full after:bg-primary">
							Contact Us
						</h3>
						<ul className="space-y-4">
							<li className="flex items-start">
								<Phone className="mr-3 mt-1 h-5 w-5 flex-shrink-0 text-primary" />
								<a
									href="tel:+919211641566"
									className="text-gray-300 transition-colors hover:text-primary"
								>
									+91 9211641566
								</a>
							</li>
							<li className="flex items-start">
								<Mail className="mr-3 mt-1 h-5 w-5 flex-shrink-0 text-primary" />
								<a
									href="mailto:indivio.in@gmail.com"
									className="text-gray-300 transition-colors hover:text-primary"
								>
									indivio.in@gmail.com
								</a>
							</li>
							<li className="flex items-start">
								<MapPin className="mr-3 mt-1 h-5 w-5 flex-shrink-0 text-primary" />
								<span className="text-gray-300">
									3rd Floor, KARV, Thana Road
									<br />
									Nirmali, Supaul, Bihar 847452
								</span>
							</li>
						</ul>
					</div>

					{/* Column 4: Legal */}
					<div className="md:col-span-3 lg:col-span-3">
						<h3 className="mb-6 text-lg font-bold text-white after:mt-2 after:block after:h-1 after:w-12 after:rounded-full after:bg-primary">
							Legal
						</h3>
						<ul className="grid grid-cols-1 gap-3">
							<li className="group flex items-center">
								<ArrowRight className="mr-2 h-3 w-0 text-primary opacity-0 transition-all group-hover:w-3 group-hover:opacity-100" />
								<Link
									href="/terms-and-conditions"
									className="text-gray-300 transition-colors hover:text-primary"
								>
									Terms & Conditions
								</Link>
							</li>
							<li className="group flex items-center">
								<ArrowRight className="mr-2 h-3 w-0 text-primary opacity-0 transition-all group-hover:w-3 group-hover:opacity-100" />
								<Link
									href="/privacy-policy"
									className="text-gray-300 transition-colors hover:text-primary"
								>
									Privacy Policy
								</Link>
							</li>
							<li className="group flex items-center">
								<ArrowRight className="mr-2 h-3 w-0 text-primary opacity-0 transition-all group-hover:w-3 group-hover:opacity-100" />
								<Link
									href="/refund-policy"
									className="text-gray-300 transition-colors hover:text-primary"
								>
									Refund Policy
								</Link>
							</li>
							<li className="group flex items-center">
								<ArrowRight className="mr-2 h-3 w-0 text-primary opacity-0 transition-all group-hover:w-3 group-hover:opacity-100" />
								<Link
									href="/shipping-policy"
									className="text-gray-300 transition-colors hover:text-primary"
								>
									Shipping Policy
								</Link>
							</li>
						</ul>
					</div>
				</div>

				{/* Bottom Bar with subtle separator */}
				<div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-gray-800 pt-8 sm:flex-row">
					<p className="text-sm text-gray-400">
						© {currentYear} Indivio EdTech. All Rights Reserved.
					</p>
					<div className="flex gap-4 text-sm text-gray-400">
						<Link href="/faq" className="hover:text-primary">
							FAQ
						</Link>
						<span className="text-gray-700">|</span>
						<Link href="/contact" className="hover:text-primary">
							Support
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
}
