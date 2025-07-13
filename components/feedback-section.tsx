"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { projects } from "@/lib/constants";
import type { CarouselApi } from "@/components/ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function FeedbackSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [api, setApi] = useState<CarouselApi>();
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const feedbacks = projects
    .filter((project) => project.feedback)
    .map((project) => ({
      projectTitle: project.title,
      ...project.feedback!,
    }));

  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [api]);

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section ref={sectionRef} className="w-full bg-background py-20 md:py-28">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={itemVariants}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Trusted by Innovators
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Our clients' success stories are the best testament to our work.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { duration: 0.5, delay: 0.2 } },
          }}
        >
          <Carousel
            opts={{
              align: "center",
              loop: true,
              dragFree: true
            }}
            setApi={setApi}
            className="w-full max-w-6xl mx-auto"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {feedbacks.map((feedback, index) => (
                <CarouselItem
                  key={index}
                  className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/2"
                >
                  <div className="p-4 h-full">
                    <div className="flex h-full flex-col justify-between rounded-xl border bg-card p-6 shadow-sm hover:shadow-lg transition-shadow">
                      <div>
                        <Quote className="h-8 w-8 text-primary/30" />
                        <p className="mt-4 text-base italic text-muted-foreground">
                          {feedback.comment}
                        </p>
                      </div>
                      <div className="mt-6">
                        <div className="flex items-center">
                          <Avatar className="h-12 w-12">
                            <AvatarImage
                              src={`https://api.dicebear.com/7.x/initials/svg?seed=${feedback.clientName}`}
                              alt={feedback.clientName}
                            />
                            <AvatarFallback>
                              {feedback.clientName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="ml-4">
                            <p className="font-semibold text-card-foreground">
                              {feedback.clientName}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {feedback.projectTitle}
                            </p>
                          </div>
                        </div>
                        <div className="mt-4 flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-5 w-5 ${
                                i < feedback.rating
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
          </Carousel>
        </motion.div>
      </div>
    </section>
  );
}
