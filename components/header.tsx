"use client";

import * as React from "react";
import Link from "next/link";
import type { MouseEvent } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

type NavItem = {
  name: string;
  href: string;
  path: string;
};

const navigation: NavItem[] = [
  { name: "Services", href: "#services", path: "/services" },
  { name: "Projects", href: "#projects", path: "/projects" },
  { name: "About", href: "#about", path: "/about" },
  { name: "Contact", href: "#contact", path: "/contact" },
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
    // Always handle Projects link specially
    if (item.name === "Projects") {
      e.preventDefault();
      if (pathname === "/") {
        // If on home page, just scroll to projects section
        const element = document.getElementById("projects");
        if (element) {
          window.scrollTo({
            top: element.offsetTop - 80,
            behavior: "smooth",
          });
        }
      } else {
        // If on another page, redirect to home and then scroll
        router.push("/");
        // Add a delay to allow for page transition before scrolling
        setTimeout(() => {
          const element = document.getElementById("projects");
          if (element) {
            window.scrollTo({
              top: element.offsetTop - 80,
              behavior: "smooth",
            });
          }
        }, 100);
      }
      setMobileMenuOpen(false);
      return;
    }

    const isHomePage = pathname === "/";
    
    if (isHomePage && item.href.startsWith("#")) {
      e.preventDefault();
      const element = document.getElementById(item.href.substring(1));
      if (element) {
        window.scrollTo({
          top: element.offsetTop - 80,
          behavior: "smooth",
        });
        setMobileMenuOpen(false);
      }
    } else if (!isHomePage) {
      if (item.href.startsWith("#")) {
        // Navigate to home page first if trying to access a section
        router.push("/");
        // Add a small delay to allow for page transition before scrolling
        setTimeout(() => {
          const element = document.getElementById(item.href.substring(1));
          if (element) {
            window.scrollTo({
              top: element.offsetTop - 80,
              behavior: "smooth",
            });
          }
        }, 100);
      } else {
        // Direct navigation to page
        router.push(item.path);
      }
      setMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      )}
    >
      <nav className="container mx-auto flex items-center justify-between p-4">
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
                href={pathname === "/" ? item.href : item.path}
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
            "fixed inset-y-0 right-0 z-50 w-full bg-background px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 transform transition-transform duration-300 ease-in-out",
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
                    href={pathname === "/" ? item.href : item.path}
                    onClick={(e) => handleNavClick(e, item)}
                    className={cn(
                      "-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 transition-colors duration-300",
                      ((pathname === "/" && currentHash === item.href) || 
                       pathname === item.path)
                        ? "text-primary bg-primary/10"
                        : "hover:bg-muted"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}