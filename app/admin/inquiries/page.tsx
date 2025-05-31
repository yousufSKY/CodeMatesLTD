"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Eye, Mail, Loader2, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Inquiry {
  id: string;
  name: string;
  email: string;
  message: string;
  projectType: string;
  status: string;
  createdAt: string;
}

const projectTypeLabels: Record<string, string> = {
  "web-development": "Web Development",
  "mobile-app": "Mobile App Development",
  "ui-ux": "UI/UX Design",
  "data-analytics": "Data Analytics",
  "machine-learning": "Machine Learning",
  "cloud-services": "Cloud Services",
  security: "Cybersecurity Solutions",
  consulting: "IT Consulting",
  other: "Other Services",
};

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      const response = await fetch("/api/admin/inquiries", {
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to fetch inquiries");
      const data = await response.json();
      setInquiries(data);
    } catch (error) {
      console.error("Error fetching inquiries:", error);
      toast({
        title: "Error",
        description: "Failed to fetch inquiries",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const response = await fetch("/api/admin/inquiries", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, status: newStatus }),
        credentials: "include",
      });

      if (!response.ok) throw new Error("Failed to update status");

      setInquiries(
        inquiries.map((inquiry) => {
          if (inquiry.id === id) {
            return { ...inquiry, status: newStatus };
          }
          return inquiry;
        })
      );

      toast({
        title: "Status Updated",
        description: `Inquiry status changed to ${newStatus}`,
      });
    } catch (error) {
      console.error("Error updating status:", error);
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive",
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-24 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-24">
      <Card>
        <CardHeader>
          <CardTitle>Inquiries</CardTitle>
          <CardDescription>
            Manage and respond to client inquiries
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Project Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inquiries.map((inquiry) => (
                <TableRow key={inquiry.id}>
                  <TableCell>{formatDate(inquiry.createdAt)}</TableCell>
                  <TableCell>{inquiry.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {
                        projectTypeLabels[inquiry.projectType] ||
                        inquiry.projectType
                      }
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={inquiry.status === "New" ? "default" : "secondary"}
                      className={
                        inquiry.status === "New"
                          ? "bg-primary/20 text-primary hover:bg-primary/30"
                          : ""
                      }
                    >
                      {inquiry.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelectedInquiry(inquiry);
                          setIsViewOpen(true);
                        }}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button
                        size="sm"
                        variant="default"
                        onClick={() =>
                          handleStatusChange(
                            inquiry.id,
                            inquiry.status === "New" ? "Read" : "New"
                          )
                        }
                      >
                        <Mail className="h-4 w-4 mr-1" />
                        Mark as {inquiry.status === "New" ? "Read" : "New"}
                      </Button>
                      <Button size="sm" variant="outline" asChild>
                        <a
                          href={`mailto:${inquiry.email}`}
                          className="flex items-center"
                        >
                          <ExternalLink className="h-4 w-4 mr-1" />
                          Reply
                        </a>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Inquiry Details</DialogTitle>
                <DialogDescription>
                  Received on{" "}
                  {selectedInquiry?.createdAt
                    ? formatDate(selectedInquiry.createdAt)
                    : ""}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium">Name</h4>
                    <p className="text-sm text-muted-foreground">
                      {selectedInquiry?.name}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium">Email</h4>
                    <p className="text-sm text-muted-foreground">
                      {selectedInquiry?.email}
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium">Project Type</h4>
                  <p className="text-sm text-muted-foreground">
                    {
                      selectedInquiry?.projectType &&
                      projectTypeLabels[selectedInquiry.projectType]
                    }
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">Message</h4>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                    {selectedInquiry?.message}
                  </p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
}
