import { db } from './firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { sanitizeFirestoreData } from './utils/firestore-helpers';

export interface Offer {
	id: string;
	code: string;
	title: string;
	description: string;
	discountPercent: number;
	appliesTo: string[];
	validUntil: string;
	active: boolean;
	badge: string;
	createdAt?: any;
	updatedAt?: any;
}

// Fallback offers in case Firestore is unavailable
const fallbackOffers: Offer[] = [
	{
		id: 'launch17',
		code: 'LAUNCH17',
		title: 'Launch Offer',
		description: '17% off on all plans during our launch period',
		discountPercent: 17,
		appliesTo: ['basic', 'standard', 'premium'],
		validUntil: '2026-01-01',
		active: true,
		badge: 'LIMITED TIME',
	},
	{
		id: 'edu25',
		code: 'EDU25',
		title: 'Education Discount',
		description: '25% off for educational institutions',
		discountPercent: 25,
		appliesTo: ['basic', 'standard'],
		validUntil: '2026-06-30',
		active: false,
		badge: 'EDUCATION',
	},
];

// Fetches all active offers from Firestore
export async function getOffers(): Promise<Offer[]> {
	try {
		// Check if Firebase is properly initialized
		if (!db) {
			console.error('Firebase DB is not initialized');
			console.log('Using fallback offers data');
			return fallbackOffers.filter((o) => o.active);
		}

		// Reference to offers collection
		const offersCollection = collection(db, 'offers');

		// Get only active offers by default
		const offersQuery = query(offersCollection, where('active', '==', true));
		const offersSnapshot = await getDocs(offersQuery);

		// Convert snapshot to Offer objects
		const offers: Offer[] = [];
		offersSnapshot.forEach((doc) => {
			// Get the data and sanitize it
			const rawData = doc.data();

			// Properly sanitize Firestore-specific objects
			const offerData = sanitizeFirestoreData(rawData) as Offer;
			offerData.id = doc.id; // Ensure ID is set
			offers.push(offerData);
		});

		// If no offers found in Firestore, use fallback data
		if (offers.length === 0) {
			console.log('No offers found in Firestore, using fallback data');
			return fallbackOffers.filter((o) => o.active);
		}

		return offers;
	} catch (error) {
		console.error('Error reading offers: ', error);
		console.log('Using fallback data after error');
		return fallbackOffers.filter((o) => o.active);
	}
}

// Get a specific offer by ID
export async function getOfferById(id: string): Promise<Offer | null> {
	try {
		// Check if Firebase is properly initialized
		if (!db) {
			console.error('Firebase DB is not initialized');
			throw new Error('Database connection error');
		}

		// Reference to offers collection with query
		const offersCollection = collection(db, 'offers');
		const offerQuery = query(offersCollection, where('id', '==', id));
		const offerSnapshot = await getDocs(offerQuery);

		if (!offerSnapshot.empty) {
			const offerDoc = offerSnapshot.docs[0];
			const rawData = offerDoc.data();
			const offer = sanitizeFirestoreData(rawData) as Offer;
			offer.id = offerDoc.id;
			return offer;
		}
		return null;
	} catch (error) {
		console.error(`Error reading offer ${id}: `, error);
		return null;
	}
}

// Get offer by code
export async function getOfferByCode(code: string): Promise<Offer | null> {
	try {
		// Check if Firebase is properly initialized
		if (!db) {
			console.error('Firebase DB is not initialized');
			throw new Error('Database connection error');
		}

		// Reference to offers collection with query
		const offersCollection = collection(db, 'offers');
		const offerQuery = query(
			offersCollection,
			where('code', '==', code.toUpperCase()),
			where('active', '==', true)
		);
		const offerSnapshot = await getDocs(offerQuery);

		if (!offerSnapshot.empty) {
			const offerDoc = offerSnapshot.docs[0];
			const rawData = offerDoc.data();
			const offer = sanitizeFirestoreData(rawData) as Offer;
			offer.id = offerDoc.id;
			return offer;
		}
		return null;
	} catch (error) {
		console.error(`Error reading offer with code ${code}: `, error);
		return null;
	}
}
