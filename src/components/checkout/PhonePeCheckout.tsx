'use client';

import { useEffect, useState } from 'react';

interface PhonePeCheckoutProps {
	tokenUrl: string;
	onPaymentComplete: (status: string) => void;
	onClose: () => void;
}

declare global {
	interface Window {
		PhonePeCheckout: {
			transact: (options: any) => void;
			closePage: () => void;
		};
	}
}

export function PhonePeCheckout({
	tokenUrl,
	onPaymentComplete,
	onClose,
}: PhonePeCheckoutProps) {
	const [isScriptLoaded, setIsScriptLoaded] = useState(false);
	const [scriptError, setScriptError] = useState<string | null>(null);

	// Load PhonePe script
	useEffect(() => {
		if (typeof window !== 'undefined') {
			// Check if script already exists
			if (
				document.querySelector(
					'script[src="https://mercury.phonepe.com/web/bundle/checkout.js"]'
				)
			) {
				setIsScriptLoaded(true);
				return;
			}

			const script = document.createElement('script');
			script.src = 'https://mercury.phonepe.com/web/bundle/checkout.js';
			script.async = true;

			script.onload = () => {
				console.log('PhonePe checkout script loaded successfully');
				setIsScriptLoaded(true);
			};

			script.onerror = () => {
				console.error('Failed to load PhonePe checkout script');
				setScriptError(
					'Failed to load payment gateway. Please try again later.'
				);
			};

			document.body.appendChild(script);

			return () => {
				// Clean up if component unmounts before script loads
				document.body.removeChild(script);
			};
		}
	}, []);

	// Initialize PhonePe checkout when script is loaded
	useEffect(() => {
		if (isScriptLoaded && window.PhonePeCheckout && tokenUrl) {
			try {
				// Open the PhonePe checkout iframe
				window.PhonePeCheckout.transact({
					tokenUrl,
					callback: (response: any) => {
						console.log('PhonePe payment response:', response);

						// Handle payment status
						if (response && response.status) {
							onPaymentComplete(response.status);
						} else {
							onPaymentComplete('FAILED');
						}
					},
					type: 'IFRAME', // Use iframe mode
					options: {
						height: '500px',
						mode: 'responsive',
					},
				});
			} catch (error) {
				console.error('Error initializing PhonePe checkout:', error);
				setScriptError('Error initializing payment gateway. Please try again.');
			}
		}
	}, [isScriptLoaded, tokenUrl, onPaymentComplete]);

	// Close the PhonePe checkout when component unmounts
	useEffect(() => {
		return () => {
			if (window.PhonePeCheckout && isScriptLoaded) {
				try {
					window.PhonePeCheckout.closePage();
				} catch (error) {
					console.error('Error closing PhonePe checkout:', error);
				}
			}
		};
	}, [isScriptLoaded]);

	if (scriptError) {
		return (
			<div className="rounded-md border border-red-300 bg-red-50 p-4 text-center">
				<p className="text-red-700">{scriptError}</p>
				<button
					onClick={onClose}
					className="mt-4 rounded-md bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700"
				>
					Close
				</button>
			</div>
		);
	}

	if (!isScriptLoaded) {
		return (
			<div className="flex h-64 flex-col items-center justify-center">
				<div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
				<p className="mt-4 text-center">Loading payment gateway...</p>
			</div>
		);
	}

	return (
		<div className="relative min-h-[500px] w-full">
			{/* The iframe will be injected here by the PhonePe script */}
			<div id="phonepe-checkout-container" className="h-full w-full"></div>
		</div>
	);
}
