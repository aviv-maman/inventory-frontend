import type { Metadata } from 'next';
import { Providers } from './providers';
import { GeistMono, GeistSans } from '@/lib/fonts';
import { cn } from '@/lib/utils';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Inventory Management System',
    template: '%s | Inventory Management System',
  },
  description: 'A simple inventory management system',
  metadataBase: new URL(process.env.BASE_URL || 'http://localhost:3000'),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' suppressHydrationWarning className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body
        className={cn('bg-background min-h-screen antialiased', {
          'debug-screens': process.env.NODE_ENV === 'development',
        })}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
