import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, doc, updateDoc, serverTimestamp } from 'firebase/firestore';

export async function GET(request: NextRequest) {
	try {
		const searchParams = request.nextUrl.searchParams;
		const orderId = searchParams.get('orderId');

		if (!orderId) {
			return NextResponse.json(
				{ success: false, message: 'Order ID is required' },
				{ status: 400 }
			);
		}

		// Call the backend API from server-side
		const apiBaseUrl =
			process.env.NEXT_PUBLIC_API_BASE_URL ||
			'https://asia-south1-indivio-in.cloudfunctions.net/api/api';

		const response = await fetch(
			`${apiBaseUrl}/payments/status/${orderId}?details=true`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);

		if (!response.ok) {
			const errorData = await response.json();
			return NextResponse.json(
				{
					success: false,
					message: errorData.message || 'Failed to check payment status',
				},
				{ status: response.status }
			);
		}

		const data = await response.json();

		// If payment is successful, update the Firestore transaction record
		try {
			if (db && data && data.data && (data.data.state === 'COMPLETED' || data.data.state === 'SUCCESS')) {
				// Find transaction by orderId and update
				const txQuery = query(collection(db, 'transactions'), where('orderId', '==', orderId));
				const snapshot = await getDocs(txQuery);
				for (const docSnap of snapshot.docs) {
					const docRef = doc(db, 'transactions', docSnap.id);
					await updateDoc(docRef, {
						status: 'COMPLETED',
						paymentDetails: data.data,
						updatedAt: serverTimestamp(),
					});
				}
			}
		} catch (fireErr) {
			console.error('Error updating transaction status in Firestore:', fireErr);
		}

		return NextResponse.json(data);
	} catch (error: any) {
		console.error('Error checking payment status:', error);
		return NextResponse.json(
			{
				success: false,
				message: error.message || 'Internal server error',
			},
			{ status: 500 }
		);
	}
}
