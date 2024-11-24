"use client";

import { useRef, useState } from 'react';
import { User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { logout } from '@/app/actions';
import { useClickAway } from '@/hooks/useClickAway';

interface AvatarProps {
  imageUrl?: string;
}

export default function Avatar({ imageUrl }: AvatarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickAway(dropdownRef, () => setIsOpen(false));

  const handleProfileClick = () => {
    setIsOpen(false);
    router.push('/profile');
  };

  const handleLogoutClick = async () => {
    setIsOpen(false);
    await logout();
  };

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="focus:outline-none focus:ring-2 focus:ring-gray-700 rounded-full"
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="User avatar"
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-colors">
            <User size={20} className="text-gray-400" />
          </div>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-50 border border-gray-700">
          <button
            onClick={handleProfileClick}
            className="w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 transition-colors"
          >
            Profile
          </button>
          <button
            onClick={handleLogoutClick}
            className="w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 transition-colors"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}