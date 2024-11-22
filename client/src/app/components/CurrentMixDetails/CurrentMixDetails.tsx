import { Song, Stem } from '@/api/types';
import SongItem from './SongItem';
import StemItem from './StemItem';

export default function CurrentMixDetails() {
  const songs: Song[] = [
    // example songs
    {
      id: '1',
      title: 'Last Words',
      artist: 'Kenny Beats',
      timestamp: '0:00', // TODO: separate song type from song timestamps on mixes
      albumArt: undefined
    },
    {
      id: '2',
      title: 'Some',
      artist: 'Steve Lacy',
      timestamp: '0:00', // TODO: separate song type from song timestamps on mixes
      albumArt: undefined
    }
  ];

  const stems: Stem[] = [
    { id: '1', title: 'Drums' },
    { id: '2', title: 'Bass' },
    { id: '3', title: 'Synth Lead' },
    { id: '4', title: 'Vocals' }
  ];

  return (
    <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4">
      <div className="flex items-center gap-2 mb-6">
        <h2 className="text-white text-xl font-bold">Current Mix Details</h2>
      </div>
      <div className="space-y-6">
        <div>
          <h3 className="text-white text-lg mb-3">Songs Used</h3>
          <div className="space-y-2">
            {songs.map((song) => (
              <SongItem key={song.id} song={song} />
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-white text-lg mb-3">Stems</h3>
          <div className="space-y-2">
            {stems.map((stem) => (
              <StemItem key={stem.id} stem={stem} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
