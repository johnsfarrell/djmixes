import Logo from './Logo';
import SearchBar from './SearchBar';
import MenuButtons from './MenuButtons';

interface HeaderProps {
  avatarUrl?: string;
  notificationsCount?: number;
}

export default function Header({ 
  avatarUrl,
  notificationsCount = 0,
}: HeaderProps) {
    
  return (
    <header className="bg-gray-900 border-b border-gray-800">
      <div className="max-w-[1920px] mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full gap-4">
          {/* Left section */}
          <Logo />

          {/* Center section */}
          <div className="flex-1 max-w-2xl mx-4">
            <SearchBar />
          </div>

          {/* Right section */}
          <MenuButtons 
            notificationsCount={notificationsCount}
            avatarUrl={avatarUrl}
          />
        </div>
      </div>
    </header>
  );
}
