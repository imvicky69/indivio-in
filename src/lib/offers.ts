import { db } from './firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import offersJson from './offers.json';
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

// Fetches all active offers from Firestore
export async function getOffers(): Promise<Offer[]> {
	try {
		// Check if Firebase is properly initialized
		if (!db) {
			console.error('Firebase DB is not initialized');
			console.log('Falling back to local JSON data for offers');
			return offersJson.filter((o) => o.active) as Offer[];
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

		// If no offers found in Firestore, use local JSON as fallback
		if (offers.length === 0) {
			console.log('No offers found in Firestore, using local JSON data');
			return offersJson.filter((o) => o.active) as Offer[];
		}

		return offers;
	} catch (error) {
		console.error('Error reading offers: ', error);
		console.log('Falling back to local JSON data after error');
		return offersJson.filter((o) => o.active) as Offer[];
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
