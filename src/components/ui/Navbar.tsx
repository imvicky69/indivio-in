'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function Navbar() {
	const navLinks = [
		{ href: '/features', label: 'Features' },
		{ href: '/pricing', label: 'Pricing & Plans' },
		{ href: '/why-indivio', label: 'Why Indivio?' },
		{ href: '/contact', label: 'Contact' },
	];

	const pathname = usePathname();
	const [hasScrolled, setHasScrolled] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false); // <-- State for mobile menu

	useEffect(() => {
		const handleScroll = () => {
			setHasScrolled(window.scrollY > 10);
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	// Close mobile menu on route change
	useEffect(() => {
		// Always close the mobile menu when the route changes. Do not read
		// isMenuOpen here to avoid adding it to the dependency array.
		setIsMenuOpen(false);
	}, [pathname]);

	const menuVariants = {
		hidden: { opacity: 0, y: -20 },
		visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
		exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
	};

	return (
		<header
			className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
				hasScrolled || isMenuOpen
					? 'bg-background/95 shadow-lg backdrop-blur-md'
					: 'bg-background/70 backdrop-blur-sm'
			}`}
		>
			<div className="container mx-auto flex items-center justify-between px-6 py-4">
				<Link href="/" className="flex items-center">
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img src="/logo.png" alt="Indivio Logo" className="h-10 w-auto" />
				</Link>

				{/* Desktop Navigation */}
				<nav className="hidden items-center gap-8 md:flex">
					{navLinks.map((link) => (
						<Link
							key={link.href}
							href={link.href}
							className={`relative text-foreground/80 transition-colors hover:text-foreground ${
								pathname === link.href ? 'font-semibold text-foreground' : ''
							}`}
						>
							{link.label}
							{link.href === '/pricing' && (
								<span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center">
									<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
									<span className="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
								</span>
							)}
						</Link>
					))}
				</nav>

				{/* Desktop CTA Button */}
				<div className="hidden items-center gap-3 md:flex">
					<Link
						href="/signup"
						className="rounded-full bg-primary px-6 py-2.5 text-center font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg"
					>
						Get Started
					</Link>
				</div>

				{/* Mobile Menu Button */}
				<button
					onClick={() => setIsMenuOpen(!isMenuOpen)}
					className="z-50 text-foreground md:hidden"
					aria-label="Toggle menu"
				>
					{isMenuOpen ? (
						<X className="h-6 w-6" />
					) : (
						<Menu className="h-6 w-6" />
					)}
				</button>
			</div>

			{/* Mobile Menu Panel */}
			<AnimatePresence>
				{isMenuOpen && (
					<motion.div
						variants={menuVariants}
						initial="hidden"
						animate="visible"
						exit="exit"
						className="absolute left-0 top-full w-full bg-background/95 shadow-lg backdrop-blur-sm md:hidden"
					>
						<nav className="flex flex-col items-center gap-6 px-6 py-8">
							{navLinks.map((link) => (
								<Link
									key={link.href}
									href={link.href}
									className={`text-lg transition-colors hover:text-primary ${
										pathname === link.href
											? 'font-semibold text-primary'
											: 'text-foreground/80'
									}`}
								>
									{link.label}
								</Link>
							))}
							<Link
								href="/signup"
								className="w-full max-w-xs rounded-full bg-primary px-6 py-3 text-center font-semibold text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl"
							>
								Get Started
							</Link>
						</nav>
					</motion.div>
				)}
			</AnimatePresence>
		</header>
	);
}
