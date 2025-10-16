import { NextRequest, NextResponse } from 'next/server';
import { verifyRazorpayPayment } from '@/lib/razorpay';
import { createUserAccount, updatePaymentStatus } from '@/lib/auth';

export async function POST(request: NextRequest) {
	try {
		const {
			orderId,
			paymentId,
			signature,
			userId,
			email,
			password,
			schoolName,
			planId,
			planName,
			amount,
		} = await request.json();

		console.log('Received verification request with:', {
			orderId,
			paymentId,
			signature,
			userId,
			email,
			planId,
		});

		// Verify Razorpay payment
		const verificationResult = await verifyRazorpayPayment(
			orderId,
			paymentId,
			signature
		);

		if (!verificationResult.verified) {
			return NextResponse.json(
				{ message: 'Payment verification failed' },
				{ status: 400 }
			);
		}

		// Create user account with Firebase
		try {
			console.log('Creating user account for:', {
				email,
				schoolName,
				planId,
				planName,
			});

			if (!email || !password) {
				return NextResponse.json(
					{
						success: false,
						message: 'Missing required user information',
					},
					{ status: 400 }
				);
			}

			// Set default values for missing fields and clean input
			const safeSchoolName = schoolName?.trim() || 'Indivio Customer';
			const displayName = schoolName?.trim() || email.split('@')[0];
			const safePlanId = planId?.trim() || 'starter';
			const safePlanName = planName?.trim() || 'Starter';
			const safeEmail = email.trim().toLowerCase();

			console.log('Using sanitized values:', {
				safeEmail,
				displayName,
				safeSchoolName,
				safePlanId,
				safePlanName,
			});

			// Create the actual user account with better error handling
			const userData = await createUserAccount(
				safeEmail,
				password,
				displayName,
				safeSchoolName,
				safePlanId,
				safePlanName,
				paymentId
			);

			// Update payment status - but don't let it fail the whole process
			try {
				await updatePaymentStatus(
					userData.uid,
					paymentId,
					'completed',
					amount || 0 // Using the amount passed from client
				);
				console.log('Payment status updated successfully');
			} catch (paymentUpdateError) {
				console.error(
					'Error updating payment status, but continuing:',
					paymentUpdateError
				);
				// Continue despite this error - the user account is created
			}

			// Return success response even if payment status update failed
			return NextResponse.json({
				success: true,
				userId: userData.uid,
			});
		} catch (error) {
			console.error('Error creating user account:', error);

			// Capture detailed error information
			let errorMessage =
				'Failed to create user account. Please contact support.';
			let errorCode = 'unknown_error';
			let statusCode = 500;

			if (error instanceof Error) {
				console.error('Error details:', error.message, error.stack);

				// Check for specific Firebase auth errors
				if (error.message.includes('email-already-in-use')) {
					errorMessage =
						'An account with this email already exists. Please login or use a different email.';
					errorCode = 'email_exists';
					statusCode = 400;
				} else if (error.message.includes('Failed to create user document')) {
					errorMessage =
						'Your payment was successful, but we had trouble setting up your account. Please contact support for assistance.';
					errorCode = 'database_error';
					statusCode = 500;
				} else if (error.message.includes('Firebase Auth is not initialized')) {
					errorMessage =
						'Authentication service unavailable. Please try again later.';
					errorCode = 'auth_unavailable';
					statusCode = 503;
				} else if (error.message.includes('auth/weak-password')) {
					errorMessage =
						'Password is too weak. Please use a stronger password.';
					errorCode = 'weak_password';
					statusCode = 400;
				}
			}

			// Return error response with more details
			return NextResponse.json(
				{
					success: false,
					message: errorMessage,
					code: errorCode,
					details:
						process.env.NODE_ENV === 'development' ? String(error) : undefined,
				},
				{ status: statusCode }
			);
		}
	} catch (error) {
		console.error('Payment verification error:', error);

		// More detailed error response
		let errorMessage = 'Internal server error';
		if (error instanceof Error) {
			errorMessage = `Error processing payment: ${error.message}`;
		}

		return NextResponse.json(
			{
				success: false,
				message: errorMessage,
				error:
					process.env.NODE_ENV === 'development' ? String(error) : undefined,
			},
			{ status: 500 }
		);
	}
}
