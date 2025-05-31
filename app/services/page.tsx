"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowLeft, IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { services } from "@/lib/constants";

const additionalServices = [
  {
    name: "Web Development",
    price: "20k",
    description: "Custom web applications tailored to your business needs",
  },
  {
    name: "UI/UX Design",
    price: "5k",
    description: "Intuitive and beautiful user interface designs",
  },
  {
    name: "Data Analysis",
    price: "10k",
    description: "Comprehensive data analysis and insights",
  },
  {
    name: "Data Science",
    price: "10k",
    description: "Advanced data science solutions and modeling",
  },
  {
    name: "Machine Learning",
    price: "10k",
    description: "Custom ML models and AI solutions",
  },
  {
    name: "Debugging",
    price: "5k",
    description: "Expert debugging and problem-solving services",
  },
  {
    name: "Frontend and Backend Development",
    price: "5k",
    description: "Full-stack development solutions",
  },
  {
    name: "IoT Solutions",
    price: "Project Based",
    description: "Custom IoT solutions and implementations",
  },
];

export default function ServicesPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <main className="flex-1" ref={sectionRef}>
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
        
        {/* Background pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />
        
        <div className="container relative z-10 px-4 md:px-6">
          <Link href="/#services">
            <Button variant="ghost" className="group mb-8">
              <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
              Back to Home
            </Button>
          </Link>

          <div className="max-w-3xl">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
            >
              Our Services & Pricing
            </motion.h1>
            <motion.p 
              className="text-xl text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              We offer a comprehensive range of technology solutions to help your business succeed. 
              All prices are starting points and may vary based on project requirements.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {additionalServices.map((service, index) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="relative p-6 h-full hover:shadow-lg transition-shadow group">
                  <div className="mb-4">
                    <div className="text-2xl font-bold text-primary flex items-center gap-1">
                      <IndianRupee className="w-5 h-5" />
                      <span>{service.price}</span>
                      <span className="text-sm text-muted-foreground font-normal ml-1">starting</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                  
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-primary/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-24">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-muted-foreground text-lg mb-8">
              Contact us today to discuss your project requirements and get a detailed quote.
            </p>
            <Button asChild size="lg" className="rounded-full">
              <Link href="/#contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
