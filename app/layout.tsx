import './globals.css';
import { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { AuthProvider } from '@/lib/auth-context';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Toaster } from '@/components/ui/toaster';

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
  title: 'Codemates LTD | Code, Analyze, Deploy',
  description: 'Codemates LTD is a tech company focused on delivering scalable and cutting-edge digital solutions.',
  keywords: ['tech company', 'web development', 'data analysis', 'machine learning', 'UI/UX design'],
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
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Codemates LTD',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://codemates.com',
    title: 'Codemates LTD | Code, Analyze, Deploy',
    description: 'Codemates LTD is a tech company focused on delivering scalable and cutting-edge digital solutions.',
    siteName: 'Codemates LTD',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Codemates LTD | Code, Analyze, Deploy',
    description: 'Codemates LTD is a tech company focused on delivering scalable and cutting-edge digital solutions.',
    creator: '@codemates',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <Header />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}