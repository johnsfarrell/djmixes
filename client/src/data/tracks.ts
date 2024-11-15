import { workAsyncStorage } from "next/dist/server/app-render/entry-base";
import track1 from "../../public/audio/track1.mp3";
import track2 from "../../public/audio/track2.mp3";
import cover1 from "../../public/audio/cover1.jpg";
import cover2 from "../../public/audio/cover2.jpg";

export const tracks = [
  {
    title: "Last Words",
    src: track1,
    author: "Kenny Beats",
    thumbnail: cover1,
  },
  {
    title: "Some",
    src: track2,
    author: "Steve Lacy",
    thumbnail: cover2,
  },
];
