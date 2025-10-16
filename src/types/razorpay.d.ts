/**
 * Type definitions for Razorpay
 */

interface RazorpayOptions {
	key: string;
	amount: number;
	currency: string;
	name: string;
	description?: string;
	image?: string;
	order_id: string;
	handler: (response: RazorpaySuccessResponse) => void;
	prefill?: {
		name?: string;
		email?: string;
		contact?: string;
	};
	notes?: Record<string, string>;
	theme?: {
		color?: string;
		backdrop_color?: string;
		hide_topbar?: boolean;
	};
	modal?: {
		ondismiss?: () => void;
		animation?: boolean;
		backdropclose?: boolean;
		escape?: boolean;
		handleback?: boolean;
		confirm_close?: boolean;
	};
}

interface RazorpaySuccessResponse {
	razorpay_payment_id: string;
	razorpay_order_id: string;
	razorpay_signature: string;
}

interface RazorpayInstance {
	open(): void;
	close(): void;
}

interface RazorpayStatic {
	new (options: RazorpayOptions): RazorpayInstance;
}

interface Window {
	Razorpay: RazorpayStatic;
}
