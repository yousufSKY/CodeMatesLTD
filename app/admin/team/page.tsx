"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
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
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  skills: string;
  bio: string;
  image: string;
}

interface TeamMemberFormData {
  name: string;
  role: string;
  skills: string;
  bio: string;
}

const initialTeamMembers: TeamMember[] = [
  {
    id: 1,
    name: "John Doe",
    role: "Full Stack Developer",
    skills: "React, Node.js, TypeScript",
    bio: "Experienced developer with 5+ years in web development",
    image: "/placeholder-avatar.jpg",
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "UI/UX Designer",
    skills: "Figma, Adobe XD, Sketch",
    bio: "Creative designer passionate about user experience",
    image: "/placeholder-avatar.jpg",
  },
];

export default function TeamManagementPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(initialTeamMembers);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<TeamMemberFormData>({
    defaultValues: {
      name: "",
      role: "",
      skills: "",
      bio: "",
    },
  });

  const onSubmit = async (data: TeamMemberFormData) => {
    try {
      // TODO: Implement API call to add team member
      const newMember: TeamMember = {
        id: teamMembers.length + 1,
        ...data,
        image: "/placeholder-avatar.jpg",
      };

      setTeamMembers([...teamMembers, newMember]);
      setIsOpen(false);
      form.reset();
      toast({
        title: "Success",
        description: "Team member added successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add team member",
      });
    }
  };

  const handleDeleteMember = (id: number) => {
    // TODO: Implement API call to delete team member
    setTeamMembers(teamMembers.filter((member) => member.id !== id));
    toast({
      title: "Success",
      description: "Team member deleted successfully",
    });
  };

  return (
    <div className="container mx-auto px-4 py-24">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Team Management</CardTitle>
              <CardDescription>
                Add, edit or remove team members
              </CardDescription>
            </div>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add Member
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Team Member</DialogTitle>
                  <DialogDescription>
                    Fill in the details of the new team member
                  </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Enter name" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Role</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Enter role" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="skills"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Skills</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="e.g., React, Node.js, TypeScript" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="bio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bio</FormLabel>
                          <FormControl>
                            <Textarea {...field} placeholder="Brief description about the team member" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex justify-end gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setIsOpen(false);
                          form.reset();
                        }}
                      >
                        Cancel
                      </Button>
                      <Button type="submit">Add Member</Button>
                    </div>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Skills</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teamMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>{member.name}</TableCell>
                  <TableCell>{member.role}</TableCell>
                  <TableCell>{member.skills}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          toast({
                            title: "Coming Soon",
                            description: "Edit functionality coming soon",
                          });
                        }}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleDeleteMember(member.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
