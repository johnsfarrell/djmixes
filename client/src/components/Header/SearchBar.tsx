/**
 * Copyright (c) 2024 DJMixes. All rights reserved.
 * Licensed under the MIT License.
 * Description: This file contains the SearchBar component that displays a 
 * search bar with a search icon.
 */

import { Search } from 'lucide-react';

/**
 * The SearchBar component displays a search bar with a search icon.
 * 
 * @returns The SearchBar component.
 */
export default function SearchBar(): JSX.Element {
  return (
    <div className="relative flex-1 max-w-2xl">
      <input
        type="text"
        placeholder="Search..."
        className="w-full bg-gray-800 text-white rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-gray-700"
      />
      <Search 
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
        size={18} 
      />
    </div>
  );
}
