'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export function MorphingBlob() {
	return (
		<div className="pointer-events-none absolute inset-0 overflow-hidden">
			<svg
				className="h-full w-full"
				viewBox="0 0 400 400"
				xmlns="http://www.w3.org/2000/svg"
			>
				<defs>
					<linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
						<stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.3" />
						<stop offset="100%" stopColor="#EC4899" stopOpacity="0.3" />
					</linearGradient>
					<linearGradient id="gradient2" x1="100%" y1="0%" x2="0%" y2="100%">
						<stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
						<stop offset="100%" stopColor="#10B981" stopOpacity="0.3" />
					</linearGradient>
				</defs>
				<motion.path
					fill="url(#gradient1)"
					animate={{
						d: [
							'M 200,200 m -150,0 a 150,150 0 1,0 300,0 a 150,150 0 1,0 -300,0',
							'M 200,200 m -120,0 a 120,180 0 1,0 240,0 a 120,180 0 1,0 -240,0',
							'M 200,200 m -180,0 a 180,120 0 1,0 360,0 a 180,120 0 1,0 -360,0',
							'M 200,200 m -150,0 a 150,150 0 1,0 300,0 a 150,150 0 1,0 -300,0',
						],
					}}
					transition={{
						duration: 10,
						repeat: Infinity,
						ease: 'easeInOut',
					}}
				/>
				<motion.path
					fill="url(#gradient2)"
					animate={{
						d: [
							'M 300,200 m -100,0 a 100,100 0 1,0 200,0 a 100,100 0 1,0 -200,0',
							'M 300,200 m -120,0 a 120,80 0 1,0 240,0 a 120,80 0 1,0 -240,0',
							'M 300,200 m -80,0 a 80,120 0 1,0 160,0 a 80,120 0 1,0 -160,0',
							'M 300,200 m -100,0 a 100,100 0 1,0 200,0 a 100,100 0 1,0 -200,0',
						],
					}}
					transition={{
						duration: 8,
						repeat: Infinity,
						ease: 'easeInOut',
						delay: 1,
					}}
				/>
			</svg>
		</div>
	);
}
