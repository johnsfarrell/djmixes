"use client";
import React, {
  createContext,
  useContext,
  useState,
  useRef,
  ReactNode,
  useEffect,
} from "react";
import { StaticImageData } from "next/image";
import { getMix } from "@/app/api/api";
import { GetMixResponse } from "@/app/api/types";

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
  mixData: GetMixResponse | null;
  playMix: (mix: GetMixResponse) => void;
}

const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(
  undefined
);

export const AudioPlayerProvider = ({ children }: { children: ReactNode }) => {
  const [trackIndex, setTrackIndex] = useState<number>(0);
  const [currentTrack, setCurrentTrack] = useState<Track>({
    title: "",
    src: "",
    author: "",
  });
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [timeProgress, setTimeProgress] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [mixId, setMixId] = useState<string>("exampleMixId");
  const [mixData, setMixData] = useState<GetMixResponse | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchMixData = async () => {
      if (mixId) {
        const data = await getMix({ mixId: parseInt(mixId), mock: false });
        setMixData(data);
        setCurrentTrack({
          title: data.title,
          src: data.file_url || "",
          author: data.artist,
          thumbnail: data.cover_url
            ? ({ src: data.cover_url } as StaticImageData)
            : undefined,
        });
      }
    };

    fetchMixData();
  }, [mixId]);

  const playMix = (mix: GetMixResponse) => {
    setCurrentTrack({
      title: mix.title,
      src: mix.file_url || "",
      author: mix.artist,
      thumbnail: mix.cover_url
        ? ({ src: mix.cover_url } as StaticImageData)
        : undefined,
    });
    setIsPlaying(true);
  };

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
    mixData,
    playMix,
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
