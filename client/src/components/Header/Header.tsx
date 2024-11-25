import Logo from '@/components/Logo';
import SearchBar from '@/components/Header/SearchBar';
import MenuButtons from '@/components/Header/MenuButtons';
import Link from 'next/link';

interface HeaderProps {
  avatarImageUrl?: string;
  notificationsCount?: number;
}

export default function Header({ 
  avatarImageUrl,
  notificationsCount = 0,
}: HeaderProps) {
    
  return (
    <header className="bg-gray-900 border-b border-gray-800">
      <div className="max-w-[1920px] mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full gap-4">
          {/* Left section */}
          <Link href="/">
            <Logo />
          </Link>

          {/* Center section */}
          <div className="flex-1 max-w-2xl mx-4">
            <SearchBar />
          </div>

          {/* Right section */}
          <MenuButtons 
            notificationsCount={notificationsCount}
            avatarImageUrl={avatarImageUrl}
          />
        </div>
      </div>
    </header>
  );
}