"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowLeft, Briefcase, Users, Target, Award, Rocket, ChartBar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const journeySections = [
	{
		year: "2024",
		title: "Foundation",
		description:
			"Codemates LTD was founded with a vision to transform businesses through innovative tech solutions.",
		icon: Rocket,
	},
	{
		year: "2024",
		title: "Team Growth",
		description:
			"Built a diverse team of experts in software development, design, and data science.",
		icon: Users,
	},
	{
		year: "2025",
		title: "Project Success",
		description:
			"Successfully delivered multiple high-impact projects across various industries.",
		icon: Briefcase,
	},
	{
		year: "2025",
		title: "Recognition",
		description:
			"Recognized for excellence in delivering innovative solutions and maintaining high client satisfaction.",
		icon: Award,
	},
];

const values = [
	{
		title: "Innovation",
		description: "Pushing boundaries with cutting-edge solutions",
		icon: Rocket,
	},
	{
		title: "Excellence",
		description: "Delivering exceptional quality in every project",
		icon: Award,
	},
	{
		title: "Collaboration",
		description: "Working together to achieve remarkable results",
		icon: Users,
	},
	{
		title: "Growth",
		description: "Continuously evolving and improving",
		icon: ChartBar,
	},
	{
		title: "Client Focus",
		description: "Putting our clients' success first",
		icon: Target,
	},
];

