import type { Metadata } from 'next';
import { Providers } from '@/app/providers';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { verifySession } from '@/lib/auth/requests';
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

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { user } = await verifySession();

  return (
    <html lang='en' suppressHydrationWarning className={`${GeistSans.className} ${GeistMono.variable}`}>
      <body
        className={cn('min-h-screen bg-background text-foreground antialiased', {
          'debug-screens': process.env.NODE_ENV === 'development',
        })}>
        <Providers user={user}>
          <Header />
          <main className='flex min-h-[calc(100vh-114px)] flex-col items-center justify-center animate-in'>
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
