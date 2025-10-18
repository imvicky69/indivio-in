import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

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

		// Persist a transaction record in Firestore (if available)
		let transactionDocId: string | null = null;
		try {
			if (db) {
				const docRef = await addDoc(collection(db, 'transactions'), {
					orderId: data.data?.orderId || paymentData.merchantOrderId || null,
					transactionId: data.data?.transactionId || null,
					amount: data.data?.amount || paymentData.amount || null,
					status: 'PENDING',
					redirectUrl: data.data?.redirectUrl || null,
					metadata: paymentData,
					createdAt: serverTimestamp(),
					updatedAt: serverTimestamp(),
				});
				transactionDocId = docRef.id;
			} else {
				console.warn(
					'Firestore `db` not initialized; skipping transaction save'
				);
			}
		} catch (fireErr) {
			console.error('Error saving transaction to Firestore:', fireErr);
			// continue - we don't want to fail the payment initiation if logging fails
		}

		// Attach transactionDocId for frontend reference
		return NextResponse.json({ ...data, transactionDocId });
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
