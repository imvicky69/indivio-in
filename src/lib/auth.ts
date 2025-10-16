import { getApps, initializeApp } from 'firebase/app';
import {
	createUserWithEmailAndPassword,
	sendEmailVerification,
	signInWithEmailAndPassword,
	signOut,
	sendPasswordResetEmail,
	updateProfile,
	getAuth,
	Auth,
} from 'firebase/auth';
import {
	doc,
	setDoc,
	getDoc,
	collection,
	addDoc,
	serverTimestamp,
	updateDoc,
	query,
	where,
	getDocs,
	getFirestore,
	Firestore,
} from 'firebase/firestore';
import { sanitizeFirestoreData } from './utils/firestore-helpers';

// Get Firebase instances
const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app =
	getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db = getFirestore(app);

export interface UserData {
	uid: string;
	email: string;
	displayName: string;
	role: 'admin' | 'user' | 'customer';
	schoolName?: string;
	planId?: string;
	planName?: string;
	subscriptionDetails?: {
		startDate: Date;
		endDate: Date;
		status: 'active' | 'pending' | 'cancelled' | 'expired';
		paymentId: string;
	};
}

export const createUserAccount = async (
	email: string,
	password: string,
	displayName: string,
	schoolName: string,
	planId: string,
	planName: string,
	paymentId: string
): Promise<UserData> => {
	try {
		console.log('Creating Firebase user with:', { email, displayName });

		// Check if auth is initialized
		if (!auth) {
			console.error('Firebase Auth not initialized');
			throw new Error('Firebase Auth is not initialized');
		}

		// Check if the email is already in use before attempting to create
		try {
			// We'll try to sign in with a random password to check if email exists
			// This will fail, but the error code tells us if the email is registered
			await signInWithEmailAndPassword(
				auth,
				email,
				'check_only_' + Math.random()
			);
		} catch (checkError: any) {
			// If error code is 'auth/user-not-found', email is not registered yet
			// If it's 'auth/wrong-password', email exists
			if (checkError.code === 'auth/wrong-password') {
				console.error('Email is already in use:', email);
				throw new Error('email-already-in-use');
			}
		}

		// Create the user account in Firebase Auth
		const userCredential = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		);
		const user = userCredential.user;

		console.log('Firebase user created successfully:', user.uid);

		// Update user profile
		await updateProfile(user, {
			displayName,
		});

		// Send email verification
		await sendEmailVerification(user);

		// Create a subscription end date (1 year from now)
		const startDate = new Date();
		const endDate = new Date();
		endDate.setFullYear(endDate.getFullYear() + 1);

		// Create user document in Firestore
		const userData: UserData = {
			uid: user.uid,
			email: user.email!,
			displayName,
			role: 'customer',
			schoolName,
			planId,
			planName,
			subscriptionDetails: {
				startDate,
				endDate,
				status: 'active',
				paymentId,
			},
		};

		console.log('Creating Firestore user document for:', user.uid);

		// Check if Firestore is initialized
		if (!db) {
			console.error('Firestore not initialized');
			throw new Error('Database connection error');
		}

		// First, make sure the users collection exists and we can access it
		try {
			// Try to create the user document
			await setDoc(doc(db, 'users', user.uid), {
				...userData,
				createdAt: serverTimestamp(),
				updatedAt: serverTimestamp(),
				// Adding plain timestamp fields alongside serverTimestamp for client use
				createdAtTime: new Date().toISOString(),
				updatedAtTime: new Date().toISOString(),
			});

			console.log('Firestore user document created successfully');
		} catch (firestoreError) {
			console.error(
				'Error creating user document in Firestore:',
				firestoreError
			);

			// Log more details about the error
			if (firestoreError instanceof Error) {
				console.error('Firestore error details:', firestoreError.message);
				if ('code' in firestoreError) {
					console.error('Firestore error code:', (firestoreError as any).code);
				}
			}

			// Still throw the error to be caught by the outer try/catch
			throw new Error(`Failed to create user document: ${firestoreError}`);
		}

		// Create a payment record
		try {
			const paymentData = {
				userId: user.uid,
				paymentId,
				amount: 0, // This will be updated in the checkout process
				planId,
				planName,
				status: 'pending',
				createdAt: serverTimestamp(),
				// Adding plain timestamp field alongside serverTimestamp for client use
				createdAtTime: new Date().toISOString(),
			};

			await addDoc(collection(db, 'payments'), paymentData);
			console.log('Payment record created successfully');
		} catch (paymentError) {
			console.error('Error creating payment record:', paymentError);
			// We can continue despite this error since the user account is created
		}

		return userData;
	} catch (error) {
		console.error('Error creating user account:', error);
		// Check if it's already an Error object
		if (error instanceof Error) {
			throw error;
		} else {
			throw new Error('Failed to create user account');
		}
	}
};

export const updatePaymentStatus = async (
	userId: string,
	paymentId: string,
	status: 'completed' | 'failed',
	amount: number
) => {
	try {
		console.log(
			`Updating payment status for paymentId: ${paymentId} to ${status}`
		);

		// Check if Firestore is initialized
		if (!db) {
			console.error('Firestore not initialized');
			return; // Skip this step rather than failing the whole process
		}

		// Find the payment document by paymentId
		const paymentsRef = collection(db, 'payments');
		const q = query(paymentsRef, where('paymentId', '==', paymentId));

		try {
			const querySnapshot = await getDocs(q);

			if (!querySnapshot.empty) {
				const paymentDoc = querySnapshot.docs[0];
				console.log(`Found payment document with ID: ${paymentDoc.id}`);

				// Try updating the payment document
				try {
					await updateDoc(paymentDoc.ref, {
						status,
						amount,
						updatedAt: serverTimestamp(),
						updatedAtTime: new Date().toISOString(), // Plain timestamp for client use
					});
					console.log('Payment document updated successfully');
				} catch (updateError) {
					console.error('Error updating payment document:', updateError);
					// We'll continue despite this error
				}

				// Only try updating user if payment is completed
				if (status === 'completed') {
					try {
						await updateDoc(doc(db, 'users', userId), {
							'subscriptionDetails.status': 'active',
							updatedAt: serverTimestamp(),
							updatedAtTime: new Date().toISOString(), // Plain timestamp for client use
						});
						console.log('User subscription status updated successfully');
					} catch (userUpdateError) {
						console.error(
							'Error updating user subscription status:',
							userUpdateError
						);
						// We'll continue despite this error
					}
				}
			} else {
				console.log(`No payment document found for paymentId: ${paymentId}`);
			}
		} catch (queryError) {
			console.error('Error querying payment document:', queryError);
			// We'll continue despite this error
		}
	} catch (error) {
		console.error('Error in updatePaymentStatus:', error);
		// Don't throw here - just log the error and continue
		// This function should never cause the whole process to fail
	}
};
