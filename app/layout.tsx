import type { Metadata } from 'next';
import { Cormorant_Garamond, DM_Sans, Dancing_Script } from 'next/font/google';
import '../styles/globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm',
  display: 'swap',
});

const dancing = Dancing_Script({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-dancing',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Palak — A Storybook Portfolio",
  description: 'A cinematic, vintage Gen Z storybook portfolio. Walk through the chapters of Palak\'s life.',
  keywords: ['portfolio', 'developer', 'creative', 'frontend', 'fullstack', 'Palak'],
  authors: [{ name: 'Palak' }],
  openGraph: {
    title: "Palak — A Storybook Portfolio",
    description: 'An immersive, vintage storybook portfolio experience.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${cormorant.variable} ${dmSans.variable} ${dancing.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
