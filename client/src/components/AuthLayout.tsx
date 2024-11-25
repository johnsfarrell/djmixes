"use client";
import { usePathname } from 'next/navigation';
import Header from '@/components/Header/Header';
import { AudioPlayer } from '@/components/AudioPlayer';

interface AuthLayoutProps {
  user: {
    id: string;
    email: string;
    avatarImageUrl?: string;
    notificationsCount: number;
  } | null; // TODO: create user type
  children: React.ReactNode;
}

/**
 * Layout component that displays the header and audio player if the user is authenticated.
 * 
 * @param user The user object, or null if the user is not authenticated.
 * @param children The children to render inside the layout.
 * 
 * @returns The AuthLayout component.
 */
export default function AuthLayout({ user, children }: AuthLayoutProps) {
  const pathname = usePathname();
  const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/register');

  if (isAuthPage) {
    return children;
  }

  return (
    <>
      {user && (
        <>
          <Header
            avatarImageUrl={user.avatarImageUrl}
            notificationsCount={user.notificationsCount}
          />
          {children}
          <AudioPlayer />
        </>
      )}
      {!user && children}
    </>
  );
}