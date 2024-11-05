import React, { useState } from "react";
import { AudioPlayer } from "./components/AudioPlayer";
import { AudioPlayerProvider } from "@/context/audio-player-context";

const HomePage: React.FC = () => {
  const mixId = "exampleMixId"; // Replace with actual mix ID

  return (
    <div>
      <h1>Welcome to DJ Mixes</h1>
      <AudioPlayerProvider>
        <AudioPlayer />
      </AudioPlayerProvider>
    </div>
  );
};

export default HomePage;
