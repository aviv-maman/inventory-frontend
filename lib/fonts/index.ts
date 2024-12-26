import { Inter } from 'next/font/google';
import localFont from 'next/font/local';

export const GeistSans = localFont({
  src: './GeistVF.woff',
  variable: '--font-geist-sans',
});
export const GeistMono = localFont({
  src: './GeistMonoVF.woff',
  variable: '--font-geist-mono',
});
export const InterSans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});
