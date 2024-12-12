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
  mixId: number;
  setMixId: React.Dispatch<React.SetStateAction<number>>;
  mixData: GetMixResponse | null;
  playMix: (mix: GetMixResponse) => void;
  playlist: Track[];
  setPlaylist: React.Dispatch<React.SetStateAction<Track[]>>;
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
  const [mixId, setMixId] = useState<number>(0);
  const [mixData, setMixData] = useState<GetMixResponse | null>(null);
  const [playlist, setPlaylist] = useState<Track[]>([]);
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLInputElement>(null);

  // Load persisted state on mount
  useEffect(() => {
    const savedTrack = localStorage.getItem("currentTrack");
    const savedIsPlaying = localStorage.getItem("isPlaying");
    const savedTimeProgress = localStorage.getItem("timeProgress");
    const savedDuration = localStorage.getItem("duration");
    const savedMixId = localStorage.getItem("mixId");
    const savedMixData = localStorage.getItem("mixData");
    const savedPlaylist = localStorage.getItem("playlist");

    if (savedTrack) setCurrentTrack(JSON.parse(savedTrack));
    if (savedIsPlaying) setIsPlaying(JSON.parse(savedIsPlaying));
    if (savedTimeProgress) setTimeProgress(JSON.parse(savedTimeProgress));
    if (savedDuration) setDuration(JSON.parse(savedDuration));
    if (savedMixId) setMixId(JSON.parse(savedMixId));
    if (savedMixData) setMixData(JSON.parse(savedMixData));
    if (savedPlaylist) setPlaylist(JSON.parse(savedPlaylist));
  }, []);

  // Persist state changes to localStorage
  useEffect(() => {
    localStorage.setItem("currentTrack", JSON.stringify(currentTrack));
  }, [currentTrack]);

  useEffect(() => {
    localStorage.setItem("isPlaying", JSON.stringify(isPlaying));
  }, [isPlaying]);

  useEffect(() => {
    localStorage.setItem("timeProgress", JSON.stringify(timeProgress));
  }, [timeProgress]);

  useEffect(() => {
    localStorage.setItem("duration", JSON.stringify(duration));
  }, [duration]);

  useEffect(() => {
    localStorage.setItem("mixId", JSON.stringify(mixId));
  }, [mixId]);

  useEffect(() => {
    localStorage.setItem("mixData", JSON.stringify(mixData));
  }, [mixData]);

  useEffect(() => {
    localStorage.setItem("playlist", JSON.stringify(playlist));
  }, [playlist]);

  const playMix = (mix: GetMixResponse) => {
    const newTrack: Track = {
      title: mix.title,
      src: mix.file_url || "",
      author: mix.artist,
      thumbnail: mix.cover_url
        ? ({ src: mix.cover_url } as StaticImageData)
        : undefined,
    };
    setMixData(mix);
    setCurrentTrack(newTrack);
    setMixId(mix.id);
    setIsPlaying(true);
    setPlaylist((prevPlaylist) => [newTrack, ...prevPlaylist]);
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
    playlist,
    setPlaylist,
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
