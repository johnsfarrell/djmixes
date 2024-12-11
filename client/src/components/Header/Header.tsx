/**
 * Copyright (c) 2024 DJMixes. All rights reserved.
 * Licensed under the MIT License.
 * Description: This file contains the Header component that displays the header
 * of the application with the logo, search bar, and menu buttons.
 */

import Logo from '@/components/Logo';
import SearchBar from '@/components/Header/SearchBar';
import MenuButtons from '@/components/Header/MenuButtons';
import Link from 'next/link';

interface HeaderProps {
  avatarImageUrl?: string;
}

/**
 * The Header component displays the header of the application with the logo,
 * search bar, and menu buttons.
 *
 * @param avatarImageUrl The URL of the user's avatar image.
 *
 * @returns The Header component.
 */
export default function Header(): JSX.Element {
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
          <MenuButtons />
        </div>
      </div>
    </header>
  );
}
