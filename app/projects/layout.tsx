import { Metadata } from 'next';
import { pagesMetadata, siteConfig } from '@/lib/metadata';

export const metadata: Metadata = {
  title: pagesMetadata.projects.title,
  description: pagesMetadata.projects.description,
  alternates: {
    canonical: '/projects',
  },
  openGraph: {
    title: pagesMetadata.projects.title,
    description: pagesMetadata.projects.description,
    url: '/projects',
    type: 'website',
  },
};

// Portfolio JSON-LD structured data with ItemList for projects
const portfolioSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: pagesMetadata.projects.title,
  description: pagesMetadata.projects.description,
  url: `${siteConfig.url}/projects`,
  publisher: {
    '@type': 'Organization',
    name: siteConfig.name,
    logo: {
      '@type': 'ImageObject',
      url: `${siteConfig.url}/logo.png`
    }
  },
  mainEntity: {
    '@type': 'ItemList',
    itemListElement: [
      {
        '@type': 'WebSite',
        position: 1,
        url: `${siteConfig.url}/projects#buildaart`,
        name: 'BuildaArt',
        description: 'AI-powered art generation platform with advanced customization',
        image: 'https://www.buildaart.com/static/images/vision143.jpg'
      },
      {
        '@type': 'WebSite',
        position: 2,
        url: `${siteConfig.url}/projects#healthtech`,
        name: 'HealthTech Analytics',
        description: 'Healthcare data analytics and visualization platform',
        image: 'https://images.pexels.com/photos/8438923/pexels-photo-8438923.jpeg'
      },
      {
        '@type': 'WebSite',
        position: 3,
        url: `${siteConfig.url}/projects#edutech`,
        name: 'EduTech Platform',
        description: 'Online learning management system with AI-powered personalization',
        image: 'https://images.pexels.com/photos/5989933/pexels-photo-5989933.jpeg'
      }
    ]
  }
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioSchema) }}
      />
      {children}
    </main>
  );
}
