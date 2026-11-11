import type { Metadata } from 'next';
import { Quicksand, Fredoka } from 'next/font/google';
import './globals.css';
import ClientShell from '@/components/ClientShell';

const quicksand = Quicksand({
  subsets: ['latin'],
  variable: '--font-quicksand',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const fredoka = Fredoka({
  subsets: ['latin'],
  variable: '--font-fredoka',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.getfindo.in';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Findo — Find Smart Play | Kids Developmental Toys & Learning',
    template: '%s | Findo — Find Smart Play',
  },
  description:
    'Find Smart Play — Discover unique, screen-free, and child-safe developmental toys for kids across India. From habit tracker boards and wooden puzzles to DIY instant print cameras and STEM science kits!',
  keywords: [
    'Findo',
    'Find Smart Play',
    'Findo Kids Brand',
    'kids developmental toys',
    'habit tracker for kids',
    'daily routine board for kids',
    'screen free toys india',
    'montessori wooden puzzles',
    'diy instant print camera for kids',
    'stem science kits',
    'tetra tower balance game',
  ],
  authors: [{ name: 'Findo — Find Smart Play' }],
  alternates: {
    canonical: 'https://www.getfindo.in',
  },
  openGraph: {
    title: 'Findo — Find Smart Play',
    description:
      'Find Smart Play — Screen-free, child-safe developmental toys, routine planners, and STEM kits for growing minds across India.',
    url: 'https://www.getfindo.in',
    siteName: 'Findo — Find Smart Play',
    images: [
      {
        url: '/logo.jpeg',
        width: 1200,
        height: 630,
        alt: 'Findo — Find Smart Play',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Findo — Find Smart Play',
    description:
      'Find Smart Play — Screen-free, child-safe developmental toys, routine planners, and STEM kits for growing minds across India.',
    images: ['/logo.jpeg'],
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
  name: 'Findo — Find Smart Play',
  alternateName: ['Findo', 'Findo Kids', 'Find Smart Play'],
  url: 'https://www.getfindo.in',
  description:
    'Find Smart Play — Screen-free, child-safe developmental toys, habit trackers, and STEM kits for kids across India.',
  publisher: {
    '@type': 'Organization',
    name: 'Findo',
    url: 'https://www.getfindo.in',
    logo: 'https://www.getfindo.in/logo.png',
    slogan: 'Find Smart Play',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${quicksand.variable} ${fredoka.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full font-sans bg-[#fafbf8] text-[#0d1b1e]">
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
