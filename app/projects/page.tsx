"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink, Star, Calendar, Tag, CheckCircle2, Clock } from "lucide-react";
import { projects } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const categories = [
  "All",
  "Ongoing",
  "Completed",
  ...Array.from(new Set(projects.map((project) => project.category))),
];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

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
    <main className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Our Projects
          </h1>
          <p className="text-muted-foreground text-lg">
            Explore our portfolio of innovative solutions and successful projects
            delivered to clients across various industries.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 px-2">
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

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className="group"
            >
              <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {project.url && (
                      <Button
                        asChild
                        variant="secondary"
                        size="sm"
                        className="gap-2"
                      >
                        <Link href={project.url} target="_blank">
                          Visit Project <ExternalLink className="h-4 w-4" />
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Badge
                      variant={project.status === "Completed" ? "default" : "secondary"}
                      className="mb-2"
                    >
                      {project.status === "Completed" ? (
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                      ) : (
                        <Clock className="h-3 w-3 mr-1" />
                      )}
                      {project.status}
                    </Badge>
                    <Badge variant="outline">
                      <Tag className="h-3 w-3 mr-1" />
                      {project.category}
                    </Badge>
                  </div>
                  <h3 className="text-xl font-bold mb-2 line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground line-clamp-3 mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <TooltipProvider key={tech}>
                        <Tooltip>
                          <TooltipTrigger>
                            <Badge variant="outline" className="px-2 py-0.5">
                              {tech}
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{tech}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ))}
                  </div>
                </CardContent>
                {project.feedback && (
                  <CardFooter className="bg-muted/30 p-4">
                    <div className="flex items-start gap-2">
                      <div className="flex-1">
                        <p className="text-sm font-medium mb-1">{project.feedback.clientName}</p>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          "{project.feedback.comment}"
                        </p>
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span className="ml-1 text-sm font-medium">{project.feedback.rating}</span>
                      </div>
                    </div>
                  </CardFooter>
                )}
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* No Results Message */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No projects found in this category.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
