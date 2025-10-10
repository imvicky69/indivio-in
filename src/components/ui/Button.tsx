// src/components/ui/Button.tsx
import React from 'react';
import Link from 'next/link';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
	'inline-flex items-center justify-center px-8 py-3.5 font-semibold rounded-full transition-all duration-300 ease-in-out w-full sm:w-auto text-center transform hover:-translate-y-0.5 active:translate-y-0',
	{
		variants: {
			variant: {
				primary:
					'bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl',
				secondary:
					'bg-background text-foreground border-2 border-border hover:bg-muted hover:border-primary/30 shadow-md hover:shadow-lg',
				accent:
					'bg-green-600 text-white hover:bg-green-700 shadow-lg hover:shadow-xl',
			},
		},
		defaultVariants: {
			variant: 'primary',
		},
	}
);

export interface ButtonProps
	extends React.ComponentProps<typeof Link>,
		VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLAnchorElement, ButtonProps>(
	({ className, variant, ...props }, ref) => {
		return (
			<Link
				ref={ref}
				className={cn(buttonVariants({ variant, className }))}
				{...props}
			/>
		);
	}
);
Button.displayName = 'Button';

export { Button, buttonVariants };
