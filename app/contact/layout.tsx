import { Metadata } from 'next';
import { pagesMetadata, siteConfig } from '@/lib/metadata';

export const metadata: Metadata = {
  title: pagesMetadata.contact.title,
  description: pagesMetadata.contact.description,
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: pagesMetadata.contact.title,
    description: pagesMetadata.contact.description,
    url: '/contact',
    type: 'website',
  },
};

// Contact page JSON-LD structured data
const contactSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: siteConfig.name,
  description: siteConfig.description,
  url: `${siteConfig.url}/contact`,
  logo: `${siteConfig.url}/logo.png`,
  image: `${siteConfig.url}/og-image.jpg`,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Kalaburagi',
    addressRegion: 'Karnataka',
    addressCountry: 'IN'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '17.3297',
    longitude: '76.8343'
  },
  telephone: '+91-73489-75886',
  email: 'support@codemates.in',
  sameAs: [
    siteConfig.links.twitter,
    siteConfig.links.github,
    siteConfig.links.linkedin
  ],
  openingHours: 'Mo-Fr 09:00-18:00',
  areaServed: {
    '@type': 'Country',
    name: 'India'
  },
  priceRange: '₹₹'
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      {children}
    </main>
  );
}
