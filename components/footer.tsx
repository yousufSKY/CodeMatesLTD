"use client";

import Link from "next/link";
import { ArrowUp, Facebook, Linkedin, Mail, MapPin, PhoneCall, Twitter, Instagram, Github } from "lucide-react";
import { Button } from "./ui/button";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-muted/50 py-12 mt-20 w-full">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Codemates LTD
            </Link>
            <p className="mt-4 text-muted-foreground max-w-md">
              We deliver scalable and cutting-edge digital solutions that help businesses thrive in the digital age.
            </p>
            <div className="flex mt-6 space-x-4">
              <Link 
                href="https://x.com/codematesltd?t=cjXqpZcgoW9BV3Q7TNQUGg&s=09" 
                className="text-muted-foreground hover:text-primary transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link 
                href="https://facebook.com" 
                className="text-muted-foreground hover:text-primary transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link 
                href="https://www.instagram.com/codematesltd/profilecard/?igsh=MTNvb25iYWtiYzZjZA==" 
                className="text-muted-foreground hover:text-primary transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link 
                href="https://www.linkedin.com/company/codematesltd/" 
                className="text-muted-foreground hover:text-primary transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: 'Home', path: '/' },
                { name: 'Services', path: '/services' },
                { name: 'Projects', path: '/projects' },
                { name: 'About', path: '/about' },
                { name: 'Contact', path: '/contact' }
              ].map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.path}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>codematesltd@gmail.com</li>
              <li>+91 7348975886</li>
              <li>Kalaburagi</li>
              <li>Karnataka, India</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © 2025 Codemates LTD. All rights reserved.
          </p>
        </div>
      </div>
      
      {/* Back to top button */}
      <Button
        onClick={scrollToTop}
        className="fixed bottom-4 right-4 rounded-full shadow-lg"
        size="icon"
        variant="outline"
      >
        <ArrowUp className="h-4 w-4" />
      </Button>
    </footer>
  );
}