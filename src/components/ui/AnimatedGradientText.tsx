'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedGradientTextProps {
	children: React.ReactNode;
	className?: string;
}

export function AnimatedGradientText({
	children,
	className = '',
}: AnimatedGradientTextProps) {
	return (
		<motion.div
			className={`bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent ${className}`}
			animate={{
				backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
			}}
			transition={{
				duration: 5,
				repeat: Infinity,
				ease: 'linear',
			}}
			style={{
				backgroundSize: '200% 200%',
			}}
		>
			{children}
		</motion.div>
	);
}
