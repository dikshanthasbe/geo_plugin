import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'GEO URL Analyzer Dashboard',
  description: 'Optimize your website for AI search engines like ChatGPT, Gemini, and Claude',
  keywords: 'AI optimization, SEO, ChatGPT, Gemini, Claude, content optimization',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">
          {children}
        </div>
      </body>
    </html>
  )
}
