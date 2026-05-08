import type { Metadata, Viewport } from 'next'
import '@/globals.css'
import ClientLayout from '@/_components/ClientLayout'

export const metadata: Metadata = {
  title: 'Service-U Cebu',
  description: 'Find trusted local services in Cebu - Massage, Carpentry, Cleaning, and Repairs. Book now!',
  manifest: '/manifest.json',
  icons: {
    icon: '/images/app-logo.jpg',
    apple: '/images/app-logo.jpg',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#0F3D2E',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body style={{ background: '#0F3D2E' }}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
