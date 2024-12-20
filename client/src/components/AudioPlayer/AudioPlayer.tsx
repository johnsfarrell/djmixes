/**
 * Copyright (c) 2024 DJMixes. All rights reserved.
 * Licensed under the MIT License.
 * Description: This file contains the audio player component for playing audio tracks.
 */

"use client";

import React, { useState } from "react";
import { RiMenuAddLine } from "react-icons/ri";
import { TrackInfo } from "@/components/AudioPlayer/TrackInfo";
import { Controls } from "@/components/AudioPlayer/Controls";
import { ProgressBar } from "@/components/AudioPlayer/ProgressBar";
import { VolumeControl } from "@/components/AudioPlayer/VolumeControl";
import { PlayList } from "@/components/AudioPlayer/Playlist";
import { useAudioPlayerContext } from "@/context/audioPlayerContext";

export const AudioPlayer: React.FC = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const { currentTrack } = useAudioPlayerContext();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white shadow-lg p-4 z-50">
      <div className="flex flex-col gap-4 lg:flex-row justify-between items-center">
        <TrackInfo />
        <div className="w-full flex flex-col items-center gap-2 m-auto flex-1">
          <Controls />
          <ProgressBar />
        </div>
        <div className="flex items-center gap-2 text-gray-400">
          <VolumeControl />
          <button onClick={() => setOpenDrawer((prev) => !prev)}>
            <RiMenuAddLine size={24} />
          </button>
        </div>
      </div>
      <div
        className={`transition-max-height duration-300 ease-in-out overflow-hidden ${
          openDrawer ? "max-h-72" : "max-h-0"
        }`}
      >
        <div className="bg-gray-800 text-white max-h-72 overflow-y-auto mt-4 rounded-lg p-2">
          <PlayList tracks={[currentTrack]} />
        </div>
      </div>
    </div>
  );
};
