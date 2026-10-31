import { Rethink_Sans, Geist_Mono } from 'next/font/google'
import './globals.css'
import Navigation from '../components/Navigation'

const rethink = Rethink_Sans({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  display: 'swap',
  variable: '--font-rethink',
  adjustFontFallback: false,
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
  variable: '--font-geist-mono',
  adjustFontFallback: false,
})

export const metadata = {
  title: 'Vamsi Cheruku | Backend engineer',
  description: 'Backend engineer. Cut Kural\'s feed load at Zoho from 900 ms to 80 ms with Kafka and Redis; now building LLM agent pipelines.',
  keywords: 'systems architect, backend engineer, performance optimization, distributed systems, scalable architecture, Java, Spring Boot, microservices, AWS, Vamsi Cheruku',
  authors: [{ name: 'Vamsi Cheruku' }],
  creator: 'Vamsi Cheruku',
  publisher: 'Vamsi Cheruku',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://vamsicheruku.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Vamsi Cheruku | Backend engineer',
    description: 'Backend engineer. Cut Kural\'s feed load at Zoho from 900 ms to 80 ms with Kafka and Redis; now building LLM agent pipelines.',
    url: 'https://vamsicheruku.com',
    siteName: 'Vamsi Cheruku Portfolio',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Vamsi Cheruku, backend engineer',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vamsi Cheruku | Backend engineer',
    description: 'Backend engineer who cut Zoho\'s feed load from 900 ms to 80 ms, now building LLM agent pipelines.',
    images: ['/images/og-image.jpg'],
    creator: '@cheruku_vamsi',
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
    { media: '(prefers-color-scheme: light)', color: '#eeeeed' },
    { media: '(prefers-color-scheme: dark)', color: '#eeeeed' },
  ],
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${rethink.variable} ${geistMono.variable}`}>
      <head>
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
              jobTitle: 'Backend engineer',
              description: 'Backend engineer: Kafka, Redis and Java at Zoho, now LLM agent pipelines',
              url: 'https://vamsicheruku.com',
              sameAs: [
                'https://linkedin.com/in/vamsi-cheruku-05a19a1b4',
                'https://github.com/Vamsi-027',
                'https://x.com/cheruku_vamsi'
              ],
              worksFor: {
                '@type': 'Organization',
                name: 'Zoho Corporation'
              },
              alumniOf: {
                '@type': 'EducationalOrganization',
                name: 'Saint Louis University'
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