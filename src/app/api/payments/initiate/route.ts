import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
	try {
		const paymentData = await request.json();

		// Call the backend API from server-side
		const apiBaseUrl =
			process.env.NEXT_PUBLIC_API_BASE_URL ||
			'https://asia-south1-indivio-in.cloudfunctions.net/api/api';

		const response = await fetch(`${apiBaseUrl}/payments/initiate`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(paymentData),
		});

		if (!response.ok) {
			const errorData = await response.json();
			return NextResponse.json(
				{
					success: false,
					message: errorData.message || 'Failed to initiate payment',
				},
				{ status: response.status }
			);
		}

		const data = await response.json();
		return NextResponse.json(data);
	} catch (error: any) {
		console.error('Error initiating payment:', error);
		return NextResponse.json(
			{
				success: false,
				message: error.message || 'Internal server error',
			},
			{ status: 500 }
		);
	}
}
