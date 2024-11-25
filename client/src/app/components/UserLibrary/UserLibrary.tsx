import { GetMixResponse, ProfileResponse } from '@/api/types';
import MixCard from './MixCard';
import DJCard from './DJCard';

export default function UserLibrary() {
  const favoriteDjs: ProfileResponse[] = [
    {
      username: 'Fred Again...',
      bio: 'An amazing DJ known for emotional electronic music.',
      mixes: [],
      events: [],
      profilePhoto: undefined
    },
    {
      username: 'Calvin Harris',
      bio: 'A chart-topping DJ and producer.',
      mixes: [],
      events: [],
      profilePhoto: undefined
    }
  ];

  const savedMixes: GetMixResponse[] = [
    {
      title: 'Boiler Room London',
      fileUrl: '/path/to/boiler-room-london.mp3',
      coverUrl: undefined,
      visibility: 'public',
      allowDownload: true,
      tags: [],
      updatedAt: new Date(),
      createdAt: new Date(),
      artist: 'Fred Again...',
      upload_user: {
        user_id: 1,
        username: 'Fred Again...'
      },
      comments: [],
      album: undefined
    },
    {
      title: 'EDC Las Vegas',
      fileUrl: '/path/to/edc-las-vegas.mp3',
      coverUrl: undefined,
      visibility: 'public',
      allowDownload: true,
      tags: [],
      updatedAt: new Date(),
      createdAt: new Date(),
      artist: 'Calvin Harris',
      upload_user: {
        user_id: 1,
        username: 'Calvin Harris'
      },
      comments: [],
      album: undefined
    }
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
