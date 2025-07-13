"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CodeIcon } from "lucide-react";

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroElement = heroRef.current;
      if (heroElement) {
        heroElement.style.transform = `translateY(${scrollY * 0.5}px)`;
        heroElement.style.opacity = `${1 - scrollY * 0.002}`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section 
      id="home"
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-background/95 dark:bg-background mt-16 sm:mt-20"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background dark:from-background dark:via-background/90 dark:to-background" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 dark:from-primary/[0.02] dark:via-transparent dark:to-primary/[0.02]" />
      
      <div
        ref={heroRef}
        className="container relative z-10 px-4 md:px-6 pt-24 sm:pt-32 pb-32"
      >
        <div className="text-center space-y-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/[0.08] text-primary ring-1 ring-primary/20 mb-6">
              <CodeIcon className="h-4 w-4 mr-2" />
              Smart, Secure Workflows
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance">
              <span className="block">Transforming Ideas into</span>
              <span className="block bg-gradient-to-r from-primary via-blue-600 to-violet-600 bg-clip-text text-transparent mt-2 leading-[1.15]">
                Digital Excellence
              </span>
            </h1>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl text-muted-foreground/90 max-w-3xl mx-auto px-4 sm:px-6 leading-relaxed"
          >
            We believe that by combining innovation and expertise, 
            organizations will be more efficient, more secure and have more engaged, 
            successful outcomes.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12"
          >
            <Button 
              asChild 
              size="lg" 
              className="rounded-full px-8 h-12 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Link href="#contact">Get Started Today</Link>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              size="lg" 
              className="rounded-full px-8 h-12 border-primary/20 hover:border-primary/40 bg-background/50 hover:bg-background/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300"
            >
              <Link href="#projects" className="flex items-center gap-2">
                View Our Projects
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
      
      {/* Bottom fade effect */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-10"></div>
    </section>
  );
}