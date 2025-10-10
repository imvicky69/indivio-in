import plansData from './plans.json';
import offersData from './offers.json';

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
}

// Fetches all pricing plans from local JSON, sorted by the 'order' field
export async function getPricingPlans(): Promise<Plan[]> {
	try {
		// Clone and sort by order to preserve the API shape
		const plans: Plan[] = (plansData as Plan[])
			.slice()
			.sort((a, b) => a.order - b.order);

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
		return [];
	}
}

// Fetches a single plan by its ID (slug) from local JSON
export async function getPlanById(id: string): Promise<Plan | null> {
	try {
		const plan = (plansData as Plan[]).find((p) => p.id === id) || null;

		if (plan) {
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
		}

		return plan;
	} catch (error) {
		console.error(`Error reading plan ${id}: `, error);
		return null;
	}
}

// Fetches all active offers from local JSON
export async function getOffers(): Promise<Offer[]> {
	try {
		return offersData as Offer[];
	} catch (error) {
		console.error('Error reading offers: ', error);
		return [];
	}
}
