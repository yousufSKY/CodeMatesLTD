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
  { name: "Blog", path: "/blog" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [currentHash, setCurrentHash] = React.useState("");
  const pathname = usePathname();
  const router = useRouter();

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
        "text-foreground",
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border/40"
          : "bg-transparent"
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

        {/* Mobile menu */}
        <div
          className={cn(
            "fixed inset-y-0 right-0 z-50 w-full bg-background/95 backdrop-blur-sm px-6 py-6",
            "sm:max-w-sm border-l border-border transform transition-transform duration-300 ease-in-out",
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5" onClick={() => setMobileMenuOpen(false)}>
              <span className="text-2xl font-bold">Codemates LTD</span>
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.path}
                    onClick={(e) => {
                      handleNavClick(e, item);
                      setMobileMenuOpen(false);
                    }}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-accent"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="py-6 space-y-4">
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