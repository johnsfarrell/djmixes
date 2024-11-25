import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  BsFillFastForwardFill,
  BsFillPauseFill,
  BsFillPlayFill,
  BsFillRewindFill,
  BsSkipEndFill,
  BsSkipStartFill,
  BsShuffle,
  BsRepeat
} from 'react-icons/bs';
import { useAudioPlayerContext } from '@/context/audioPlayerContext';
import { tracks } from '@/app/api/mockData';

//rendering the audio player controls
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
    setTrackIndex
  } = useAudioPlayerContext();

  // State to handle shuffle and repeat functionality (have not tested shuffle)
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);

  const playAnimationRef = useRef<number | null>(null);

  // Function to update the progress bar and time progress
  const updateProgress = useCallback(() => {
    if (audioRef.current && progressBarRef.current && duration) {
      const currentTime = audioRef.current.currentTime;
      setTimeProgress(currentTime);
      progressBarRef.current.value = currentTime.toString();
      progressBarRef.current.style.setProperty(
        '--range-progress',
        `${(currentTime / duration) * 100}%`
      );
    }
  }, [duration, setTimeProgress, audioRef, progressBarRef]);

  // Function to start the animation
  const startAnimation = useCallback(() => {
    if (audioRef.current && progressBarRef.current && duration) {
      const animate = () => {
        updateProgress();
        playAnimationRef.current = requestAnimationFrame(animate);
      };
      playAnimationRef.current = requestAnimationFrame(animate);
    }
  }, [updateProgress, duration, audioRef, progressBarRef]);

  // useEffect to handle play/pause state and start animation
  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
      startAnimation();
      updateProgress(); // Ensure progress is updated immediately when playing
    } else {
      audioRef.current?.pause();
      if (playAnimationRef.current !== null) {
        cancelAnimationFrame(playAnimationRef.current);
        playAnimationRef.current = null;
      }
      updateProgress(); // Ensure progress is updated immediately when paused
    }
    return () => {
      if (playAnimationRef.current !== null) {
        cancelAnimationFrame(playAnimationRef.current);
      }
    };
  }, [isPlaying, startAnimation, updateProgress, audioRef]);

  // Function to handle the next track
  const handleNext = useCallback(() => {
    setTrackIndex((prevIndex) => {
      const newIndex = isShuffle
        ? Math.floor(Math.random() * tracks.length)
        : prevIndex >= tracks.length - 1
          ? 0
          : prevIndex + 1;
      setCurrentTrack({
        ...tracks[newIndex],
        thumbnail: tracks[newIndex].thumbnail // Assuming thumbnail is of type StaticImageData
      });
      return newIndex;
    });
  }, [isShuffle, setCurrentTrack, setTrackIndex]);

  // Function to handle the previous track
  const handlePrevious = useCallback(() => {
    setTrackIndex((prevIndex) => {
      const newIndex = isShuffle
        ? Math.floor(Math.random() * tracks.length)
        : prevIndex === 0
          ? tracks.length - 1
          : prevIndex - 1;
      setCurrentTrack({
        ...tracks[newIndex],
        thumbnail: tracks[newIndex].thumbnail // Assuming thumbnail is of type StaticImageData
      });
      return newIndex;
    });
  }, [isShuffle, setCurrentTrack, setTrackIndex]);

  // Function to skip forward 15 seconds in the audio
  const skipForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime += 15;
      updateProgress(); // Update progress bar after skipping forward
    }
  };

  // Function to skip backward 15 seconds in the audio
  const skipBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime -= 15;
      updateProgress(); // Update progress bar after skipping backward
    }
  };

  // useEffect to handle audio end event and repeat functionality
  useEffect(() => {
    const currentAudioRef = audioRef.current;
    if (currentAudioRef) {
      currentAudioRef.onended = () => {
        if (isRepeat) {
          currentAudioRef.play();
        } else {
          handleNext(); // This function should handle both shuffle and non-shuffle scenarios
        }
      };
    }
    return () => {
      if (currentAudioRef) {
        currentAudioRef.onended = null;
      }
    };
  }, [isRepeat, handleNext, audioRef]);

  // useEffect to handle play/pause state and start animation
  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
      startAnimation(); // Ensure animation starts when play button is pressed
    } else {
      audioRef.current?.pause();
      if (playAnimationRef.current !== null) {
        cancelAnimationFrame(playAnimationRef.current);
        playAnimationRef.current = null;
      }
      updateProgress(); // Ensure progress is updated immediately when paused
    }
    return () => {
      if (playAnimationRef.current !== null) {
        cancelAnimationFrame(playAnimationRef.current);
      }
    };
  }, [isPlaying, startAnimation, updateProgress, audioRef]);

  return (
    <div className="flex gap-4 items-center">
      <audio
        src={currentTrack.src}
        ref={audioRef}
        onLoadedMetadata={() => {
          const seconds = audioRef.current?.duration;
          if (seconds !== undefined) {
            setDuration(seconds);
            if (progressBarRef.current) {
              progressBarRef.current.max = seconds.toString();
            }
          }
        }}
      />
      <button onClick={handlePrevious}>
        <BsSkipStartFill size={20} />
      </button>
      <button onClick={skipBackward}>
        <BsFillRewindFill size={20} />
      </button>
      <button onClick={() => setIsPlaying((prev) => !prev)}>
        {isPlaying ? (
          <BsFillPauseFill size={30} />
        ) : (
          <BsFillPlayFill size={30} />
        )}
      </button>
      <button onClick={skipForward}>
        <BsFillFastForwardFill size={20} />
      </button>
      <button onClick={handleNext}>
        <BsSkipEndFill size={20} />
      </button>
      <button onClick={() => setIsShuffle((prev) => !prev)}>
        <BsShuffle size={20} className={isShuffle ? 'text-[#f50]' : ''} />
      </button>
      <button onClick={() => setIsRepeat((prev) => !prev)}>
        <BsRepeat size={20} className={isRepeat ? 'text-[#f50]' : ''} />
      </button>
    </div>
  );
};

export default Controls;
