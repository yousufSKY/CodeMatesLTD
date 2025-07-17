"use client";

import * as React from "react";
import Link from "next/link";
import type { MouseEvent } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { QuoteButton } from "./ui/quote-button";

type NavItem = {
  name: string;
  path: string;
};

const navigation: NavItem[] = [
  { name: "Services", path: "/services" },
  { name: "Projects", path: "/projects" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [currentHash, setCurrentHash] = React.useState("");
  const pathname = usePathname();
  const router = useRouter();

  // Handle scroll locking when mobile menu is open
  React.useEffect(() => {
    if (mobileMenuOpen) {
      // Store the current scroll position
      const scrollY = window.scrollY;
      // Add classes to prevent scroll and maintain position
      document.documentElement.style.setProperty('--scroll-position', `-${scrollY}px`);
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    } else {
      // Restore scroll position
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }

    return () => {
      // Cleanup function to ensure scroll is restored
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, [mobileMenuOpen]);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
    };

    // Set initial hash
    setCurrentHash(window.location.hash);

    // Add event listeners
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, item: NavItem) => {
    // For non-hash paths (like /projects, /about), do direct navigation
    if (!item.path.startsWith("#")) {
      e.preventDefault();
      router.push(item.path);
      setMobileMenuOpen(false);
      return;
    }

    // Handle hash navigation (e.g., #contact)
    const isHomePage = pathname === "/";
    e.preventDefault();
    
    if (isHomePage) {
      // If on home page, scroll to section
      const element = document.getElementById(item.path.substring(1));
      if (element) {
        window.scrollTo({
          top: element.offsetTop - 80,
          behavior: "smooth",
        });
        setMobileMenuOpen(false);
      }
    } else {
      // If on another page, navigate to home first then scroll
      router.push("/");
      setTimeout(() => {
        const element = document.getElementById(item.path.substring(1));
        if (element) {
          window.scrollTo({
            top: element.offsetTop - 80,
            behavior: "smooth",
          });
        }
      }, 100);
      setMobileMenuOpen(false);
    }
  };

  const handleGetQuote = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push('/contact?type=quote');
  };

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        "text-foreground border-b",
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-gray-200/50 dark:border-gray-800/50"
          : "bg-transparent border-transparent"
      )}
    >
      <nav className="container mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Codemates LTD
            </span>
          </Link>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center space-x-8">
          <div className="flex space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={pathname === "/" ? item.path : item.path}
                onClick={(e) => handleNavClick(e, item)}
                className={cn(
                  "relative text-sm font-medium transition-all duration-300",
                  "after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full",
                  "after:origin-left after:scale-x-0 after:transform after:bg-primary after:transition-transform after:duration-300",
                  "hover:after:scale-x-100",
                  pathname === item.path && !pathname.startsWith("/admin") && "text-primary after:scale-x-100"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Button
              variant="ghost"
              className={cn(
                "rounded-full relative group",
                "bg-primary/10 hover:bg-primary/20",
                "text-primary hover:text-primary",
                "border border-primary/10 hover:border-primary/20",
                "shadow-sm hover:shadow-md transition-all duration-300"
              )}
              onClick={handleGetQuote}
            >
              <span className="relative z-10 flex items-center gap-2">
                Get a Free Quote
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
              </span>
            </Button>
            <Button
              asChild
              className="rounded-full"
            >
              <Link href={pathname === "/" ? "#contact" : "/#contact"}>
                Contact Us
              </Link>
            </Button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center space-x-4 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        {/* Mobile menu overlay */}
        <div
          className={cn(
            "fixed inset-0 bg-background/80 backdrop-blur-sm z-[100]",
            "transition-all duration-300",
            mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
          aria-hidden="true"
          onClick={() => setMobileMenuOpen(false)} // Close menu when clicking overlay
        />

        {/* Mobile menu drawer */}
        <div
          className={cn(
            "fixed inset-0 z-[100] bg-background shadow-xl",
            "sm:max-w-sm sm:right-0 sm:left-auto",
            "transform transition-all duration-300 ease-out",
            "flex flex-col", // Enable proper flex layout
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          {/* Header */}
          <div className="flex-shrink-0 bg-background/95 backdrop-blur-sm border-b border-border/50 px-6 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="p-1.5" onClick={() => setMobileMenuOpen(false)}>
                <span className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                  Codemates LTD
                </span>
              </Link>
              <button
                type="button"
                className="rounded-md p-2.5 text-foreground/60 hover:text-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto overscroll-contain px-6 py-6">
            <div className="flex flex-col h-full">
              <nav className="space-y-3 pb-6 flex-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.path}
                    onClick={(e) => {
                      handleNavClick(e, item);
                      setMobileMenuOpen(false);
                    }}
                    className={cn(
                      "block rounded-lg px-4 py-3 text-base font-semibold",
                      "transition-colors duration-200",
                      "hover:bg-accent hover:text-accent-foreground",
                      "active:scale-[0.98] active:duration-75",
                      pathname === item.path && "bg-accent/50 text-accent-foreground"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>

              {/* Bottom actions */}
              <div className="flex-shrink-0 space-y-4 pt-6 border-t border-border">
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full rounded-full relative group",
                    "bg-primary/10 hover:bg-primary/20",
                    "text-primary hover:text-primary",
                    "border border-primary/10 hover:border-primary/20",
                    "shadow-sm hover:shadow-md transition-all duration-300"
                  )}
                  onClick={(e) => {
                    handleGetQuote(e);
                    setMobileMenuOpen(false);
                  }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Get a Free Quote
                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </span>
                </Button>
                <Button
                  className="w-full rounded-full"
                  asChild
                >
                  <Link 
                    href={pathname === "/" ? "#contact" : "/#contact"}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Contact Us
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}