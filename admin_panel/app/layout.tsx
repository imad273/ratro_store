import Providers from '@/components/layout/providers';
import { Toaster } from '@/components/ui/toaster';
import type { Metadata } from 'next';
import NextTopLoader from 'nextjs-toploader';
import './globals.css';

export const metadata: Metadata = {
  title: 'Next Shadcn',
  description: 'Basic dashboard with Next.js and Shadcn'
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className="overflow-hidden"
        suppressHydrationWarning={true}
      >
        <NextTopLoader showSpinner={false} color="#3c10cc"/>
        <Providers>
          <Toaster />
          {children}
        </Providers>
      </body>
    </html>
  );
}
