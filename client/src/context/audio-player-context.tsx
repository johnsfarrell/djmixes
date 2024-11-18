"use client";
import React, {
  createContext,
  useContext,
  useState,
  useRef,
  ReactNode,
} from "react";
import { tracks } from "../data/tracks";
import { StaticImageData } from "next/image";

interface Track {
  title: string;
  src: string;
  author: string;
  thumbnail?: StaticImageData;
}

interface AudioPlayerContextType {
  currentTrack: Track;
  setCurrentTrack: React.Dispatch<React.SetStateAction<Track>>;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  timeProgress: number;
  setTimeProgress: React.Dispatch<React.SetStateAction<number>>;
  duration: number;
  setDuration: React.Dispatch<React.SetStateAction<number>>;
  audioRef: React.RefObject<HTMLAudioElement>;
  progressBarRef: React.RefObject<HTMLInputElement>;
  setTrackIndex: React.Dispatch<React.SetStateAction<number>>;
  mixId: string;
  setMixId: React.Dispatch<React.SetStateAction<string>>;
}

const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(
  undefined,
);

export const AudioPlayerProvider = ({ children }: { children: ReactNode }) => {
  const [trackIndex, setTrackIndex] = useState<number>(0);
  const [currentTrack, setCurrentTrack] = useState<Track>(tracks[trackIndex]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [timeProgress, setTimeProgress] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [mixId, setMixId] = useState<string>("exampleMixId");
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLInputElement>(null);

  const contextValue = {
    currentTrack,
    setCurrentTrack,
    isPlaying,
    setIsPlaying,
    timeProgress,
    setTimeProgress,
    duration,
    setDuration,
    audioRef,
    progressBarRef,
    setTrackIndex,
    mixId,
    setMixId,
  };

  return (
    <AudioPlayerContext.Provider value={contextValue}>
      {children}
    </AudioPlayerContext.Provider>
  );
};

export const useAudioPlayerContext = (): AudioPlayerContextType => {
  const context = useContext(AudioPlayerContext);
  if (context === undefined) {
    throw new Error(
      "useAudioPlayerContext must be used within an AudioPlayerProvider",
    );
  }
  return context;
};
