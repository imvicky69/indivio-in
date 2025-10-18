import {
	PhonePeInitiateResponse,
	PhonePeStatusResponse,
	UserRegistrationResponse,
} from '@/types/phonepe';

// Use proxy for local development to avoid CORS issues
// In development, use the local proxy defined in next.config.ts
// In production, use the actual API URL from environment variable
const API_BASE_URL =
	process.env.NODE_ENV === 'development'
		? '/api'
		: process.env.NEXT_PUBLIC_API_BASE_URL ||
			'https://asia-south1-indivio-in.cloudfunctions.net/api/api';

/**
 * Initiate a payment with PhonePe
 */
export async function initiatePhonePePayment(
	paymentData: any
): Promise<PhonePeInitiateResponse> {
	const response = await fetch(`${API_BASE_URL}/payments/initiate`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(paymentData),
	});

	if (!response.ok) {
		const errorData = await response.json();
		throw new Error(errorData.message || 'Failed to initiate payment');
	}

	return response.json();
}

/**
 * Check the status of a PhonePe payment
 */
export async function checkPhonePePaymentStatus(
	orderId: string
): Promise<PhonePeStatusResponse> {
	const response = await fetch(
		`${API_BASE_URL}/payments/status/${orderId}?details=true`,
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		}
	);

	if (!response.ok) {
		const errorData = await response.json();
		throw new Error(errorData.message || 'Failed to check payment status');
	}

	return response.json();
}

/**
 * Register a user after successful payment
 */
export async function registerUser(
	userData: any
): Promise<UserRegistrationResponse> {
	const response = await fetch(`${API_BASE_URL}/users/register`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(userData),
	});

	if (!response.ok) {
		const errorData = await response.json();
		throw new Error(errorData.message || 'Failed to register user');
	}

	return response.json();
}
