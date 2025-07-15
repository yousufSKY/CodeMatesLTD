"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  X,
  Instagram,
  Facebook,
} from "lucide-react";

// Import the ContactForm component dynamically to avoid SSR
const ContactForm = dynamic(() => import("@/components/contact-form"));

// Social media links
const socialLinks = [
  { href: "https://www.linkedin.com/company/codematesltd/", icon: Linkedin, label: "LinkedIn" },
  { href: "https://x.com/codematesltd?t=cjXqpZcgoW9BV3Q7TNQUGg&s=09", icon: X, label: "Twitter" },
  { href: "https://www.instagram.com/codematesltd/", icon: Instagram, label: "Instagram" },
  { href: "https://www.facebook.com/codematesltd", icon: Facebook, label: "Facebook" },
];

// Contact information
const contactInfo = [
  {
    icon: MapPin,
    label: "Kalaburagi, Karnataka, India",
  },
  {
    icon: Mail,
    label: "support@codemates.in",
    href: "mailto:support@codemates.in",
  },
  {
    icon: Phone,
    label: "+91 73489 75886",
    href: "tel:+917348975886",
  },
];

export default function ContactPageContent() {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Contact Form Section */}
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl font-bold tracking-tight mb-4">
                Let's work together
              </h1>
              <p className="text-muted-foreground mb-8">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>
            </motion.div>

            <Suspense
              fallback={
                <div className="animate-pulse flex flex-col space-y-4">
                  <div className="h-12 bg-muted rounded-md" />
                  <div className="h-12 bg-muted rounded-md" />
                  <div className="h-32 bg-muted rounded-md" />
                </div>
              }
            >
              <ContactForm />
            </Suspense>
          </div>

          {/* Contact Info Section */}
          <div className="lg:w-96">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-muted/50 p-8 rounded-2xl"
            >
              <h2 className="text-2xl font-semibold mb-6">Get in touch</h2>
              
              <div className="space-y-6">
                {/* Contact Information */}
                <div className="space-y-4">
                  {contactInfo.map((info) => (
                    <div key={info.label} className="flex items-start space-x-3">
                      <info.icon className="w-5 h-5 text-primary mt-1" />
                      <div className="flex-1">
                        {info.href ? (
                          <a
                            href={info.href}
                            className="text-muted-foreground hover:text-primary transition-colors"
                          >
                            {info.label}
                          </a>
                        ) : (
                          <span className="text-muted-foreground">
                            {info.label}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Social Links */}
                <div>
                  <h3 className="text-sm font-medium mb-4">Follow us</h3>
                  <div className="flex space-x-4">
                    {socialLinks.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                        aria-label={`Follow us on ${social.label}`}
                      >
                        <social.icon className="w-5 h-5" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
