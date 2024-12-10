/**
 * Copyright (c) 2024 DJMixes. All rights reserved.
 * Licensed under the MIT License.
 * Description: This file contains the Avatar component that displays a user
 * avatar with a dropdown menu for profile and logout actions.
 */

'use client';
import { useEffect, useRef, useState } from 'react';
import { User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { logout } from '@/app/actions';
import { useClickAway } from '@/hooks/useClickAway';
import { getProfile } from '@/app/api/api';

interface AvatarProps {
  imageUrl?: string;
}

/**
 * The Avatar component displays a user avatar with a dropdown menu for profile
 * and logout actions.
 *
 * @param imageUrl The URL of the user avatar image.
 *
 * @returns The Avatar component.
 */
export default function Avatar(): JSX.Element {
  const [userId, setUserId] = useState<string | null>(null);

  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const check = async () => {
      setUserId(localStorage.getItem('userId'));

      if (!localStorage.getItem('userId')) {
        router.push('/login');
      } else {
        const profile = await getProfile(
          parseInt(localStorage.getItem('userId') as string)
        );
        setImageUrl(profile.avatarUrl);
      }
    };

    check();
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickAway(dropdownRef, () => setIsOpen(false));

  const handleProfileClick = () => {
    setIsOpen(false);
    router.push(`/creator/${userId}`);
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
