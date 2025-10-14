'use client';

import React, { useEffect, useRef } from 'react';

interface Star {
	x: number;
	y: number;
	size: number;
	speed: number;
}

export function StarryBackground() {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const starsRef = useRef<Star[]>([]);
	const animationRef = useRef<number>();

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		const resizeCanvas = () => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		};

		resizeCanvas();
		window.addEventListener('resize', resizeCanvas);

		// Initialize stars
		const starCount = 100;
		starsRef.current = Array.from({ length: starCount }, () => ({
			x: Math.random() * canvas.width,
			y: Math.random() * canvas.height,
			size: Math.random() * 2,
			speed: Math.random() * 0.5 + 0.1,
		}));

		const animate = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			starsRef.current.forEach((star) => {
				// Draw star
				ctx.beginPath();
				ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
				ctx.fillStyle = `rgba(139, 92, 246, ${0.5 + Math.random() * 0.5})`;
				ctx.fill();

				// Move star
				star.y += star.speed;

				// Reset star when it goes off screen
				if (star.y > canvas.height) {
					star.y = 0;
					star.x = Math.random() * canvas.width;
				}
			});

			animationRef.current = requestAnimationFrame(animate);
		};

		animate();

		return () => {
			window.removeEventListener('resize', resizeCanvas);
			if (animationRef.current) {
				cancelAnimationFrame(animationRef.current);
			}
		};
	}, []);

	return (
		<canvas
			ref={canvasRef}
			className="pointer-events-none absolute inset-0 z-0"
			style={{ opacity: 0.3 }}
		/>
	);
}
