'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { Plan } from '@/lib/plans';
import {
	initiatePhonePePayment,
	checkPhonePePaymentStatus,
	registerUser,
} from '@/lib/phonepe';
import { PhonePeCheckout } from './PhonePeCheckout';

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
	const [paymentData, setPaymentData] = useState<any>(null);
	const [showPaymentIframe, setShowPaymentIframe] = useState(false);
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
			// Generate a unique order ID
			const orderId = `ORDER-${uuidv4().substring(0, 8)}`;
			const merchantUserId = `USER-${uuidv4().substring(0, 8)}`;

			// Prepare payment request data
			const paymentRequestData = {
				merchantOrderId: orderId,
				merchantUserId: merchantUserId,
				amount: totalAmount * 100, // Convert to paise (INR)
				callbackUrl: `${window.location.origin}/checkout/success`,
				// Additional information for your backend
				planId: plan.id,
				planName: plan.name,
				setupFee,
				annualFee,
				schoolName: data.schoolName,
				contactName: data.contactName,
				email: data.email,
				phone: data.phone,
				address: data.address,
				city: data.city,
				state: data.state,
				pincode: data.pincode,
				password: data.password, // Note: In production, use more secure methods
			};

			// Initiate payment through the PhonePe API
			const response = await initiatePhonePePayment(paymentRequestData);

			console.log('Payment initiated successfully', {
				orderId: response.data.orderId,
				transactionId: response.data.transactionId,
				redirectUrl: response.data.redirectUrl,
			});

			// Store user data with payment information in sessionStorage
			const userData = {
				orderId: response.data.orderId,
				transactionId: response.data.transactionId,
				merchantUserId,
				email: data.email,
				password: data.password,
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
			};

			sessionStorage.setItem('paymentData', JSON.stringify(userData));

			// Store payment data for iframe
			setPaymentData({
				tokenUrl: response.data.redirectUrl,
				userData,
			});

			// Show the PhonePe iframe
			setShowPaymentIframe(true);
			setIsSubmitting(false);
		} catch (err: any) {
			console.error('Error initiating payment:', err);
			setError(err.message || 'Something went wrong while initiating payment');
			setIsSubmitting(false);
		}
	};

	// Handle payment completion from PhonePe iframe
	const handlePaymentComplete = async (status: string) => {
		console.log('Payment completed with status:', status);

		if (!paymentData || !paymentData.userData) {
			setError('Payment information is missing. Please try again.');
			setShowPaymentIframe(false);
			return;
		}

		const { orderId } = paymentData.userData;

		try {
			// Check payment status with backend
			const statusData = await checkPhonePePaymentStatus(orderId);
			console.log('Payment status response:', statusData);

			if (statusData.success) {
				const paymentState = statusData.data.state || '';

				if (paymentState === 'COMPLETED' || paymentState === 'SUCCESS') {
					console.log('Payment verification successful', statusData);

					// Register user account with verified payment
					const userData = {
						...paymentData.userData,
						paymentStatus: paymentState,
						paymentId:
							statusData.data.transactionId ||
							paymentData.userData.transactionId,
					};

					try {
						const result = await registerUser(userData);
						// Clear payment data from session
						sessionStorage.removeItem('paymentData');

						// Redirect to success page
						router.push(
							`/checkout/success?orderId=${orderId}&userId=${result.userId || userData.merchantUserId}`
						);
					} catch (registerError: any) {
						setError(
							registerError.message ||
								'Failed to register account after payment'
						);
						setShowPaymentIframe(false);
					}
				} else if (paymentState === 'PENDING') {
					// Payment is pending
					router.push(`/checkout/success?orderId=${orderId}&status=pending`);
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
			console.error('Error checking payment status:', err);
			setError('Error verifying payment status. Please try again.');
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

	// Check for payment status on return from PhonePe (for redirect flow)
	useEffect(() => {
		const checkPaymentStatus = async () => {
			// Get any query parameters (could include payment status indicators)
			const orderId = searchParams.get('orderId');
			const status = searchParams.get('status');

			if (!orderId) return;

			// Get stored payment data
			const storedPaymentData = sessionStorage.getItem('paymentData');
			let parsedData = null;

			if (storedPaymentData) {
				parsedData = JSON.parse(storedPaymentData);
			}

			// Check if we returned from a payment flow
			if (orderId && (status || parsedData)) {
				try {
					// Check payment status with backend
					const statusData = await checkPhonePePaymentStatus(orderId);
					console.log('Payment status response on return:', statusData);

					if (statusData.success) {
						const paymentState = statusData.data.state || '';

						if (
							(paymentState === 'COMPLETED' || paymentState === 'SUCCESS') &&
							parsedData
						) {
							// If payment succeeded and we have user data, register the user
							try {
								const userData = {
									...parsedData,
									paymentStatus: paymentState,
									paymentId:
										statusData.data.transactionId || parsedData.transactionId,
								};

								const result = await registerUser(userData);
								sessionStorage.removeItem('paymentData');
							} catch (error) {
								console.error('Error registering user:', error);
							}
						}
					}
				} catch (err) {
					console.error('Error checking returning payment status:', err);
				}
			}
		};

		// Check payment status on component mount if we have query params
		checkPaymentStatus();
	}, [router, searchParams]);

	return (
		<div className="mx-auto max-w-4xl overflow-hidden rounded-xl bg-white shadow-lg">
			{showPaymentIframe && paymentData ? (
				<div className="p-8">
					<h2 className="mb-6 text-2xl font-bold">Complete Your Payment</h2>

					<div className="mb-4 flex items-center justify-between">
						<h3 className="text-lg font-medium">{plan.name} Plan</h3>
						<p className="text-lg font-bold">
							₹{totalAmount.toLocaleString('en-IN')}
						</p>
					</div>

					<PhonePeCheckout
						tokenUrl={paymentData.tokenUrl}
						onPaymentComplete={handlePaymentComplete}
						onClose={handleClosePaymentIframe}
					/>

					<button
						onClick={handleClosePaymentIframe}
						className="mt-6 w-full rounded-md border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50"
					>
						Cancel Payment
					</button>
				</div>
			) : (
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
								By proceeding, you agree to our Terms of Service & Privacy
								Policy
							</p>
							<p className="mt-2">
								Your account will be created after successful payment
							</p>
						</div>
					</form>
				</div>
			)}
		</div>
	);
}
