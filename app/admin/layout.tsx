"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Loader2 } from "lucide-react";
import AdminNav from "@/components/admin-nav";
import { useToast } from "@/hooks/use-toast";
import { useSessionTimeout } from "@/hooks/use-session-timeout";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { toast } = useToast();
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);  // Use session timeout hook for admin section
  useSessionTimeout();
  
  const [sessionCheckInterval, setSessionCheckInterval] = useState<NodeJS.Timeout | null>(null);
  const checkAuth = async () => {
    try {
      const response = await fetch("/api/auth/check", {
        credentials: "include",
        cache: 'no-store'
      });

      const data = await response.json();
      setIsAuthenticated(data.authenticated);

      // Handle unauthenticated state
      if (!data.authenticated && !isLoginPage) {
        if (response.status === 401) {
          toast({
            variant: "destructive",
            title: "Session Expired",
            description: "Your session has expired. Please log in again.",
          });
        } else if (response.status === 403) {
          toast({
            variant: "destructive",
            title: "Access Denied",
            description: "You don't have permission to access this area.",
          });
        }
        router.replace("/admin/login");
      } else if (data.authenticated && isLoginPage) {
        router.replace("/admin/dashboard");
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      setIsAuthenticated(false);
      if (!isLoginPage) {
        toast({
          variant: "destructive",
          title: "Session Error",
          description: "Your session has expired. Please log in again.",
        });
        router.replace("/admin/login");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();

    // Set up periodic session checks every 5 minutes
    if (!sessionCheckInterval) {
      const interval = setInterval(checkAuth, 5 * 60 * 1000);
      setSessionCheckInterval(interval);
    }

    return () => {
      if (sessionCheckInterval) {
        clearInterval(sessionCheckInterval);
      }
    };
  }, [isLoginPage]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {!isLoginPage && isAuthenticated && <AdminNav />}
      {children}
    </div>
  );
}
