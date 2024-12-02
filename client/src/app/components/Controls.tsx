import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  BsFillFastForwardFill,
  BsFillPauseFill,
  BsFillPlayFill,
  BsFillRewindFill,
  BsSkipEndFill,
  BsSkipStartFill,
  BsShuffle,
  BsRepeat,
} from "react-icons/bs";
import { useAudioPlayerContext } from "@/context/audioPlayerContext";
import { tracks } from "@/api/mockData";

export const Controls: React.FC = () => {
  const {
    currentTrack,
    audioRef,
    isPlaying,
    setIsPlaying,
    setCurrentTrack,
    setDuration,
    progressBarRef,
    duration,
    setTimeProgress,
    setTrackIndex,
  } = useAudioPlayerContext();

  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);

  const playAnimationRef = useRef<number | null>(null);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = useCallback(() => {
    setTrackIndex((prevIndex) => {
      const newIndex = isShuffle
        ? Math.floor(Math.random() * tracks.length)
        : prevIndex >= tracks.length - 1
          ? 0
          : prevIndex + 1;
      setCurrentTrack(tracks[newIndex]);
      return newIndex;
    });
  }, [isShuffle, setCurrentTrack, setTrackIndex]);

  const handlePrevious = useCallback(() => {
    setTrackIndex((prevIndex) => {
      const newIndex = isShuffle
        ? Math.floor(Math.random() * tracks.length)
        : prevIndex === 0
          ? tracks.length - 1
          : prevIndex - 1;
      setCurrentTrack(tracks[newIndex]);
      return newIndex;
    });
  }, [isShuffle, setCurrentTrack, setTrackIndex]);

  const skipForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime += 15;
      updateProgress();
    }
  };

  const skipBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime -= 15;
      updateProgress();
    }
  };

  const updateProgress = () => {
    if (audioRef.current && progressBarRef.current) {
      const currentTime = audioRef.current.currentTime;
      setTimeProgress(currentTime);
      progressBarRef.current.value = currentTime.toString();
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.onloadedmetadata = () => {
        setDuration(audioRef.current?.duration || 0);
      };
    }
  }, [audioRef, setDuration]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
      playAnimationRef.current = requestAnimationFrame(updateProgress);
    } else {
      audioRef.current?.pause();
      if (playAnimationRef.current !== null) {
        cancelAnimationFrame(playAnimationRef.current);
        playAnimationRef.current = null;
      }
    }
  }, [isPlaying, audioRef]);

  return (
    <div className="flex items-center gap-4">
      <button onClick={handlePrevious}>
        <BsSkipStartFill size={24} />
      </button>
      <button onClick={skipBackward}>
        <BsFillRewindFill size={24} />
      </button>
      <button onClick={handlePlayPause}>
        {isPlaying ? (
          <BsFillPauseFill size={24} />
        ) : (
          <BsFillPlayFill size={24} />
        )}
      </button>
      <button onClick={skipForward}>
        <BsFillFastForwardFill size={24} />
      </button>
      <button onClick={handleNext}>
        <BsSkipEndFill size={24} />
      </button>
      <button onClick={() => setIsShuffle(!isShuffle)}>
        <BsShuffle size={24} className={isShuffle ? "text-blue-500" : ""} />
      </button>
      <button onClick={() => setIsRepeat(!isRepeat)}>
        <BsRepeat size={24} className={isRepeat ? "text-blue-500" : ""} />
      </button>
    </div>
  );
};
