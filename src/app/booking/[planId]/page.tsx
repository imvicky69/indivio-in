'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getPlanById, type Plan } from '@/lib/plans';
import { saveBooking, type BookingData } from '@/lib/firebase';
import { motion, AnimatePresence } from 'framer-motion';
import {
	Check,
	ChevronRight,
	ChevronLeft,
	School,
	User,
	FileText,
	CreditCard,
	Loader2,
	CheckCircle2,
	AlertCircle,
} from 'lucide-react';
import Link from 'next/link';

interface BookingPageProps {
	params: Promise<{ planId: string }>;
}

interface FormData {
	// School Details
	schoolName: string;
	schoolType: string;
	studentCount: string;
	address: string;
	city: string;
	state: string;
	pincode: string;

	// Contact Person
	contactName: string;
	designation: string;
	email: string;
	phone: string;
	alternatePhone: string;

	// Requirements
	hasExistingWebsite: string;
	existingWebsiteUrl: string;
	hasDomain: string;
	domainName: string;
	specialRequirements: string;
	preferredLaunchDate: string;

	// Terms
	agreedToTerms: boolean;
}

const INITIAL_FORM_DATA: FormData = {
	schoolName: '',
	schoolType: '',
	studentCount: '',
	address: '',
	city: '',
	state: '',
	pincode: '',
	contactName: '',
	designation: '',
	email: '',
	phone: '',
	alternatePhone: '',
	hasExistingWebsite: '',
	existingWebsiteUrl: '',
	hasDomain: '',
	domainName: '',
	specialRequirements: '',
	preferredLaunchDate: '',
	agreedToTerms: false,
};

