"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import Script from 'next/script';
import { pagesMetadata, siteConfig } from '@/lib/metadata';
import { 
  Code, 
  PenTool, 
  Database, 
  BarChart, 
  Brain, 
  Cpu,
  ArrowRight,
  ArrowLeft,
  Check 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Services structured data
const servicesSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: [
    {
      '@type': 'Service',
      '@id': `${siteConfig.url}/services#web-development`,
      name: 'Web Development',
      description: 'Custom web applications built with modern technologies and best practices.',
      provider: {
        '@type': 'Organization',
        name: siteConfig.name,
      },
      areaServed: {
        '@type': 'Country',
        name: 'India',
      },
    },
    {
      '@type': 'Service',
      '@id': `${siteConfig.url}/services#mobile-development`,
      name: 'Mobile App Development',
      description: 'Native and cross-platform mobile applications for iOS and Android.',
      provider: {
        '@type': 'Organization',
        name: siteConfig.name,
      },
      areaServed: {
        '@type': 'Country',
        name: 'India',
      },
    },
    {
      '@type': 'Service',
      '@id': `${siteConfig.url}/services#ui-ux-design`,
      name: 'UI/UX Design',
      description: 'User-centered design solutions that enhance user experience and engagement.',
      provider: {
        '@type': 'Organization',
        name: siteConfig.name,
      },
      areaServed: {
        '@type': 'Country',
        name: 'India',
      },
    },
  ],
};

const services = [
	{
		icon: <PenTool className="w-8 h-8" />,
		name: "UI/UX Design",
		description:
			"Transform your digital presence with intuitive and beautiful user interface designs that delight your users.",
		price: "₹5,000",
		features: [
			"User Research",
			"Wireframing",
			"UI Design",
			"Usability Testing",
		],
	},
	{
		icon: <Code className="w-8 h-8" />,
		name: "Full Stack Development",
		description:
			"End-to-end web development solutions that bring your vision to life with modern technologies.",
		price: "₹20,000",
		features: [
			"Custom Web Apps",
			"Responsive Design",
			"API Development",
			"Database Design",
		],
	},
	{
		icon: <Database className="w-8 h-8" />,
		name: "Data Analysis",
		description:
			"Turn your data into actionable insights with comprehensive analysis and visualization solutions.",
		price: "₹10,000",
		features: [
			"Data Cleaning",
			"Statistical Analysis",
			"Visualization",
			"Reporting",
		],
	},
	{
		icon: <BarChart className="w-8 h-8" />,
		name: "Data Science",
		description:
			"Leverage advanced data science techniques to unlock the power of your data and drive growth.",
		price: "₹20,000",
		features: [
			"Predictive Analytics",
			"Data Mining",
			"ML Models",
			"Business Insights",
		],
	},
	{
		icon: <Brain className="w-8 h-8" />,
		name: "Machine Learning",
		description:
			"Custom AI solutions that automate processes and provide intelligent insights for your business.",
		price: "₹15,000",
		features: [
			"Custom Models",
			"Model Training",
			"AI Integration",
			"Optimization",
		],
	},
	{
		icon: <Cpu className="w-8 h-8" />,
		name: "IoT Solutions",
		description:
			"Connect your physical devices to the digital world with custom IoT solutions and integrations.",
		price: "Custom",
		features: [
			"IoT Architecture",
			"Device Integration",
			"Real-time Monitor",
			"Data Collection",
		],
	},
];

