import { Metadata } from 'next';
import { pagesMetadata, siteConfig } from '@/lib/metadata';

export const metadata: Metadata = {
  title: pagesMetadata.about.title,
  description: pagesMetadata.about.description,
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: pagesMetadata.about.title,
    description: pagesMetadata.about.description,
    url: '/about',
    type: 'website',
  },
};

// About page JSON-LD structured data
const aboutSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: pagesMetadata.about.title,
  description: pagesMetadata.about.description,
  url: `${siteConfig.url}/about`,
  publisher: {
    '@type': 'Organization',
    name: siteConfig.name,
    logo: {
      '@type': 'ImageObject',
      url: `${siteConfig.url}/logo.png`
    }
  }
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      {children}
    </main>
  );
}
