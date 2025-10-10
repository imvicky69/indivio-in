// src/components/IncludedFeatures.tsx
import { SectionHeading } from '@/components/SectionHeading';
import {
	LayoutDashboard,
	BookOpen,
	ClipboardEdit,
	Users,
	Award,
	Image as ImageIcon,
	CalendarDays,
	Smartphone,
} from 'lucide-react';

// Data array for all the included features. This makes it easy to manage.
const featuresList = [
	{
		icon: <LayoutDashboard className="h-10 w-10 text-accent" />,
		title: 'Dynamic Homepage',
		description:
			'Make a powerful first impression. Easily update notices, welcome messages, and hero images from your dashboard.',
	},
	{
		icon: <BookOpen className="h-10 w-10 text-accent" />,
		title: 'About & Vision Pages',
		description:
			"Share your institution's unique story, history, and mission to connect with prospective students and parents.",
	},
	{
		icon: <ClipboardEdit className="h-10 w-10 text-accent" />,
		title: 'Admissions Portal',
		description:
			'Streamline your intake process with a dedicated admissions page for schools, colleges, or coaching centers.',
	},
	{
		icon: <Users className="h-10 w-10 text-accent" />,
		title: 'Faculty Directory',
		description:
			'Showcase your experienced and dedicated staff, teachers, or instructors with professional profiles and photos.',
	},
	{
		icon: <Award className="h-10 w-10 text-accent" />,
		title: 'Success Stories Grid',
		description:
			'Celebrate achievements. Display photos and results of your top students, successful alumni, or examination results.',
	},
	{
		icon: <ImageIcon className="h-10 w-10 text-accent" />,
		title: 'Photo & Video Gallery',
		description:
			'Bring your campus to life. Easily upload and manage albums for events, functions, competitions, and activities.',
	},
	{
		icon: <CalendarDays className="h-10 w-10 text-accent" />,
		title: 'Events & News Calendar',
		description:
			'Keep everyone informed with a simple, up-to-date calendar of upcoming events, classes, workshops, and news.',
	},
	{
		icon: <Smartphone className="h-10 w-10 text-accent" />,
		title: 'Mobile-First Design',
		description:
			'Your website will look perfect and be easy to use on any device—from a smartphone to a desktop computer.',
	},
];

export function IncludedFeatures() {
	return (
		<section className="bg-white py-20 sm:py-28">
			<div className="container mx-auto px-6">
				<SectionHeading>
					Everything Your Educational Institute Needs Online
				</SectionHeading>

				{/* 
          A responsive grid that shows 1 column on mobile, 2 on tablets, 
          and 4 on larger desktops for a balanced look.
        */}
				<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
					{featuresList.map((feature, index) => (
						<div
							key={index}
							className="flex flex-col items-start rounded-xl border border-slate-200 bg-slate-50 p-6 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:border-primary hover:shadow-lg"
						>
							<div className="mb-4">{feature.icon}</div>
							<h3 className="text-dark mb-2 font-display text-lg font-bold">
								{feature.title}
							</h3>
							<p className="text-dark/70 text-sm">{feature.description}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
