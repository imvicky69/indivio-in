// Changelog: Firestore Data Sanitization Fix

/\*

1. Created a robust sanitizeFirestoreData utility function
   - Handles Firestore Timestamp objects correctly
   - Recursively processes nested objects and arrays
   - Returns data that's safe for Next.js serialization

2. Updated data fetching modules to use the sanitizer:
   - plans.ts
   - offers.ts
   - siteContent.ts

3. Added documentation:
   - Updated README.md with information about the sanitizer
   - Created a test script (testFirestoreSanitizer.js)

4. Key improvements:
   - No more "Error serializing `/pricing` returned from `getServerSideProps`" errors
   - No data loss when timestamps are present in Firestore documents
   - Consistent date formatting in client-side components
   - Reduced code duplication by centralizing the sanitization logic
     \*/

// The sanitizeFirestoreData function is the core of this fix.
// It converts any Firestore-specific types to plain JavaScript
// types that can be safely serialized to JSON.

// NEXT STEPS:
// 1. Consider adding specific sanitizers for other Firestore types if needed
// 2. Add unit tests for the sanitizer function
// 3. Consider adding this to a middleware pattern for all Firestore data access
