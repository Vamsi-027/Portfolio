import { Inter } from 'next/font/google'
import './globals.css'
import Sidebar from '../components/Sidebar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Vamsi Cheruku | Backend Engineer',
  description: 'Backend Engineer specializing in scalable systems, distributed architecture, and high-performance applications.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-gray-50 antialiased`}>
        <div className="flex min-h-screen">
          {/* Fixed Sidebar */}
          <Sidebar />
          
          {/* Main Content Area */}
          <main className="flex-1 ml-64 overflow-x-hidden">
            <div className="min-h-screen">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  )
}