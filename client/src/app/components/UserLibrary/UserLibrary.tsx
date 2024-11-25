'use client';

import { GetMixResponse, GetProfileResponse } from '@/api/types';
import MixCard from './MixCard';
import DJCard from './DJCard';
import { getFollowedDJs, getSavedMixes } from '@/api/api';
import { useEffect, useState } from 'react';

export default function UserLibrary() {
  const [savedMixes, setSavedMixes] = useState<GetMixResponse[]>([]);
  const [favoriteDjs, setFavoriteDjs] = useState<GetProfileResponse[]>([]);

  useEffect(() => {
    const fetchSavedMixes = async () => {
      const res = await getSavedMixes({ userId: 1, mock: true });
      setSavedMixes(res);
    };

    const fetchFavoriteDJs = async () => {
      const res = await getFollowedDJs({ userId: 1, mock: true });
      setFavoriteDjs(res);
    };

    fetchSavedMixes();
    fetchFavoriteDJs();
  }, []);

  return (
    <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4">
      <div className="flex items-center gap-2 mb-6">
        <h2 className="text-white text-xl font-bold">User Library</h2>
      </div>

      <div className="space-y-8">
        <div>
          <h3 className="text-white text-lg mb-3">Saved Mixes</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {savedMixes.map((mix) => (
              <MixCard key={mix.title} mix={mix} />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-white text-lg mb-3">Favorite DJs</h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
            {favoriteDjs.map((dj) => (
              <DJCard key={dj.username} dj={dj} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
