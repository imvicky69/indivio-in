'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { Plan } from '@/lib/plans';

// Define the form schema
const checkoutFormSchema = z
	.object({
		schoolName: z.string().min(2, { message: 'School name is required' }),
		contactName: z.string().min(2, { message: 'Contact name is required' }),
		email: z.string().email({ message: 'Please enter a valid email address' }),
		phone: z.string().min(10, { message: 'Please enter a valid phone number' }),
		address: z.string().min(5, { message: 'Address is required' }),
		city: z.string().min(2, { message: 'City is required' }),
		state: z.string().min(2, { message: 'State is required' }),
		pincode: z.string().min(6, { message: 'Valid pincode is required' }),
		password: z
			.string()
			.min(8, { message: 'Password must be at least 8 characters long' }),
		confirmPassword: z
			.string()
			.min(8, { message: 'Please confirm your password' }),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ['confirmPassword'],
	});

type CheckoutFormData = z.infer<typeof checkoutFormSchema>;

interface CheckoutFormProps {
	plan: Plan;
}

export function CheckoutForm({ plan }: CheckoutFormProps) {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const router = useRouter();
	const searchParams = useSearchParams();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<CheckoutFormData>({
		resolver: zodResolver(checkoutFormSchema),
		defaultValues: {
			schoolName: '',
			contactName: '',
			email: '',
			phone: '',
			address: '',
			city: '',
			state: '',
			pincode: '',
			password: '',
			confirmPassword: '',
		},
	});

	// Calculate the final amount
	const setupFee = plan.launchOffer?.active
		? plan.launchOffer.discountedSetupFee
		: plan.setupFee || 0;

	const annualFee = plan.launchOffer?.active
		? plan.launchOffer.discountedPrice
		: plan.price;

	const totalAmount = setupFee + annualFee;

	const onSubmit = async (data: CheckoutFormData) => {
		setIsSubmitting(true);
		setError(null);

		try {
			// Generate a unique receipt ID
			const receipt = `RCP-${uuidv4().substring(0, 8)}`;

			// Create a server-side checkout session
			const response = await fetch('/api/checkout/create-session', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					planId: plan.id,
					planName: plan.name,
					setupFee,
					annualFee,
					totalAmount,
					schoolName: data.schoolName,
					contactName: data.contactName,
					email: data.email,
					phone: data.phone,
					address: data.address,
					city: data.city,
					state: data.state,
					pincode: data.pincode,
					password: data.password, // Note: In production, use more secure methods
					receipt,
				}),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(
					errorData.message || 'Failed to create checkout session'
				);
			}

			const sessionData = await response.json();

			// Initialize Razorpay
			const razorpay = new (window as any).Razorpay({
				key: sessionData.razorpayKeyId,
				amount: sessionData.amount * 100, // amount in paisa
				currency: 'INR',
				name: 'Indivio',
				description: `${plan.name} Plan Purchase`,
				order_id: sessionData.orderId,
				handler: async function (response: any) {
					try {
						console.log('Payment success, verifying with backend', {
							paymentId: response.razorpay_payment_id,
						});

						// Handle successful payment
						const paymentResult = await fetch('/api/checkout/verify-payment', {
							method: 'POST',
							headers: {
								'Content-Type': 'application/json',
							},
							body: JSON.stringify({
								orderId: sessionData.orderId,
								paymentId: response.razorpay_payment_id,
								signature: response.razorpay_signature,
								userId: sessionData.userId,
								email: data.email, // Using form data instead of sessionData
								password: data.password, // Using form data for more reliability
								schoolName: data.schoolName,
								contactName: data.contactName,
								phone: data.phone,
								address: data.address,
								city: data.city,
								state: data.state,
								pincode: data.pincode,
								planId: plan.id,
								planName: plan.name,
								amount: totalAmount,
							}),
						});

						console.log(
							'Payment verification response status:',
							paymentResult.status
						);

						if (paymentResult.ok) {
							const result = await paymentResult.json();
							console.log(
								'Verification successful, redirecting to success page',
								result
							);

							// Redirect to success page
							router.push(
								`/checkout/success?orderId=${sessionData.orderId}&userId=${result.userId || sessionData.userId}`
							);
						} else {
							// Get error details from response
							let errorMessage = 'Payment verification failed';
							try {
								const errorData = await paymentResult.json();
								console.error('Payment verification failed', errorData);

								// More detailed error logging
								console.error('Error details:', {
									status: paymentResult.status,
									statusText: paymentResult.statusText,
									data: errorData,
								});

								if (errorData.code === 'email_exists') {
									errorMessage =
										'An account with this email already exists. Please login or use a different email.';
								} else {
									errorMessage = errorData.message || errorMessage;
								}

								// If this is a payment success but account creation issue
								if (
									paymentResult.status === 500 &&
									errorData.code === 'database_error'
								) {
									errorMessage =
										'Your payment was successful, but we had trouble setting up your account. ' +
										'Our team has been notified and will contact you shortly to complete the setup.';
								}
							} catch (jsonError) {
								console.error('Failed to parse error response', jsonError);
							}

							setError(errorMessage);
							setIsSubmitting(false);
						}
					} catch (err) {
						console.error('Error in payment handler', err);
						setError('Error processing payment. Please try again.');
						setIsSubmitting(false);
					}
				},
				prefill: {
					name: data.contactName,
					email: data.email,
					contact: data.phone,
				},
				notes: {
					schoolName: data.schoolName,
					planId: plan.id,
					planName: plan.name,
				},
				theme: {
					color: '#0070f3',
				},
			});

			razorpay.open();
		} catch (err: any) {
			setError(err.message || 'Something went wrong');
			setIsSubmitting(false);
		}
	};

	// Load Razorpay script
	useEffect(() => {
		const script = document.createElement('script');
		script.src = 'https://checkout.razorpay.com/v1/checkout.js';
		script.async = true;
		document.body.appendChild(script);

		return () => {
			document.body.removeChild(script);
		};
	}, []);

	return (
		<div className="mx-auto max-w-4xl overflow-hidden rounded-xl bg-white shadow-lg">
			<div className="p-8">
				<h2 className="mb-6 text-2xl font-bold">Complete Your Purchase</h2>

				{/* Plan Summary */}
				<div className="mb-8 rounded-lg bg-muted/30 p-6">
					<h3 className="mb-4 text-xl font-semibold">{plan.name} Plan</h3>

					<div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
						<div>
							<p className="text-sm text-muted-foreground">Setup Fee</p>
							<p className="text-lg font-medium">
								{plan.launchOffer?.active && (
									<span className="mr-2 text-muted-foreground line-through">
										₹{plan.setupFee?.toLocaleString('en-IN') || 0}
									</span>
								)}
								₹{setupFee.toLocaleString('en-IN')}
							</p>
						</div>

						<div>
							<p className="text-sm text-muted-foreground">
								Annual Maintenance
							</p>
							<p className="text-lg font-medium">
								{plan.launchOffer?.active && (
									<span className="mr-2 text-muted-foreground line-through">
										₹{plan.price.toLocaleString('en-IN')}
									</span>
								)}
								₹{annualFee.toLocaleString('en-IN')}/year
							</p>
						</div>
					</div>

					<div className="border-t border-border pt-4">
						<div className="flex items-center justify-between">
							<p className="font-semibold">Total Amount</p>
							<p className="text-xl font-bold">
								₹{totalAmount.toLocaleString('en-IN')}
							</p>
						</div>

						{plan.launchOffer?.active && (
							<p className="mt-1 text-sm font-medium text-green-600">
								You save ₹
								{(
									(plan.setupFee || 0) +
									plan.price -
									totalAmount
								).toLocaleString('en-IN')}
								!
							</p>
						)}
					</div>
				</div>

				{/* Error display */}
				{error && (
					<div className="relative mb-6 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700">
						<strong className="font-bold">Error:</strong>
						<span className="block sm:inline"> {error}</span>
					</div>
				)}

				{/* Checkout Form */}
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
					<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
						<div>
							<label
								htmlFor="schoolName"
								className="mb-1 block text-sm font-medium text-foreground"
							>
								School/Institute Name *
							</label>
							<input
								type="text"
								id="schoolName"
								className="w-full rounded-md border border-border px-4 py-2"
								placeholder="Enter your school or institute name"
								{...register('schoolName')}
							/>
							{errors.schoolName && (
								<p className="mt-1 text-sm text-red-600">
									{errors.schoolName.message}
								</p>
							)}
						</div>

						<div>
							<label
								htmlFor="contactName"
								className="mb-1 block text-sm font-medium text-foreground"
							>
								Contact Person Name *
							</label>
							<input
								type="text"
								id="contactName"
								className="w-full rounded-md border border-border px-4 py-2"
								placeholder="Enter contact person name"
								{...register('contactName')}
							/>
							{errors.contactName && (
								<p className="mt-1 text-sm text-red-600">
									{errors.contactName.message}
								</p>
							)}
						</div>

						<div>
							<label
								htmlFor="email"
								className="mb-1 block text-sm font-medium text-foreground"
							>
								Email Address *
							</label>
							<input
								type="email"
								id="email"
								className="w-full rounded-md border border-border px-4 py-2"
								placeholder="Enter your email address"
								{...register('email')}
							/>
							{errors.email && (
								<p className="mt-1 text-sm text-red-600">
									{errors.email.message}
								</p>
							)}
						</div>

						<div>
							<label
								htmlFor="phone"
								className="mb-1 block text-sm font-medium text-foreground"
							>
								Phone Number *
							</label>
							<input
								type="tel"
								id="phone"
								className="w-full rounded-md border border-border px-4 py-2"
								placeholder="Enter your phone number"
								{...register('phone')}
							/>
							{errors.phone && (
								<p className="mt-1 text-sm text-red-600">
									{errors.phone.message}
								</p>
							)}
						</div>
					</div>

					<div>
						<label
							htmlFor="address"
							className="mb-1 block text-sm font-medium text-foreground"
						>
							Address *
						</label>
						<input
							type="text"
							id="address"
							className="w-full rounded-md border border-border px-4 py-2"
							placeholder="Enter your address"
							{...register('address')}
						/>
						{errors.address && (
							<p className="mt-1 text-sm text-red-600">
								{errors.address.message}
							</p>
						)}
					</div>

					<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
						<div>
							<label
								htmlFor="city"
								className="mb-1 block text-sm font-medium text-foreground"
							>
								City *
							</label>
							<input
								type="text"
								id="city"
								className="w-full rounded-md border border-border px-4 py-2"
								placeholder="City"
								{...register('city')}
							/>
							{errors.city && (
								<p className="mt-1 text-sm text-red-600">
									{errors.city.message}
								</p>
							)}
						</div>

						<div>
							<label
								htmlFor="state"
								className="mb-1 block text-sm font-medium text-foreground"
							>
								State *
							</label>
							<input
								type="text"
								id="state"
								className="w-full rounded-md border border-border px-4 py-2"
								placeholder="State"
								{...register('state')}
							/>
							{errors.state && (
								<p className="mt-1 text-sm text-red-600">
									{errors.state.message}
								</p>
							)}
						</div>

						<div>
							<label
								htmlFor="pincode"
								className="mb-1 block text-sm font-medium text-foreground"
							>
								Pincode *
							</label>
							<input
								type="text"
								id="pincode"
								className="w-full rounded-md border border-border px-4 py-2"
								placeholder="Pincode"
								{...register('pincode')}
							/>
							{errors.pincode && (
								<p className="mt-1 text-sm text-red-600">
									{errors.pincode.message}
								</p>
							)}
						</div>
					</div>

					<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
						<div>
							<label
								htmlFor="password"
								className="mb-1 block text-sm font-medium text-foreground"
							>
								Create Password *
							</label>
							<input
								type="password"
								id="password"
								className="w-full rounded-md border border-border px-4 py-2"
								placeholder="Create a password (min 8 characters)"
								{...register('password')}
							/>
							{errors.password && (
								<p className="mt-1 text-sm text-red-600">
									{errors.password.message}
								</p>
							)}
						</div>

						<div>
							<label
								htmlFor="confirmPassword"
								className="mb-1 block text-sm font-medium text-foreground"
							>
								Confirm Password *
							</label>
							<input
								type="password"
								id="confirmPassword"
								className="w-full rounded-md border border-border px-4 py-2"
								placeholder="Confirm your password"
								{...register('confirmPassword')}
							/>
							{errors.confirmPassword && (
								<p className="mt-1 text-sm text-red-600">
									{errors.confirmPassword.message}
								</p>
							)}
						</div>
					</div>

					<div className="pt-4">
						<button
							type="submit"
							disabled={isSubmitting}
							className="w-full rounded-md bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-70"
						>
							{isSubmitting
								? 'Processing...'
								: `Pay ₹${totalAmount.toLocaleString('en-IN')}`}
						</button>
					</div>

					<div className="text-center text-sm text-muted-foreground">
						<p>
							By proceeding, you agree to our Terms of Service & Privacy Policy
						</p>
						<p className="mt-2">
							Your account will be created after successful payment
						</p>
					</div>
				</form>
			</div>
		</div>
	);
}
