'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { v4 as uuidv4 } from 'uuid';
import { PhonePeCheckout } from '../checkout/PhonePeCheckout';

export function TestPaymentCard() {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [showPaymentIframe, setShowPaymentIframe] = useState(false);
	const [paymentData, setPaymentData] = useState<any>(null);
	const [error, setError] = useState<string | null>(null);
	const router = useRouter();

	const handleTestPayment = async () => {
		setIsSubmitting(true);
		setError(null);

		try {
			// Generate a unique order ID and user ID for testing
			const orderId = `TEST-${uuidv4().substring(0, 8)}`;
			const merchantUserId = `TEST-${uuidv4().substring(0, 8)}`;

			// Prepare test payment request data - 5 rupees
			const paymentRequestData = {
				merchantOrderId: orderId,
				merchantUserId: merchantUserId,
				amount: 500, // 5 rupees in paise (INR)
				callbackUrl: `${window.location.origin}/checkout/success`,
				planId: 'test-payment',
				planName: 'Test Payment',
				setupFee: 0,
				annualFee: 5,
				schoolName: 'Test School',
				contactName: 'Test User',
				email: 'test@example.com',
				phone: '1234567890',
				address: 'Test Address',
				city: 'Test City',
				state: 'Test State',
				pincode: '123456',
				password: 'test1234', // For test only
			};

			// Initiate payment through the server-side API endpoint
			const response = await fetch('/api/payments/initiate', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(paymentRequestData),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || 'Failed to initiate payment');
			}

			const result = await response.json();

			console.log('Test payment initiated successfully', {
				orderId: result.data.orderId,
				transactionId: result.data.transactionId,
				redirectUrl: result.data.redirectUrl,
			});

			// Store test data with payment information in sessionStorage
			const userData = {
				orderId: result.data.orderId,
				transactionId: result.data.transactionId,
				merchantUserId,
				email: 'test@example.com',
				password: 'test1234',
				schoolName: 'Test School',
				contactName: 'Test User',
				phone: '1234567890',
				address: 'Test Address',
				city: 'Test City',
				state: 'Test State',
				pincode: '123456',
				planId: 'test-payment',
				planName: 'Test Payment',
				amount: 5,
			};

			sessionStorage.setItem('paymentData', JSON.stringify(userData));

			// Store payment data for iframe
			setPaymentData({
				tokenUrl: result.data.redirectUrl,
				userData,
			});

			// Show the PhonePe iframe
			setShowPaymentIframe(true);
			setIsSubmitting(false);
		} catch (err: any) {
			console.error('Error initiating test payment:', err);
			setError(
				err.message || 'Something went wrong while initiating test payment'
			);
			setIsSubmitting(false);
		}
	};

	// Handle payment completion from PhonePe iframe
	const handlePaymentComplete = async (status: string) => {
		console.log('Test payment completed with status:', status);

		if (!paymentData || !paymentData.userData) {
			setError('Payment information is missing. Please try again.');
			setShowPaymentIframe(false);
			return;
		}

		const { orderId } = paymentData.userData;

		try {
			// Call server-side endpoint to verify payment status
			const response = await fetch(`/api/payments/status?orderId=${orderId}`);
			const statusData = await response.json();

			console.log('Test payment status verified:', statusData);

			if (statusData.success) {
				const paymentState = statusData.data.state || '';

				if (paymentState === 'COMPLETED' || paymentState === 'SUCCESS') {
					// Payment successful - redirect to success page
					router.push(
						`/checkout/success?orderId=${orderId}&status=${paymentState}`
					);
				} else if (paymentState === 'PENDING') {
					// Payment is pending
					router.push(`/checkout/success?orderId=${orderId}&status=PENDING`);
				} else {
					// Payment failed or was cancelled
					setError(`Payment was not successful. Status: ${paymentState}`);
					setShowPaymentIframe(false);
				}
			} else {
				// API call succeeded but payment verification failed
				setError(statusData.message || 'Payment verification failed');
				setShowPaymentIframe(false);
			}
		} catch (err: any) {
			console.error('Error verifying test payment:', err);
			setError('Error verifying payment. Please try again.');
			setShowPaymentIframe(false);
		}
	};

	// Handle closing the PhonePe iframe
	const handleClosePaymentIframe = () => {
		setShowPaymentIframe(false);
		setIsSubmitting(false);
		setError(null);
		setPaymentData(null);
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className="mx-auto my-8 max-w-md overflow-hidden rounded-xl border-2 border-dashed border-orange-300 bg-orange-50 p-6 text-center"
		>
			{showPaymentIframe && paymentData ? (
				<div>
					<h3 className="mb-4 text-lg font-semibold text-gray-800">
						Complete Test Payment (₹5)
					</h3>

					<PhonePeCheckout
						tokenUrl={paymentData.tokenUrl}
						onPaymentComplete={handlePaymentComplete}
						onClose={handleClosePaymentIframe}
					/>

					<button
						onClick={handleClosePaymentIframe}
						className="mt-4 w-full rounded-md border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-50"
					>
						Cancel Payment
					</button>
				</div>
			) : (
				<>
					<div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6 text-orange-600"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
							/>
						</svg>
					</div>

					<h3 className="mb-2 text-lg font-semibold text-gray-800">
						Payment Integration Test
					</h3>
					<p className="mb-4 text-sm text-gray-600">
						Make a ₹5 test payment to verify the payment flow without creating a
						real account.
					</p>

					{error && (
						<div className="mb-4 rounded border border-red-400 bg-red-100 px-3 py-2 text-sm text-red-700">
							{error}
						</div>
					)}

					<button
						onClick={handleTestPayment}
						disabled={isSubmitting}
						className="w-full rounded-md bg-orange-500 px-8 py-3 font-medium text-white transition-colors hover:bg-orange-600 disabled:opacity-70"
					>
						{isSubmitting ? 'Processing...' : 'Make ₹5 Test Payment'}
					</button>

					<p className="mt-3 text-xs text-gray-500">
						For developers & testing purposes only
					</p>
				</>
			)}
		</motion.div>
	);
}
