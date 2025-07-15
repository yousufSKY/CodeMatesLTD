"use client";

import Link from "next/link";
import { ArrowUp, Facebook, Linkedin, Mail, MapPin, PhoneCall, Twitter, Instagram, Github } from "lucide-react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Projects', href: '/projects' },
  { label: 'Contact', href: '/contact' },
];

const contactInfo = [
  { icon: MapPin, label: 'Kalaburagi, Karnataka, India' },
  { icon: Mail, label: 'support@codemates.in', href: 'mailto:support@codemates.in' },
  { icon: PhoneCall, label: '+91 73489 75886', href: 'tel:+917348975886' },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-background text-foreground border-t border-gray-200/50 dark:border-gray-800/50 mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
          {/* Company Info */}
          <div className="md:col-span-4">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Codemates LTD
            </Link>
            <p className="mt-4 text-muted-foreground max-w-md">
              We deliver scalable and cutting-edge digital solutions that help businesses thrive in the digital age.
            </p>
            <Button 
              variant="default" 
              className="mt-6"
              asChild
            >
              <Link href="/contact?type=quote">
                Get a Free Quote
              </Link>
            </Button>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-3">
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-4">
              {contactInfo.map(({ icon: Icon, label, href }) => (
                <div key={label} className="flex items-start space-x-3">
                  <Icon className="h-5 w-5 text-primary mt-0.5" />
                  {href ? (
                    <Link href={href} className="text-muted-foreground hover:text-primary">
                      {label}
                    </Link>
                  ) : (
                    <span className="text-muted-foreground">{label}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Map */}
          <div className="md:col-span-3">
            <h3 className="text-lg font-semibold mb-4">Location</h3>
            <div className="aspect-video rounded-lg overflow-hidden">
              <iframe
                title="Codemates LTD Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d121659.95755604982!2d76.76612520761267!3d17.329869311037275!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc8c7455c624c43%3A0xf43fc78f2fc7053d!2sKalaburagi%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1710340477115!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-border" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Codemates LTD. All rights reserved.
          </div>
          <div className="flex mt-4 md:mt-0 space-x-4">
            <Link 
              href="https://x.com/codematesltd?t=cjXqpZcgoW9BV3Q7TNQUGg&s=09" 
              className="text-muted-foreground hover:text-primary transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow us on Twitter"
            >
              <Twitter className="h-5 w-5" />
            </Link>
            <Link 
              href="https://www.instagram.com/codematesltd/profilecard/?igsh=MTNvb25iYWtiYzZjZA==" 
              className="text-muted-foreground hover:text-primary transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow us on Instagram"
            >
              <Instagram className="h-5 w-5" />
            </Link>
            <Link 
              href="https://www.linkedin.com/company/codematesltd/" 
              className="text-muted-foreground hover:text-primary transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow us on LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </Link>
            <Link 
              href="https://github.com/codematesltd" 
              className="text-muted-foreground hover:text-primary transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View our GitHub profile"
            >
              <Github className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll to Top */}
      <Button
        variant="outline"
        size="icon"
        className="fixed bottom-8 right-8 z-50 opacity-80 hover:opacity-100 transition-opacity"
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-4 w-4" />
      </Button>
    </footer>
  );
}