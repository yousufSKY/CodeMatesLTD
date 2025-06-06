"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { projects } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const categories = [
  "All",
  "Ongoing",
  "Completed",
  ...Array.from(new Set(projects.map((project) => project.category))),
];

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const filteredProjects = activeCategory === "All"
    ? projects
    : activeCategory === "Ongoing"
    ? projects.filter((project) => project.status === "Ongoing")
    : activeCategory === "Completed"
    ? projects.filter((project) => project.status === "Completed")
    : projects.filter((project) => project.category === activeCategory);

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
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="projects" ref={sectionRef} className="py-24 w-full">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Projects</h2>
          <p className="text-muted-foreground text-lg">
            Explore our portfolio of successful projects delivered to clients across various industries.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-8 sm:mb-12 px-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(category)}
              className="rounded-full text-xs sm:text-sm whitespace-nowrap"
            >
              {category}
            </Button>
          ))}
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
        >
          {filteredProjects.map((project) => (
            <motion.div key={project.id} variants={itemVariants}>
              <Card className="group relative overflow-hidden max-w-sm mx-auto rounded-xl transition-all duration-300 hover:shadow-lg dark:hover:shadow-2xl-white/5 hover:-translate-y-1 bg-background dark:bg-background/80 border-border h-full flex flex-col">
                <div className="relative aspect-[4/3] overflow-hidden rounded-t-xl">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={400}
                    height={300}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    quality={85}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <CardContent className="p-4 flex flex-col flex-1">
                  <div className="flex flex-wrap gap-1.5">
                    {project.status === "Ongoing" && (
                      <Badge variant="default" className="bg-primary/20 text-primary hover:bg-primary/30 text-xs">
                        Ongoing
                      </Badge>
                    )}
                    {project.status === "Completed" && (
                      <Badge variant="default" className="bg-green-200 text-green-700 dark:bg-green-500/20 dark:text-green-400 hover:bg-green-300 dark:hover:bg-green-500/30 text-xs">
                        Completed
                      </Badge>
                    )}
                  </div>
                  
                  <div className="mb-3">
                    <h3 className="text-lg font-bold tracking-tight mb-1.5 group-hover:text-primary transition-colors line-clamp-1">{project.title}</h3>
                    <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2">{project.description}</p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.technologies.map((tech, index) => (
                      <Badge key={index} variant="secondary" className="text-[0.7rem] px-1.5 py-0 font-normal text-muted-foreground">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <div className="mt-auto">
                    {project.url === "#" ? (
                      <Button 
                        variant="outline"
                        size="sm"
                        disabled 
                        className="w-full rounded-full group/btn cursor-not-allowed text-xs"
                        title="Project in Development"
                      >
                        <span className="flex items-center justify-center">
                          View Live
                          <ExternalLink className="ml-1.5 h-3 w-3 opacity-50" />
                        </span>
                      </Button>
                    ) : (
                      <Button 
                        variant="outline"
                        size="sm"
                        asChild 
                        className="w-full rounded-full group/btn text-xs"
                      >
                        <Link 
                          href={project.url} 
                          target="_blank"
                          rel="noopener noreferrer" 
                          className="flex items-center justify-center"
                        >
                          View Live
                          <ExternalLink className="ml-1.5 h-3 w-3 transition-transform group-hover/btn:translate-x-1" />
                        </Link>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}