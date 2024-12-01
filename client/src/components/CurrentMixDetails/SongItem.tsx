/**
 * Copyright (c) 2024 DJMixes. All rights reserved.
 * Licensed under the MIT License.
 * Description: This file contains the SongItem component that displays a song
 * item with the song name and artist.
 */

interface SongItemProps {
  songName: string;
  artist: string;
}

/**
 * The SongItem component displays a song item with the song name and artist.
 * 
 * @param songName The name of the song.
 * @param artist The artist of the song.
 * 
 * @returns The SongItem component.
 */
export default function SongItem({ songName, artist }: SongItemProps): JSX.Element {
  return (
    <div className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-800/50 transition-colors">
      <div className="min-w-0 flex-1">
        <h3 className="text-white font-medium truncate">{songName}</h3>
        <p className="text-gray-400 text-sm truncate">{artist}</p>
      </div>
    </div>
  );
}
