import './globals.css';
import { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import { ThemeProvider } from '@/components/theme-provider';
import { AuthProvider } from '@/lib/auth-context';
import { AccessibilityProvider } from '@/components/providers/accessibility-provider';
import { siteConfig } from '@/lib/metadata';
import { GA_TRACKING_ID } from '@/lib/analytics';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Toaster } from '@/components/ui/toaster';

// Initialize Google Font with optimization settings
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

// Viewport configuration
export const viewport: Viewport = {
  themeColor: '#0070F3',
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
};

// Metadata configuration
export const metadata: Metadata = {
  metadataBase: new URL('https://codemates.in'),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: siteConfig.authors,
  creator: siteConfig.creator,
  publisher: siteConfig.name,
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
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [{
      url: siteConfig.ogImage,
      width: 1200,
      height: 630,
      alt: siteConfig.name,
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: '@codematesltd',
    creatorId: '1467726470533754880',
  },
  verification: {
    google: 'google1ce8035a662199ee',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  category: 'technology',
  applicationName: siteConfig.name,
};

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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        {/* Google Analytics */}
        {GA_TRACKING_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_TRACKING_ID}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}

        {/* SEO Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />

        {/* Resource Hints */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="preload" as="image" href="/logo.svg" />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AccessibilityProvider>
            <AuthProvider>
              <div className="relative flex min-h-screen flex-col">
                <Header />
                <main className="flex-1" id="main-content" role="main">
                  <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
                    {children}
                  </div>
                </main>
                <Footer />
              </div>
              <Toaster />
            </AuthProvider>
          </AccessibilityProvider>
        </ThemeProvider>

        {/* Maps (loaded lazily) */}
        {process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY && (
          <Script
            src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}
            strategy="lazyOnload"
          />
        )}
      </body>
    </html>
  );
}