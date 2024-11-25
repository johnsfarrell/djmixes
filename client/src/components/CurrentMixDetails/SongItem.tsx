interface SongItemProps {
  songName: string;
  artist: string;
}

export default function SongItem({ songName, artist }: SongItemProps) {
  return (
    <div className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-800/50 transition-colors">
      <div className="min-w-0 flex-1">
        <h3 className="text-white font-medium truncate">{songName}</h3>
        <p className="text-gray-400 text-sm truncate">{artist}</p>
      </div>
    </div>
  );
}
