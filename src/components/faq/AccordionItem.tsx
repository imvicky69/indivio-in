// src/components/AccordionItem.tsx
'use client';
import { ChevronDown } from 'lucide-react';

type AccordionItemProps = {
	question: string;
	answer: string;
	isOpen: boolean;
	onToggle: () => void;
};

export function AccordionItem({
	question,
	answer,
	isOpen,
	onToggle,
}: AccordionItemProps) {
	return (
		<div className="border-b border-slate-200">
			<button
				onClick={onToggle}
				className="flex w-full items-center justify-between gap-4 py-4 text-left"
			>
				<span className="text-dark text-lg font-medium">{question}</span>
				<ChevronDown
					className={`h-6 w-6 flex-shrink-0 text-primary transition-transform duration-300 ${
						isOpen ? 'rotate-180' : ''
					}`}
				/>
			</button>
			<div
				className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
					isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
				}`}
			>
				<div className="overflow-hidden">
					<div className="prose text-dark/70 pb-4">{answer}</div>
				</div>
			</div>
		</div>
	);
}
