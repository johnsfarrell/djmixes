/**
 * Copyright (c) 2024 DJMixes. All rights reserved.
 * Licensed under the MIT License.
 * Description: This file contains the UserLibrary component that displays the
 * user's saved mixes and favorite DJs.
 */

'use client';
import { GetMixResponse, GetProfileResponse } from '@/app/api/types';
import MixCard from './MixCard';
import DJCard from './DJCard';
import { getFollowedDJs, getRandomMixes, getSavedMixes } from '@/app/api/api';
import { useEffect, useState } from 'react';

/**
 * The UserLibrary component displays the user's saved mixes and favorite DJs.
 *
 * @returns The UserLibrary component.
 */
export default function UserLibrary(): JSX.Element {
  const [savedMixes, setSavedMixes] = useState<GetMixResponse[]>([]);
  const [favoriteDjs, setFavoriteDjs] = useState<GetProfileResponse[]>([]);
  const [randomMixes, setRandomMixes] = useState<GetMixResponse[]>([]);

  useEffect(() => {
    const userId = parseInt(localStorage.getItem('userId') as string);

    const fetchSavedMixes = async () => {
      const res = await getSavedMixes({ userId: userId, mock: false });
      setSavedMixes(res);
    };

    const fetchFavoriteDJs = async () => {
      const res = await getFollowedDJs({ userId: userId, mock: true });
      setFavoriteDjs(res);
    };

    const fetchRandomMixes = async () => {
      const res = await getRandomMixes({ count: 9, mock: false });
      setRandomMixes(res);
    };

    fetchSavedMixes();
    fetchFavoriteDJs();
    fetchRandomMixes();
  }, []);

  return (
    <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4">
      <div className="flex items-center gap-2 mb-6">
        <h2 className="text-white text-xl font-bold">User Library</h2>
      </div>

      <div className="space-y-8">
        <div>
          <h3 className="text-white text-lg mb-3">Liked Mixes</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-9 gap-4">
            {savedMixes.length > 0 ? (
              savedMixes.map((mix) => <MixCard key={mix.title} mix={mix} />)
            ) : (
              <p className="text-white">No liked mixes...</p>
            )}
          </div>
        </div>

        <div>
          <h3 className="text-white text-lg mb-3">Random Mixes</h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-4">
            {randomMixes.length > 0 ? (
              randomMixes.map((mix) => <MixCard key={mix.title} mix={mix} />)
            ) : (
              <p className="text-white">No random mixes...</p>
            )}
          </div>
        </div>

        {/* <div>
          <h3 className="text-white text-lg mb-3">Favorite DJs</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {favoriteDjs.length > 0 ? (
              favoriteDjs.map((dj) => <DJCard key={dj.username} dj={dj} />)
            ) : (
              <p className="text-white">No DJs...</p>
            )}
          </div>
        </div> */}
      </div>
    </div>
  );
}
