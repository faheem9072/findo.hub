import type { Metadata } from 'next';
import './globals.css';
import ClientShell from '@/components/ClientShell';

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.getfindo.in';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Wooobey — Play. Learn. Create. | Kids Developmental Toys',
    template: '%s | Wooobey — Play. Learn. Create.',
  },
  description:
    'Welcome to Wooobey! Discover screen-free, child-safe developmental toys, habit tracker routine boards, Montessori wooden puzzles, and STEM kits that inspire curious minds across India. Keep Exploring. Keep Creating. Keep Growing.',
  keywords: [
    'Wooobey',
    'Wooobey Toys',
    'Wooobey Kids',
    'Play Learn Create',
    'kids developmental toys',
    'habit tracker for kids',
    'daily routine board for kids',
    'screen free toys india',
    'montessori wooden puzzles',
    'diy instant print camera for kids',
    'stem science kits',
    'tetra tower balance game',
  ],
  authors: [{ name: 'Wooobey — Play. Learn. Create.' }],
  alternates: {
    canonical: 'https://www.getfindo.in',
  },
  openGraph: {
    title: 'Wooobey — Play. Learn. Create.',
    description:
      'Screen-free, child-safe developmental toys, routine planners, and STEM kits for growing minds across India. Keep Exploring. Keep Creating. Keep Growing.',
    url: 'https://www.getfindo.in',
    siteName: 'Wooobey',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Wooobey — Play. Learn. Create.',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wooobey — Play. Learn. Create.',
    description:
      'Screen-free, child-safe developmental toys, routine planners, and STEM kits for growing minds across India.',
    images: ['/logo.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/logo.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/logo.png', sizes: '180x180', type: 'image/png' },
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Wooobey — Play. Learn. Create.',
  alternateName: ['Wooobey', 'Wooobey Kids', 'Play Learn Create'],
  url: 'https://www.getfindo.in',
  description:
    'Play. Learn. Create. — Screen-free, child-safe developmental toys, habit trackers, and STEM kits for kids across India.',
  publisher: {
    '@type': 'Organization',
    name: 'Wooobey',
    url: 'https://www.getfindo.in',
    logo: 'https://www.getfindo.in/logo.png',
    slogan: 'Play. Learn. Create.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Quicksand:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full font-sans bg-[#fffdfa] text-[#0e2a27]">
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
