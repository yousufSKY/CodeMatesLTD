"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { ThemeToggle } from "./theme-toggle";
import { useToast } from "@/hooks/use-toast";
import { NotificationsMenu } from "./notifications-menu";

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const navItems = [
    { href: "/admin/dashboard", label: "Dashboard" },
    { href: "/admin/projects", label: "Projects" },
    { href: "/admin/team", label: "Team" },
    { href: "/admin/inquiries", label: "Inquiries" },
  ];

  const handleSignOut = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });
      
      if (response.ok) {
        toast({
          title: "Success",
          description: "You have been signed out",
        });
        router.push("/admin/login");
        router.refresh();
      } else {
        throw new Error("Failed to sign out");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to sign out. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 fixed top-0 w-full z-50 border-b">
      <div className="container mx-auto flex h-16 items-center px-4">
        <Link href="/admin/dashboard" className="font-bold text-xl mr-8">
          Admin Portal
        </Link>

        <div className="hidden md:flex items-center space-x-4 mr-auto">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === item.href
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>        <div className="flex items-center gap-4 ml-auto">
          <ThemeToggle />
          <NotificationsMenu />
          <Button
            variant="outline"
            size="sm"
            disabled={isLoading}
            onClick={handleSignOut}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing out...
              </>
            ) : (
              "Sign Out"
            )}
          </Button>
        </div>
      </div>
    </nav>
  );
}
