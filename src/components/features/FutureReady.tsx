// src/components/FutureReady.tsx
import { SectionHeading } from '@/components/SectionHeading';
import {
	CreditCard,
	UserCheck,
	MessageSquare,
	CalendarClock,
	ClipboardCheck,
	Video,
	FileText,
	Users,
} from 'lucide-react';

// Data for the upcoming features - Indivio V2
const futureFeaturesData = [
	{
		icon: <ClipboardCheck className="h-10 w-10" />,
		title: 'Online Attendance System',
		description: 'Digital attendance tracking for students and staff',
	},
	{
		icon: <Users className="h-10 w-10" />,
		title: 'Virtual PTM',
		description: 'Parent-Teacher meetings made easy and accessible',
	},
	{
		icon: <FileText className="h-10 w-10" />,
		title: 'Online Assignments & Tests',
		description: 'Create, distribute, and grade assignments digitally',
	},
	{
		icon: <Video className="h-10 w-10" />,
		title: 'Live Online Classes',
		description: 'Integrated video learning for hybrid education',
	},
	{
		icon: <CreditCard className="h-10 w-10" />,
		title: 'Online Payment Gateway',
		description: 'Secure fee collection and financial management',
	},
	{
		icon: <UserCheck className="h-10 w-10" />,
		title: 'Student/Staff Management',
		description: 'Complete student and staff information system',
	},
	{
		icon: <MessageSquare className="h-10 w-10" />,
		title: 'Communication Portal',
		description: 'Unified communication between school, parents, and students',
	},
	{
		icon: <CalendarClock className="h-10 w-10" />,
		title: 'Digital Timetables & Schedules',
		description: 'Automated scheduling and calendar management',
	},
];

export function FutureReady() {
	return (
		<section className="bg-gradient-to-b from-background to-muted/30 py-20 sm:py-28">
			<div className="container mx-auto px-6">
				<div className="text-center">
					<div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-6 py-2 text-sm font-semibold text-primary">
						Indivio V2 - Coming Soon
					</div>
					<SectionHeading>
						Complete School Management Platform
					</SectionHeading>
					<p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground md:text-xl">
						Your Indivio website is just the beginning. Indivio V2 will transform
						every aspect of school operations with comprehensive digital solutions
						- from attendance to online classes. All in one affordable platform
						powered by modern technology.
					</p>
				</div>

				{/* Responsive grid for the teaser cards */}
				<div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
					{futureFeaturesData.map((feature, index) => (
						<div
							key={index}
							className="group relative overflow-hidden rounded-xl border-2 border-dashed border-primary/30 bg-card p-6 text-center transition-all duration-300 hover:border-primary/50 hover:shadow-lg"
						>
							{/* "Coming Soon" Badge */}
							<div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase text-white">
								Coming Soon
							</div>

							<div className="mb-4 flex justify-center text-primary/60 transition-colors group-hover:text-primary">
								{feature.icon}
							</div>
							<h3 className="mb-2 font-display text-lg font-bold text-foreground">
								{feature.title}
							</h3>
							<p className="text-sm text-muted-foreground">
								{feature.description}
							</p>
						</div>
					))}
				</div>

				<div className="mx-auto mt-16 max-w-3xl rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 p-8 text-center">
					<h3 className="mb-4 font-display text-2xl font-bold text-foreground">
						Get Ready for the Future of Education
					</h3>
					<p className="text-lg text-muted-foreground">
						Schools already using Indivio will get{' '}
						<span className="font-semibold text-primary">
							priority access, free trials, and exclusive benefits
						</span>{' '}
						when V2 launches. Join today to be part of India&apos;s education
						revolution.
					</p>
				</div>
			</div>
		</section>
	);
}
