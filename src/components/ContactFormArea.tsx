'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import {
	Mail,
	MapPin,
	MessageSquare,
	Send,
	CheckCircle2,
	Clock,
	Globe,
} from 'lucide-react';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import { saveContactSubmission, type ContactSubmission } from '@/lib/firebase';

// Define the structure of our form data
type FormInputs = {
	fullName: string;
	email: string;
	schoolName: string;
	phone: string;
	subject: string;
	message: string;
};

export function ContactFormArea() {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<FormInputs>();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitted, setSubmitted] = useState(false);

	// Dynamic WhatsApp link generation
	const whatsappNumber = '+919211641566';
	const whatsappMessage =
		"Hello Indivio! I'm interested in your services and would like to know more.";
	const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

	const onSubmit: SubmitHandler<FormInputs> = async (data) => {
		setIsSubmitting(true);
		const notification = toast.loading('Sending your message...');

		try {
			// Prepare contact submission data
			const contactData: Omit<ContactSubmission, 'createdAt'> = {
				name: data.fullName,
				email: data.email,
				phone: data.phone,
				schoolName: data.schoolName,
				message: data.message,
				subject: data.subject || 'General Inquiry',
				status: 'new',
			};

			console.log('Submitting contact form data:', {
				...contactData,
				createdAt: 'now',
			});

			// Save to Firestore
			await saveContactSubmission(contactData);

			// Show success message
			toast.success(
				'Message sent successfully! We will get back to you within 24 hours.',
				{ id: notification }
			);

			// Reset form and mark as submitted
			reset();
			setSubmitted(true);
		} catch (error) {
			console.error('Error submitting form:', error);

			// Handle different types of errors
			let errorMessage =
				'Failed to send message. Please try again or contact us via WhatsApp/email.';

			if (error instanceof Error) {
				const errorStr = error.toString().toLowerCase();
				console.log('Error details:', errorStr);

				// Check for specific error types
				if (
					errorStr.includes('permission') ||
					errorStr.includes('permission-denied')
				) {
					errorMessage =
						'Access permission error. Our team has been notified. Please try WhatsApp or email instead.';
				} else if (
					errorStr.includes('network') ||
					errorStr.includes('unavailable') ||
					errorStr.includes('failed to get')
				) {
					errorMessage =
						'Network connection issue. Please check your internet connection and try again.';
				} else if (errorStr.includes('quota') || errorStr.includes('limit')) {
					errorMessage =
						'Service temporarily unavailable. Please try again later or contact us directly.';
				} else if (errorStr.includes('firestore')) {
					errorMessage =
						'Database connection error. Please try again or contact us directly.';
				} else if (errorStr.includes('firebase')) {
					errorMessage =
						'Service connection error. Please try again or contact us via WhatsApp/email.';
				}
			}

			toast.error(errorMessage, {
				id: notification,
				duration: 6000,
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<>
			{/* This component provides the toast notifications */}
			<Toaster position="top-center" reverseOrder={false} />

			<section className="py-20 sm:py-28">
				<div className="container mx-auto px-6">
					{/* Main heading */}
					<div className="mb-16 text-center">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
							className="mb-6"
						>
							<h1 className="font-display text-4xl font-bold text-foreground sm:text-5xl">
								Get in Touch with Indivio
							</h1>
							<p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
								Ready to transform your school&apos;s digital presence? Our team
								of experts is here to help you every step of the way. Reach out
								through any of the channels below, and we&apos;ll get back to
								you within 4-6 hours.
							</p>
						</motion.div>

						{/* Quick Stats */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.2 }}
							className="flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground"
						>
							<div className="flex items-center gap-2">
								<Clock className="h-4 w-4 text-primary" />
								<span>Response within 1 hour</span>
							</div>
							<div className="flex items-center gap-2">
								<MessageSquare className="h-4 w-4 text-green-500" />
								<span>WhatsApp support available</span>
							</div>
							<div className="flex items-center gap-2">
								<Globe className="h-4 w-4 text-blue-500" />
								<span>Serving schools nationwide</span>
							</div>
						</motion.div>
					</div>

					{/* Two-column layout */}
					<div className="grid grid-cols-1 items-start gap-16 md:grid-cols-2">
						{/* Left Column: The Form */}
						<motion.div
							initial={{ opacity: 0, x: -50 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.7 }}
							className="rounded-2xl border border-border bg-card p-8 shadow-lg"
						>
							{submitted ? (
								<motion.div
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									className="flex h-full flex-col items-center justify-center py-10 text-center"
								>
									<CheckCircle2 className="mb-6 h-16 w-16 text-green-500" />
									<h2 className="mb-4 font-display text-2xl font-bold text-foreground">
										Thank You!
									</h2>
									<p className="mb-6 text-lg text-muted-foreground">
										Your message has been received. We&apos;ll get back to you
										within 4 hours.
									</p>
									<button
										onClick={() => setSubmitted(false)}
										className="flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground transition-all hover:bg-primary/90"
									>
										Send Another Message
									</button>
								</motion.div>
							) : (
								<>
									<h2 className="mb-6 font-display text-2xl font-bold text-primary">
										Send Us a Message
									</h2>
									<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
										<div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
											<div>
												<label
													htmlFor="fullName"
													className="mb-2 block text-sm font-medium text-muted-foreground"
												>
													Full Name *
												</label>
												<input
													type="text"
													id="fullName"
													{...register('fullName', {
														required: 'Full name is required',
														minLength: {
															value: 2,
															message: 'Name must be at least 2 characters',
														},
													})}
													className="w-full rounded-md border border-border bg-input p-3 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
													placeholder="John Doe"
												/>
												{errors.fullName && (
													<p className="mt-1 text-sm text-red-500">
														{errors.fullName.message}
													</p>
												)}
											</div>
											<div>
												<label
													htmlFor="email"
													className="mb-2 block text-sm font-medium text-muted-foreground"
												>
													Email Address *
												</label>
												<input
													type="email"
													id="email"
													{...register('email', {
														required: 'Email is required',
														pattern: {
															value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
															message: 'Invalid email address',
														},
													})}
													className="w-full rounded-md border border-border bg-input p-3 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
													placeholder="your.email@example.com"
												/>
												{errors.email && (
													<p className="mt-1 text-sm text-red-500">
														{errors.email.message}
													</p>
												)}
											</div>
										</div>
										<div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
											<div>
												<label
													htmlFor="schoolName"
													className="mb-2 block text-sm font-medium text-muted-foreground"
												>
													Institution Name *
												</label>
												<input
													type="text"
													id="schoolName"
													{...register('schoolName', {
														required: 'Institution name is required',
													})}
													className="w-full rounded-md border border-border bg-input p-3 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
													placeholder="Your Institution Name"
												/>
												{errors.schoolName && (
													<p className="mt-1 text-sm text-red-500">
														{errors.schoolName.message}
													</p>
												)}
											</div>
											<div>
												<label
													htmlFor="phone"
													className="mb-2 block text-sm font-medium text-muted-foreground"
												>
													Phone Number *
												</label>
												<input
													type="tel"
													id="phone"
													{...register('phone', {
														required: 'Phone number is required',
														pattern: {
															value: /^[0-9+\-\s()]{10,}$/,
															message: 'Invalid phone number',
														},
													})}
													className="w-full rounded-md border border-border bg-input p-3 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
													placeholder="+91 XXXXX XXXXX"
												/>
												{errors.phone && (
													<p className="mt-1 text-sm text-red-500">
														{errors.phone.message}
													</p>
												)}
											</div>
										</div>
										<div>
											<label
												htmlFor="subject"
												className="mb-2 block text-sm font-medium text-muted-foreground"
											>
												Subject
											</label>
											<select
												id="subject"
												{...register('subject')}
												className="w-full rounded-md border border-border bg-input p-3 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
											>
												<option value="General Inquiry">General Inquiry</option>
												<option value="Pricing Question">
													Pricing Question
												</option>
												<option value="Technical Support">
													Technical Support
												</option>
												<option value="Partnership">
													Partnership Opportunity
												</option>
												<option value="Feature Request">Feature Request</option>
												<option value="Other">Other</option>
											</select>
										</div>
										<div>
											<label
												htmlFor="message"
												className="mb-2 block text-sm font-medium text-muted-foreground"
											>
												Your Message *
											</label>
											<textarea
												id="message"
												rows={5}
												{...register('message', {
													required: 'Message is required',
													minLength: {
														value: 10,
														message: 'Message must be at least 10 characters',
													},
												})}
												className="w-full rounded-md border border-border bg-input p-3 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
												placeholder="Tell us about your requirements..."
											></textarea>
											{errors.message && (
												<p className="mt-1 text-sm text-red-500">
													{errors.message.message}
												</p>
											)}
										</div>
										<button
											type="submit"
											disabled={isSubmitting}
											className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-50"
										>
											<Send className="h-5 w-5" />
											{isSubmitting ? 'Sending...' : 'Send Message'}
										</button>
									</form>
								</>
							)}
						</motion.div>

						{/* Right Column: Contact Details & WhatsApp */}
						<motion.div
							initial={{ opacity: 0, x: 50 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.7, delay: 0.2 }}
							className="space-y-8"
						>
							<h2 className="mb-6 font-display text-2xl font-bold text-primary">
								Other Ways to Reach Us
							</h2>
							<div className="space-y-6">
								{/* WhatsApp Contact */}
								<a
									href={whatsappLink}
									target="_blank"
									rel="noopener noreferrer"
									aria-label="Open WhatsApp chat in a new tab"
									className="flex items-start gap-4 rounded-2xl border-2 border-green-500 bg-green-500/10 p-6 transition-all hover:scale-105 hover:shadow-lg"
								>
									<div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/20">
										<MessageSquare className="h-6 w-6 text-green-600" />
									</div>
									<div>
										<h3 className="text-lg font-semibold text-foreground">
											Phone / WhatsApp
										</h3>
										<p className="text-lg font-bold text-green-600">
											+91 9211641566
										</p>
										<p className="text-sm text-muted-foreground">
											Quick responses via WhatsApp
										</p>
									</div>
								</a>

								{/* Email Contact */}
								<div className="flex items-start gap-4 rounded-2xl border-2 border-primary/20 bg-primary/5 p-6">
									<div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
										<Mail className="h-6 w-6 text-primary" />
									</div>
									<div>
										<h3 className="text-lg font-semibold text-foreground">
											Email Support
										</h3>
										<p className="text-muted-foreground">support@indivio.in</p>
										<p className="text-sm text-muted-foreground">
											We respond within 24 hours
										</p>
									</div>
								</div>

								{/* Business Hours */}
								<div className="flex items-start gap-4 rounded-2xl border-2 border-amber-500/20 bg-amber-500/5 p-6">
									<div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/10">
										<Clock className="h-6 w-6 text-amber-600" />
									</div>
									<div>
										<h3 className="text-lg font-semibold text-foreground">
											Business Hours
										</h3>
										<p className="text-muted-foreground">
											Monday – Friday, 10:00 AM – 6:00 PM (IST)
										</p>
										<p className="text-sm text-muted-foreground">
											Saturday: 10:00 AM – 2:00 PM (IST)
										</p>
									</div>
								</div>

								{/* Website */}
								<div className="flex items-start gap-4 rounded-2xl border-2 border-blue-500/20 bg-blue-500/5 p-6">
									<div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10">
										<Globe className="h-6 w-6 text-blue-600" />
									</div>
									<div>
										<h3 className="text-lg font-semibold text-foreground">
											Website
										</h3>
										<p className="text-muted-foreground">www.indivio.in</p>
										<p className="text-sm text-muted-foreground">
											Explore our services online
										</p>
									</div>
								</div>
							</div>

							{/* Map Embed Section */}
							<div className="mt-8">
								<h3 className="mb-4 text-lg font-semibold text-foreground">
									Find Us
								</h3>
								<div className="overflow-hidden rounded-xl border border-border shadow-lg">
									<iframe
										src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3576.551779720728!2d86.5713732!3d26.308626699999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ee610071be9a89%3A0xa6026b09a361bfc!2sKARV!5e0!3m2!1sen!2sin!4v1760116957565!5m2!1sen!2sin"
										width="100%"
										height="250"
										style={{ border: 0 }}
										allowFullScreen
										loading="lazy"
										referrerPolicy="no-referrer-when-downgrade"
										title="Indivio Office Location - New Delhi, India"
										className="w-full"
									></iframe>
								</div>
								<div className="mt-3 flex items-start gap-2 text-sm text-muted-foreground">
									<MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" />
									<span>Nirmali, Bihar</span>
								</div>
							</div>
						</motion.div>
					</div>
				</div>
			</section>
		</>
	);
}
