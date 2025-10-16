'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		console.error(error);
		setMounted(true);
	}, [error]);

	// Avoid hydration mismatch by only rendering animations client-side
	if (!mounted) {
		return null;
	}

	return (
		<div className="flex min-h-[60vh] w-full flex-col items-center justify-center px-4 py-16 md:py-24">
			<div className="container mx-auto max-w-3xl text-center">
				<motion.div
					initial={{ scale: 0.9, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					transition={{ duration: 0.5 }}
				>
					<h1 className="font-display text-4xl font-bold text-primary sm:text-5xl">
						Oops! Something went wrong
					</h1>
				</motion.div>

				<motion.p
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2, duration: 0.5 }}
					className="mx-auto mt-6 max-w-2xl text-lg text-gray-600"
				>
					We apologize for the inconvenience. An unexpected error has occurred
					on our end.
					{error.digest && (
						<span className="mt-2 block text-sm text-gray-500">
							Error ID: {error.digest}
						</span>
					)}
				</motion.p>

				<motion.div
					className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.4, duration: 0.5 }}
				>
					<Button
						href="#"
						onClick={(e) => {
							e.preventDefault();
							reset();
						}}
						variant="primary"
					>
						Try Again
					</Button>
					<Button href="/" variant="secondary">
						Back to Home
					</Button>
				</motion.div>
			</div>
		</div>
	);
}
