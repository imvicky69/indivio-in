export function SectionDivider() {
	return (
		<div className="relative py-8">
			<div className="container mx-auto px-6">
				<div className="relative h-px bg-gradient-to-r from-transparent via-border to-transparent">
					<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
						<div className="flex gap-2">
							<div className="h-2 w-2 rounded-full bg-primary/50"></div>
							<div className="h-2 w-2 rounded-full bg-primary/30"></div>
							<div className="h-2 w-2 rounded-full bg-primary/50"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
