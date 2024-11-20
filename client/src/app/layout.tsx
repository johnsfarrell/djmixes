import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { AudioPlayerProvider } from '@/context/audioPlayerContext';
import { AudioPlayer } from './components/AudioPlayer';
import Header from './components/Header/Header';
import './globals.css';

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
  description: 'Find and share DJ mixes',
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  // TODO: fetch user data
  const userData = {
    avatarUrl: undefined,
    notificationsCount: 3,
  }

  return (
    <AudioPlayerProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Header
            avatarUrl={userData.avatarUrl}
            notificationsCount={userData.notificationsCount}
          />
          <main>
            {children}
          </main>
          <AudioPlayer />
        </body>
      </html>
    </AudioPlayerProvider>
  );
}
