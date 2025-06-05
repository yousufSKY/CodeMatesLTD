"use client";

import { useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import type { Project } from "@/types/project";
import { LoadingButton } from "@/components/ui/loading-button";
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
  const [isLoading, setIsLoading] = useState({
    add: false,
    edit: false,
    delete: null as number | null,
  });
  const [newProject, setNewProject] = useState<Omit<Project, "id">>({
    name: "",
    description: "",
    status: "Not Started",
    startDate: "",
    endDate: "",
  });

  const handleAddProject = async () => {
    try {
      setIsLoading((prev) => ({ ...prev, add: true }));
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setProjects([...projects, { ...newProject, id: projects.length + 1 }]);
      setNewProject({
        name: "",
        description: "",
        status: "Not Started",
        startDate: "",
        endDate: "",
      });
      setIsAddDialogOpen(false);
    } finally {
      setIsLoading((prev) => ({ ...prev, add: false }));
    }
  };

  const handleEditProject = (project: Project) => {
    setSelectedProject(project);
    setIsEditDialogOpen(true);
  };

  const handleUpdateProject = async () => {
    if (!selectedProject) return;
    try {
      setIsLoading((prev) => ({ ...prev, edit: true }));
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setProjects(
        projects.map((p: Project) =>
          p.id === selectedProject.id ? selectedProject : p
        )
      );
      setIsEditDialogOpen(false);
      setSelectedProject(null);
    } finally {
      setIsLoading((prev) => ({ ...prev, edit: false }));
    }
  };

  const handleDeleteProject = async (id: number) => {
    try {
      setIsLoading((prev) => ({ ...prev, delete: id }));
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setProjects(projects.filter((p) => p.id !== id));
    } finally {
      setIsLoading((prev) => ({ ...prev, delete: null }));
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Projects</h1>
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
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={newProject.name}
                  onChange={(e) =>
                    setNewProject((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={newProject.description}
                  onChange={(e) =>
                    setNewProject((prev) => ({ ...prev, description: e.target.value }))
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={newProject.status}
                  onValueChange={(value: Project['status']) =>
                    setNewProject((prev) => ({ ...prev, status: value }))
                  }
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
              <div className="grid gap-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  name="startDate"
                  type="date"
                  value={newProject.startDate}
                  onChange={(e) =>
                    setNewProject((prev) => ({ ...prev, startDate: e.target.value }))
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  name="endDate"
                  type="date"
                  value={newProject.endDate}
                  onChange={(e) =>
                    setNewProject((prev) => ({ ...prev, endDate: e.target.value }))
                  }
                />
              </div>
            </div>
            <LoadingButton
              isLoading={isLoading.add}
              loadingText="Adding Project..."
              onClick={handleAddProject}
              className="w-full"
            >
              Add Project
            </LoadingButton>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project.id}>
                <TableCell>{project.name}</TableCell>
                <TableCell>{project.description}</TableCell>
                <TableCell>{project.status}</TableCell>
                <TableCell>{project.startDate}</TableCell>
                <TableCell>{project.endDate}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <LoadingButton
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditProject(project)}
                    >
                      <Pencil className="h-4 w-4" />
                    </LoadingButton>
                    <LoadingButton
                      variant="ghost"
                      size="sm"
                      isLoading={isLoading.delete === project.id}
                      onClick={() => handleDeleteProject(project.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </LoadingButton>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {selectedProject && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Project</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Name</Label>
                <Input
                  id="edit-name"
                  value={selectedProject.name}
                  onChange={(e) =>
                    setSelectedProject((prev) =>
                      prev ? { ...prev, name: e.target.value } : null
                    )
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={selectedProject.description}
                  onChange={(e) =>
                    setSelectedProject((prev) =>
                      prev ? { ...prev, description: e.target.value } : null
                    )
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-status">Status</Label>
                <Select
                  value={selectedProject.status}
                  onValueChange={(value: Project['status']) =>
                    setSelectedProject((prev) =>
                      prev ? { ...prev, status: value } : null
                    )
                  }
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
              <div className="grid gap-2">
                <Label htmlFor="edit-startDate">Start Date</Label>
                <Input
                  id="edit-startDate"
                  type="date"
                  value={selectedProject.startDate}
                  onChange={(e) =>
                    setSelectedProject((prev) =>
                      prev ? { ...prev, startDate: e.target.value } : null
                    )
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-endDate">End Date</Label>
                <Input
                  id="edit-endDate"
                  type="date"
                  value={selectedProject.endDate}
                  onChange={(e) =>
                    setSelectedProject((prev) =>
                      prev ? { ...prev, endDate: e.target.value } : null
                    )
                  }
                />
              </div>
            </div>
            <LoadingButton
              isLoading={isLoading.edit}
              loadingText="Updating Project..."
              onClick={handleUpdateProject}
              className="w-full"
            >
              Update Project
            </LoadingButton>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
