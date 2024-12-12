/**
 * Copyright (c) 2024 DJMixes. All rights reserved.
 * Licensed under the MIT License.
 * Description: This file contains the studio header component for Studio.
 */

import { GetMixResponse } from '@/app/api/types';
import { NamedAudioSegment } from './page';
import { AudioUtils } from '@/util/audio';
import { formatTimeSeconds } from '@/util/helpers';

interface StudioHeaderProps {
  mix: GetMixResponse;
  isPlaying: boolean;
  togglePlay: () => void;
  currentTime: number;
  duration: number;
  handleSeek: (e: React.ChangeEvent<HTMLInputElement>) => void;
  resetMix: () => void;
  orderMap: Record<
    string,
    [number[], React.Dispatch<React.SetStateAction<number[]>>]
  >;
  segmentsMap: Record<
    string,
    [
      NamedAudioSegment[],
      React.Dispatch<React.SetStateAction<NamedAudioSegment[]>>
    ]
  >;
  audioContextRef: React.RefObject<AudioContext>;
}

export const StudioHeader = ({
  mix,
  isPlaying,
  togglePlay,
  currentTime,
  duration,
  handleSeek,
  resetMix,
  orderMap,
  segmentsMap,
  audioContextRef
}: StudioHeaderProps) => {
  return (
    <div className="sticky top-0 z-20 bg-gray-900 pt-4">
      <div className="bg-gray-700 rounded-lg p-4 mb-4">
        <h1 className="text-white text-2xl font-bold flex justify-between items-center">
          <span>
            <span className="spinning-2">✦</span>&nbsp;Studio
          </span>
          <div className="flex items-center space-x-4">
            <a
              href={`/mix/${mix.id}`}
              className="flex items-center hover:underline"
            >
              <span className="mr-2 text-sm font-light">
                {mix.title}, {mix.artist}
              </span>
              <img
                src={mix.cover_url ?? '/placeholder.jpg'}
                alt="Mix Artwork"
                className="object-cover w-8 h-8 mb-2 rounded-lg border border-white bg-slate-300"
              />
            </a>
          </div>
        </h1>
      </div>
      <div className="flex items-center space-x-4 mb-4">
        <button
          onClick={togglePlay}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg"
        >
          {isPlaying ? '❚❚' : '▶'}
        </button>
        <span className="text-gray-400 text-sm">
          {formatTimeSeconds(currentTime)}
        </span>
        <input
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={handleSeek}
          className="flex-grow appearance-none bg-gray-600 h-2 rounded-lg"
          style={{
            background: `linear-gradient(to right, #89CFF0 ${(
              (currentTime / duration) *
              100
            ).toFixed(2)}%, #4a5568 0%)`
          }}
        />
        <span className="text-gray-400 text-sm">
          {formatTimeSeconds(duration)}
        </span>
        <button
          onClick={resetMix}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded-md"
        >
          Reset 🔄
        </button>
        <button
          onClick={() =>
            AudioUtils.exportMix(
              audioContextRef,
              duration,
              orderMap,
              segmentsMap,
              mix
            )
          }
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded-md"
        >
          Export 🪄
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 border-b-2 border-gray-500">
        <div className="bg-gray-800 p-2 rounded-tl-lg">
          <h2 className="text-white text-sm font-bold text-center">
            Vocals Segments
          </h2>
        </div>

        <div className="bg-gray-800 p-2">
          <h2 className="text-white text-sm font-bold text-center">
            Bass Segments
          </h2>
        </div>

        <div className="bg-gray-800 p-2">
          <h2 className="text-white text-sm font-bold text-center">
            Drums Segments
          </h2>
        </div>

        <div className="bg-gray-800 p-2 rounded-tr-lg">
          <h2 className="text-white text-sm font-bold text-center">
            Other Segments
          </h2>
        </div>
      </div>
    </div>
  );
};
