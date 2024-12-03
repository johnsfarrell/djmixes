'use client';

import { GetMixResponse, GetProfileResponse } from '@/app/api/types';
import MixCard from './MixCard';
import DJCard from './DJCard';
import { getFollowedDJs, getRandomMixes, getSavedMixes } from '@/app/api/api';
import { useEffect, useState } from 'react';

export default function UserLibrary() {
  const [savedMixes, setSavedMixes] = useState<GetMixResponse[]>([]);
  const [favoriteDjs, setFavoriteDjs] = useState<GetProfileResponse[]>([]);
  const [randomMixes, setRandomMixes] = useState<GetMixResponse[]>([]);

  useEffect(() => {
    const fetchSavedMixes = async () => {
      const res = await getSavedMixes({ userId: 1, mock: false });
      setSavedMixes(res);
    };

    const fetchFavoriteDJs = async () => {
      const res = await getFollowedDJs({ userId: 1, mock: true });
      setFavoriteDjs(res);
    };

    const fetchRandomMixes = async () => {
      const res = await getRandomMixes({ mock: false });
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
          <h3 className="text-white text-lg mb-3">Saved Mixes</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {savedMixes.length > 0 ? (
              savedMixes.map((mix) => <MixCard key={mix.title} mix={mix} />)
            ) : (
              <p className="text-white">No saved mixes</p>
            )}
          </div>
        </div>

        <div>
          <h3 className="text-white text-lg mb-3">Random Mixes</h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
            {randomMixes.length > 0 ? (
              randomMixes.map((mix) => <MixCard key={mix.title} mix={mix} />)
            ) : (
              <p className="text-white">No mixes</p>
            )}
          </div>
        </div>

        <div>
          <h3 className="text-white text-lg mb-3">Favorite DJs</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {favoriteDjs.length > 0 ? (
              favoriteDjs.map((dj) => <DJCard key={dj.username} dj={dj} />)
            ) : (
              <p className="text-white">No DJs</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
