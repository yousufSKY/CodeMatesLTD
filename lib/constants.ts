import {
  Paintbrush,
  Code,
  BarChart3,
  Database,
  Brain,
  Wifi,
  Wrench,
  Layers,
} from "lucide-react";

export const services = [
  {
    title: "UI/UX Design",
    description:
      "Creating beautiful, intuitive interfaces and seamless user experiences for web and mobile applications.",
    icon: Paintbrush,
  },
  {
    title: "Full Stack Web Development",
    description:
      "End-to-end web development services using the latest technologies and frameworks for scalable applications.",
    icon: Code,
  },
  {
    title: "Data Analysis",
    description:
      "Transform raw data into actionable insights with advanced analytics and visualization techniques.",
    icon: BarChart3,
  },
  {
    title: "Data Science",
    description:
      "Extract meaningful patterns from complex datasets using statistical methods and predictive modeling.",
    icon: Database,
  },
  {
    title: "Machine Learning Models",
    description:
      "Develop and deploy custom AI solutions to automate processes and make data-driven predictions.",
    icon: Brain,
  },
  {
    title: "Internet of Things (IoT)",
    description:
      "Connect physical devices to the digital world with custom IoT solutions and integrations.",
    icon: Wifi,
  },
  {
    title: "Debugging & Optimization",
    description:
      "Identify and fix issues in existing systems while optimizing for performance and scalability.",
    icon: Wrench,
  },
  {
    title: "Frontend & Backend",
    description:
      "Specialized development services for either frontend interfaces or backend systems and APIs.",
    icon: Layers,
  },
];

export const projects = [
  {
    id: 1,
    title: "BuildaArt Construction",
    description:
      "A modern real estate website showcasing luxury villa projects, project galleries, and seamless property inquiries.",
    image: "https://www.buildaart.com/static/images/vision143.jpg",
    technologies: ["HTML", "Tailwind CSS", "Python", "Flask", "Supabase"],
    category: "Web Development",
    status: "Completed",
    url: "https://buildaart.com",
    feedback: {
      clientName: "Buildaart Team",
      comment: "Exceptional work on our website. The modern design and seamless functionality perfectly represent our brand. The team's attention to detail was outstanding.",
      rating: 5
    }
  },
  {
    id: 2,
    title: "YUKTI 2025 - Tech Fest",
    description:
      "Official website for VTU's Regional Level Techno-Cultural Management Fest, featuring event registration, schedule management, and live updates.",
    image: "https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg",
    technologies: ["HTML", "Tailwind CSS", "Python", "Flask", "Supabase"],
    category: "Web Development",
    status: "Completed",
    url: "https://yukti.vtucpgsklb.in",
    feedback: {
      clientName: "VTU Tech Fest Committee",
      comment: "The website exceeded our expectations. The event registration system and real-time updates made managing our tech fest effortless. The team was highly responsive throughout the development process.",
      rating: 5
    }
  },
  
  {
    id: 4,
    title: "AI Content Generator",
    description:
      "An AI-powered platform that generates high-quality content for marketing, blogs, and social media.",
    image: "https://images.pexels.com/photos/8438923/pexels-photo-8438923.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    technologies: ["Python", "OpenAI API", "Vue.js", "FastAPI"],
    category: "Machine Learning",
    status: "Ongoing",
    url: "#",
  },
  {
    id: 5,
    title: "Smart Home System",
    description:
      "An IoT solution for home automation with voice control, scheduling, and energy optimization.",
    image: "https://images.pexels.com/photos/3975590/pexels-photo-3975590.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    technologies: ["React", "Node.js", "MQTT", "Raspberry Pi"],
    category: "IoT",
    status: "Ongoing",
    url: "#",
  },
  {
    id: 6,
    title: "E-Learning Platform",
    description:
      "A comprehensive learning management system with course creation, student tracking, and assessment tools.",
    image: "https://images.pexels.com/photos/5989933/pexels-photo-5989933.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    technologies: ["Next.js", "Django", "PostgreSQL", "AWS"],
    category: "Web Development",
    status: "Ongoing",
    url: "#",
  },
  {
    id: 7,
    title: "Ovarian Cancer Prediction System",
    description:
      "An advanced ML model for early detection and prediction of ovarian cancer using medical imaging and patient data analysis.",
    image: "https://images.pexels.com/photos/3938023/pexels-photo-3938023.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    technologies: ["Python", "TensorFlow", "OpenCV", "scikit-learn", "Flask"],
    category: "Machine Learning",
    status: "Ongoing",
    url: "#",
  },
  {
    id: 8,
    title: "Genetic Disease Prediction",
    description:
      "ML-powered system for analyzing genetic markers and predicting potential genetic disorders using advanced DNA sequence analysis.",
    image: "https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    technologies: ["Python", "PyTorch", "Pandas", "BioPython", "FastAPI"],
    category: "Machine Learning",
    status: "Ongoing",
    url: "#",
  },
  {
    id: 9,
    title: "Sindoor - Complete AI Assistant",
    description:
      "A sophisticated AI assistant capable of natural language understanding, task automation, and personalized interactions.",
    image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    technologies: ["Python", "OpenAI API", "LangChain", "Transformers", "Flask"],
    category: "Machine Learning",
    status: "Ongoing",
    url: "#",
  },
];