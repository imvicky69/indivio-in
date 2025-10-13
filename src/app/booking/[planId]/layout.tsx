import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Book Your School Website Plan | Indivio',
	description:
		'Complete your booking for a professional school website with Indivio. Choose your plan and get started with your digital transformation.',
};

// Revalidate every 1 minute (60 seconds)
export const revalidate = 60;

export default function BookingLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return children;
}
