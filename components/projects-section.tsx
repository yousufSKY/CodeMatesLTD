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
    <section id="projects" ref={sectionRef} className="py-24">
      <div className="container px-4 md:px-6">
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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
        >
          {filteredProjects.map((project) => (
            <motion.div key={project.id} variants={itemVariants}>
              <Card className="overflow-hidden h-full flex flex-col group transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={600}
                    height={400}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    quality={85}
                  />
                </div>
                <CardContent className="p-6 flex flex-col flex-grow">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.status === "Ongoing" && (
                      <Badge variant="default" className="bg-primary/20 text-primary hover:bg-primary/30">
                        Ongoing
                      </Badge>
                    )}
                    {project.status === "Completed" && (
                      <Badge variant="default" className="bg-green-200 text-green-700 dark:bg-green-500/20 dark:text-green-400 hover:bg-green-300 dark:hover:bg-green-500/30">
                        Completed
                      </Badge>
                    )}
                    {project.technologies.map((tech, index) => (
                      <Badge key={index} variant="secondary" className="font-normal">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-muted-foreground">{project.description}</p>
                  </div>
                  <div className="pt-6">
                    {project.url === "#" ? (
                      <Button 
                        disabled 
                        className="w-full rounded-full group cursor-not-allowed"
                        title="Project in Development"
                      >
                        <span className="flex items-center justify-center">
                          Project in Development
                          <ExternalLink className="ml-2 h-4 w-4 opacity-50" />
                        </span>
                      </Button>
                    ) : (
                      <Button asChild className="w-full rounded-full group">
                        <Link 
                          href={project.url} 
                          target="_blank"
                          rel="noopener noreferrer" 
                          className="flex items-center justify-center"
                        >
                          View Project
                          <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
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