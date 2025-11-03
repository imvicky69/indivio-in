// src/components/about/TeamSection.tsx
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Linkedin, Mail } from 'lucide-react';

const team = [
	{
		name: 'Vikky Raja',
		role: 'Founder & CEO',
		image: '/profile-photo.jpeg',
		bio: 'Passionate about making education technology accessible to all',
		linkedin: 'https://linkedin.com/in/imvicky69',
		email: 'rajvicky97988@gmail.com',
	},
	{
		name: 'Tech Team',
		role: 'Development',
		image: '/fevicon.png',
		bio: 'Building innovative solutions for modern education',
		linkedin: 'https://linkedin.com/company/indivio-tech',
		email: 'indivio.in@gmail.com',
	},
	{
		name: 'Support Team',
		role: 'Customer Success',
		image: '/fevicon.png',
		bio: 'Ensuring every school gets the best experience',
		linkedin: 'https://linkedin.com/company/indivio-tech',
		email: 'indivio.in@gmail.com',
	},
];

export function TeamSection() {
	return (
		<section className="section-padding bg-gradient-to-b from-background to-muted/30">
			<div className="container mx-auto px-6">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="mb-16 text-center"
				>
					<h2 className="mb-4 font-display text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
						Meet Our Team
					</h2>
					<p className="mx-auto max-w-2xl text-lg text-muted-foreground">
						Dedicated professionals working to transform education
					</p>
				</motion.div>

				<div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
					{team.map((member, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
							className="group overflow-hidden rounded-2xl border border-border bg-card shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
						>
							{/* Image */}
							<div className="relative h-64 w-full overflow-hidden bg-gradient-to-br from-primary/10 to-green-500/10">
								<Image
									src={member.image}
									alt={member.name}
									fill
									className="object-cover transition-transform duration-300 group-hover:scale-110"
								/>
								{/* Overlay on hover */}
								<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
								
								{/* Social links on hover */}
								<div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
									<a
										href={member.linkedin}
										target="_blank"
										rel="noopener noreferrer"
										className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-primary transition-all hover:bg-white hover:scale-110"
										aria-label="LinkedIn"
									>
										<Linkedin className="h-5 w-5" />
									</a>
									<a
										href={`mailto:${member.email}`}
										className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-primary transition-all hover:bg-white hover:scale-110"
										aria-label="Email"
									>
										<Mail className="h-5 w-5" />
									</a>
								</div>
							</div>

							{/* Content */}
							<div className="p-6 text-center">
								<h3 className="mb-1 font-display text-xl font-bold text-foreground">
									{member.name}
								</h3>
								<p className="mb-3 text-sm font-semibold text-primary">
									{member.role}
								</p>
								<p className="text-sm text-muted-foreground">{member.bio}</p>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
