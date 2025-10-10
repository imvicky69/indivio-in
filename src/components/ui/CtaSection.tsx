// src/components/ui/CtaSection.tsx
'use client';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';

type ButtonProps = {
	text: string;
	href: string;
	primary?: boolean;
};

type CtaSectionProps = {
	heading?: string;
	subheading?: string;
	buttons?: ButtonProps[];
};

const defaultHeading = "Ready to Transform Your School's Digital Presence?";
const defaultSubheading =
	'Get 17% OFF on all plans! Limited time launch offer. Join schools building their digital future with Indivio.';
const defaultButtons: ButtonProps[] = [
	{ text: 'View Pricing Plans', href: '/pricing', primary: true },
	{ text: 'Schedule Free Consultation', href: '/contact', primary: false },
];

export function CtaSection({
	heading = defaultHeading,
	subheading = defaultSubheading,
	buttons = defaultButtons,
}: CtaSectionProps) {
	return (
		<section className="section-padding relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-muted/20">
			{/* Decorative Background */}
			<div className="absolute inset-0 -z-10">
				<div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-green-500/10 blur-3xl" />
				<div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
			</div>

			<div className="container mx-auto px-6 text-center">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
				>
					<h2 className="section-heading mb-6 text-foreground">{heading}</h2>
				</motion.div>

				{subheading && (
					<motion.p
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6, delay: 0.2 }}
						className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground md:text-xl"
					>
						{subheading}
					</motion.p>
				)}

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.4 }}
					className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
				>
					{buttons.map((button, index) => (
						<motion.div
							key={button.href}
							initial={{ opacity: 0, scale: 0.8 }}
							whileInView={{ opacity: 1, scale: 1 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
						>
							<Button
								href={button.href}
								variant={button.primary ? 'primary' : 'secondary'}
							>
								{button.text}
							</Button>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	);
}
