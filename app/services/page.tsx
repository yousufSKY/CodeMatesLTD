"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowLeft, DollarSign, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const services = [
	{
		name: "UI/UX Design",
		description:
			"Transform your digital presence with intuitive and beautiful user interface designs that delight your users.",
		price: { startingFrom: "₹5,000" },
		features: [
			"User Research & Analysis",
			"Wireframing & Prototyping",
			"User Interface Design",
			"Usability Testing",
		],
	},
	{
		name: "Full Stack Web Development",
		description:
			"End-to-end web development solutions that bring your vision to life with modern technologies and best practices.",
		price: { startingFrom: "₹20,000" },
		features: [
			"Custom Web Applications",
			"Responsive Design",
			"API Development",
			"Database Design",
		],
	},
	{
		name: "Data Analysis",
		description:
			"Turn your data into actionable insights with comprehensive analysis and visualization solutions.",
		price: { startingFrom: "₹10,000" },
		features: [
			"Data Collection & Cleaning",
			"Statistical Analysis",
			"Interactive Dashboards",
			"Business Intelligence",
		],
	},
	{
		name: "Data Science",
		description:
			"Leverage advanced data science techniques to unlock the power of your data and drive business growth.",
		price: { startingFrom: "₹20,000" },
		features: [
			"Predictive Analytics",
			"Data Mining",
			"Statistical Modeling",
			"Business Insights",
		],
	},
	{
		name: "Machine Learning Models",
		description:
			"Custom AI solutions that automate processes and provide intelligent insights for your business.",
		price: { startingFrom: "₹10,000" },
		features: [
			"Custom ML Models",
			"Model Training & Testing",
			"AI Integration",
			"Performance Optimization",
		],
	},
	{
		name: "Internet of Things (IoT)",
		description:
			"Connect your physical devices to the digital world with custom IoT solutions and integrations.",
		price: { custom: true, note: "Based on models and requirements" },
		features: [
			"IoT Architecture Design",
			"Device Integration",
			"Real-time Monitoring",
			"Data Collection & Analysis",
		],
	},
	{
		name: "Debugging & Optimization",
		description:
			"Resolve issues and improve performance of your existing systems with expert debugging services.",
		price: { custom: true, note: "Based on problem complexity" },
		features: [
			"Performance Analysis",
			"Bug Fixing",
			"Code Optimization",
			"System Tuning",
		],
	},
	{
		name: "Frontend & Backend",
		description:
			"Specialized development services for either frontend interfaces or backend systems and APIs.",
		price: { startingFrom: "₹10,000" },
		features: [
			"Frontend Development",
			"Backend Systems",
			"API Development",
			"Database Design",
		],
	},
	{
		name: "Request Custom Service",
		description:
			"Don't see what you need? Let's discuss your unique requirements and create a tailored solution just for you.",
		price: { min: 0, max: 0 },
		features: [
			"Customized Solutions",
			"Flexible Requirements",
			"Personalized Consultation",
			"Tailored Pricing",
		],
		isCustom: true,
	},
];

