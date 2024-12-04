/**
 * Copyright (c) 2024 DJMixes. All rights reserved.
 * Licensed under the MIT License.
 * Description: This file contains the home page component that displays the 
 * currently playing mix's details and user's library.
 */

"use client";
import React, { useEffect, useState } from "react";
import CurrentMixDetails from "@/components/CurrentMixDetails/CurrentMixDetails";
import UserLibrary from "@/components/UserLibrary/UserLibrary";
import { GetMixResponse } from "@/app/api/types";
import { getMix } from "@/app/api/api";

/**
 * The home page component displays all the content on the home page, including
 * the currently playing mix's details and the user's library.
 * @returns The home page component
 */
export default function Home(): JSX.Element {
  const [mix, setMix] = useState<GetMixResponse | null>(null);

  useEffect(() => {
    const fetchMix = async () => {
      const fetchedMix = await getMix({ mixId: 1, mock: true });
      // TODO: remove just for debug
      await setTimeout(() => {}, 1000);
      setMix(fetchedMix);
    };

    fetchMix();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="max-w-[1920px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-9 gap-4">
          {/* Left column */}

          {mix && (
            <div className="lg:col-span-3">
              <CurrentMixDetails mix={mix} />
            </div>
          )}

          {/* Middle column */}
          <div className="lg:col-span-6">
            <UserLibrary />
          </div>

          {/* Right column - TBD */}
          {/* <div className="lg:col-span-3"> */}
          {/* </div> */}
        </div>
      </div>
    </div>
  );
}
