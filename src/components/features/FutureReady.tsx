// src/components/FutureReady.tsx
import { SectionHeading } from '@/components/SectionHeading';
import {
	CreditCard,
	UserCheck,
	MessageSquare,
	CalendarClock,
} from 'lucide-react';

// Data for the upcoming features
const futureFeaturesData = [
	{
		icon: <CreditCard className="h-10 w-10" />,
		title: 'Online Payment Gateway',
	},
	{
		icon: <UserCheck className="h-10 w-10" />,
		title: 'Student/Member Management',
	},
	{
		icon: <MessageSquare className="h-10 w-10" />,
		title: 'Communication Portal',
	},
	{
		icon: <CalendarClock className="h-10 w-10" />,
		title: 'Digital Timetables & Schedules',
	},
];

export function FutureReady() {
	return (
		<section className="bg-white py-20 sm:py-28">
			<div className="container mx-auto px-6 text-center">
				<SectionHeading>Ready for Tomorrow&apos;s Education</SectionHeading>
				<p className="text-dark/70 mx-auto mt-4 max-w-3xl text-lg md:text-xl">
					Your Indivio website is the foundation. We are constantly building new
					modules to help you manage your entire educational institution,
					whether it&apos;s a school, college, or coaching center.
				</p>

				{/* Responsive grid for the teaser cards */}
				<div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
					{futureFeaturesData.map((feature, index) => (
						<div
							key={index}
							className="relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-6 text-center text-slate-500"
						>
							{/* "Coming Soon" Badge */}
							<div className="text-light absolute -top-3 rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase">
								Coming Soon
							</div>

							<div className="mb-4">{feature.icon}</div>
							<h3 className="font-display text-lg font-bold">
								{feature.title}
							</h3>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
