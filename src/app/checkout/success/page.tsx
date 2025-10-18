'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import { Button } from '@/components/ui/Button';

function SuccessPageContent() {
	const searchParams = useSearchParams();
	const orderId = searchParams.get('orderId');
	const [paymentStatus, setPaymentStatus] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [isPaymentSuccessful, setIsPaymentSuccessful] = useState<
		boolean | null
	>(null);
	const [isTestPayment, setIsTestPayment] = useState<boolean>(false);

	useEffect(() => {
		const verifyPayment = async () => {
			if (!orderId) {
				setIsLoading(false);
				return;
			}

			// Check if this is a test payment
			if (orderId.startsWith('TEST-')) {
				setIsTestPayment(true);
			}

			try {
				// Call the server-side API endpoint
				const response = await fetch(`/api/payments/status?orderId=${orderId}`);
				const result = await response.json();
				
				if (result.success) {
					const state = result.data.state;
					setPaymentStatus(state);

					// Check if payment is successful
					const isSuccessful = state === 'COMPLETED' || state === 'SUCCESS';
					setIsPaymentSuccessful(isSuccessful);
				} else {
					setIsPaymentSuccessful(false);
				}
			} catch (error) {
				console.error('Error verifying payment:', error);
				setIsPaymentSuccessful(false);
			} finally {
				setIsLoading(false);
			}
		};

		verifyPayment();
	}, [orderId]);

	return (
		<>
			{/* Fixed top padding to accommodate navbar */}
			<div className="h-20"></div>

			<div className="flex min-h-[calc(100vh-5rem)] items-center bg-gradient-to-b from-white to-muted/30">
				<div className="container mx-auto px-6 py-16">
					<div className="mx-auto max-w-2xl text-center">
						{isLoading ? (
							<div className="flex flex-col items-center justify-center">
								<div className="mb-6 h-24 w-24 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
								<h2 className="text-xl font-semibold">
									Verifying payment status...
								</h2>
							</div>
						) : isPaymentSuccessful ? (
							<>
								{/* Success Icon */}
								<div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
									<svg
										className="h-16 w-16 text-green-600"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M5 13l4 4L19 7"
										/>
									</svg>
								</div>

								<h1 className="mb-4 font-display text-3xl font-bold text-foreground sm:text-4xl">
									Payment Successful!
								</h1>

								<p className="mb-6 text-lg text-muted-foreground">
									{isTestPayment
										? 'Your test payment was processed successfully. This confirms your payment integration is working correctly.'
										: "Your account has been created successfully. We've sent you an email with your login details."}
								</p>
							</>
						) : (
							<>
								{/* Failed Icon */}
								<div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-red-100">
									<svg
										className="h-16 w-16 text-red-600"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M6 18L18 6M6 6l12 12"
										/>
									</svg>
								</div>

								<h1 className="mb-4 font-display text-3xl font-bold text-foreground sm:text-4xl">
									Payment {paymentStatus === 'PENDING' ? 'Pending' : 'Failed'}!
								</h1>

								<p className="mb-6 text-lg text-muted-foreground">
									{paymentStatus === 'PENDING'
										? "Your payment is still being processed. We'll update you once it's complete."
										: 'There was an issue processing your payment. Please try again or contact our support team for assistance.'}
								</p>
							</>
						)}

						{!isLoading && (
							<>
								{isPaymentSuccessful ? (
									isTestPayment ? (
										<div className="mb-8 rounded-lg border-2 border-green-200 bg-green-50 p-6 text-left">
											<h2 className="mb-4 text-xl font-semibold">
												Test Payment Details
											</h2>
											<p className="mb-4">
												Your test payment of ₹5 was processed successfully. This
												confirms that your payment integration is working
												correctly.
											</p>
											<div className="rounded-lg bg-white p-4">
												<p className="text-sm font-medium">
													Test Order Details:
												</p>
												{orderId && (
													<p className="mt-2 text-sm">
														Order Reference:{' '}
														<span className="font-semibold">{orderId}</span>
														{paymentStatus && (
															<span className="ml-2">
																(Status:{' '}
																<span className="font-semibold">
																	{paymentStatus}
																</span>
																)
															</span>
														)}
													</p>
												)}
											</div>

											<div className="mt-6 flex flex-col justify-center gap-4 sm:flex-row">
												<Button
													href="/pricing#test-payment"
													variant="secondary"
												>
													Try Another Test
												</Button>
												<Button href="/" variant="primary">
													Return to Homepage
												</Button>
											</div>
										</div>
									) : (
										<>
											<div className="mb-8 rounded-lg bg-muted/30 p-6 text-left">
												<h2 className="mb-4 text-xl font-semibold">
													What happens next?
												</h2>

												<ol className="space-y-3">
													<li className="flex items-start gap-3">
														<div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/20 text-sm font-medium text-primary">
															1
														</div>
														<p>
															Our team will review your order and contact you
															within 24 hours.
														</p>
													</li>

													<li className="flex items-start gap-3">
														<div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/20 text-sm font-medium text-primary">
															2
														</div>
														<p>
															We'll gather all necessary information and
															materials from you.
														</p>
													</li>

													<li className="flex items-start gap-3">
														<div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/20 text-sm font-medium text-primary">
															3
														</div>
														<p>
															Our design team will start working on your
															website.
														</p>
													</li>

													<li className="flex items-start gap-3">
														<div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/20 text-sm font-medium text-primary">
															4
														</div>
														<p>
															You can track progress and provide feedback
															through your admin dashboard.
														</p>
													</li>
												</ol>
											</div>

											<div className="mb-8 rounded-lg border border-primary/30 bg-primary/5 p-4">
												<p className="text-lg font-medium">
													You can now login at:{' '}
													<a
														href="https://admin.indivio.in"
														className="font-bold text-primary hover:underline"
													>
														admin.indivio.in
													</a>
												</p>
												{orderId && (
													<p className="mt-2 text-sm">
														Order Reference:{' '}
														<span className="font-semibold">{orderId}</span>
														{paymentStatus && (
															<span className="ml-2">
																(Status:{' '}
																<span className="font-semibold">
																	{paymentStatus}
																</span>
																)
															</span>
														)}
													</p>
												)}
											</div>

											<div className="flex flex-col justify-center gap-4 sm:flex-row">
												<Button href="/" variant="secondary">
													Return to Homepage
												</Button>
												<Button
													href="https://admin.indivio.in"
													variant="primary"
												>
													Go to Admin Dashboard
												</Button>
											</div>
										</>
									)
								) : (
									<>
										<div className="mb-8 rounded-lg border border-orange-300 bg-orange-50 p-4">
											{orderId && (
												<p className="text-sm">
													Order Reference:{' '}
													<span className="font-semibold">{orderId}</span>
													{paymentStatus && (
														<span className="ml-2">
															(Status:{' '}
															<span className="font-semibold">
																{paymentStatus}
															</span>
															)
														</span>
													)}
												</p>
											)}
										</div>

										<div className="flex flex-col justify-center gap-4 sm:flex-row">
											<Button href="/" variant="secondary">
												Return to Homepage
											</Button>
											{isTestPayment ? (
												<Button href="/pricing#test-payment" variant="primary">
													Try Again
												</Button>
											) : (
												<Button href="/checkout" variant="primary">
													Try Again
												</Button>
											)}
										</div>
									</>
								)}
							</>
						)}
					</div>
				</div>
			</div>
		</>
	);
}

function SuccessPageLoading() {
	return (
		<>
			<div className="h-20"></div>
			<div className="flex min-h-[calc(100vh-5rem)] items-center bg-gradient-to-b from-white to-muted/30">
				<div className="container mx-auto px-6 py-16">
					<div className="mx-auto max-w-2xl text-center">
						<div className="flex flex-col items-center justify-center">
							<div className="mb-6 h-24 w-24 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
							<h2 className="text-xl font-semibold">
								Loading payment status...
							</h2>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default function SuccessPage() {
	return (
		<Suspense fallback={<SuccessPageLoading />}>
			<SuccessPageContent />
		</Suspense>
	);
}
