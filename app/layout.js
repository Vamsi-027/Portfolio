import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Navigation from '../components/Navigation'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
})

export const metadata = {
  title: 'Vamsi Cheruku | Systems Architect & Performance Engineer',
  description: 'I don\'t just build systems—I engineer competitive advantages. Backend engineer specializing in high-performance, scalable distributed systems with proven business impact.',
  keywords: 'systems architect, backend engineer, performance optimization, distributed systems, scalable architecture, Java, Spring Boot, microservices, AWS, Vamsi Cheruku',
  authors: [{ name: 'Vamsi Cheruku' }],
  creator: 'Vamsi Cheruku',
  publisher: 'Vamsi Cheruku',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://vamsicheruku.dev'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Vamsi Cheruku | Systems Architect & Performance Engineer',
    description: 'I don\'t just build systems—I engineer competitive advantages. Proven track record of building scalable systems that drive measurable business impact.',
    url: 'https://vamsicheruku.dev',
    siteName: 'Vamsi Cheruku Portfolio',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Vamsi Cheruku - Systems Architect & Performance Engineer',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vamsi Cheruku | Systems Architect & Performance Engineer',
    description: 'I don\'t just build systems—I engineer competitive advantages.',
    images: ['/images/og-image.jpg'],
    creator: '@vamsicheruku',
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
  verification: {
    google: 'your-google-verification-code',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#171717' },
  ],
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} scroll-smooth`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body 
        className={`${inter.className} antialiased bg-neutral-50 text-neutral-900 overflow-x-hidden`}
        suppressHydrationWarning={true}
      >
        {/* Skip to main content for accessibility */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary-600 text-white px-4 py-2 rounded-md z-50 transition-all"
        >
          Skip to main content
        </a>
        
        {/* Navigation */}
        <Navigation />
        
        {/* Main Content */}
        <main id="main-content" className="relative">
          {children}
        </main>
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Vamsi Cheruku',
              jobTitle: 'Systems Architect & Performance Engineer',
              description: 'Backend engineer specializing in high-performance, scalable distributed systems',
              url: 'https://vamsicheruku.dev',
              sameAs: [
                'https://linkedin.com/in/vamsi-cheruku-05a19a1b4',
                'https://github.com/Vamsi-027'
              ],
              worksFor: {
                '@type': 'Organization',
                name: 'Zoho Corporation'
              },
              alumniOf: {
                '@type': 'EducationalOrganization',
                name: 'Your University Name'
              },
              knowsAbout: [
                'Backend Development',
                'System Architecture',
                'Performance Optimization',
                'Distributed Systems',
                'Java',
                'Spring Boot',
                'Microservices',
                'AWS',
                'Docker',
                'Kubernetes'
              ]
            })
          }}
        />
      </body>
    </html>
  )
}