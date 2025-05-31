"use client";

import { useState } from "react";
import { type ChangeEvent } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import type { Project } from "@/types/project";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Sample data - replace with actual data fetching
const projectsData: Project[] = [
  {
    id: 1,
    name: "E-Learning Platform",
    description: "A comprehensive online learning solution",
    status: "Completed",
    startDate: "2025-01-15",
    endDate: "2025-05-25",
  },
  {
    id: 2,
    name: "Smart Home System",
    description: "IoT-based home automation system",
    status: "In Progress",
    startDate: "2025-03-01",
    endDate: "2025-08-30",
  },
  {
    id: 3,
    name: "Healthcare AI",
    description: "AI-powered healthcare diagnostics",
    status: "In Progress",
    startDate: "2025-04-15",
    endDate: "2025-10-30",
  },
];

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(projectsData);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [newProject, setNewProject] = useState<Omit<Project, "id">>({
    name: "",
    description: "",
    status: "Not Started",
    startDate: "",
    endDate: "",
  });

  const handleAddProject = () => {
    setProjects([...projects, { ...newProject, id: projects.length + 1 }]);
    setNewProject({
      name: "",
      description: "",
      status: "Not Started",
      startDate: "",
      endDate: "",
    });
    setIsAddDialogOpen(false);
  };

  const handleEditProject = (project: Project) => {
    setSelectedProject(project);
    setIsEditDialogOpen(true);
  };

  const handleUpdateProject = () => {
    if (!selectedProject) return;
    setProjects(
      projects.map((p: Project) =>
        p.id === selectedProject.id ? selectedProject : p
      )
    );
    setIsEditDialogOpen(false);
  };

  const handleDeleteProject = (projectId: number) => {
    setProjects(projects.filter((p: Project) => p.id !== projectId));
  };

  // Event handler types
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof Omit<Project, "id">
  ) => {
    setNewProject({ ...newProject, [field]: e.target.value });
  };

  const handleSelectedProjectChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof Project
  ) => {
    if (!selectedProject) return;
    setSelectedProject({
      ...selectedProject,
      [field]: e.target.value,
    });
  };

  const handleStatusChange = (value: Project["status"], isNewProject: boolean) => {
    if (isNewProject) {
      setNewProject({ ...newProject, status: value });
    } else if (selectedProject) {
      setSelectedProject({
        ...selectedProject,
        status: value,
      });
    }
  };

  return (
    <div className="min-h-screen p-8 pt-24">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-muted-foreground">Manage your portfolio projects</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Project
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Project</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Project Name</Label>
                <Input
                  id="name"
                  value={newProject.name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, "name")}
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newProject.description}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange(e, "description")}
                />
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Select
                  value={newProject.status}
                  onValueChange={(value: Project["status"]) => handleStatusChange(value, true)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Not Started">Not Started</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={newProject.startDate}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, "startDate")}
                />
              </div>
              <div>
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={newProject.endDate}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, "endDate")}
                />
              </div>
              <Button onClick={handleAddProject} className="w-full">
                Add Project
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Project Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project: Project) => (
            <TableRow key={project.id}>
              <TableCell>{project.name}</TableCell>
              <TableCell>{project.description}</TableCell>
              <TableCell>{project.status}</TableCell>
              <TableCell>{project.startDate}</TableCell>
              <TableCell>{project.endDate}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleEditProject(project)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDeleteProject(project.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Project</DialogTitle>
          </DialogHeader>
          {selectedProject && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-name">Project Name</Label>
                <Input
                  id="edit-name"
                  value={selectedProject.name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSelectedProjectChange(e, "name")}
                />
              </div>
              <div>
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={selectedProject.description}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleSelectedProjectChange(e, "description")}
                />
              </div>
              <div>
                <Label htmlFor="edit-status">Status</Label>
                <Select
                  value={selectedProject.status}
                  onValueChange={(value: Project["status"]) => handleStatusChange(value, false)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Not Started">Not Started</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-startDate">Start Date</Label>
                <Input
                  id="edit-startDate"
                  type="date"
                  value={selectedProject.startDate}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSelectedProjectChange(e, "startDate")}
                />
              </div>
              <div>
                <Label htmlFor="edit-endDate">End Date</Label>
                <Input
                  id="edit-endDate"
                  type="date"
                  value={selectedProject.endDate}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSelectedProjectChange(e, "endDate")}
                />
              </div>
              <Button onClick={handleUpdateProject} className="w-full">
                Update Project
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
