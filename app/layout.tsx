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
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://codemates.com'),
  title: {
    default: 'Codemates LTD | Code, Analyze, Deploy',
    template: '%s | Codemates LTD',
  },
  description: 'Leading tech company delivering innovative digital solutions through web development, data analysis, machine learning, and UI/UX design. Transform your business with our cutting-edge services.',
  keywords: [
    'tech company',
    'web development',
    'data analysis',
    'machine learning',
    'UI/UX design',
    'software development',
    'digital transformation',
    'IT consulting',
    'Kalaburagi tech',
    'Karnataka IT services'
  ],
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
  applicationName: 'Codemates LTD',
  authors: [{ name: 'Codemates LTD Team' }],
  generator: 'Next.js',
  formatDetection: {
    telephone: true,
    date: true,
    address: true,
    email: true,
    url: true,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Codemates LTD',
  },
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
  twitter: {
    card: 'summary_large_image',
    title: 'Codemates LTD | Code, Analyze, Deploy',
    description: 'Transforming businesses with cutting-edge digital solutions.',
    creator: '@codematesltd',
    creatorId: 'codematesltd',
    images: ['/og-image.jpg'],
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Codemates LTD',
    title: 'Codemates LTD | Code, Analyze, Deploy',
    description: 'Leading tech company specializing in web development, data analysis, machine learning, and UI/UX design.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Codemates LTD - Digital Solutions Provider',
      },
    ],
  },
};

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
                email: 'codematesltd@gmail.com',
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