'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ShinyButtonProps {
	children: React.ReactNode;
	href?: string;
	onClick?: () => void;
	className?: string;
}

export function ShinyButton({
	children,
	href,
	onClick,
	className = '',
}: ShinyButtonProps) {
	const content = (
		<motion.button
			onClick={onClick}
			whileHover={{ scale: 1.05 }}
			whileTap={{ scale: 0.95 }}
			className={`group relative overflow-hidden rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 px-8 py-4 font-bold text-white shadow-2xl transition-all ${className}`}
		>
			<span className="relative z-10">{children}</span>
			{/* Shiny overlay */}
			<motion.div
				className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
				animate={{
					translateX: ['-100%', '100%'],
				}}
				transition={{
					duration: 1.5,
					repeat: Infinity,
					repeatDelay: 2,
					ease: 'easeInOut',
				}}
			/>
			{/* Glow effect */}
			<motion.div
				className="absolute inset-0 opacity-0 blur-xl transition-opacity group-hover:opacity-100"
				style={{
					background:
						'radial-gradient(circle, rgba(139, 92, 246, 0.5), transparent 70%)',
				}}
			/>
		</motion.button>
	);

	if (href) {
		return (
			<a href={href} className="inline-block">
				{content}
			</a>
		);
	}

	return content;
}
