/**
 * Copyright (c) 2024 DJMixes. All rights reserved.
 * Licensed under the MIT License.
 * Description: This file contains the MixCard component that displays a mix 
 * card with the mix's artwork, title, artist, and a play button.
 */

import Image from "next/image";
import { GetMixResponse } from "@/app/api/types";
import { useState } from "react";

/**
 * The MixCard component displays a mix card with the mix's artwork, title, 
 * artist, and a play button.
 * 
 * @param mix The mix to display.
 * 
 * @returns The MixCard component.
 */
export default function MixCard({ mix }: { mix: GetMixResponse }): JSX.Element {
  const [audio] = useState(new Audio(mix.fileUrl));

  const handlePlay = () => {
    audio.play();
  };

  return (
    <div className="group cursor-pointer">
      <div className="aspect-square mb-2 relative rounded-md overflow-hidden">
        {mix.coverUrl ? (
          <Image
            src={mix.coverUrl}
            alt={`${mix.title} artwork`}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
        ) : (
          <div className="bg-gray-700 w-full h-full" />
        )}
      </div>
      <h3 className="text-white font-medium truncate">{mix.title}</h3>
      <p className="text-gray-400 text-sm truncate">{mix.artist}</p>
      <button onClick={handlePlay}>
        <i>(Play Sample)</i>
      </button>
    </div>
  );
}
