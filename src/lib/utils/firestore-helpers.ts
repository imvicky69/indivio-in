// Helper function to sanitize Firestore data for Next.js serialization
export function sanitizeFirestoreData(data: any): any {
	if (data === null || data === undefined) {
		return data;
	}

	// Handle arrays
	if (Array.isArray(data)) {
		return data.map((item) => sanitizeFirestoreData(item));
	}

	// Handle objects
	if (typeof data === 'object') {
		// Handle Firestore Timestamp objects
		if (data.seconds !== undefined && data.nanoseconds !== undefined) {
			// Convert Firestore timestamp to ISO string
			return new Date(data.seconds * 1000).toISOString();
		}

		// Handle other objects by recursively sanitizing their properties
		const result: Record<string, any> = {};
		for (const key in data) {
			if (Object.prototype.hasOwnProperty.call(data, key)) {
				result[key] = sanitizeFirestoreData(data[key]);
			}
		}
		return result;
	}

	// Return primitives as is
	return data;
}
