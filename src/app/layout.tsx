import type { Metadata } from 'next';
import localFont from 'next/font/local';
import '@/styles/globals.css';
import { ResearchDeskProvider } from '@/components/ResearchDeskProvider';
import { AtlasMasthead } from '@/components/AtlasMasthead';
import { AtlasFooter } from '@/components/AtlasFooter';

const newsreader = localFont({
  src: [
    {
      path: './fonts/Newsreader-Variable.woff2',
      weight: '400 600',
      style: 'normal',
    },
    {
      path: './fonts/Newsreader-Italic-Variable.woff2',
      weight: '400 600',
      style: 'italic',
    },
  ],
  display: 'swap',
  variable: '--font-newsreader',
  fallback: ['Iowan Old Style', 'Palatino Linotype', 'Georgia', 'serif'],
});

const jakarta = localFont({
  src: './fonts/PlusJakartaSans-Variable.woff2',
  weight: '400 700',
  style: 'normal',
  display: 'swap',
  variable: '--font-jakarta',
  fallback: ['Segoe UI', 'system-ui', '-apple-system', 'sans-serif'],
});

const plexMono = localFont({
  src: [
    {
      path: './fonts/IBMPlexMono-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/IBMPlexMono-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/IBMPlexMono-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-plex-mono',
  fallback: ['Cascadia Mono', 'Consolas', 'ui-monospace', 'monospace'],
});

export const metadata: Metadata = {
  title: {
    default: 'The Unfinished Atlas — Archive of Transformed & Erased Places',
    template: '%s · The Unfinished Atlas',
  },
  description:
    'An interactive cartographic archive and research workspace investigating submerged settlements, demolished civic architecture, altered coastlines, and buried urban waterways.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${jakarta.variable} ${plexMono.variable}`}
    >
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main archival content
        </a>
        <ResearchDeskProvider>
          <AtlasMasthead />
          <main id="main-content">{children}</main>
          <AtlasFooter />
        </ResearchDeskProvider>
      </body>
    </html>
  );
}
