import { Host_Grotesk } from 'next/font/google'
import './globals.css'
import Navigation from '../components/Navigation'

const hostGrotesk = Host_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-host',
  adjustFontFallback: false,
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
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#1c1f23' },
    { media: '(prefers-color-scheme: dark)', color: '#1c1f23' },
  ],
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={hostGrotesk.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible+Mono:wght@400;500&display=swap" rel="stylesheet" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body
        suppressHydrationWarning={true}
      >
        {/* Skip to main content for accessibility */}
        <a href="#main-content" className="skip">
          Skip to main content
        </a>
        
        {/* Navigation */}
        <Navigation />
        
        {/* Main Content */}
        <main id="main-content">
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