"use client";

import { useState, useEffect } from "react";
import { Bell, Loader2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

interface Notification {
  id: string;
  name: string;
  projectType: string;
  createdAt: string;
  status: string;
}

export function NotificationsMenu() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

  const fetchNotifications = async () => {
    try {
      const response = await fetch("/api/admin/inquiries", {
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to fetch notifications");
      const data = await response.json();
      // Filter only new inquiries
      const newInquiries = data.filter((inquiry: Notification) => inquiry.status === "New");
      setNotifications(newInquiries);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
    // Poll for new notifications every minute
    const interval = setInterval(fetchNotifications, 60000);
    return () => clearInterval(interval);
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    // If less than 24 hours ago, show relative time
    if (diff < 24 * 60 * 60 * 1000) {
      const hours = Math.floor(diff / (60 * 60 * 1000));
      if (hours < 1) {
        const minutes = Math.floor(diff / (60 * 1000));
        return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
      }
      return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    }
    
    // Otherwise show the date
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const updateInquiryStatus = async (id: string, showToast = true) => {
    try {
      const response = await fetch(`/api/admin/inquiries`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, status: 'Viewed' }),
        credentials: 'include',
      });
      
      if (!response.ok) {
        throw new Error('Failed to update inquiry status');
      }

      const data = await response.json();
      
      if (data.success) {
        // Update local state
        setNotifications(prev => prev.filter(n => n.id !== id));
        
        if (showToast) {
          toast({
            title: "Success",
            description: "Notification marked as viewed",
          });
        }
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error updating notification status:', error);
      if (showToast) {
        toast({
          title: "Error",
          description: "Failed to mark notification as viewed",
          variant: "destructive",
        });
      }
      return false;
    }
  };

  const handleClick = async (id: string) => {
    const success = await updateInquiryStatus(id);
    if (success) {
      router.push('/admin/inquiries');
    }
  };

  const handleMarkAllAsViewed = async () => {
    try {
      const results = await Promise.all(
        notifications.map(n => updateInquiryStatus(n.id, false))
      );
      
      const allSuccess = results.every(result => result);
      
      if (allSuccess) {
        toast({
          title: "Success",
          description: `${results.length} notifications marked as viewed`,
        });
        setNotifications([]);
      } else {
        throw new Error('Some notifications failed to update');
      }
    } catch (error) {
      console.error('Error marking all notifications as viewed:', error);
      toast({
        title: "Error",
        description: "Failed to mark all notifications as viewed",
        variant: "destructive",
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative hover:bg-accent"
          aria-label={`${notifications.length} notifications`}
        >
          <Bell className="h-5 w-5" />
          {notifications.length > 0 && (
            <Badge
              className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0"
              variant="destructive"
            >
              {notifications.length}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[380px]">
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h3 className="font-semibold">Notifications</h3>
          {notifications.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleMarkAllAsViewed}
              className="h-8 text-xs"
            >
              Mark all as viewed
            </Button>
          )}
        </div>
        <div className="max-h-[400px] overflow-y-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-6">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : notifications.length === 0 ? (
            <div className="px-4 py-6 text-sm text-center text-muted-foreground">
              No new notifications
            </div>
          ) : (
            <div className="grid gap-1 p-1">
              {notifications.map((notification) => (
                <DropdownMenuItem
                  key={notification.id}
                  className="flex flex-col gap-2 rounded-lg p-4 focus:bg-accent"
                  onClick={() => handleClick(notification.id)}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="grid gap-1">
                      <p className="font-medium leading-none">
                        {notification.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {notification.projectType}
                      </p>
                    </div>
                    <time className="text-xs tabular-nums text-muted-foreground">
                      {formatDate(notification.createdAt)}
                    </time>
                  </div>
                </DropdownMenuItem>
              ))}
            </div>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
