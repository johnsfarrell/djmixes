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
import { getMix } from "@/api/api";
import { Mix } from "@/api/types";

export const Controls: React.FC = () => {
  const {
    currentMix,
    audioRef,
    isPlaying,
    setIsPlaying,
    setCurrentMix,
    setDuration,
    progressBarRef,
    duration,
    setTimeProgress,
    setMixIndex,
  } = useAudioPlayerContext();

  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [mixes, setMixes] = useState<Mix[]>([]);

  useEffect(() => {
    const fetchMixes = async () => {
      try {
        const fetchedMix = await getMix({ mixId: 1, mock: true }); // Example mixId
        setMixes([fetchedMix]);
        setCurrentMix(fetchedMix);
      } catch (error) {
        console.error("Error fetching mixes:", error);
      }
    };

    fetchMixes();
  }, [setCurrentMix]);

  const playAnimationRef = useRef<number | null>(null);

  const updateProgress = useCallback(() => {
    if (audioRef.current && progressBarRef.current && duration) {
      const currentTime = audioRef.current.currentTime;
      setTimeProgress(currentTime);
      progressBarRef.current.value = currentTime.toString();
      progressBarRef.current.style.setProperty(
        "--range-progress",
        `${(currentTime / duration) * 100}%`
      );
    }
  }, [duration, setTimeProgress, audioRef, progressBarRef]);

  const startAnimation = useCallback(() => {
    if (audioRef.current && progressBarRef.current && duration) {
      const animate = () => {
        updateProgress();
        playAnimationRef.current = requestAnimationFrame(animate);
      };
      playAnimationRef.current = requestAnimationFrame(animate);
    }
  }, [updateProgress, duration, audioRef, progressBarRef]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
      startAnimation();
      updateProgress();
    } else {
      audioRef.current?.pause();
      if (playAnimationRef.current !== null) {
        cancelAnimationFrame(playAnimationRef.current);
        playAnimationRef.current = null;
      }
      updateProgress();
    }
    return () => {
      if (playAnimationRef.current !== null) {
        cancelAnimationFrame(playAnimationRef.current);
      }
    };
  }, [isPlaying, startAnimation, updateProgress, audioRef]);

  const handleNext = useCallback(() => {
    setMixIndex((prevIndex) => {
      const newIndex = isShuffle
        ? Math.floor(Math.random() * mixes.length)
        : prevIndex >= mixes.length - 1
          ? 0
          : prevIndex + 1;
      setCurrentMix(mixes[newIndex]);
      return newIndex;
    });
  }, [isShuffle, setCurrentMix, setMixIndex, mixes]);

  const handlePrevious = useCallback(() => {
    setMixIndex((prevIndex) => {
      const newIndex = isShuffle
        ? Math.floor(Math.random() * mixes.length)
        : prevIndex === 0
          ? mixes.length - 1
          : prevIndex - 1;
      setCurrentMix(mixes[newIndex]);
      return newIndex;
    });
  }, [isShuffle, setCurrentMix, setMixIndex, mixes]);

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

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

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
