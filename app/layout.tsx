import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://rodrigo-viola.netlify.app'),
  title: 'Rodrigo Viola — GTM Engineer',
  description:
    'I build the systems that replace manual go-to-market work: outbound engines, enrichment layers, and the email infrastructure underneath them.',
  openGraph: {
    title: 'Rodrigo Viola — GTM Engineer',
    description: 'Outbound engines, enrichment layers, and email infrastructure.',
    type: 'profile',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
