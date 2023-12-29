import type { Metadata } from 'next';
import './globals.css';
import { Montserrat } from 'next/font/google';
import { AuthProvider } from '@/app/Providers';
import React from 'react';
import Layout from '@/components/Layout';

const montserrat = Montserrat({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Movie app',
  description: 'A Next.js Movie Application',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <AuthProvider>
          <Layout>{children}</Layout>
        </AuthProvider>
      </body>
    </html>
  );
}
