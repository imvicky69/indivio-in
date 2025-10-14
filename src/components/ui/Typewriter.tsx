'use client';

import React, { useEffect, useState } from 'react';

interface TypewriterProps {
	text: string;
	speed?: number;
	delay?: number;
	className?: string;
	onComplete?: () => void;
}

export function Typewriter({
	text,
	speed = 50,
	delay = 0,
	className = '',
	onComplete,
}: TypewriterProps) {
	const [displayText, setDisplayText] = useState('');
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isDelaying, setIsDelaying] = useState(delay > 0);

	useEffect(() => {
		if (isDelaying) {
			const delayTimer = setTimeout(() => {
				setIsDelaying(false);
			}, delay);
			return () => clearTimeout(delayTimer);
		}

		if (currentIndex < text.length) {
			const timer = setTimeout(() => {
				setDisplayText((prev) => prev + text[currentIndex]);
				setCurrentIndex((prev) => prev + 1);
			}, speed);

			return () => clearTimeout(timer);
		} else if (onComplete) {
			onComplete();
		}
	}, [currentIndex, text, speed, delay, isDelaying, onComplete]);

	return (
		<span className={className}>
			{displayText}
			{currentIndex < text.length && (
				<span className="animate-pulse">|</span>
			)}
		</span>
	);
}
