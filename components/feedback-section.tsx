"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Quote } from "lucide-react";
import { projects } from "@/lib/constants";

export default function FeedbackSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  // Get only projects with feedback
  const feedbacks = projects
    .filter(project => project.feedback)
    .map(project => ({
      projectTitle: project.title,
      ...project.feedback!
    }));

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
    <section ref={sectionRef} className="py-24 bg-muted/30 relative overflow-hidden w-full">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:radial-gradient(white,transparent_70%)] pointer-events-none" />

      {/* Large decorative quote marks */}
      <div className="absolute top-12 left-8 text-primary/5">
        <Quote size={120} />
      </div>
      <div className="absolute bottom-12 right-8 text-primary/5 rotate-180">
        <Quote size={120} />
      </div>

      <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Client Feedback</h2>
          <p className="text-muted-foreground text-lg">
            Don't just take our word for it. Here's what our clients have to say about their experience working with us.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
        >
          {feedbacks.map((feedback, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative"
            >
              <div className="bg-background rounded-2xl p-8 shadow-lg border border-border relative z-10 h-full">
                <div className="mb-4">
                  {[...Array(feedback.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-500 text-xl">★</span>
                  ))}
                </div>
                <div className="space-y-4">
                  <Quote className="text-primary/20 h-8 w-8 rotate-180" />
                  <p className="text-lg text-muted-foreground italic leading-relaxed">
                    {feedback.comment}
                  </p>
                  <div className="pt-4 border-t border-border">
                    <p className="font-semibold">{feedback.clientName}</p>
                    <p className="text-sm text-muted-foreground">{feedback.projectTitle}</p>
                  </div>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl transform rotate-1" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
