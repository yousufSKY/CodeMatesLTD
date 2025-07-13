"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { services } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section id="services" ref={sectionRef} className="w-full bg-muted/30 py-16 sm:py-20 md:py-28">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mx-auto mb-12 sm:mb-16 max-w-3xl text-center"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4"
          >
            Our Digital Toolbox
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            From concept to launch, we provide the full spectrum of digital
            services to bring your vision to life with excellence and innovation.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              className="group relative overflow-hidden rounded-xl border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg focus-within:ring-2 focus-within:ring-primary/50"
            >
              {/* Gradient background effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              
              <div className="relative z-10 p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/20 transition-transform duration-300 group-hover:scale-110">
                  <service.icon className="h-6 w-6" />
                </div>
                
                <h3 className="mb-2 text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </h3>
                
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {service.description}
                </p>
                
                <Button
                  variant="ghost"
                  className="text-sm text-primary hover:text-primary/90 hover:bg-primary/5 p-0 h-auto font-medium group/btn"
                  asChild
                >
                  <Link 
                    href={{
                      pathname: "/contact",
                      query: { type: "quote", service: service.title.toLowerCase().replace(/\s+/g, '-') }
                    }}
                  >
                    Get Started
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced CTA Section */}
        <div className="relative mt-24 sm:mt-32 rounded-3xl overflow-hidden">
          {/* Gradient background with overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/80" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px]" />
          
          <div className="relative py-16 sm:py-20 px-6 sm:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-2xl mx-auto text-center"
            >
              <Sparkles className="w-8 h-8 text-primary-foreground/90 mx-auto mb-6" />
              
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-foreground mb-4 tracking-tight">
                Ready to Transform Your Business?
              </h3>
              
              <p className="text-base sm:text-lg text-primary-foreground/90 mb-8 max-w-xl mx-auto">
                Get in touch with us to discuss your project requirements and receive a detailed quote tailored to your needs.
              </p>
              
              <Button
                asChild
                size="lg"
                variant="secondary"
                className={cn(
                  "rounded-full font-medium group",
                  "bg-white/10 hover:bg-white/20 backdrop-blur-sm",
                  "text-primary-foreground border border-white/10",
                  "shadow-lg hover:shadow-xl transition-all duration-300",
                  "px-8"
                )}
                aria-label="Get a Free Quote"
              >
                <Link 
                  href="/contact?type=quote" 
                  className="flex items-center gap-2"
                >
                  Get a Free Quote
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}