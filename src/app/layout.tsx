import type { Metadata } from 'next';
import { Quicksand } from 'next/font/google';
import './globals.css';
import ClientShell from '@/components/ClientShell';

const quicksand = Quicksand({
  subsets: ['latin'],
  variable: '--font-quicksand',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  title: 'Findo — Find What You Need | Unique Kids Products Brand',
  description:
    'Discover unique, high-quality, and child-safe products for kids. From smart magic drawing tablets to 360° anti-spill bowls and silicone sleep buddy nightlights!',
  keywords: [
    'Findo',
    'kids products',
    'unique kids toys',
    'montessori toys',
    'anti spill gyro bowl',
    'lcd magic drawing tablet',
    'silicone duck night light',
    'talking flashcards',
  ],
  authors: [{ name: 'Findo Brand' }],
  openGraph: {
    title: 'Findo — Unique Kids Category Products',
    description: 'Find What You Need — Unique, child-safe, and screen-free kids essentials.',
    url: 'https://findo-store.vercel.app',
    siteName: 'Findo',
    images: [
      {
        url: '/logo.jpeg',
        width: 1200,
        height: 630,
        alt: 'Findo Logo',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Findo — Find What You Need',
    description: 'Unique kids products brand for smart parenting.',
    images: ['/logo.jpeg'],
  },
  icons: {
    icon: '/logo.jpeg',
    apple: '/logo.jpeg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${quicksand.variable} h-full antialiased`}>
      <body className="min-h-full font-sans bg-[#fafbf8] text-[#0d1b1e]">
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
