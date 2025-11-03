// src/components/ui/FloatingActionButton.tsx
'use client';

import { useState } from 'react';
import { MessageCircle, X, Phone, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function FloatingActionButton() {
	const [isOpen, setIsOpen] = useState(false);

	const actions = [
		{
			icon: Phone,
			label: 'Call Us',
			href: 'tel:+919211641566',
			color: 'bg-green-500 hover:bg-green-600',
		},
		{
			icon: Mail,
			label: 'Email Us',
			href: 'mailto:indivio.in@gmail.com',
			color: 'bg-blue-500 hover:bg-blue-600',
		},
		{
			icon: MessageCircle,
			label: 'WhatsApp',
			href: 'https://wa.me/919211641566',
			color: 'bg-green-600 hover:bg-green-700',
		},
	];

	return (
		<div className="fixed bottom-6 right-6 z-50">
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 20 }}
						className="mb-4 flex flex-col gap-3"
					>
						{actions.map((action, index) => {
							const IconComponent = action.icon;
							return (
								<motion.a
									key={index}
									initial={{ opacity: 0, x: 20 }}
									animate={{ opacity: 1, x: 0 }}
									exit={{ opacity: 0, x: 20 }}
									transition={{ delay: index * 0.1 }}
									href={action.href}
									target="_blank"
									rel="noopener noreferrer"
									className={`group flex items-center gap-3 rounded-full ${action.color} px-4 py-3 text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl`}
								>
									<IconComponent className="h-5 w-5" />
									<span className="whitespace-nowrap font-medium">
										{action.label}
									</span>
								</motion.a>
							);
						})}
					</motion.div>
				)}
			</AnimatePresence>

			<motion.button
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.9 }}
				onClick={() => setIsOpen(!isOpen)}
				className={`flex h-14 w-14 items-center justify-center rounded-full shadow-2xl transition-all duration-300 ${
					isOpen
						? 'bg-red-500 hover:bg-red-600'
						: 'bg-primary hover:bg-primary/90'
				}`}
				aria-label={isOpen ? 'Close menu' : 'Open contact menu'}
			>
				{isOpen ? (
					<X className="h-6 w-6 text-white" />
				) : (
					<MessageCircle className="h-6 w-6 text-white" />
				)}
			</motion.button>
		</div>
	);
}
