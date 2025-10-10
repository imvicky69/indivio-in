import { redirect } from 'next/navigation';

// Redirect /plans to /pricing since we've merged the pages
export default function PlansPage() {
	redirect('/pricing');
}
