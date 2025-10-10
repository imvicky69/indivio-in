// src/components/SectionHeading.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';

type SectionHeadingProps = {
	children: React.ReactNode;
	subtitle?: string;
};

export function SectionHeading({ children, subtitle }: SectionHeadingProps) {
	return (
		<div className="mb-16 text-center">
			<motion.div
				initial={{ opacity: 0, scale: 0 }}
				whileInView={{ opacity: 1, scale: 1 }}
				viewport={{ once: true }}
				transition={{ duration: 0.5 }}
				className="mx-auto mb-3 h-3 w-3 rounded-full bg-accent"
			></motion.div>
			<motion.h2
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.6 }}
				className="section-heading text-foreground"
			>
				{children}
			</motion.h2>
			{subtitle && (
				<motion.p
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.2 }}
					className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground"
				>
					{subtitle}
				</motion.p>
			)}
		</div>
	);
}
