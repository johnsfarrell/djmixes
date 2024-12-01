/**
 * Copyright (c) 2024 DJMixes. All rights reserved.
 * Licensed under the MIT License.
 * Description: This file contains the AuthCard component that displays a card
 * with a title and subtitle in the center of the screen for authentication
 * pages.
 */

import Logo from '@/components/Logo';

interface AuthCardProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

/**
 * The AuthCard component displays a card with a title and subtitle in the
 * center of the screen for authentication pages.
 * 
 * @param children The children to render inside the card.
 * @param title The title of the card.
 * @param subtitle The subtitle of the card.
 * 
 * @returns The AuthCard component.
 */
export default function AuthCard({ children, title, subtitle }: AuthCardProps) {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 w-full">
          <div className="text-center mb-6">
            <Logo />
            <h1 className="text-white text-2xl font-bold mb-2">{title}</h1>
            {subtitle && (
              <p className="text-gray-400">{subtitle}</p>
            )}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
  