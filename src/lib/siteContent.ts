import { db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';
import { sanitizeFirestoreData } from './utils/firestore-helpers';

// Default fallback site content
const defaultSiteContent = {
	pricing: {
		title: 'Simple, Transparent Pricing',
		description: 'Choose the plan that fits your needs.',
		heroTitle: 'Simple, Transparent Pricing',
		heroSubtitle:
			'Choose the plan that fits your needs. All plans include hosting, security, and ongoing support.',
		sectionIntro:
			'Select the perfect plan for your educational institution. All plans include professional design, hosting, security, and ongoing support.',
		trustBadges: ['14-day free trial', 'No setup fees', 'Cancel anytime'],
		offerBanner: {
			enabled: false,
			text: 'Limited time offer: 20% off first month!',
		},
		faqs: [
			{
				question: 'What payment methods do you accept?',
				answer: 'We accept major credit/debit cards and online banking.',
			},
			{
				question: 'Can I upgrade my plan later?',
				answer:
					'Yes, you can upgrade at any time. The new pricing will be prorated.',
			},
			{
				question: 'Is there a free trial?',
				answer: 'We offer a 14-day trial on all plans.',
			},
		],
	},
	home: {
		heroTitle: 'Simplify School Management',
		heroDescription: 'All-in-one platform for educational institutions.',
		ctaText: 'Get Started',
	},
	features: {
		title: 'Powerful Features',
		description: 'Everything you need to manage your school effectively.',
	},
	contact: {
		title: 'Get In Touch',
		description: "We're here to help you get started.",
	},
};

// Import default content for type definition
export type PricingContent = typeof defaultSiteContent.pricing;

// Define content sections for type safety
export type SiteContentSections =
	| 'pricing'
	| 'home'
	| 'features'
	| 'contact'
	| string;

// Add index signature to make TypeScript happy with dynamic property access
interface SiteContentType {
	[key: string]: any;
	pricing: PricingContent;
}

// Cast the default content to our typed interface
const typedContent = defaultSiteContent as SiteContentType;

// Cache for content to reduce Firestore reads
let contentCache: Record<string, any> = {};
let lastFetchTime: Record<string, number> = {};
const CACHE_TTL = 60 * 1000; // 60 seconds cache TTL

/**
 * Get site content by section from Firestore
 * Falls back to local JSON if Firestore is not available or section not found
 */
export async function getSiteContentBySection<T>(
	section: SiteContentSections
): Promise<T> {
	try {
		// Check if Firebase is properly initialized
		if (!db) {
			console.error('Firebase DB is not initialized');
			return typedContent[section] as T;
		}

		// Check if we have a fresh cache
		const now = Date.now();
		if (
			contentCache[section] &&
			lastFetchTime[section] &&
			now - lastFetchTime[section] < CACHE_TTL
		) {
			return contentCache[section] as T;
		}

		// Get content from Firestore
		const contentRef = doc(db, 'siteContent', section);
		const contentSnap = await getDoc(contentRef);

		if (contentSnap.exists()) {
			const rawData = contentSnap.data();
			const content = sanitizeFirestoreData(rawData) as T;

			// Update cache
			contentCache[section] = content;
			lastFetchTime[section] = now;

			return content;
		} else {
			console.warn(
				`Site content section "${section}" not found in Firestore, using default content`
			);
			return typedContent[section] as T;
		}
	} catch (error) {
		console.error(
			`Error fetching site content for section "${section}":`,
			error
		);
		return typedContent[section] as T;
	}
}

/**
 * Async function to get all site content
 * This should be used at the page level to fetch all content at once
 */
export async function getAllSiteContent(): Promise<SiteContentType> {
	const content: Record<string, any> = {};

	// Get all sections from the default content
	for (const section of Object.keys(typedContent)) {
		content[section] = await getSiteContentBySection(section);
	}

	return content as SiteContentType;
}

// For backward compatibility, we keep the default export as the default content
export default typedContent;

// Also export the default content for direct access when needed
export { defaultSiteContent };
