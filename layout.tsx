import type { Metadata } from 'next'
import './globals.css'
import { siteConfig } from './siteConfig'

export const metadata: Metadata = {
  title: `${siteConfig.brand.name} - ${siteConfig.brand.tagline}`,
  description: siteConfig.brand.description,
  keywords: ['innovation', 'technology', 'industrial', 'cyber', 'transformation'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
