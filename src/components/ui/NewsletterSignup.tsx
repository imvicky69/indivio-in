// src/components/ui/NewsletterSignup.tsx
'use client';

import { motion } from 'framer-motion';
import { Mail, Send, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { saveNewsletterSubscription } from '@/lib/firebase';

export function NewsletterSignup() {
	const [email, setEmail] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [status, setStatus] = useState<{
		type: 'success' | 'error' | null;
		message: string;
	}>({
		type: null,
		message: '',
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		setStatus({ type: null, message: '' });

		try {
			await saveNewsletterSubscription(email, 'newsletter-section');
			setStatus({
				type: 'success',
				message: 'Thank you for subscribing! Check your email for confirmation.',
			});
			setEmail('');
		} catch (error) {
			console.error('Newsletter subscription error:', error);
			setStatus({
				type: 'error',
				message: 'Failed to subscribe. Please try again later.',
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-green-500/5 to-primary/10 py-20">
			{/* Background decorations */}
			<div className="absolute inset-0 -z-10">
				<div className="absolute left-1/4 top-10 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
				<div className="absolute bottom-10 right-1/4 h-64 w-64 rounded-full bg-green-500/10 blur-3xl" />
			</div>

			<div className="container mx-auto px-6">
				<div className="mx-auto max-w-3xl">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
						className="text-center"
					>
						<div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2">
							<Sparkles className="h-5 w-5 text-primary" />
							<span className="text-sm font-semibold text-primary">
								Stay Updated
							</span>
						</div>

						<h2 className="mb-4 font-display text-3xl font-bold text-foreground sm:text-4xl">
							Get the Latest Education Tech Insights
						</h2>

						<p className="mb-8 text-lg text-muted-foreground">
							Subscribe to our newsletter for exclusive tips, feature updates,
							and special offers delivered to your inbox
						</p>

						<form onSubmit={handleSubmit} className="mx-auto max-w-lg">
							<div className="flex flex-col gap-3 sm:flex-row">
								<div className="relative flex-grow">
									<Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
									<input
										type="email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										placeholder="Enter your email address"
										required
										disabled={isSubmitting}
										className="w-full rounded-full border border-border bg-card py-3 pl-12 pr-6 text-foreground shadow-lg transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
									/>
								</div>
								<button
									type="submit"
									disabled={isSubmitting}
									className="flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3 font-semibold text-primary-foreground shadow-lg transition-all duration-300 hover:bg-primary/90 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
								>
									{isSubmitting ? (
										'Subscribing...'
									) : (
										<>
											Subscribe
											<Send className="h-4 w-4" />
										</>
									)}
								</button>
							</div>

							{status.type && (
								<motion.p
									initial={{ opacity: 0, y: -10 }}
									animate={{ opacity: 1, y: 0 }}
									className={`mt-4 text-sm ${
										status.type === 'success'
											? 'text-green-600'
											: 'text-red-600'
									}`}
								>
									{status.message}
								</motion.p>
							)}
						</form>

						<p className="mt-6 text-xs text-muted-foreground">
							We respect your privacy. Unsubscribe at any time.
						</p>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
