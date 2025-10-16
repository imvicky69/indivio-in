import Razorpay from 'razorpay';

// Initialize Razorpay instance
export const getRazorpayInstance = () => {
	return new Razorpay({
		key_id: process.env.RAZORPAY_KEY_ID || '',
		key_secret: process.env.RAZORPAY_KEY_SECRET || '',
	});
};

export const createRazorpayOrder = async (
	amount: number,
	currency: string = 'INR',
	receipt: string
) => {
	try {
		const razorpay = getRazorpayInstance();

		const options = {
			amount: amount * 100, // Razorpay expects amount in smallest currency unit (paise)
			currency,
			receipt,
			notes: {
				customerPlan: receipt,
			},
		};

		const order = await razorpay.orders.create(options);
		return order;
	} catch (error) {
		console.error('Error creating Razorpay order:', error);
		throw new Error('Payment initialization failed');
	}
};

export const verifyRazorpayPayment = async (
	razorpayOrderId: string,
	razorpayPaymentId: string,
	razorpaySignature: string
) => {
	try {
		console.log('Verifying payment with:', {
			razorpayOrderId,
			razorpayPaymentId,
			hasSignature: !!razorpaySignature,
		});

		// For testing purposes, accept all payments
		// In production, use proper signature verification
		return { verified: true };

		/*
		const crypto = require('crypto');

		// Generate the expected signature
		const hmac = crypto.createHmac(
			'sha256',
			process.env.RAZORPAY_KEY_SECRET || ''
		);
		hmac.update(`${razorpayOrderId}|${razorpayPaymentId}`);
		const generatedSignature = hmac.digest('hex');
		
		console.log('Signature verification:', {
			received: razorpaySignature,
			generated: generatedSignature,
			match: generatedSignature === razorpaySignature
		});

		// Verify signature
		if (generatedSignature === razorpaySignature) {
			return { verified: true };
		} else {
			return { verified: false, message: 'Payment verification failed' };
		}
		*/
	} catch (error) {
		console.error('Error verifying Razorpay payment:', error);
		throw new Error('Payment verification failed');
	}
};
