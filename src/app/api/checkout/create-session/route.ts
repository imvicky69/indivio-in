import { NextRequest, NextResponse } from 'next/server';
import { createRazorpayOrder } from '@/lib/razorpay';
import { createUserAccount } from '@/lib/auth';
import { getPlanById } from '@/lib/plans';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: NextRequest) {
	try {
		const data = await request.json();
		const {
			planId,
			planName,
			setupFee,
			annualFee,
			totalAmount,
			schoolName,
			contactName,
			email,
			phone,
			address,
			city,
			state,
			pincode,
			password,
			receipt,
		} = data;

		if (!planId || !email || !password || !schoolName) {
			return NextResponse.json(
				{ message: 'Missing required fields' },
				{ status: 400 }
			);
		}

		// Verify the plan exists
		const plan = await getPlanById(planId);
		if (!plan) {
			return NextResponse.json(
				{ message: 'Invalid plan selected' },
				{ status: 400 }
			);
		}

		// Create user account
		const userId = uuidv4(); // Generate a temporary user ID for the payment flow

		try {
			// Create Razorpay order
			const order = await createRazorpayOrder(totalAmount, 'INR', receipt);

			return NextResponse.json({
				orderId: order.id,
				razorpayKeyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
				amount: totalAmount,
				currency: 'INR',
				userId,
				planId,
				planName,
				// We don't need to pass back user data that was already sent from the client
				// The checkout form will use the form data directly when verifying payment
			});
		} catch (error) {
			console.error('Error creating Razorpay order:', error);
			return NextResponse.json(
				{ message: 'Failed to create payment session' },
				{ status: 500 }
			);
		}
	} catch (error) {
		console.error('Checkout session error:', error);
		return NextResponse.json(
			{ message: 'Internal server error' },
			{ status: 500 }
		);
	}
}
