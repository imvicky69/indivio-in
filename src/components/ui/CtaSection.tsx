// src/components/ui/CtaSection.tsx
'use client';
import { motion } from 'framer-motion';
import { MagneticButton } from './MagneticButton';
import { ParticleBackground } from './ParticleBackground';
import { FloatingElement } from './FloatingElement';
import { Sparkles, Rocket } from 'lucide-react';

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
		<section className="section-padding relative overflow-hidden bg-gradient-to-br from-purple-900/20 via-background to-pink-900/20">
			{/* Animated Background with Particles */}
			<div className="absolute inset-0 -z-10">
				<ParticleBackground />
				<div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl" />
				<div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-pink-500/20 blur-3xl" />
				<div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-3xl" />
			</div>

			<div className="container relative z-10 mx-auto px-6 text-center">
				<FloatingElement delay={0} duration={4}>
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
					>
						<motion.div
							animate={{
								scale: [1, 1.02, 1],
							}}
							transition={{
								duration: 3,
								repeat: Infinity,
								ease: 'easeInOut',
							}}
						>
							<h2 className="section-heading mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
								{heading}
							</h2>
						</motion.div>
					</motion.div>
				</FloatingElement>

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
					className="mt-10 flex flex-col items-center justify-center gap-6 sm:flex-row"
				>
					{buttons.map((button, index) => (
						<motion.div
							key={button.href}
							initial={{ opacity: 0, scale: 0.8 }}
							whileInView={{ opacity: 1, scale: 1 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
						>
							<MagneticButton
								href={button.href}
								variant={button.primary ? 'primary' : 'secondary'}
							>
								<span className="flex items-center gap-2">
									{button.primary ? (
										<Rocket className="h-5 w-5" />
									) : (
										<Sparkles className="h-5 w-5" />
									)}
									{button.text}
								</span>
							</MagneticButton>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	);
}