export default function BookingPage({ params }: BookingPageProps) {
	const router = useRouter();
	const [plan, setPlan] = useState<Plan | null>(null);
	const [loading, setLoading] = useState(true);
	const [currentStep, setCurrentStep] = useState(1);
	const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitSuccess, setSubmitSuccess] = useState(false);
	const [submitError, setSubmitError] = useState<string | null>(null);
	const [bookingId, setBookingId] = useState<string | null>(null);

	const totalSteps = 4;

	useEffect(() => {
		const fetchPlan = async () => {
			const { planId } = await params;
			const planData = await getPlanById(planId);

			if (!planData) {
				router.push('/pricing');
				return;
			}

			setPlan(planData);
			setLoading(false);
		};

		fetchPlan();
	}, [params, router]);

	const updateFormData = (field: keyof FormData, value: string | boolean) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	const validateStep = (step: number): boolean => {
		switch (step) {
			case 1:
				return !!(
					formData.schoolName &&
					formData.schoolType &&
					formData.studentCount &&
					formData.address &&
					formData.city &&
					formData.state &&
					formData.pincode
				);
			case 2:
				return !!(
					formData.contactName &&
					formData.designation &&
					formData.email &&
					formData.phone
				);
			case 3:
				return !!(
					formData.hasExistingWebsite &&
					formData.hasDomain &&
					formData.preferredLaunchDate
				);
			case 4:
				return formData.agreedToTerms;
			default:
				return false;
		}
	};

	const nextStep = () => {
		if (validateStep(currentStep) && currentStep < totalSteps) {
			setCurrentStep(currentStep + 1);
		}
	};

	const prevStep = () => {
		if (currentStep > 1) {
			setCurrentStep(currentStep - 1);
		}
	};

	const handleSubmit = async () => {
		if (!plan) return;

		setIsSubmitting(true);
		setSubmitError(null);

		try {
			// Calculate pricing with launch discount
			const setupFee = plan.launchOffer?.active
				? plan.launchOffer.discountedSetupFee
				: plan.setupFee || 0;
			const annualFee = plan.launchOffer?.active
				? plan.launchOffer.discountedPrice
				: plan.price;
			const totalAmount = setupFee + annualFee;
			const advanceAmount = totalAmount / 2;

			// Prepare booking data
			const bookingData: Omit<BookingData, 'createdAt' | 'updatedAt'> = {
				planId: plan.id,
				planName: plan.name,
				// School Details
				schoolName: formData.schoolName,
				schoolType: formData.schoolType,
				studentCount: formData.studentCount,
				address: formData.address,
				city: formData.city,
				state: formData.state,
				pincode: formData.pincode,
				// Contact Person
				contactName: formData.contactName,
				designation: formData.designation,
				email: formData.email,
				phone: formData.phone,
				alternatePhone: formData.alternatePhone || undefined,
				// Requirements
				hasExistingWebsite: formData.hasExistingWebsite,
				existingWebsiteUrl: formData.existingWebsiteUrl || undefined,
				hasDomain: formData.hasDomain,
				domainName: formData.domainName || undefined,
				specialRequirements: formData.specialRequirements || undefined,
				preferredLaunchDate: formData.preferredLaunchDate,
				// Pricing
				setupFee,
				annualFee,
				totalAmount,
				advanceAmount,
				discountApplied: plan.launchOffer?.active
					? plan.launchOffer.discount
					: undefined,
				// Metadata
				status: 'pending',
			};

			// Save to Firestore
			const docId = await saveBooking(bookingData);
			setBookingId(docId);
			setSubmitSuccess(true);

			// TODO: Integrate payment gateway here
			// For now, we'll show success message
			setTimeout(() => {
				// router.push(`/booking/success?id=${docId}`);
			}, 2000);
		} catch (error) {
			console.error('Error submitting booking:', error);
			setSubmitError(
				error instanceof Error
					? error.message
					: 'Failed to submit booking. Please try again.'
			);
		} finally {
			setIsSubmitting(false);
		}
	};

	if (loading) {
		return (
			<div className="flex min-h-screen items-center justify-center">
				<Loader2 className="h-12 w-12 animate-spin text-primary" />
			</div>
		);
	}

	if (!plan) return null;

	// Success State
	if (submitSuccess && bookingId) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-green-50 to-white py-12">
				<motion.div
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					className="mx-auto max-w-2xl rounded-3xl border-2 border-green-200 bg-white p-8 text-center shadow-2xl"
				>
					<motion.div
						initial={{ scale: 0 }}
						animate={{ scale: 1 }}
						transition={{ delay: 0.2, type: 'spring' }}
						className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100"
					>
						<CheckCircle2 className="h-12 w-12 text-green-600" />
					</motion.div>
					<h1 className="mb-4 font-display text-3xl font-bold text-foreground">
						Booking Received! 🎉
					</h1>
					<p className="mb-6 text-lg text-muted-foreground">
						Thank you for choosing <strong>{plan.name}</strong> plan! We&apos;ve
						received your booking request.
					</p>
					<div className="mb-8 rounded-xl bg-green-50 p-6">
						<p className="mb-2 text-sm font-medium text-green-700">
							Booking ID
						</p>
						<p className="font-mono text-lg font-bold text-green-900">
							#{bookingId.slice(0, 12).toUpperCase()}
						</p>
					</div>
					<div className="space-y-4 text-left">
						<h3 className="font-semibold text-foreground">What&apos;s Next?</h3>
						<ul className="space-y-3 text-sm text-muted-foreground">
							<li className="flex gap-3">
								<Check className="h-5 w-5 flex-shrink-0 text-green-600" />
								<span>
									Our team will review your booking and contact you within 24
									hours
								</span>
							</li>
							<li className="flex gap-3">
								<Check className="h-5 w-5 flex-shrink-0 text-green-600" />
								<span>
									You&apos;ll receive a payment link for the 50% advance payment
								</span>
							</li>
							<li className="flex gap-3">
								<Check className="h-5 w-5 flex-shrink-0 text-green-600" />
								<span>
									We&apos;ll schedule a kick-off call to discuss your
									requirements
								</span>
							</li>
						</ul>
					</div>
					<div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
						<Link href="/pricing">
							<button className="w-full rounded-lg border-2 border-border bg-background px-6 py-3 font-semibold text-foreground transition-colors hover:border-primary hover:bg-primary/5 sm:w-auto">
								View All Plans
							</button>
						</Link>
						<Link href="/">
							<button className="w-full rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90 sm:w-auto">
								Back to Home
							</button>
						</Link>
					</div>
				</motion.div>
			</div>
		);
	}

	const advancePayment = (
		(plan.setupFee || 0) / 2 +
		plan.price / 2
	).toLocaleString('en-IN');

	return (
		<div className="min-h-screen bg-gradient-to-b from-muted/30 to-white py-12 pt-28">
			<div className="container mx-auto px-6">
				{/* Header */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className="mb-8 text-center"
				>
					<Link
						href="/pricing"
						className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
					>
						<ChevronLeft className="h-4 w-4" />
						Back to Pricing
					</Link>
					<h1 className="mb-2 font-display text-3xl font-bold text-foreground sm:text-4xl">
						Book Your {plan.name} Plan
					</h1>
					<p className="text-muted-foreground">
						Complete the form below to get started with your school website
					</p>
				</motion.div>

				<div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-3">
					{/* Main Form */}
					<div className="lg:col-span-2">
						{/* Progress Indicator */}
						<div className="mb-8 flex items-center justify-between">
							{[1, 2, 3, 4].map((step) => (
								<div key={step} className="flex flex-1 items-center">
									<div
										className={`flex h-10 w-10 items-center justify-center rounded-full border-2 font-semibold transition-all ${
											step === currentStep
												? 'border-primary bg-primary text-primary-foreground'
												: step < currentStep
													? 'border-primary bg-primary/10 text-primary'
													: 'border-border bg-background text-muted-foreground'
										}`}
									>
										{step < currentStep ? <Check className="h-5 w-5" /> : step}
									</div>
									{step < 4 && (
										<div
											className={`h-0.5 flex-1 transition-all ${
												step < currentStep ? 'bg-primary' : 'bg-border'
											}`}
										/>
									)}
								</div>
							))}
						</div>

						{/* Form Steps */}
						<div className="rounded-3xl border border-border bg-card p-8 shadow-lg">
							<AnimatePresence mode="wait">
								{/* Step 1: School Details */}
								{currentStep === 1 && (
									<motion.div
										key="step1"
										initial={{ opacity: 0, x: 20 }}
										animate={{ opacity: 1, x: 0 }}
										exit={{ opacity: 0, x: -20 }}
										transition={{ duration: 0.3 }}
									>
										<div className="mb-6 flex items-center gap-3">
											<School className="h-6 w-6 text-primary" />
											<h2 className="text-2xl font-bold text-foreground">
												School Information
											</h2>
										</div>

										<div className="space-y-4">
											<div>
												<label className="mb-2 block text-sm font-medium text-foreground">
													School Name *
												</label>
												<input
													type="text"
													value={formData.schoolName}
													onChange={(e) =>
														updateFormData('schoolName', e.target.value)
													}
													className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
													placeholder="Enter school name"
												/>
											</div>

											<div className="grid gap-4 sm:grid-cols-2">
												<div>
													<label className="mb-2 block text-sm font-medium text-foreground">
														School Type *
													</label>
													<select
														value={formData.schoolType}
														onChange={(e) =>
															updateFormData('schoolType', e.target.value)
														}
														className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
													>
														<option value="">Select type</option>
														<option value="preschool">Pre-School</option>
														<option value="primary">Primary School</option>
														<option value="secondary">Secondary School</option>
														<option value="higher_secondary">
															Higher Secondary
														</option>
														<option value="international">
															International School
														</option>
														<option value="cbse">CBSE</option>
														<option value="icse">ICSE</option>
														<option value="state_board">State Board</option>
													</select>
												</div>

												<div>
													<label className="mb-2 block text-sm font-medium text-foreground">
														Number of Students *
													</label>
													<select
														value={formData.studentCount}
														onChange={(e) =>
															updateFormData('studentCount', e.target.value)
														}
														className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
													>
														<option value="">Select range</option>
														<option value="0-100">Under 100</option>
														<option value="100-500">100 - 500</option>
														<option value="500-1000">500 - 1,000</option>
														<option value="1000-2000">1,000 - 2,000</option>
														<option value="2000+">2,000+</option>
													</select>
												</div>
											</div>

											<div>
												<label className="mb-2 block text-sm font-medium text-foreground">
													Address *
												</label>
												<textarea
													value={formData.address}
													onChange={(e) =>
														updateFormData('address', e.target.value)
													}
													className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
													rows={3}
													placeholder="Enter complete address"
												/>
											</div>

											<div className="grid gap-4 sm:grid-cols-3">
												<div>
													<label className="mb-2 block text-sm font-medium text-foreground">
														City *
													</label>
													<input
														type="text"
														value={formData.city}
														onChange={(e) =>
															updateFormData('city', e.target.value)
														}
														className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
														placeholder="City"
													/>
												</div>

												<div>
													<label className="mb-2 block text-sm font-medium text-foreground">
														State *
													</label>
													<input
														type="text"
														value={formData.state}
														onChange={(e) =>
															updateFormData('state', e.target.value)
														}
														className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
														placeholder="State"
													/>
												</div>

												<div>
													<label className="mb-2 block text-sm font-medium text-foreground">
														PIN Code *
													</label>
													<input
														type="text"
														value={formData.pincode}
														onChange={(e) =>
															updateFormData('pincode', e.target.value)
														}
														className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
														placeholder="PIN"
													/>
												</div>
											</div>
										</div>
									</motion.div>
								)}

								{/* Step 2: Contact Details */}
								{currentStep === 2 && (
									<motion.div
										key="step2"
										initial={{ opacity: 0, x: 20 }}
										animate={{ opacity: 1, x: 0 }}
										exit={{ opacity: 0, x: -20 }}
										transition={{ duration: 0.3 }}
									>
										<div className="mb-6 flex items-center gap-3">
											<User className="h-6 w-6 text-primary" />
											<h2 className="text-2xl font-bold text-foreground">
												Contact Person Details
											</h2>
										</div>

										<div className="space-y-4">
											<div className="grid gap-4 sm:grid-cols-2">
												<div>
													<label className="mb-2 block text-sm font-medium text-foreground">
														Full Name *
													</label>
													<input
														type="text"
														value={formData.contactName}
														onChange={(e) =>
															updateFormData('contactName', e.target.value)
														}
														className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
														placeholder="Enter full name"
													/>
												</div>

												<div>
													<label className="mb-2 block text-sm font-medium text-foreground">
														Designation *
													</label>
													<input
														type="text"
														value={formData.designation}
														onChange={(e) =>
															updateFormData('designation', e.target.value)
														}
														className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
														placeholder="e.g., Principal, Director"
													/>
												</div>
											</div>

											<div>
												<label className="mb-2 block text-sm font-medium text-foreground">
													Email Address *
												</label>
												<input
													type="email"
													value={formData.email}
													onChange={(e) =>
														updateFormData('email', e.target.value)
													}
													className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
													placeholder="your@email.com"
												/>
											</div>

											<div className="grid gap-4 sm:grid-cols-2">
												<div>
													<label className="mb-2 block text-sm font-medium text-foreground">
														Phone Number *
													</label>
													<input
														type="tel"
														value={formData.phone}
														onChange={(e) =>
															updateFormData('phone', e.target.value)
														}
														className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
														placeholder="+91 XXXXX XXXXX"
													/>
												</div>

												<div>
													<label className="mb-2 block text-sm font-medium text-foreground">
														Alternate Phone (Optional)
													</label>
													<input
														type="tel"
														value={formData.alternatePhone}
														onChange={(e) =>
															updateFormData('alternatePhone', e.target.value)
														}
														className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
														placeholder="+91 XXXXX XXXXX"
													/>
												</div>
											</div>
										</div>
									</motion.div>
								)}

								{/* Step 3: Requirements */}
								{currentStep === 3 && (
									<motion.div
										key="step3"
										initial={{ opacity: 0, x: 20 }}
										animate={{ opacity: 1, x: 0 }}
										exit={{ opacity: 0, x: -20 }}
										transition={{ duration: 0.3 }}
									>
										<div className="mb-6 flex items-center gap-3">
											<FileText className="h-6 w-6 text-primary" />
											<h2 className="text-2xl font-bold text-foreground">
												Project Requirements
											</h2>
										</div>

										<div className="space-y-4">
											<div>
												<label className="mb-2 block text-sm font-medium text-foreground">
													Do you have an existing website? *
												</label>
												<div className="flex gap-4">
													<label className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-border bg-background px-4 py-3 transition-all hover:border-primary has-[:checked]:border-primary has-[:checked]:bg-primary/5">
														<input
															type="radio"
															name="hasExistingWebsite"
															value="yes"
															checked={formData.hasExistingWebsite === 'yes'}
															onChange={(e) =>
																updateFormData(
																	'hasExistingWebsite',
																	e.target.value
																)
															}
															className="text-primary"
														/>
														<span>Yes</span>
													</label>
													<label className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-border bg-background px-4 py-3 transition-all hover:border-primary has-[:checked]:border-primary has-[:checked]:bg-primary/5">
														<input
															type="radio"
															name="hasExistingWebsite"
															value="no"
															checked={formData.hasExistingWebsite === 'no'}
															onChange={(e) =>
																updateFormData(
																	'hasExistingWebsite',
																	e.target.value
																)
															}
															className="text-primary"
														/>
														<span>No</span>
													</label>
												</div>
											</div>

											{formData.hasExistingWebsite === 'yes' && (
												<div>
													<label className="mb-2 block text-sm font-medium text-foreground">
														Existing Website URL
													</label>
													<input
														type="url"
														value={formData.existingWebsiteUrl}
														onChange={(e) =>
															updateFormData(
																'existingWebsiteUrl',
																e.target.value
															)
														}
														className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
														placeholder="https://yourschool.com"
													/>
												</div>
											)}

											<div>
												<label className="mb-2 block text-sm font-medium text-foreground">
													Do you have a domain name? *
												</label>
												<div className="flex gap-4">
													<label className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-border bg-background px-4 py-3 transition-all hover:border-primary has-[:checked]:border-primary has-[:checked]:bg-primary/5">
														<input
															type="radio"
															name="hasDomain"
															value="yes"
															checked={formData.hasDomain === 'yes'}
															onChange={(e) =>
																updateFormData('hasDomain', e.target.value)
															}
															className="text-primary"
														/>
														<span>Yes</span>
													</label>
													<label className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-border bg-background px-4 py-3 transition-all hover:border-primary has-[:checked]:border-primary has-[:checked]:bg-primary/5">
														<input
															type="radio"
															name="hasDomain"
															value="no"
															checked={formData.hasDomain === 'no'}
															onChange={(e) =>
																updateFormData('hasDomain', e.target.value)
															}
															className="text-primary"
														/>
														<span>No</span>
													</label>
													<label className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-border bg-background px-4 py-3 transition-all hover:border-primary has-[:checked]:border-primary has-[:checked]:bg-primary/5">
														<input
															type="radio"
															name="hasDomain"
															value="need_help"
															checked={formData.hasDomain === 'need_help'}
															onChange={(e) =>
																updateFormData('hasDomain', e.target.value)
															}
															className="text-primary"
														/>
														<span>Need Help</span>
													</label>
												</div>
											</div>

											{formData.hasDomain === 'yes' && (
												<div>
													<label className="mb-2 block text-sm font-medium text-foreground">
														Domain Name
													</label>
													<input
														type="text"
														value={formData.domainName}
														onChange={(e) =>
															updateFormData('domainName', e.target.value)
														}
														className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
														placeholder="yourschool.com"
													/>
												</div>
											)}

											<div>
												<label className="mb-2 block text-sm font-medium text-foreground">
													Preferred Launch Date *
												</label>
												<input
													type="date"
													value={formData.preferredLaunchDate}
													onChange={(e) =>
														updateFormData(
															'preferredLaunchDate',
															e.target.value
														)
													}
													className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
												/>
											</div>

											<div>
												<label className="mb-2 block text-sm font-medium text-foreground">
													Special Requirements (Optional)
												</label>
												<textarea
													value={formData.specialRequirements}
													onChange={(e) =>
														updateFormData(
															'specialRequirements',
															e.target.value
														)
													}
													className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
													rows={4}
													placeholder="Any specific features or requirements..."
												/>
											</div>
										</div>
									</motion.div>
								)}

								{/* Step 4: Review & Payment */}
								{currentStep === 4 && (
									<motion.div
										key="step4"
										initial={{ opacity: 0, x: 20 }}
										animate={{ opacity: 1, x: 0 }}
										exit={{ opacity: 0, x: -20 }}
										transition={{ duration: 0.3 }}
									>
										<div className="mb-6 flex items-center gap-3">
											<CreditCard className="h-6 w-6 text-primary" />
											<h2 className="text-2xl font-bold text-foreground">
												Review & Confirm
											</h2>
										</div>

										<div className="space-y-6">
											{/* Summary */}
											<div className="rounded-xl border border-border bg-muted/50 p-6">
												<h3 className="mb-4 font-semibold text-foreground">
													Booking Summary
												</h3>
												<div className="space-y-2 text-sm">
													<div className="flex justify-between">
														<span className="text-muted-foreground">
															School:
														</span>
														<span className="font-medium text-foreground">
															{formData.schoolName}
														</span>
													</div>
													<div className="flex justify-between">
														<span className="text-muted-foreground">
															Contact:
														</span>
														<span className="font-medium text-foreground">
															{formData.contactName}
														</span>
													</div>
													<div className="flex justify-between">
														<span className="text-muted-foreground">
															Email:
														</span>
														<span className="font-medium text-foreground">
															{formData.email}
														</span>
													</div>
													<div className="flex justify-between">
														<span className="text-muted-foreground">
															Phone:
														</span>
														<span className="font-medium text-foreground">
															{formData.phone}
														</span>
													</div>
												</div>
											</div>

											{/* Payment Details */}
											<div className="rounded-xl border-2 border-primary/20 bg-primary/5 p-6">
												<h3 className="mb-4 font-semibold text-foreground">
													Payment Details
												</h3>
												<div className="space-y-3">
													<div className="flex justify-between text-sm">
														<span className="text-muted-foreground">
															Setup Fee:
														</span>
														<span className="font-medium text-foreground">
															₹{plan.setupFee?.toLocaleString('en-IN')}
														</span>
													</div>
													<div className="flex justify-between text-sm">
														<span className="text-muted-foreground">
															First Year Maintenance:
														</span>
														<span className="font-medium text-foreground">
															₹{plan.price.toLocaleString('en-IN')}
														</span>
													</div>
													<div className="border-t border-border pt-3">
														<div className="flex justify-between">
															<span className="font-semibold text-foreground">
																Total First Year:
															</span>
															<span className="font-bold text-foreground">
																₹
																{(
																	(plan.setupFee || 0) + plan.price
																).toLocaleString('en-IN')}
															</span>
														</div>
													</div>
													<div className="rounded-lg bg-green-50 p-4">
														<div className="flex justify-between">
															<span className="font-semibold text-green-900">
																50% Advance Payment:
															</span>
															<span className="text-2xl font-bold text-green-900">
																₹{advancePayment}
															</span>
														</div>
														<p className="mt-2 text-xs text-green-700">
															Remaining 50% due upon project completion
														</p>
													</div>
												</div>
											</div>

											{/* Terms & Conditions */}
											<div className="space-y-3">
												<label className="flex cursor-pointer items-start gap-3">
													<input
														type="checkbox"
														checked={formData.agreedToTerms}
														onChange={(e) =>
															updateFormData('agreedToTerms', e.target.checked)
														}
														className="mt-1 h-5 w-5 rounded border-border text-primary focus:ring-2 focus:ring-primary/20"
													/>
													<span className="text-sm text-muted-foreground">
														I agree to the{' '}
														<Link
															href="/terms-and-conditions"
															target="_blank"
															className="text-primary hover:underline"
														>
															Terms & Conditions
														</Link>{' '}
														and{' '}
														<Link
															href="/privacy-policy"
															target="_blank"
															className="text-primary hover:underline"
														>
															Privacy Policy
														</Link>
														. I understand that 50% advance payment is required
														to begin the project.
													</span>
												</label>
											</div>
										</div>
									</motion.div>
								)}
							</AnimatePresence>

							{/* Error Message */}
							{submitError && (
								<motion.div
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									className="mt-6 rounded-lg border-2 border-red-200 bg-red-50 p-4"
								>
									<div className="flex items-start gap-3">
										<AlertCircle className="h-5 w-5 flex-shrink-0 text-red-600" />
										<div>
											<p className="font-semibold text-red-900">
												Submission Failed
											</p>
											<p className="mt-1 text-sm text-red-700">{submitError}</p>
										</div>
									</div>
								</motion.div>
							)}

							{/* Navigation Buttons */}
							<div className="mt-8 flex items-center justify-between border-t border-border pt-6">
								<button
									onClick={prevStep}
									disabled={currentStep === 1}
									className="flex items-center gap-2 rounded-lg px-6 py-3 font-semibold text-muted-foreground transition-colors hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
								>
									<ChevronLeft className="h-5 w-5" />
									Previous
								</button>

								{currentStep < totalSteps ? (
									<button
										onClick={nextStep}
										disabled={!validateStep(currentStep)}
										className="flex items-center gap-2 rounded-lg bg-primary px-8 py-3 font-semibold text-primary-foreground shadow-lg transition-all hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
									>
										Next
										<ChevronRight className="h-5 w-5" />
									</button>
								) : (
									<button
										onClick={handleSubmit}
										disabled={!validateStep(currentStep) || isSubmitting}
										className="flex items-center gap-2 rounded-lg bg-primary px-8 py-3 font-semibold text-primary-foreground shadow-lg transition-all hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
									>
										{isSubmitting ? (
											<>
												<Loader2 className="h-5 w-5 animate-spin" />
												Processing...
											</>
										) : (
											<>
												Proceed to Payment
												<CreditCard className="h-5 w-5" />
											</>
										)}
									</button>
								)}
							</div>
						</div>
					</div>

					{/* Sidebar - Plan Summary */}
					<div className="lg:col-span-1">
						<div className="sticky top-24 rounded-3xl border border-border bg-card p-6 shadow-lg">
							<h3 className="mb-4 font-display text-xl font-bold text-foreground">
								{plan.name} Plan
							</h3>

							<div className="mb-6 space-y-3 rounded-xl bg-muted/50 p-4">
								<div className="flex justify-between text-sm">
									<span className="text-muted-foreground">Setup Fee:</span>
									<span className="font-semibold text-foreground">
										₹{plan.setupFee?.toLocaleString('en-IN')}
									</span>
								</div>
								<div className="flex justify-between text-sm">
									<span className="text-muted-foreground">Year 1:</span>
									<span className="font-semibold text-foreground">
										₹{plan.price.toLocaleString('en-IN')}
									</span>
								</div>
								<div className="border-t border-border pt-3">
									<div className="flex justify-between">
										<span className="font-semibold text-foreground">
											Total:
										</span>
										<span className="font-bold text-foreground">
											₹
											{((plan.setupFee || 0) + plan.price).toLocaleString(
												'en-IN'
											)}
										</span>
									</div>
								</div>
							</div>

							<div className="mb-6 rounded-xl bg-green-50 p-4">
								<p className="mb-2 text-sm font-semibold text-green-900">
									Advance Payment (50%)
								</p>
								<p className="text-2xl font-bold text-green-900">
									₹{advancePayment}
								</p>
							</div>

							<div className="space-y-2">
								<p className="text-sm font-semibold text-foreground">
									Key Features:
								</p>
								{plan.features.slice(0, 5).map((feature) => (
									<div key={feature} className="flex items-start gap-2">
										<Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
										<span className="text-xs text-muted-foreground">
											{feature}
										</span>
									</div>
								))}
							</div>

							<div className="mt-6 rounded-xl border border-primary/20 bg-primary/5 p-4">
								<p className="text-xs text-muted-foreground">
									<strong className="text-foreground">Note:</strong> Remaining
									50% payment due upon project completion. Expected delivery in{' '}
									{plan.deliveryTime}.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
