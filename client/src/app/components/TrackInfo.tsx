import React from "react";
import { BsMusicNoteBeamed } from "react-icons/bs";
import { useAudioPlayerContext } from "@/context/audioPlayerContext";

export const TrackInfo: React.FC = () => {
  const { currentMix } = useAudioPlayerContext();

  if (!currentMix) {
    return null; // or return a loading state
  }

  return (
    <div className="flex items-center gap-4">
      <div className="w-24 h-24 flex items-center justify-center bg-gray-200 rounded-md overflow-hidden">
        {currentMix.cover_url ? (
          <img
            className="w-full h-full object-cover"
            src={currentMix.cover_url}
            alt="audio avatar"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-gray-300 rounded-md">
            <span className="text-xl text-gray-600">
              <BsMusicNoteBeamed />
            </span>
          </div>
        )}
      </div>
      <div>
        <p className="font-bold lg:truncate lg:max-w-64">{currentMix.title}</p>
        <p className="text-sm text-gray-400">{currentMix.artist}</p>
      </div>
    </div>
  );
};
