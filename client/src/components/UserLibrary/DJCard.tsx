/**
 * Copyright (c) 2024 DJMixes. All rights reserved.
 * Licensed under the MIT License.
 * Description: This file contains the DJCard component that displays a DJ's
 * profile photo and username.
 */

import Image from "next/image";
import { GetProfileResponse } from "@/app/api/types";
import { User } from "lucide-react";

/**
 * The DJCard component displays a DJ's profile photo and username.
 * 
 * @param dj The DJ to display.
 * 
 * @returns The DJCard component.
 */
export default function DJCard({ dj }: { dj: GetProfileResponse }): JSX.Element {
  return (
    <div className="group cursor-pointer">
      <div className="aspect-square mb-2 relative">
        {dj.profilePhoto ? (
          <Image
            src={dj.profilePhoto}
            alt={`${dj.username} profile photo`}
            fill
            className="object-cover rounded-md transition-transform group-hover:scale-105"
          />
        ) : (
          // default user avatar
          <div className="w-full h-full rounded-full bg-gray-700 flex items-center justify-center">
            <User size={48} className="text-gray-400" />
          </div>
        )}
      </div>
      <h3 className="text-white font-medium text-center truncate">
        {dj.username}
      </h3>
    </div>
  );
}
