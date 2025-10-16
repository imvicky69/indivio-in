'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import SplitText from '@/components/SplitText';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	// Show a simple version during server-side rendering and hydration
	if (!mounted) {
		return (
			<div className="flex min-h-[70vh] w-full flex-col items-center justify-center px-4 py-16 md:py-32">
				<div className="container mx-auto max-w-5xl text-center">
					{/* Simple 404 display for SSR */}
					<h2 className="font-display text-8xl font-bold text-primary md:text-9xl">
						404
					</h2>
					<h1 className="mt-8 font-display text-3xl font-bold text-gray-900 sm:text-4xl md:text-5xl">
						Oops! Page Not Found
					</h1>
					<p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
						The page you're looking for doesn't exist or has been moved. Let's
						get you back on track!
					</p>
					<div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
						<Button href="/" variant="primary">
							Back to Home
						</Button>
						<Button href="/contact" variant="secondary">
							Contact Support
						</Button>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="flex min-h-[70vh] w-full flex-col items-center justify-center px-4 py-16 md:py-32">
			<div className="container mx-auto max-w-5xl text-center">
				{/* Animated 404 */}
				<motion.div
					initial={{ scale: 0.8, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
					className="relative mb-8"
				>
					<div className="relative h-48 w-full md:h-64">
						<Image
							src="/404-illustration.svg"
							alt="404 Illustration"
							fill
							className="object-contain"
							priority
							onError={(e) => {
								// Fallback if the image doesn't exist
								e.currentTarget.style.display = 'none';
							}}
						/>
					</div>
					{/* Fallback if the image doesn't exist */}
					<h2 className="font-display text-8xl font-bold text-primary md:text-9xl">
						404
					</h2>
				</motion.div>

				{/* Animated Title */}
				<SplitText
					text="Oops! Page Not Found"
					tag="h1"
					className="font-display text-3xl font-bold text-gray-900 sm:text-4xl md:text-5xl"
					delay={50}
					duration={0.6}
					from={{ opacity: 0, y: 30 }}
					to={{ opacity: 1, y: 0 }}
					splitType="words"
					threshold={0.1}
				/>

				{/* Description */}
				<motion.p
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.4, duration: 0.6 }}
					className="mx-auto mt-6 max-w-2xl text-lg text-gray-600"
				>
					The page you're looking for doesn't exist or has been moved. Let's get
					you back on track!
				</motion.p>

				{/* Animated Buttons */}
				<motion.div
					className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.6, duration: 0.6 }}
				>
					<Button href="/" variant="primary">
						Back to Home
					</Button>
					<Button href="/contact" variant="secondary">
						Contact Support
					</Button>
				</motion.div>

				{/* Helpful Links */}
				<motion.div
					className="mt-16 grid gap-6 text-center sm:grid-cols-2 md:grid-cols-4"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.8, duration: 0.6 }}
				>
					<div>
						<h3 className="mb-2 font-medium text-primary">Features</h3>
						<Button
							href="/features"
							variant="secondary"
							className="!py-2 text-sm"
						>
							Explore Features
						</Button>
					</div>
					<div>
						<h3 className="mb-2 font-medium text-primary">Pricing</h3>
						<Button
							href="/pricing"
							variant="secondary"
							className="!py-2 text-sm"
						>
							View Plans
						</Button>
					</div>
					<div>
						<h3 className="mb-2 font-medium text-primary">FAQ</h3>
						<Button href="/faq" variant="secondary" className="!py-2 text-sm">
							Get Answers
						</Button>
					</div>
					<div>
						<h3 className="mb-2 font-medium text-primary">Why Indivio</h3>
						<Button
							href="/why-indivio"
							variant="secondary"
							className="!py-2 text-sm"
						>
							Learn More
						</Button>
					</div>
				</motion.div>
			</div>
		</div>
	);
}
