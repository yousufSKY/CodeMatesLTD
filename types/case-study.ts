export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  overview: string;
  problem: string;
  solution: string;
  techStack: string[];
  metrics: {
    label: string;
    value: string;
    description?: string;
  }[];
  clientQuote?: {
    text: string;
    author: string;
    position: string;
  };
  thumbnailUrl: string;
  images: {
    url: string;
    alt: string;
    caption?: string;
  }[];
  industry: string;
  duration: string;
  projectUrl?: string;
}