export default function ServicesPage() {
	const sectionRef = useRef<HTMLElement>(null);
	const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

	return (
		<main className="flex-1 min-h-screen overflow-x-hidden bg-background" ref={sectionRef}>
			<div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
				{/* Back button */}
				<Link href="/#services">
					<Button variant="ghost" className="group mb-8 sm:mb-12">
						<ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
						Back to Home
					</Button>
				</Link>

				{/* Header */}
				<div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 lg:mb-20">
					<motion.h1 
						className="text-4xl sm:text-5xl font-bold tracking-tight mb-4"
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
						className="text-lg sm:text-xl text-muted-foreground"
						initial={{ opacity: 0, y: 20 }}
						animate={
							isInView
								? { opacity: 1, y: 0 }
								: { opacity: 0, y: 20 }
						}
						transition={{ duration: 0.5, delay: 0.1 }}
					>
						Professional technology solutions tailored to your business needs
					</motion.p>
				</div>

				{/* Services Grid */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
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
							className="h-full"
						>
							<Card className="group h-full p-6 sm:p-8 flex flex-col transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg relative overflow-hidden">
								{/* Gradient background effect */}
								<div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
								
								<div className="relative z-10">
									<div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/20 transition-transform duration-300 group-hover:scale-110">
										{service.icon}
									</div>
									
									<h3 className="text-xl sm:text-2xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300">
										{service.name}
									</h3>
									
									<p className="text-muted-foreground mb-6 flex-grow leading-relaxed">
										{service.description}
									</p>

									<div className="space-y-4 mb-6">
										<div className="flex items-baseline flex-wrap gap-2">
											<span className="text-lg sm:text-xl font-semibold">
												{service.price}
											</span>
											{service.price !== "Custom" && (
												<span className="text-sm text-muted-foreground">
													starting from
												</span>
											)}
										</div>

										<ul className="space-y-3">
											{service.features.map((feature) => (
												<li key={feature} className="flex items-start gap-3">
													<Check className="w-4 h-4 text-primary shrink-0 mt-1" />
													<span className="text-sm leading-relaxed">{feature}</span>
												</li>
											))}
										</ul>
									</div>

									<Button 
										asChild
										className={cn(
											"w-full group/btn",
											"bg-primary/10 hover:bg-primary/20",
											"text-primary border border-primary/20",
											"transition-all duration-300"
										)}
									>
										<Link 
											href={{
												pathname: "/contact",
												query: { type: "quote", service: service.name.toLowerCase().replace(/\s+/g, '-') }
											}} 
											className="flex items-center justify-center gap-2"
										>
											Get Started
											<ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
										</Link>
									</Button>
								</div>
							</Card>
						</motion.div>
					))}
				</div>
			</div>

			{/* CTA Banner */}
			<section className="w-full relative">
				<div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary dark:from-primary/90 dark:via-primary/80 dark:to-primary/70" />
				<div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:16px_16px]" />
				<div className="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 text-center">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
						transition={{ duration: 0.5 }}
						className="max-w-2xl mx-auto"
					>
						<h2 className="text-3xl sm:text-4xl font-extrabold text-primary-foreground mb-4 tracking-tight">
							Ready to Transform Your Business?
						</h2>
						<p className="text-lg sm:text-xl text-primary-foreground/90 mb-8 max-w-xl mx-auto">
							Get in touch with us to discuss your project requirements and receive a detailed quote.
						</p>
						<Button 
							asChild
							size="lg"
							className={cn(
								"px-8 py-6 h-auto",
								"bg-background/10 backdrop-blur-sm",
								"hover:bg-background/20",
								"text-primary-foreground border border-primary-foreground/10",
								"font-semibold rounded-lg",
								"shadow-lg hover:shadow-xl",
								"ring-2 ring-primary-foreground/10 hover:ring-primary-foreground/20",
								"transition-all duration-300 hover:scale-105"
							)}
							aria-label="Get a Free Quote"
						>
							<Link 
								href="/contact?type=quote" 
								className="flex items-center gap-2"
							>
								Get a Free Quote
								<ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
							</Link>
						</Button>
					</motion.div>
				</div>
			</section>

			{/* Structured Data Script */}
			<Script id="services-schema" type="application/ld+json">
				{JSON.stringify(servicesSchema)}
			</Script>
		</main>
	);
}
