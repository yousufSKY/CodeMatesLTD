"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { CircleCheck, Medal, Users, Lightbulb, Target, Rocket, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { ButtonVariant } from "@/components/ui/types";

const buttonVariant: ButtonVariant = "default";

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const features = [
    {
      title: "Custom Software Development",
      description: "Tailored solutions that perfectly match your business needs",
      icon: Rocket,
    },
    {
      title: "Modern UI/UX Designs",
      description: "Intuitive and beautiful user experiences that engage",
      icon: Lightbulb,
    },
    {
      title: "Data-Driven Solutions",
      description: "Insights and analytics that power business decisions",
      icon: Target,
    },
    {
      title: "Scalable Architecture",
      description: "Future-proof systems that grow with your business",
      icon: Users,
    },
  ];

  const stats = [
    { value: "98%", label: "Client Satisfaction" },
    { value: "20+", label: "Projects Completed" },
    { value: "24/7", label: "Support" },
    { value: "100%", label: "Success Rate" },
  ];

  return (
    <section id="about" ref={sectionRef} className="py-24 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative w-full max-w-2xl mx-auto lg:mx-0"
          >
            {/* Background pattern */}
            <div className="absolute -left-8 -top-8 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute -right-8 -bottom-8 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
            
            {/* Main image container */}
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-br-full z-10" />
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-primary/20 to-transparent rounded-tl-full z-10" />
              
              {/* Image wrapper */}
              <div className="relative aspect-[4/3] w-full">
                <Image 
                  src="https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" 
                  alt="Codemates Team" 
                  fill
                  className="object-cover transform hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 800px"
                  priority
                  quality={85}
                  loading="eager"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJyEkMj40MS4wMzQ9QUVENkJPPTA0RWNFTD9XWVdhaWRkYjlKbXBnXWP/2wBDARUXFx4aHR4eHWNBMUFjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                  placeholder="blur"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-tr from-background/80 via-background/50 to-transparent mix-blend-overlay" />
              </div>
              
              {/* Stats overlay */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[90%] bg-background/95 backdrop-blur-sm rounded-xl p-6 border border-border/50 shadow-lg">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                      className="text-center group"
                    >
                      <div className="text-2xl font-bold text-primary group-hover:scale-110 transition-transform duration-300">
                        {stat.value}
                      </div>
                      <div className="text-sm font-medium text-muted-foreground">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="relative z-10"
          >
            <div className="space-y-6">
              <div className="inline-block">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  <Medal className="w-4 h-4" />
                  Trusted by Industry Leaders
                </div>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold">About Codemates LTD</h2>
              
              <div className="space-y-4">
                <p className="text-muted-foreground text-lg">
                  Founded in 2024, Codemates LTD is a forward-thinking tech company committed to delivering 
                  scalable and cutting-edge digital solutions. We combine technical expertise with creative 
                  problem-solving to help businesses thrive in the digital landscape.
                </p>
                <p className="text-muted-foreground text-lg">
                  Our team of passionate engineers, designers, and data scientists work collaboratively to 
                  create innovative solutions that address complex business challenges and drive meaningful results.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    className="flex gap-4 items-start"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 space-y-4">
                <h3 className="text-xl font-semibold">Our Mission</h3>
                <p className="text-muted-foreground">
                  To empower businesses with innovative technology solutions that drive growth, 
                  enhance efficiency, and create exceptional user experiences.
                </p>
                <div className="pt-6">
                  <Link href="/about">
                    <Button
                      variant={buttonVariant}
                      className="group mb-8 w-full sm:w-auto transition-all duration-300 relative overflow-hidden hover:shadow-lg"
                    >
                      <span className="relative z-10 flex items-center justify-center">
                        Learn More About Our Journey
                        <ArrowRight className="inline-block ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}