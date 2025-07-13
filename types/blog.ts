export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  publishedAt: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  coverImage: string;
  tags: string[];
  readingTime: string;
}
