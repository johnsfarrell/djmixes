/**
 * Copyright (c) 2024 DJMixes. All rights reserved.
 * Licensed under the MIT License.
 * Description: This file contains the root layout component that wraps the 
 * entire application and provides global styles and context providers.
 */

import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { AudioPlayerProvider } from '@/context/audioPlayerContext';
import '@/app/globals.css';
import AuthLayout from '@/components/AuthLayout';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900'
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900'
});

export const metadata: Metadata = {
  title: 'DJMixes',
  description: 'Find and share DJ mixes'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  // TODO: fetch user data
  const user = {
    id: '1',
    email: 'test@test.com',
    avatarImageUrl: 'https://avatars.githubusercontent.com/u/1'
  };

  return (
    <AudioPlayerProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <AuthLayout user={user}>{children}</AuthLayout>
        </body>
      </html>
    </AudioPlayerProvider>
  );
}
