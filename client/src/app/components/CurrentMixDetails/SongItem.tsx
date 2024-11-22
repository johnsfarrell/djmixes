import Image from 'next/image';
import { Song } from '@/api/types';
import { Music } from 'lucide-react';

export default function SongItem({ song }: { song: Song }) {
  return (
    <div className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-800/50 transition-colors">
      <div className="flex-shrink-0">
        {song.albumArt ? (
          <Image
            src={song.albumArt}
            alt={`${song.title} album art`}
            width={48}
            height={48}
            className="rounded-md"
          />
        ) : (
          <div className="w-12 h-12 bg-gray-700 rounded-md flex items-center justify-center">
            <Music size={24} className="text-gray-400" />
          </div>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="text-white font-medium truncate">{song.title}</h3>
        <p className="text-gray-400 text-sm truncate">{song.artist}</p>
      </div>
    </div>
  );
}
