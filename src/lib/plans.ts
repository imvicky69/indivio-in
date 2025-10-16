import { db } from './firebase';
import {
	collection,
	getDocs,
	doc,
	getDoc,
	query,
	where,
	orderBy,
} from 'firebase/firestore';
import { getOffers, Offer } from './offers';
import { sanitizeFirestoreData } from './utils/firestore-helpers';

export interface PlanIncluded {
	hosting: string;
	deployment: string;
	ssl: string;
	support: string;
	updates: string;
	bandwidth: string;
	storage: string;
}

export interface PlanAddOn {
	available: boolean;
	price: number | null;
	description: string;
}

export interface PlanAddOns {
	customDomain: PlanAddOn;
	customDesign: PlanAddOn;
}

export interface LaunchOffer {
	active: boolean;
	discount: number;
	discountedSetupFee: number;
	discountedPrice: number;
}

export interface Plan {
	launchOffer?: LaunchOffer;
	id: string;
	name: string;
	price: number;
	setupFee?: number;
	renewalPrice?: number;
	pricePeriod: string;
	badge?: string | null;
	tagline?: string;
	description: string;
	short?: string;
	isMostPopular: boolean;
	features: string[];
	included?: PlanIncluded;
	addOns?: PlanAddOns;
	bestFor?: string[];
	deliveryTime?: string;
	order: number;
}

// Offer type is now imported from './offers'

// Import the local plans JSON as fallback
import plansJson from './plans.json';

// Fetches all pricing plans from Firestore, sorted by the 'order' field
export async function getPricingPlans(): Promise<Plan[]> {
	try {
		console.log('Getting pricing plans from Firestore...');

		// Check if Firebase is properly initialized
		if (!db) {
			console.error('Firebase DB is not initialized');
			console.log('Falling back to local JSON data');
			return plansJson as Plan[];
		}

		console.log('Firebase DB is initialized, fetching plans...');

		// Reference to plans collection
		const plansCollection = collection(db, 'plans');
		console.log('Plans collection reference created');

		// Query plans ordered by 'order' field
		const plansQuery = query(plansCollection, orderBy('order', 'asc'));
		console.log('Executing query to Firestore...');

		const plansSnapshot = await getDocs(plansQuery);
		console.log(`Retrieved ${plansSnapshot.size} plans from Firestore`);

		// If no plans found in Firestore, use local JSON as fallback
		if (plansSnapshot.size === 0) {
			console.log('No plans found in Firestore, using local JSON data');
			return plansJson as Plan[];
		}

		// Convert snapshot to Plan objects and sanitize Firestore timestamps
		const plans: Plan[] = [];
		plansSnapshot.forEach((doc) => {
			// Get the data and properly sanitize it
			const rawData = doc.data();

			// Sanitize Firestore-specific objects like Timestamps
			const planData = sanitizeFirestoreData(rawData) as Plan;
			planData.id = doc.id; // Ensure ID is set
			plans.push(planData);
		});

		// Get active offers
		const offers = await getOffers();
		const activeLaunchOffer = offers.find(
			(offer) => offer.id === 'launch17' && offer.active
		);

		// Attach launch offer to plans if active
		if (activeLaunchOffer) {
			plans.forEach((plan) => {
				const discountPercent = activeLaunchOffer.discountPercent / 100;
				plan.launchOffer = {
					active: true,
					discount: activeLaunchOffer.discountPercent,
					discountedSetupFee: plan.setupFee
						? Math.round(plan.setupFee * (1 - discountPercent))
						: 0,
					discountedPrice: Math.round(plan.price * (1 - discountPercent)),
				};
			});
		}

		return plans;
	} catch (error) {
		console.error('Error reading pricing plans: ', error);
		console.log('Falling back to local JSON data after error');
		return plansJson as Plan[];
	}
}

// Fetches a single plan by its ID from Firestore
export async function getPlanById(id: string): Promise<Plan | null> {
	try {
		// Check if Firebase is properly initialized
		if (!db) {
			console.error('Firebase DB is not initialized');
			console.log('Falling back to local JSON data for plan by ID');
			const plan = plansJson.find((p) => p.id === id);
			return plan ? (plan as Plan) : null;
		}

		// Reference to the specific plan document
		const planRef = doc(db, 'plans', id);
		const planDoc = await getDoc(planRef);

		if (planDoc.exists()) {
			const rawData = planDoc.data();
			const plan = sanitizeFirestoreData(rawData) as Plan;
			plan.id = planDoc.id; // Ensure ID is set

			// Get active offers
			const offers = await getOffers();
			const activeLaunchOffer = offers.find(
				(offer) => offer.id === 'launch17' && offer.active
			);

			// Attach launch offer if active
			if (activeLaunchOffer) {
				const discountPercent = activeLaunchOffer.discountPercent / 100;
				plan.launchOffer = {
					active: true,
					discount: activeLaunchOffer.discountPercent,
					discountedSetupFee: plan.setupFee
						? Math.round(plan.setupFee * (1 - discountPercent))
						: 0,
					discountedPrice: Math.round(plan.price * (1 - discountPercent)),
				};
			}

			return plan;
		}

		return null;
	} catch (error) {
		console.error(`Error reading plan ${id}: `, error);
		console.log('Falling back to local JSON data after error');
		const plan = plansJson.find((p) => p.id === id);
		return plan ? (plan as Plan) : null;
	}
}

// getOffers is now imported from './offers'
