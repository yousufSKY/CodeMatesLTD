import { Metadata } from 'next';
import { pagesMetadata } from '@/lib/metadata';

export const metadata: Metadata = {
  title: pagesMetadata.services.title,
  description: pagesMetadata.services.description,
  alternates: {
    canonical: '/services',
  },
  openGraph: {
    title: pagesMetadata.services.title,
    description: pagesMetadata.services.description,
    url: '/services',
    type: 'website',
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen">
      {children}
    </main>
  );
}
