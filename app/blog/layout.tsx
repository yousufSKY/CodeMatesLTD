import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | Codemates LTD',
  description: 'Stay updated with our latest insights, tutorials, and tech discussions. Learn about web development, data science, and more.',
  openGraph: {
    title: 'Blog - Codemates LTD',
    description: 'Stay updated with our latest insights, tutorials, and tech discussions. Learn about web development, data science, and more.',
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
