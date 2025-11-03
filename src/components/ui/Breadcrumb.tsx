// src/components/ui/Breadcrumb.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';

export function Breadcrumb() {
	const pathname = usePathname();
	
	// Don't show breadcrumb on homepage
	if (pathname === '/') return null;

	const paths = pathname.split('/').filter(Boolean);
	
	const pathLabels: Record<string, string> = {
		features: 'Features',
		pricing: 'Pricing',
		'why-indivio': 'Why Indivio',
		about: 'About Us',
		contact: 'Contact',
		faq: 'FAQ',
		checkout: 'Checkout',
		signup: 'Sign Up',
		'terms-and-conditions': 'Terms & Conditions',
		'privacy-policy': 'Privacy Policy',
		'refund-policy': 'Refund Policy',
		'shipping-policy': 'Shipping Policy',
	};

	return (
		<nav className="border-b border-border bg-muted/30 py-3">
			<div className="container mx-auto px-6">
				<ol className="flex items-center gap-2 text-sm">
					<li>
						<Link
							href="/"
							className="flex items-center gap-1 text-muted-foreground transition-colors hover:text-primary"
						>
							<Home className="h-4 w-4" />
							<span>Home</span>
						</Link>
					</li>
					{paths.map((path, index) => {
						const href = '/' + paths.slice(0, index + 1).join('/');
						const isLast = index === paths.length - 1;
						const label = pathLabels[path] || path.charAt(0).toUpperCase() + path.slice(1);

						return (
							<li key={path} className="flex items-center gap-2">
								<ChevronRight className="h-4 w-4 text-muted-foreground" />
								{isLast ? (
									<span className="font-semibold text-foreground">{label}</span>
								) : (
									<Link
										href={href}
										className="text-muted-foreground transition-colors hover:text-primary"
									>
										{label}
									</Link>
								)}
							</li>
						);
					})}
				</ol>
			</div>
		</nav>
	);
}
