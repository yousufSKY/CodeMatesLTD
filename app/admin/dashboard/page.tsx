"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Users,
  Briefcase,
  MessageSquare,
  BarChart3,
  ArrowUpRight,
  Check,
  Clock,
} from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const stats = [
  {
    title: "Total Projects",
    value: "12",
    change: "+2",
    icon: Briefcase,
  },
  {
    title: "Team Members",
    value: "6",
    change: "+1",
    icon: Users,
  },
  {
    title: "Client Inquiries",
    value: "24",
    change: "+5",
    icon: MessageSquare,
  },
  {
    title: "Project Success Rate",
    value: "98%",
    change: "+2%",
    icon: BarChart3,
  },
];

const recentProjects = [
  {
    name: "E-Learning Platform",
    status: "Completed",
    date: "May 25, 2025",
  },
  {
    name: "Smart Home System",
    status: "In Progress",
    date: "May 28, 2025",
  },
  {
    name: "Healthcare AI",
    status: "In Progress",
    date: "May 30, 2025",
  },
];

export default function DashboardPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulating data loading
    setTimeout(() => setIsLoading(false), 1000);

    // TODO: Add authentication check
    // If not authenticated, redirect to login
    // if (!isAuthenticated) router.push('/admin/login');
  }, []);  return (
    <div className="min-h-screen p-8 pt-24">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, Admin</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-xs text-green-500 flex items-center">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  {stat.change} this month
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Recent Projects */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Recent Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentProjects.map((project) => (
              <div
                key={project.name}
                className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0"
              >
                <div>
                  <div className="font-medium">{project.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {project.date}
                  </div>
                </div>
                <div className="flex items-center">
                  {project.status === "Completed" ? (
                    <span className="flex items-center text-green-500 text-sm">
                      <Check className="h-4 w-4 mr-1" />
                      Completed
                    </span>
                  ) : (
                    <span className="flex items-center text-blue-500 text-sm">
                      <Clock className="h-4 w-4 mr-1" />
                      In Progress
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Button className="w-full" onClick={() => router.push("/admin/projects")}>
          Manage Projects
        </Button>
        <Button className="w-full" onClick={() => router.push("/admin/team")}>
          Manage Team
        </Button>
        <Button className="w-full" onClick={() => router.push("/admin/inquiries")}>
          View Inquiries
        </Button>
      </div>
    </div>
  );
}
