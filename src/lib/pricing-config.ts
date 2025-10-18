// ROI and value propositions for each plan
export const planValuePoints: Record<string, string[]> = {
	starter: [
		'Establish your online presence quickly and affordably',
		'Build trust with parents through a professional website',
		'Reduce manual inquiries with online information access',
	],
	professional: [
		'Build trust with parents through a modern, responsive design',
		'Reduce offline paperwork and manual admissions',
		'Improve school visibility and SEO ranking',
	],
	enterprise: [
		'Complete digital transformation for large institutions',
		'Advanced analytics for data-driven decision making',
		'Scalable solution that grows with your school',
	],
};

// Renewal pricing tooltip text
export const renewalTooltipText = {
	year1: 'Year 1 includes one-time setup fee + annual maintenance',
	year2Plus:
		'Year 2+ renewal includes hosting, security, support, and updates. No setup cost from Year 2 onwards.',
	full: 'Renewal includes hosting, support, and updates. No setup cost from Year 2.',
};

// How it works steps (can be customized from Firestore if needed)
export const howItWorksSteps = [
	{
		number: 1,
		title: 'Choose your plan',
		description:
			"Select the perfect plan that fits your school's needs and budget",
	},
	{
		number: 2,
		title: 'Share your school details',
		description:
			'Provide school information, branding, and content you want on your website',
	},
	{
		number: 3,
		title: 'We design & review together',
		description:
			'We design your website and collaborate with you through review cycles',
	},
	{
		number: 4,
		title: 'Your site goes live 🎉',
		description:
			'Your professional website goes live with full training and support',
	},
];

// Additional FAQ items specifically for the pricing page
export const additionalPricingFAQs = [
	{
		question: 'Can I upgrade later?',
		answer:
			"Yes! As your school grows, you can upgrade to a higher-tier plan. We'll apply a portion of your original setup fee as credit toward the new setup cost, making the transition cost-effective.",
	},
	{
		question: 'What happens after the first year?',
		answer:
			'After the first year, you pay a reduced annual renewal fee (shown for each plan) which covers ongoing hosting, security updates, technical support, and maintenance. There are no surprises—the renewal price is clearly stated upfront.',
	},
	{
		question: 'How do I share content for my website?',
		answer:
			'Once you select a plan, we provide you with a simple content gathering form. You can share text, images, and documents through our secure portal. Our team will guide you through the process and help organize everything.',
	},
	{
		question: 'Can I connect my existing domain?',
		answer:
			'Absolutely! All plans support custom domains. The Starter plan has a small additional fee for domain setup, while Professional and Enterprise plans include FREE custom domain setup. You can either use an existing domain or we can help you register a new one.',
	},
];
