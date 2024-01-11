'use client';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { ColorModeScript } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('bro-token');

    if (!token) {
      router.push('/');
    } else {
      router.push('/timeline');
    }
  }, [router]);

  return (
    <html lang='en'>
      <body className={inter.className}>
        <ColorModeScript initialColorMode='dark' />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