export default function ServicesPage() {
	const sectionRef = useRef<HTMLElement>(null);
	const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

	return (
		<main className="flex-1 w-full min-h-screen overflow-x-hidden" ref={sectionRef}>
			{/* Hero Section */}
			<section className="relative py-12 md:py-24 w-full">
				<div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
				<div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />

				<div className="container relative z-10 mx-auto px-4 md:px-6 max-w-7xl">
					<Link href="/#services">
						<Button variant="ghost" className="group mb-6 md:mb-8">
							<ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
							Back to Home
						</Button>
					</Link>

					<div className="max-w-3xl">
						<motion.h1
							className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6"
							initial={{ opacity: 0, y: 20 }}
							animate={
								isInView
									? { opacity: 1, y: 0 }
									: { opacity: 0, y: 20 }
							}
							transition={{ duration: 0.5 }}
						>
							Our Services
						</motion.h1>
						<motion.p
							className="text-lg md:text-xl text-muted-foreground"
							initial={{ opacity: 0, y: 20 }}
							animate={
								isInView
									? { opacity: 1, y: 0 }
									: { opacity: 0, y: 20 }
							}
							transition={{ duration: 0.5, delay: 0.1 }}
						>
							Professional technology solutions tailored to your business
							needs, with transparent pricing and exceptional quality.
						</motion.p>
					</div>
				</div>
			</section>

			{/* Services Grid */}
			<section className="py-12 md:py-24 bg-muted/30 w-full">
				<div className="container mx-auto px-4 md:px-6 max-w-7xl">
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
						{services.map((service, index) => (
							<motion.div
								key={service.name}
								initial={{ opacity: 0, y: 20 }}
								animate={
									isInView
										? { opacity: 1, y: 0 }
										: { opacity: 0, y: 20 }
								}
								transition={{ duration: 0.5, delay: index * 0.1 }}
								className="w-full"
								style={{ willChange: 'opacity, transform' }}
							>
								<Card className={cn("h-full flex flex-col", service.isCustom && "bg-primary/5 border-primary")}>
									<div className="p-4 md:p-6 flex flex-col flex-grow">
										<div className="flex-grow space-y-3 md:space-y-4">
											<div className="flex items-center justify-between">
												<h3 className="text-lg md:text-xl font-semibold">
													{service.name}
												</h3>
												{service.isCustom && (
													<Badge variant="secondary" className="ml-2">
														Custom
													</Badge>
												)}
											</div>
											<p className="text-sm md:text-base text-muted-foreground">
												{service.description}
											</p>											{/* Price Range */}
											<div className="pt-3 md:pt-4 border-t">
												<div className="flex items-center space-x-2">
													{service.price.custom ? (
														<span className="font-semibold text-base md:text-lg">
															{service.price.note}
														</span>
													) : (
														<>
															<span className="font-semibold text-base md:text-lg">
																{service.price.startingFrom}
															</span>
															<span className="text-xs md:text-sm text-muted-foreground">
																starting from
															</span>
														</>
													)}
												</div>
												<p className="text-xs md:text-sm text-muted-foreground mt-1">
													* Prices may vary based on pages, features, and functionalities
												</p>
											</div>

											{/* Features */}
											<ul className="space-y-2 pt-3 md:pt-4">
												{service.features.map((feature) => (
													<li key={feature} className="flex items-start">
														<Check className="h-4 w-4 md:h-5 md:w-5 text-primary shrink-0 mr-2" />
														<span className="text-xs md:text-sm">{feature}</span>
													</li>
												))}
											</ul>
										</div>

										{/* CTA Button */}
										<div className="pt-4 md:pt-6 mt-auto">
											<Button 
												asChild 
												size="sm"
												className={cn(
													"w-full group text-sm md:text-base",
													service.isCustom && "bg-primary hover:bg-primary/90"
												)}
											>
												<Link href="/#contact">
													{service.isCustom ? "Request Custom Service" : "Get Started"}
													<ArrowRight className="ml-2 h-3 w-3 md:h-4 md:w-4 transition-transform group-hover:translate-x-1" />
												</Link>
											</Button>
										</div>
									</div>
								</Card>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Why Choose Us Section */}
			<section className="py-12 md:py-24 w-full">
				<div className="container mx-auto px-4 md:px-6 max-w-7xl">
					<div className="text-center mb-8 md:mb-12">
						<h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Why Choose Us</h2>
						<p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
							We deliver exceptional solutions with a focus on quality, innovation, and client satisfaction
						</p>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
							transition={{ duration: 0.5 }}
							className="text-center p-6"
						>
							<div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
								<svg
									className="w-6 h-6 text-primary"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
							</div>
							<h3 className="text-xl font-semibold mb-2">Expert Team</h3>
							<p className="text-muted-foreground">
								Our team consists of highly skilled professionals with years of industry experience
							</p>
						</motion.div>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
							transition={{ duration: 0.5, delay: 0.1 }}
							className="text-center p-6"
						>
							<div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
								<svg
									className="w-6 h-6 text-primary"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M13 10V3L4 14h7v7l9-11h-7z"
									/>
								</svg>
							</div>
							<h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
							<p className="text-muted-foreground">
								We pride ourselves on quick turnaround times without compromising quality
							</p>
						</motion.div>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
							transition={{ duration: 0.5, delay: 0.2 }}
							className="text-center p-6"
						>
							<div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
								<svg
									className="w-6 h-6 text-primary"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
							</div>
							<h3 className="text-xl font-semibold mb-2">Competitive Pricing</h3>
							<p className="text-muted-foreground">
								Get the best value for your investment with our transparent pricing model
							</p>
						</motion.div>
					</div>
				</div>
			</section>

			{/* Our Process Section */}
			<section className="py-12 md:py-24 bg-muted/30 w-full">
				<div className="container mx-auto px-4 md:px-6 max-w-7xl">
					<div className="text-center mb-8 md:mb-12">
						<h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Our Process</h2>
						<p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
							We follow a systematic approach to ensure the success of your project
						</p>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
						{[
							{
								title: "Discovery",
								description: "We start by understanding your requirements and project goals",
								icon: (
									<svg
										className="w-6 h-6 text-primary"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
										/>
									</svg>
								),
							},
							{
								title: "Planning",
								description: "Develop a detailed project plan and timeline",
								icon: (
									<svg
										className="w-6 h-6 text-primary"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
										/>
									</svg>
								),
							},
							{
								title: "Development",
								description: "Execute the project with regular updates and feedback",
								icon: (
									<svg
										className="w-6 h-6 text-primary"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
										/>
									</svg>
								),
							},
							{
								title: "Delivery",
								description: "Final testing, deployment, and project handover",
								icon: (
									<svg
										className="w-6 h-6 text-primary"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M5 13l4 4L19 7"
										/>
									</svg>
								),
							},
						].map((step, index) => (
							<motion.div
								key={step.title}
								initial={{ opacity: 0, y: 20 }}
								animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
								transition={{ duration: 0.5, delay: index * 0.1 }}
								className="text-center p-6 relative"
							>
								<div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
									{step.icon}
								</div>
								<h3 className="text-xl font-semibold mb-2">{step.title}</h3>
								<p className="text-muted-foreground">{step.description}</p>
								{index < 3 && (
									<div className="hidden lg:block absolute top-1/2 right-0 w-8 h-0.5 bg-border transform translate-x-4">
										<div className="absolute right-0 w-2 h-2 bg-border rotate-45 transform -translate-y-1/2" />
									</div>
								)}
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-12 md:py-24 w-full">
				<div className="container mx-auto px-4 md:px-6 max-w-7xl">
					<div className="max-w-3xl mx-auto text-center">
						<h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">
							Ready to Transform Your Business?
						</h2>
						<p className="text-base md:text-lg text-muted-foreground mb-6 md:mb-8">
							Get in touch with us to discuss your project requirements and
							receive a detailed quote.
						</p>
						<Button asChild size="lg" className="rounded-full text-sm md:text-base">
							<Link href="/#contact">Contact Us</Link>
						</Button>
					</div>
				</div>
			</section>
		</main>
	);
}
