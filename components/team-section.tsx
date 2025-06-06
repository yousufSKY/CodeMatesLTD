"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { CarouselApi } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";

const teamMembers = [
	{
		name: "Shrinivas Nadegar",
		role: "CEO & Data Scientist",
		avatar: "SN",
		bio: "Founder and visionary with a passion for data-driven solutions", social: {
			linkedin: "https://www.linkedin.com/in/shrinivas-nadager/",
			email: "shrinivasnadager03@gmail.com",
		},
	},
	{
		name: "SKY",
		role: "Full Stack Developer & Designer",
		avatar: "SKY",
		bio: "Expert in full stack development with a focus on scalable solutions",
		social: {
			linkedin: "https://www.linkedin.com/in/syed-yousufuddin-a64265276/",
			email: "skyousuf22@outlook.com",
		},
	},
	{
		name: "Narasareddy",
		role: "Front End Developer",
		avatar: "NR",
		bio: "Passionate about creating intuitive and beautiful user experiences",
		social: {
			linkedin: "http://linkedin.com/in/narasareddy-annepu-17a233319",
			email: "narasareddy@codemates.in",
		},
	},
	{
		name: "Syed Danish",
		role: "Backend Developer | Data Analyst",
		avatar: "SD",
		bio: "Backend specialist with a knack for data analytics and optimization", social: {
			linkedin: "https://www.linkedin.com/in/syed-danish-354259251?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
			email: "syeddanish1092@gmail.com",
		},
	},
	{
		name: "Basvaraj H. Gurikar",
		role: "Security Engineer | Data analyst",
		avatar: "BG",
		bio: "Security-focused engineer ensuring robust and secure systems",
		social: {
			linkedin: "https://www.linkedin.com/in/basavaraj-h-gurikar-95b739284?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
			email: "basvaraj@codemates.in",
		},
	},
	{
		name: "Ramchandra",
		role: "UI/UX Designer | Software Engineer",
		avatar: "RM",
		bio: "UI/UX designer with a passion for creating user-centric designs",
		social: {
			linkedin: "https://www.linkedin.com/in/ramchandra-a-730876284?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
			email: "rajalasangi@gmail.com ",
		},
	}
];

const gradients = [
	"from-purple-500 via-pink-500 to-rose-500",
	"from-blue-500 via-cyan-500 to-teal-500",
	"from-orange-500 via-amber-500 to-yellow-500",
	"from-green-500 via-emerald-500 to-teal-500",
	"from-violet-500 via-purple-500 to-fuchsia-500",
	"from-rose-500 via-pink-500 to-purple-500",
	"from-cyan-500 via-blue-500 to-indigo-500",
	"from-fuchsia-500 via-purple-500 to-violet-500",
];

const getGradient = (index: number) => {
	return gradients[index % gradients.length];
};

export default function TeamSection() {
	const sectionRef = useRef<HTMLElement>(null);
	const [api, setApi] = useState<CarouselApi>();
	const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

	useEffect(() => {
		if (!api) return;

		const interval = setInterval(() => {
			api.scrollNext();
		}, 3000); // Change slide every 3 seconds

		return () => clearInterval(interval);
	}, [api]);

	return (
		<section
			id="team"
			ref={sectionRef}
			className="py-24 w-full"
		>
			<div className="container mx-auto px-4 md:px-6 max-w-7xl">
				{/* Background decoration */}
				<div className="absolute inset-0 bg-grid-white/5 [mask-image:radial-gradient(white,transparent_70%)] pointer-events-none" />

				<div className="relative">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={
							isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
						}
						transition={{ duration: 0.5 }}
						className="text-center mb-16"
					>
						<h2 className="text-3xl md:text-4xl font-bold mb-4">
							Meet Our Team
						</h2>
						<p className="text-muted-foreground text-lg max-w-3xl mx-auto">
							Our diverse team of experts brings together years of experience in
							software development, design, and innovation to deliver exceptional
							results for our clients.
						</p>
					</motion.div>

					<Carousel
						opts={{
							align: "center",
							loop: true,
							dragFree: true
						}}
						setApi={setApi}
						className="w-full max-w-6xl mx-auto"
					>
						<CarouselContent className="-ml-2 md:-ml-4">
							{teamMembers.map((member, index) => (
								<CarouselItem key={member.name} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
									<motion.div
										initial={{ opacity: 0, y: 20 }}
										animate={
											isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
										}
										transition={{ duration: 0.5, delay: index * 0.1 }}
										className="group text-center relative"
									>
										{/* Circular avatar frame with rotating gradient border */}
										<div className="relative mb-8 mx-auto w-36 h-36">
											{/* Outer rotating gradient ring */}
											<div
												className={cn(
													"absolute inset-0 rounded-full bg-gradient-to-r opacity-75 group-hover:opacity-100 transition-opacity duration-500",
													getGradient(index),
													"animate-[spin_4s_linear_infinite] group-hover:animate-[spin_2s_linear_infinite]"
												)}
											/>

											{/* Inner background */}
											<div className="absolute inset-[3px] rounded-full bg-background" />

											{/* Main content */}
											<div className="absolute inset-[4px] rounded-full bg-gradient-to-r from-background to-background/80 
												flex items-center justify-center transform group-hover:scale-105 transition-transform duration-500">
												<Avatar className="h-24 w-24 ring-2 ring-background shadow-lg">
													<AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-primary/80 to-primary text-background">
														{member.avatar}
													</AvatarFallback>
												</Avatar>
											</div>
										</div>

										{/* Content with glass effect */}
										<div className={cn(
											"relative space-y-3 p-4 rounded-xl backdrop-blur-sm",
											"bg-gradient-to-b from-background/95 to-background/50",
											"shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]",
											"transform group-hover:-translate-y-2 transition-transform duration-500"
										)}>
											<motion.h3
												className="font-semibold text-lg"
												initial={{ opacity: 0 }}
												animate={{ opacity: 1 }}
												transition={{ delay: 0.2 }}
											>
												{member.name}
											</motion.h3>
											<motion.p
												className="text-primary font-medium"
												initial={{ opacity: 0 }}
												animate={{ opacity: 1 }}
												transition={{ delay: 0.3 }}
											>
												{member.role}
											</motion.p>
											<motion.p
												className="text-sm text-muted-foreground/80 leading-relaxed"
												initial={{ opacity: 0 }}
												animate={{ opacity: 1 }}
												transition={{ delay: 0.4 }}
											>
												{member.bio}
											</motion.p>
											<motion.div
												className="flex justify-center gap-4 pt-3"
												initial={{ opacity: 0 }}
												animate={{ opacity: 1 }}
												transition={{ delay: 0.5 }}
											>
												{/* Social links with hover effects */}											<Link
													href={member.social.linkedin}
													target="_blank"
													rel="noopener noreferrer"
													className="text-muted-foreground/60 hover:text-primary hover:scale-110 transform transition-all duration-300"
													title={`Connect with ${member.name} on LinkedIn`}
												>
													<Linkedin className="h-5 w-5" />
												</Link>
												<Link
													href={`mailto:${member.social.email}`}
													className="text-muted-foreground/60 hover:text-primary hover:scale-110 transform transition-all duration-300"
													title={`Email ${member.name}`}
												>
													<Mail className="h-5 w-5" />
												</Link>
											</motion.div>
										</div>
									</motion.div>
								</CarouselItem>
							))}
						</CarouselContent>
						<CarouselPrevious className="hidden md:flex -left-12" />
						<CarouselNext className="hidden md:flex -right-12" />
					</Carousel>
				</div>
			</div>
		</section>
	);
}
