/**
 * Copyright (c) 2024 DJMixes. All rights reserved.
 * Licensed under the MIT License.
 * Description: This file contains the creator view page component that displays
 * a creator's profile information, mixes, and communication feed.
 */

"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { GetMixResponse, GetProfileResponse } from "@/app/api/types";
import { getMix, getProfile } from "@/app/api/api";
import MixCard from "@/components/UserLibrary/MixCard";

/**
 * The creator view page component displays a creator's profile information,
 * mixes, and communication feed.
 * @returns The creator view page component
 */
export default function CreatorViewPage(): JSX.Element {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);

  const [profileMixes, setProfileMixes] = useState<GetMixResponse[]>([]);

  const [likedMixes, setLikedMixes] = useState<GetMixResponse[]>([]);

  const [creator, setCreator] = useState<GetProfileResponse | null>(null);

  const [isSelf, setIsSelf] = useState(false);

  useEffect(() => {
    const fetchCreator = async () => {
      try {
        if (!id) return;
        const profileId = parseInt(id as string);
        const res = await getProfile(profileId);
        const userId = parseInt(localStorage.getItem("userId") as string);

        setIsSelf(profileId === userId);

        setCreator(res);
        setLoading(false);
        for (const mixId of res.uploadedMixIds) {
          const mix = await getMix({ mixId, includeAudio: false, mock: false });
          setProfileMixes((prev) => [...prev, mix]);
        }
        for (const mixId of res.likedMixIds) {
          const mix = await getMix({ mixId, includeAudio: false, mock: false });
          setLikedMixes((prev) => [...prev, mix]);
        }
      } catch (err) {
        setLoading(false);
      }
    };
    try {
      fetchCreator();
    } catch (err) {
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col">
        <p className="text-white text-lg mb-8">Loading Creator #{id}</p>
        <p className="w-fit spinning">💿</p>
      </div>
    );
  }

  if (!creator) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-white text-lg">Creator Not Found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 pb-32">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Top Left Quadrant - Creator Info */}
        <div className="bg-gray-800 p-8 rounded-lg">
          <div className="flex items-center gap-8">
            <div className="relative w-40 h-40 rounded-full overflow-hidden">
              {creator.avatarUrl ? (
                <Image
                  src={creator.avatarUrl}
                  alt={`${creator.username}'s profile photo`}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="bg-gray-700 w-full h-full flex items-center justify-center">
                  <span className="text-gray-400 text-6xl"></span>
                </div>
              )}
            </div>
            <div>
              <h1 className="text-3xl font-bold">{creator.username}</h1>
              <p className="text-gray-400 text-lg">{creator.bio}</p>
            </div>
          </div>
          {/* Creator Communication Feed */}
          <div className="mt-10">
            <h2 className="text-xl font-bold mb-4">Creator Mixes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                ...new Map(
                  profileMixes.map((mix) => [mix.title, mix]),
                ).values(),
              ].map((mix) => (
                <MixCard key={mix.title} mix={mix} />
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Liked Mixes</h2>
          {likedMixes && likedMixes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                ...new Map(likedMixes.map((mix) => [mix.title, mix])).values(),
              ].map((mix) => (
                <MixCard key={mix.title} mix={mix} />
              ))}
            </div>
          ) : (
            <p>No liked mixes...</p>
          )}
        </div>
      </div>
    </div>
  );
}
