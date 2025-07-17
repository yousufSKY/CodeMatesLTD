import './globals.css';
import { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import { ThemeProvider } from '@/components/theme-provider';
import { AuthProvider } from '@/lib/auth-context';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Toaster } from '@/components/ui/toaster';
import { AccessibilityProvider } from '@/components/providers/accessibility-provider';
import { siteConfig } from '@/lib/metadata';

// Initialize Google Font with optimization settings
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#0070F3',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: siteConfig.authors,
  creator: siteConfig.creator,
  metadataBase: siteConfig.metadataBase,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: '@codematesltd',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification',
    yandex: 'your-yandex-verification',
  },
}

// Schema.org JSON-LD for organization
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}/logo.png`,
  sameAs: [
    siteConfig.links.twitter,
    siteConfig.links.github,
    siteConfig.links.linkedin,
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91-73489-75886',
    contactType: 'customer service',
    email: 'support@codemates.in',
    areaServed: 'IN',
    availableLanguage: ['en'],
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Kalaburagi',
    addressRegion: 'Karnataka',
    addressCountry: 'IN',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0070F3" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Preconnect to domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Preload critical assets */}
        <link rel="preload" as="image" href="/logo.svg" />
        
        {/* Add schema markup for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Codemates LTD',
              url: 'https://codemates.com',
              logo: 'https://codemates.com/logo.svg',
              sameAs: [
                'https://twitter.com/codematesltd',
                'https://www.linkedin.com/company/codematesltd',
                'https://www.instagram.com/codematesltd',
                'https://facebook.com/codematesltd'
              ],
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+91-123-456-7890',
                contactType: 'customer service',
                email: 'support@codemates.in',
                areaServed: 'IN',
                availableLanguage: ['en']
              },
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Kalaburagi',
                addressRegion: 'Karnataka',
                addressCountry: 'IN'
              }
            })
          }}
        />
      </head>
      <body className={`${inter.className} overflow-x-hidden antialiased`}>
        <AccessibilityProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <AuthProvider>
              <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-background text-foreground">
                <Header />
                <main 
                  id="main-content" 
                  className="flex-1 w-full" 
                  role="main"
                >
                  <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
                    {children}
                  </div>
                </main>
                <Footer />
              </div>
            </AuthProvider>
            <Toaster />
          </ThemeProvider>
        </AccessibilityProvider>

        {/* Google Maps script with performance optimization */}
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}