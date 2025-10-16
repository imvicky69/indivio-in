import { db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';
import defaultSiteContent from './siteContent.json';
import { sanitizeFirestoreData } from './utils/firestore-helpers';

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

// For backward compatibility, we keep the default export as the local JSON content
export default typedContent;

// Also export the default content for direct access when needed
export { defaultSiteContent };
