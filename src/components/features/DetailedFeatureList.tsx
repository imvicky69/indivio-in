'use client';

import { SectionHeading } from '@/components/SectionHeading';
import { motion } from 'framer-motion';
import {
	CheckCircle2,
	Settings,
	UsersRound,
	BookOpen,
	FileText,
	CalendarDays,
	MessageCircle,
} from 'lucide-react';

// Category based feature list
const detailedFeatures = [
	{
		category: 'Core Website Features',
		icon: <Settings className="h-8 w-8 text-accent" />,
		features: [
			'Professional homepage with slider',
			'About & vision pages',
			'Faculty directory with profiles',
			'Photo & video galleries',
			'School events calendar',
			'Admissions portal',
			'Contact form with location map',
			'Notices & announcements section',
			'Mobile-responsive design',
			'SEO optimization',
		],
	},
	{
		category: 'Administrative Tools',
		icon: <UsersRound className="h-8 w-8 text-accent" />,
		features: [
			'Easy content management system',
			'User-friendly admin dashboard',
			'Multi-user admin access',
			'Role-based permissions',
			'Content scheduling',
			'File and media library',
			'Content version history',
			'Analytics integration',
		],
	},
	{
		category: 'Academic Showcase',
		icon: <BookOpen className="h-8 w-8 text-accent" />,
		features: [
			'Academic toppers grid',
			'Department pages',
			'Curriculum information',
			'Academic calendar',
			'Exam schedules',
			'Results publication system',
			'Awards & achievements showcase',
		],
	},
	{
		category: 'Parent & Student Resources',
		icon: <FileText className="h-8 w-8 text-accent" />,
		features: [
			'Downloadable forms & documents',
			'Uniform & book list information',
			'Fee structure display',
			'School timing & schedules',
			'Transportation routes',
			'Holiday calendar',
			'Study resources (optional)',
		],
	},
	{
		category: 'Coming Soon: Institution Management',
		icon: <CalendarDays className="h-8 w-8 text-accent" />,
		features: [
			'Student information system',
			'Online fee payment gateway',
			'Attendance tracking',
			'Homework assignment system',
			'Report card generation',
			'Timetable management',
			'Resource booking system',
		],
	},
	{
		category: 'Coming Soon: Communication',
		icon: <MessageCircle className="h-8 w-8 text-accent" />,
		features: [
			'Parent-teacher messaging',
			'SMS notification integration',
			'Email newsletters',
			'Announcement broadcasts',
			'Parent feedback system',
			'Internal staff communication',
			'Custom notification preferences',
		],
	},
];

export function DetailedFeatureList() {
	return (
		<section className="bg-gradient-to-b from-background to-muted/20 py-20 sm:py-28">
			<div className="container mx-auto px-6">
				<SectionHeading>Comprehensive Feature Set</SectionHeading>
				<p className="mx-auto mt-4 max-w-3xl text-center text-lg text-muted-foreground md:text-xl">
					Our platform includes everything you need to create a stunning digital
					presence for your educational institution, with easy-to-use tools
					designed for all types of educational establishments.
				</p>

				{/* Demo Embed */}
				<div
					id="demo-section"
					className="mx-auto mb-16 mt-10 max-w-5xl overflow-hidden rounded-xl border border-border bg-card p-4 shadow-lg"
				>
					<div className="relative aspect-video w-full overflow-hidden rounded-lg">
						<iframe
							src="https://demo.indivio.in"
							title="Indivio Demo Website"
							className="h-full w-full"
							loading="lazy"
						/>
					</div>
					<div className="mt-4 flex flex-col justify-between gap-4 rounded-lg bg-muted/20 p-4 text-sm text-muted-foreground sm:flex-row sm:items-center">
						<p>
							This is a live demo of our platform. Feel free to explore and see
							how your institution could look.
						</p>
						<a
							href="https://demo.indivio.in"
							target="_blank"
							rel="noreferrer"
							className="flex items-center justify-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-medium text-white"
						>
							Open in New Tab
						</a>
					</div>
				</div>

				<div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
					{detailedFeatures.map((category, idx) => (
						<motion.div
							key={category.category}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: idx * 0.1 }}
							className="rounded-xl border border-border bg-card p-6 shadow-lg transition-all duration-300 hover:shadow-xl"
						>
							<div className="mb-4 flex items-center">
								<div className="mr-3 rounded-full bg-accent/10 p-2">
									{category.icon}
								</div>
								<h3 className="text-xl font-bold text-foreground">
									{category.category}
								</h3>
							</div>

							<ul className="mt-6 space-y-3">
								{category.features.map((feature, index) => (
									<li key={index} className="flex items-start">
										<CheckCircle2 className="mr-2 mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-500" />
										<span className="text-muted-foreground">{feature}</span>
									</li>
								))}
							</ul>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