export default function AboutPage() {
	const sectionRef = useRef<HTMLElement>(null);
	const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

	return (
		<main className="flex-1" ref={sectionRef}>
			{/* Hero Section */}
			<section className="relative py-12 md:py-24 overflow-hidden">
				{/* Gradient background */}
				<div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />

				{/* Background pattern */}
				<div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />				<div className="container relative z-10 px-4 md:px-6">
					<Button 
						variant="ghost" 
						className="group mb-4 md:mb-8 w-full sm:w-auto"
						asChild
					>
						<Link 
							href="/#about"
							className="flex items-center justify-center sm:justify-start w-full py-2"
						>
							<ArrowLeft className="w-5 h-5 sm:w-4 sm:h-4 mr-2 transition-transform group-hover:-translate-x-1" />
							Back to Home
						</Link>
					</Button>

					<div className="max-w-3xl">
						<motion.h1
							className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6"
							initial={{ opacity: 0, y: 20 }}
							animate={
								isInView
									? { opacity: 1, y: 0 }
									: { opacity: 0, y: 20 }
							}
							transition={{ duration: 0.5 }}
						>
							Our Story
						</motion.h1>
						<motion.p
							className="text-lg sm:text-xl text-muted-foreground"
							initial={{ opacity: 0, y: 20 }}
							animate={
								isInView
									? { opacity: 1, y: 0 }
									: { opacity: 0, y: 20 }
							}
							transition={{ duration: 0.5, delay: 0.1 }}
						>
							We are a team of passionate technologists dedicated to transforming
							businesses through innovative solutions. Our journey is driven by the
							pursuit of excellence and the desire to make a lasting impact.
						</motion.p>
					</div>
				</div>
			</section>

			{/* Company Journey */}
			<section className="py-12 md:py-24 bg-muted/30">
				<div className="container px-4 md:px-6">
					<motion.div
						className="max-w-3xl mx-auto text-center mb-8 md:mb-16"
						initial={{ opacity: 0, y: 20 }}
						animate={
							isInView
								? { opacity: 1, y: 0 }
								: { opacity: 0, y: 20 }
						}
						transition={{ duration: 0.5 }}
					>
						<h2 className="text-2xl sm:text-3xl font-bold mb-3 md:mb-4">
							Our Journey
						</h2>
						<p className="text-base sm:text-lg text-muted-foreground">
							From our founding to present day, every step has been guided by our
							commitment to excellence and innovation.
						</p>
					</motion.div>

					<div className="relative max-w-4xl mx-auto">
						{/* Timeline line - hidden on mobile */}
						<div className="hidden md:block absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-border" />

						{journeySections.map((section, index) => (
							<motion.div
								key={section.title}
								initial={{ opacity: 0, y: 20 }}
								animate={
									isInView
										? { opacity: 1, y: 0 }
										: { opacity: 0, y: 20 }
								}
								transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
								className="relative mb-8 md:mb-12 last:mb-0"
							>
								<div
									className={cn(
										"flex items-center gap-4 md:gap-8",
										"flex-col md:flex-row",
										index % 2 === 0 ? "md:flex-row-reverse" : ""
									)}
								>
									{/* Timeline node */}
									<div
										className={cn(
											"w-12 h-12 rounded-full bg-background border-4 border-primary flex items-center justify-center",
											"relative md:absolute md:left-1/2 md:transform md:-translate-x-1/2"
										)}
									>
										<section.icon className="w-5 h-5 text-primary" />
									</div>

									{/* Content card */}
									<div
										className={cn(
											"w-full md:w-[calc(50%-2rem)]",
											"text-center md:text-left",
											index % 2 === 0 ? "md:text-right" : ""
										)}
									>
										<Card className="p-4 md:p-6 hover:shadow-lg transition-shadow">
											<div className="text-sm font-medium text-primary mb-2">
												{section.year}
											</div>
											<h3 className="text-lg sm:text-xl font-semibold mb-2">
												{section.title}
											</h3>
											<p className="text-sm sm:text-base text-muted-foreground">
												{section.description}
											</p>
										</Card>
									</div>

									{/* Spacer - only visible on desktop */}
									<div className="hidden md:block w-[calc(50%-2rem)]" />
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Our Values */}
			<section className="py-12 md:py-24">
				<div className="container px-4 md:px-6">
					<motion.div
						className="max-w-3xl mx-auto text-center mb-8 md:mb-16"
						initial={{ opacity: 0, y: 20 }}
						animate={
							isInView
								? { opacity: 1, y: 0 }
								: { opacity: 0, y: 20 }
						}
						transition={{ duration: 0.5 }}
					>
						<h2 className="text-2xl sm:text-3xl font-bold mb-3 md:mb-4">
							Our Values
						</h2>
						<p className="text-base sm:text-lg text-muted-foreground">
							These core values guide everything we do and shape how we work with
							our clients and each other.
						</p>
					</motion.div>

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 max-w-5xl mx-auto">
						{values.map((value, index) => (
							<motion.div
								key={value.title}
								initial={{ opacity: 0, y: 20 }}
								animate={
									isInView
										? { opacity: 1, y: 0 }
										: { opacity: 0, y: 20 }
								}
								transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
							>
								<Card className="p-4 md:p-6 h-full hover:shadow-lg transition-shadow group">
									<div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
										<value.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
									</div>
									<h3 className="text-lg sm:text-xl font-semibold mb-2">
										{value.title}
									</h3>
									<p className="text-sm sm:text-base text-muted-foreground">
										{value.description}
									</p>
								</Card>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Team Culture */}
			<section className="py-12 md:py-24 bg-muted/30">
				<div className="container px-4 md:px-6">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
						<motion.div
							initial={{ opacity: 0, x: -50 }}
							animate={
								isInView
									? { opacity: 1, x: 0 }
									: { opacity: 0, x: -50 }
							}
							transition={{ duration: 0.5 }}
							className="space-y-4 md:space-y-6"
						>
							<h2 className="text-2xl sm:text-3xl font-bold">Our Culture</h2>
							<div className="space-y-3 sm:space-y-4">
								<p className="text-base sm:text-lg text-muted-foreground">
									At Codemates LTD, we foster a culture of innovation,
									collaboration, and continuous learning. Our team members are
									encouraged to think creatively, take initiative, and contribute
									to our collective growth.
								</p>
								<p className="text-base sm:text-lg text-muted-foreground">
									We believe in maintaining a healthy work-life balance and
									creating an environment where everyone can thrive both
									professionally and personally.
								</p>
								<p className="text-base sm:text-lg text-muted-foreground">
									Our open and inclusive culture ensures that every team member's
									voice is heard and valued, leading to better solutions and
									stronger relationships with our clients.
								</p>
							</div>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, x: 50 }}
							animate={
								isInView
									? { opacity: 1, x: 0 }
									: { opacity: 0, x: 50 }
							}
							transition={{ duration: 0.5 }}
							className="relative aspect-video rounded-xl md:rounded-2xl overflow-hidden shadow-lg md:shadow-2xl"
						>
							<Image
								src="https://images.pexels.com/photos/3182811/pexels-photo-3182811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
								alt="Team Culture"
								fill
								className="object-cover"
								sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
								priority
							/>
							<div className="absolute inset-0 bg-gradient-to-tr from-background/80 via-background/50 to-transparent mix-blend-overlay" />
						</motion.div>
					</div>
				</div>
			</section>
		</main>
	);
}
