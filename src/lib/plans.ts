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

// Default fallback plan in case Firestore is unavailable
const fallbackPlans: Plan[] = [
	{
		id: 'basic',
		name: 'Basic',
		price: 2999,
		setupFee: 1999,
		pricePeriod: 'month',
		description: 'Essential features for small schools',
		isMostPopular: false,
		features: [
			'School Website',
			'Admission System',
			'Basic Analytics',
			'Email Support',
		],
		order: 1,
	},
	{
		id: 'standard',
		name: 'Standard',
		price: 4999,
		setupFee: 2999,
		pricePeriod: 'month',
		badge: 'MOST POPULAR',
		description: 'Complete solution for growing institutions',
		isMostPopular: true,
		features: [
			'Everything in Basic',
			'Student Management',
			'Staff Management',
			'Attendance System',
			'Fee Management',
			'Priority Support',
		],
		order: 2,
	},
	{
		id: 'premium',
		name: 'Premium',
		price: 7999,
		setupFee: 4999,
		pricePeriod: 'month',
		description: 'Advanced features for larger institutions',
		isMostPopular: false,
		features: [
			'Everything in Standard',
			'Custom Branding',
			'API Access',
			'Advanced Analytics',
			'Dedicated Support',
			'Premium Hosting',
		],
		order: 3,
	},
];

// Fetches all pricing plans from Firestore, sorted by the 'order' field
export async function getPricingPlans(): Promise<Plan[]> {
	try {
		console.log('Getting pricing plans from Firestore...');

		// Check if Firebase is properly initialized
		if (!db) {
			console.error('Firebase DB is not initialized');
			console.log('Using fallback plans data');
			return fallbackPlans;
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

		// If no plans found in Firestore, use fallback data
		if (plansSnapshot.size === 0) {
			console.log('No plans found in Firestore, using fallback data');
			return fallbackPlans;
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
		console.log('Using fallback plans data after error');
		return fallbackPlans;
	}
}

// Fetches a single plan by its ID from Firestore
export async function getPlanById(id: string): Promise<Plan | null> {
	try {
		// Check if Firebase is properly initialized
		if (!db) {
			console.error('Firebase DB is not initialized');
			console.log('Using fallback plans data for plan by ID');
			const plan = fallbackPlans.find((p) => p.id === id);
			return plan ? plan : null;
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

		// If plan not found in Firestore, check fallback data
		const fallbackPlan = fallbackPlans.find((p) => p.id === id);
		return fallbackPlan ? fallbackPlan : null;
	} catch (error) {
		console.error(`Error reading plan ${id}: `, error);
		console.log('Using fallback plans data after error');
		const plan = fallbackPlans.find((p) => p.id === id);
		return plan ? plan : null;
	}
}

// getOffers is now imported from './offers'
