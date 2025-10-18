'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info } from 'lucide-react';

interface TooltipProps {
	content: string;
	children?: React.ReactNode;
	icon?: boolean;
}

export function Tooltip({ content, children, icon = true }: TooltipProps) {
	const [isVisible, setIsVisible] = useState(false);

	return (
		<div className="relative inline-flex">
			<button
				type="button"
				onMouseEnter={() => setIsVisible(true)}
				onMouseLeave={() => setIsVisible(false)}
				onClick={() => setIsVisible(!isVisible)}
				className="inline-flex cursor-help items-center focus:outline-none"
				aria-label="More information"
			>
				{children || (
					<Info className="h-4 w-4 text-muted-foreground transition-colors hover:text-primary" />
				)}
			</button>

			<AnimatePresence>
				{isVisible && (
					<motion.div
						initial={{ opacity: 0, y: 5, scale: 0.95 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: 5, scale: 0.95 }}
						transition={{ duration: 0.15 }}
						className="absolute bottom-full left-1/2 z-50 mb-2 w-64 -translate-x-1/2"
					>
						<div className="rounded-lg border border-border bg-popover p-3 shadow-lg">
							<div className="text-xs leading-relaxed text-popover-foreground">
								{content}
							</div>
						</div>
						{/* Arrow */}
						<div className="absolute left-1/2 top-full -mt-1 -translate-x-1/2">
							<div className="h-2 w-2 rotate-45 border-b border-r border-border bg-popover"></div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
