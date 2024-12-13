/**
 * Copyright (c) 2024 DJMixes. All rights reserved.
 * Licensed under the MIT License.
 * Description: This file contains the CurrentMixDetails component that displays
 * the details of the current mix, including the songs used and stems.
 */

import { GetMixResponse } from "@/app/api/types";
import SongItem from "./SongItem";
import StemItem from "./StemItem";

/**
 * The CurrentMixDetails component displays the details of the current mix,
 * including the songs used and stems.
 *
 * @param mix The current mix to display details for.
 *
 * @returns The CurrentMixDetails component.
 */
export default function CurrentMixDetails({
  mix,
}: {
  mix: GetMixResponse;
}): JSX.Element {
  // TODO once byron adds songs and stems to api, replace this with actual data

  const songs = [
    // example songs
    {
      id: "1",
      title: "Last Words",
      artist: "Kenny Beats",
      timestamp: "0:00", // : separate song type from song timestamps on mixes
      albumArt: undefined,
    },
    {
      id: "2",
      title: "Some",
      artist: "Steve Lacy",
      timestamp: "0:00", // : separate song type from song timestamps on mixes
      albumArt: undefined,
    },
  ];

  const stems = [
    { id: "1", title: "Drums" },
    { id: "2", title: "Bass" },
    { id: "3", title: "Other" },
    { id: "4", title: "Vocals" },
  ];

  return (
    <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4">
      <div className="flex items-center gap-2 mb-6">
        <h2 className="text-white text-xl font-bold">Current Mix Details</h2>
      </div>
      <div className="space-y-6">
        <div>
          <h3 className="text-white text-lg mb-3">Songs Used</h3>
          <div className="space-y-2">
            {songs.map((song) => (
              <SongItem
                key={song.id}
                songName={song.title}
                artist={song.artist}
              />
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-white text-lg mb-3">Stems</h3>
          <div className="space-y-2">
            {stems.map((stem) => (
              <StemItem key={stem.id} stemName={stem.title} file={undefined} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
