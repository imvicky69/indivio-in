import type { Metadata } from 'next';
import { ContactFormArea } from '@/components/ContactFormArea';
import { CtaSection } from '@/components/ui/CtaSection';
// import { WhyChooseIndivio } from '@/components/why-indivio/WhyChooseIndivio';

// Revalidate every 1 minute (60 seconds)
export const revalidate = 60;

export const metadata: Metadata = {
	title: 'Contact Us | Get in Touch with the Indivio Team',
	description:
		"Have a question? Contact the Indivio team via our contact form, email, or phone. We're here to help you with your school's digital needs.",
};

// Customize the CTA for the contact page
const contactCtaProps = {
	heading: 'Ready to See Indivio in Action?',
	subheading:
		"Let us show you how our platform can transform your school's digital presence.",
	buttons: [{ text: 'View Pricing Plans', href: '/pricing', primary: true }],
};

// WhyChooseIndivio section has been moved to its own component file

export default function ContactPage() {
	return (
		<div className="mx-4 md:mx-12">
			<ContactFormArea />
			{/* <WhyChooseIndivio /> */}
			<CtaSection {...contactCtaProps} />
		</div>
	);
}
