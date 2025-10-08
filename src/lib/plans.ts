import plansData from './plans.json';
import offersData from './offers.json';

export interface Plan {
	id: string;
	name: string;
	price: number;
	setupFee?: number;
	originalPrice?: number;
	pricePeriod: string;
	description: string;
	short?: string;
	isMostPopular: boolean;
	features: string[];
	order: number;
}

export interface Offer {
	id: string;
	code: string;
	title: string;
	description: string;
}

// Fetches all pricing plans from local JSON, sorted by the 'order' field
export async function getPricingPlans(): Promise<Plan[]> {
	try {
		// Clone and sort by order to preserve the API shape
		const plans: Plan[] = (plansData as Plan[])
			.slice()
			.sort((a, b) => a.order - b.order);
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
