// PhonePe API Response Types
export interface PhonePeInitiateResponse {
	success: boolean;
	message: string;
	data: {
		orderId: string;
		transactionId: string;
		redirectUrl: string;
		amount?: number;
		state?: string;
		expireAt?: number;
	};
}

export interface PhonePeStatusResponse {
	success: boolean;
	message: string;
	data: {
		orderId: string;
		state: 'PENDING' | 'COMPLETED' | 'SUCCESS' | 'FAILED' | 'CANCELLED';
		amount: number;
		expireAt: number;
		transactionId?: string;
		paymentDetails?: any[];
	};
}

// User registration response
export interface UserRegistrationResponse {
	success: boolean;
	message: string;
	userId?: string;
}
