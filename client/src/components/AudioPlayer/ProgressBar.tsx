/**
 * Copyright (c) 2024 DJMixes. All rights reserved.
 * Licensed under the MIT License.
 * Description: This file contains the audio player progress bar for the audio player component.
 */

import React from "react";
import { useAudioPlayerContext } from "@/context/audioPlayerContext";

export const ProgressBar: React.FC = () => {
  const { progressBarRef, audioRef, timeProgress, duration, setTimeProgress } =
    useAudioPlayerContext();

  const formatTime = (time: number | undefined): string => {
    if (typeof time === "number" && !isNaN(time)) {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      const formatMinutes = minutes.toString().padStart(2, "0");
      const formatSeconds = seconds.toString().padStart(2, "0");
      return `${formatMinutes}:${formatSeconds}`;
    }
    return "00:00";
  };

  const handleProgressChange = () => {
    if (audioRef.current && progressBarRef.current) {
      const newTime = Number(progressBarRef.current.value);
      audioRef.current.currentTime = newTime;
      setTimeProgress(newTime);
      progressBarRef.current.style.setProperty(
        "--range-progress",
        `${(newTime / duration) * 100}%`,
      );
    }
  };

  return (
    <div className="flex items-center justify-center gap-5 w-full">
      <span>{formatTime(timeProgress)}</span>
      <input
        ref={progressBarRef}
        className="max-w-[80%] bg-gray-300"
        type="range"
        defaultValue="0"
        onChange={handleProgressChange}
      />
      <span>{formatTime(duration)}</span>
    </div>
  );
};
