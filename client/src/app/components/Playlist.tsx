import React from "react";
import { BsMusicNoteBeamed } from "react-icons/bs";
import { useAudioPlayerContext } from "@/context/audioPlayerContext";
import { Mix } from "@/api/types";

// renders playlist component
export const PlayList: React.FC = () => {
  const { currentMix, setIsPlaying, setCurrentMix, mixes } =
    useAudioPlayerContext();

  const handleClick = (mix: Mix) => {
    setCurrentMix(mix);
    setIsPlaying(true);
  };

  if (!mixes || mixes.length === 0) {
    return <div>No mixes available</div>;
  }

  return (
    <ul className="bg-[#4c4848] text-white max-h-72 overflow-y-auto">
      {mixes.map((mix, index) => (
        <li
          key={index}
          className={`flex items-center gap-3 p-[0.5rem_10px] cursor-pointer ${
            currentMix?.title === mix.title ? "bg-[#a66646]" : ""
          }`}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handleClick(mix);
            }
          }}
          onClick={() => handleClick(mix)}
        >
          <div className="w-16 h-16 flex items-center justify-center bg-gray-200 rounded-sm overflow-hidden">
            {mix.cover_url ? (
              <img
                className="w-full h-full object-cover"
                src={mix.cover_url}
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
            <p className="font-bold text-sm">{mix.title}</p>
            <p className="text-sm text-gray-400">{mix.artist}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default PlayList;
