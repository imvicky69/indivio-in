import { initializeApp, getApps } from 'firebase/app';
import {
	getFirestore,
	collection,
	addDoc,
	serverTimestamp,
	Timestamp,
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Validate Firebase configuration
const requiredConfig = [
	'apiKey',
	'authDomain',
	'projectId',
	'storageBucket',
	'messagingSenderId',
	'appId',
];

const missingConfig = requiredConfig.filter(
	(key) => !firebaseConfig[key as keyof typeof firebaseConfig]
);

if (missingConfig.length > 0) {
	console.error('Missing Firebase configuration:', missingConfig);
	throw new Error(
		`Firebase configuration incomplete. Missing: ${missingConfig.join(', ')}`
	);
}

// Initialize Firebase with error handling
let app: ReturnType<typeof initializeApp> | undefined;
let db: ReturnType<typeof getFirestore> | undefined;
let auth: ReturnType<typeof getAuth> | undefined;

try {
	// Initialize Firebase (only if not already initialized)
	app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

	// Initialize Firestore
	db = getFirestore(app);

	// Initialize Firebase Authentication
	auth = getAuth(app);

	console.log('Firebase initialized successfully');
} catch (error) {
	console.error('Error initializing Firebase:', error);
	// Variables will remain undefined and functions will handle this case
}

// TypeScript Types
export interface BookingData {
	planId: string;
	planName: string;
	// School Details
	schoolName: string;
	schoolType: string;
	studentCount: string;
	address: string;
	city: string;
	state: string;
	pincode: string;
	// Contact Person
	contactName: string;
	designation: string;
	email: string;
	phone: string;
	alternatePhone?: string;
	// Requirements
	hasExistingWebsite: string;
	existingWebsiteUrl?: string;
	hasDomain: string;
	domainName?: string;
	specialRequirements?: string;
	preferredLaunchDate: string;
	// Pricing
	setupFee: number;
	annualFee: number;
	totalAmount: number;
	advanceAmount: number;
	discountApplied?: number;
	// Metadata
	status: 'pending' | 'paid' | 'completed' | 'cancelled';
	createdAt: Timestamp;
	updatedAt: Timestamp;
}

export interface ContactSubmission {
	name: string;
	email: string;
	phone?: string;
	schoolName?: string;
	message: string;
	subject?: string;
	status: 'new' | 'contacted' | 'converted' | 'closed';
	createdAt: Timestamp;
}

// Firestore Helper Functions

/**
 * Save a booking order to Firestore
 */
export async function saveBooking(
	bookingData: Omit<BookingData, 'createdAt' | 'updatedAt'>
): Promise<string> {
	try {
		// Verify Firestore is initialized
		if (!db) {
			throw new Error('Firebase is not initialized properly');
		}

		const docRef = await addDoc(collection(db, 'bookings'), {
			...bookingData,
			createdAt: serverTimestamp(),
			updatedAt: serverTimestamp(),
		});
		console.log('Booking saved with ID:', docRef.id);
		return docRef.id;
	} catch (error) {
		console.error('Error saving booking:', error);
		throw new Error('Failed to save booking. Please try again.');
	}
}

/**
 * Save a contact form submission to Firestore
 */
export async function saveContactSubmission(
	contactData: Omit<ContactSubmission, 'createdAt'>
): Promise<string> {
	try {
		// Verify Firebase is initialized properly
		if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
			throw new Error('Firebase configuration is incomplete');
		}

		// Verify Firestore is ready
		if (!db) {
			console.error('Firestore is not initialized');
			throw new Error('Database connection error');
		}

		// Add the document with retry logic
		let attempts = 0;
		const maxAttempts = 2;
		let lastError: unknown = null;

		while (attempts < maxAttempts) {
			try {
				// Ensure db is defined before using it (TypeScript safety)
				const firestore = db;
				if (!firestore) {
					throw new Error('Firestore instance is undefined');
				}

				const docRef = await addDoc(collection(firestore, 'contacts'), {
					...contactData,
					createdAt: serverTimestamp(),
				});
				console.log('Contact submission saved with ID:', docRef.id);
				return docRef.id;
			} catch (err) {
				lastError = err;
				attempts++;
				if (attempts < maxAttempts) {
					// Wait a bit before retrying
					await new Promise((resolve) => setTimeout(resolve, 1000));
				}
			}
		}

		// If we got here, all attempts failed
		console.error('Error saving contact after multiple attempts:', lastError);
		throw lastError;
	} catch (error) {
		console.error('Error saving contact submission:', error);
		throw error; // Pass the original error up the chain for better debugging
	}
}

export { db, auth };
