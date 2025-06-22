"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { services } from "@/lib/constants";

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
    <section id="services" ref={sectionRef} className="w-full bg-muted/30 py-20 md:py-28">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl"
          >
            Our Digital Toolbox
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mt-4 text-lg text-muted-foreground"
          >
            From concept to launch, we provide the full spectrum of digital
            services to bring your vision to life.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              className="group relative overflow-hidden rounded-xl border bg-card p-6 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative z-10">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <service.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-card-foreground">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <Link href="/services">
            <Button
              size="lg"
              className="group rounded-full px-8 py-3 transition-transform hover:scale-105"
            >
              <span>View All Services</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}