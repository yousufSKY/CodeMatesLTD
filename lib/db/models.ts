export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category: string;
  status: 'Completed' | 'Ongoing' | 'Upcoming';
  url?: string;
  githubUrl?: string;
  demoUrl?: string;
  startDate?: string;
  endDate?: string;
  featured?: boolean;
  client?: string;
  testimonial?: {
    name: string;
    role: string;
    company: string;
    message: string;
    rating: number;
  };
}