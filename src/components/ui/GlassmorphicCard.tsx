'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface GlassmorphicCardProps {
	children: React.ReactNode;
	className?: string;
	delay?: number;
	hoverEffect?: boolean;
}

export function GlassmorphicCard({
	children,
	className = '',
	delay = 0,
	hoverEffect = true,
}: GlassmorphicCardProps) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 50, scale: 0.9 }}
			whileInView={{ opacity: 1, y: 0, scale: 1 }}
			viewport={{ once: true }}
			transition={{
				duration: 0.8,
				delay,
				type: 'spring',
				stiffness: 100,
			}}
			whileHover={
				hoverEffect
					? {
							y: -10,
							scale: 1.02,
							rotateX: 5,
							transition: { duration: 0.3 },
					  }
					: {}
			}
			className={`group relative overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-8 backdrop-blur-xl ${className}`}
			style={{
				background:
					'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
				boxShadow:
					'0 8px 32px 0 rgba(31, 38, 135, 0.15), inset 0 0 20px 0 rgba(255, 255, 255, 0.1)',
			}}
		>
			{/* Animated gradient overlay */}
			<motion.div
				className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
				style={{
					background:
						'radial-gradient(circle at 50% 0%, rgba(139, 92, 246, 0.2), transparent 70%)',
				}}
			/>

			{/* Shimmer effect */}
			<motion.div
				className="absolute inset-0 -translate-x-full"
				animate={{
					translateX: ['100%', '-100%'],
				}}
				transition={{
					duration: 3,
					repeat: Infinity,
					repeatDelay: 5,
					ease: 'linear',
				}}
				style={{
					background:
						'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
				}}
			/>

			<div className="relative z-10">{children}</div>
		</motion.div>
	);
}
