/**
 * Copyright (c) 2024 DJMixes. All rights reserved.
 * Licensed under the MIT License.
 * Description: This file contains the SearchBar component that displays a
 * search bar with a search icon.
 */

import { search, SearchResult } from '@/app/api/api';
import { Search } from 'lucide-react';
import { useState } from 'react';

/**
 * The SearchBar component displays a search bar with a search icon.
 *
 * @returns The SearchBar component.
 */
export default function SearchBar(): JSX.Element {
  const [searchResults, setSearchResults] = useState<SearchResult>();

  const handleSearchChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const query = event.target.value;

    if (query.length === 0) {
      setSearchResults(undefined);
      return;
    }

    // Call the search API
    const results = await search(query);
    setSearchResults(results);
  };

  return (
    <div className="relative flex-1 max-w-2xl">
      <input
        type="text"
        placeholder="Search..."
        className="w-full bg-gray-800 text-white rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-gray-700"
        onChange={handleSearchChange}
      />
      <Search
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        size={18}
      />
      {searchResults && (
        <div
          className="absolute top-full w-full max-h-52 overflow-y-auto bg-gray-800 rounded-b-lg shadow-lg p-4"
          style={{
            zIndex: 9999
          }}
        >
          {searchResults.mixes.map((mix) => (
            <a
              key={mix.id}
              href={`/mix/${mix.id}`}
              className="p-4 border-b border-gray-700"
            >
              <h3 className="text-white font-medium">
                <u>Mix:</u>&nbsp;
                {mix.title}
              </h3>
              <p className="text-gray-400 text-sm">{mix.artist}</p>
            </a>
          ))}

          {searchResults.users.map((user) => (
            <a
              key={user.userId}
              href={`/creator/${user.userId}`}
              className="p-4 border-b border-gray-700"
            >
              <h3 className="text-white font-medium">
                <u>User:</u>&nbsp;
                {user.username}
              </h3>
              <p className="text-gray-400 text-sm">{user.bio}</p>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
