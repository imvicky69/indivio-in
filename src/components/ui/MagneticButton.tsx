'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface MagneticButtonProps {
	children: React.ReactNode;
	href?: string;
	className?: string;
	onClick?: () => void;
	variant?: 'primary' | 'secondary' | 'ghost';
}

export function MagneticButton({
	children,
	href,
	className = '',
	onClick,
	variant = 'primary',
}: MagneticButtonProps) {
	const ref = useRef<HTMLDivElement>(null);
	const [position, setPosition] = useState({ x: 0, y: 0 });

	const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!ref.current) return;
		const { clientX, clientY } = e;
		const { width, height, left, top } = ref.current.getBoundingClientRect();
		const x = (clientX - (left + width / 2)) * 0.3;
		const y = (clientY - (top + height / 2)) * 0.3;
		setPosition({ x, y });
	};

	const reset = () => {
		setPosition({ x: 0, y: 0 });
	};

	const variantStyles = {
		primary:
			'bg-gradient-to-r from-primary via-purple-600 to-pink-600 text-white hover:shadow-2xl hover:shadow-purple-500/50',
		secondary:
			'bg-gradient-to-r from-green-500 via-teal-500 to-blue-500 text-white hover:shadow-2xl hover:shadow-teal-500/50',
		ghost:
			'bg-transparent border-2 border-primary text-primary hover:bg-primary/10 hover:shadow-xl hover:shadow-primary/30',
	};

	const content = (
		<motion.div
			ref={ref}
			onMouseMove={handleMouse}
			onMouseLeave={reset}
			animate={{ x: position.x, y: position.y }}
			transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
			className={`relative inline-block cursor-pointer ${className}`}
		>
			<motion.div
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
				className={`relative overflow-hidden rounded-full px-8 py-4 font-bold transition-all duration-300 ${variantStyles[variant]}`}
			>
				<span className="relative z-10">{children}</span>
				<motion.div
					className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
					initial={{ x: '-100%' }}
					whileHover={{ x: '100%' }}
					transition={{ duration: 0.6 }}
				/>
			</motion.div>
		</motion.div>
	);

	if (href) {
		return (
			<Link href={href} onClick={onClick}>
				{content}
			</Link>
		);
	}

	return <div onClick={onClick}>{content}</div>;
}
