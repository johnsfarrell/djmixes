"use client";
import React, {
  createContext,
  useContext,
  useState,
  useRef,
  ReactNode,
  useEffect,
} from "react";
import { getMix } from "@/api/api";
import { Mix } from "@/api/types";

interface AudioPlayerContextType {
  currentMix: Mix | null;
  setCurrentMix: React.Dispatch<React.SetStateAction<Mix | null>>;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  timeProgress: number;
  setTimeProgress: React.Dispatch<React.SetStateAction<number>>;
  duration: number;
  setDuration: React.Dispatch<React.SetStateAction<number>>;
  audioRef: React.RefObject<HTMLAudioElement>;
  progressBarRef: React.RefObject<HTMLInputElement>;
  setMixIndex: React.Dispatch<React.SetStateAction<number>>;
  mixId: string;
  setMixId: React.Dispatch<React.SetStateAction<string>>;
  mixes: Mix[];
  setMixes: React.Dispatch<React.SetStateAction<Mix[]>>;
}

const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(
  undefined
);

export const AudioPlayerProvider = ({ children }: { children: ReactNode }) => {
  const [mixIndex, setMixIndex] = useState<number>(0);
  const [currentMix, setCurrentMix] = useState<Mix | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [timeProgress, setTimeProgress] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [mixId, setMixId] = useState<string>("exampleMixId");
  const [mixes, setMixes] = useState<Mix[]>([]);
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLInputElement>(null);

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
  }, []);

  const contextValue = {
    currentMix,
    setCurrentMix,
    isPlaying,
    setIsPlaying,
    timeProgress,
    setTimeProgress,
    duration,
    setDuration,
    audioRef,
    progressBarRef,
    setMixIndex,
    mixId,
    setMixId,
    mixes,
    setMixes,
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
      "useAudioPlayerContext must be used within an AudioPlayerProvider"
    );
  }
  return context;
};
