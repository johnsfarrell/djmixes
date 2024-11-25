'use client';

import React, { useEffect, useState } from 'react';
import CurrentMixDetails from './components/CurrentMixDetails/CurrentMixDetails';
import UserLibrary from './components/UserLibrary/UserLibrary';
import { GetMixResponse } from '@/api/types';
import { getMix } from '@/api/api';

export default function Home() {
  const [mix, setMix] = useState<GetMixResponse | null>(null);

  useEffect(() => {
    const fetchMix = async () => {
      const fetchedMix = await getMix({ mixId: 1, mock: true });
      // TODO: remove just for debug
      await setTimeout(() => {}, 1000);
      setMix(fetchedMix);
    };

    fetchMix();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="max-w-[1920px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-9 gap-4">
          {/* Left column */}

          {mix && (
            <div className="lg:col-span-3">
              <CurrentMixDetails mix={mix} />
            </div>
          )}

          {/* Middle column */}
          <div className="lg:col-span-6">
            <UserLibrary />
          </div>

          {/* Right column - TODO? */}
          {/* <div className="lg:col-span-3"> */}
          {/* </div> */}
        </div>
      </div>
    </div>
  );
}
