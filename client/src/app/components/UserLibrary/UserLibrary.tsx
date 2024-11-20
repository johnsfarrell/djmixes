import { Mix, User } from '@/types';
import MixCard from './MixCard';
import DJCard from './DJCard';

export default function UserLibrary() {
  const favoriteDjs: User[] = [
    {
        id: '1',
        name: 'Fred Again...',
        profilePhoto: undefined
    },
    {
        id: '2',
        name: 'Calvin Harris',
        profilePhoto: undefined
    },
  ];

  const savedMixes: Mix[] = [
    {
      id: '1',
      title: 'Boiler Room London',
      dj: favoriteDjs[0],
      artwork: undefined,
      tags: [],
        songs: [],  
        stems: [],
    },
    {
      id: '2',
      title: 'EDC Las Vegas',
      dj: favoriteDjs[1],
      artwork: undefined,
      tags: [],
      songs: [],  
      stems: [],
    },
  ];

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
              <MixCard key={mix.id} mix={mix} />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-white text-lg mb-3">Favorite DJs</h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
            {favoriteDjs.map((dj) => (
              <DJCard key={dj.id} dj={dj} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}