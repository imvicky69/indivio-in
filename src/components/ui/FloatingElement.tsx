'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface FloatingElementProps {
	children: React.ReactNode;
	className?: string;
	delay?: number;
	duration?: number;
}

export function FloatingElement({
	children,
	className = '',
	delay = 0,
	duration = 3,
}: FloatingElementProps) {
	return (
		<motion.div
			className={className}
			initial={{ y: 0 }}
			animate={{
				y: [0, -20, 0],
			}}
			transition={{
				duration,
				repeat: Infinity,
				ease: 'easeInOut',
				delay,
			}}
		>
			{children}
		</motion.div>
	);
}
