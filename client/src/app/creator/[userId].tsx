"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { ProfileResponse, ProfileMix, ProfileEvent } from "@/api/types";
import { mockProfile } from "@/api/mockData";

export default function CreatorViewPage() {
  // State for the creator's info, mixes, and communication feed
  const router = userRouter();
  cost {userId} = router.query;

  const [creator, setCreator] = useState<ProfileResponse | null>(null);

  useEffect(() => {
    // Fetch the creator's data from the backend
    async function fetchCreatorData() {
      if (!userId) return; // Ensure userId is available

      try {
        const response = await fetch(`/api/creators/${userId}`);
        const data: ProfileResponse = await response.json();
        setCreator(data);
      } catch (error) {
        console.error("Error fetching creator data:", error);
      }
    }

    fetchCreatorData();
  }, [userId]);

  if (!creator) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Top Left Quadrant - Creator Info */}
        <div className="bg-gray-800 p-8 rounded-lg">
          <div className="flex items-center gap-8">
            <div className="relative w-40 h-40 rounded-full overflow-hidden">
              {creator.profilePhoto ? (
                <Image
                  src={creator.profilePhoto}
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
            <h2 className="text-lg font-bold mb-2">
              Creator Communication Feed
            </h2>
            <div className="space-y-2">
              {creator.events.map((event: ProfileEvent) => (
                <div
                  key={event.eventId}
                  className="bg-gray-700 p-2 rounded-lg text-center"
                >
                  {event.title} - {event.date}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Half - Creator Mixes */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Creator Mixes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {creator.mixes.map((mix: ProfileMix) => (
              <div
                key={mix.mixId}
                className="group cursor-pointer p-4 rounded-lg"
              >
                <div className="aspect-square mb-2 relative rounded-md overflow-hidden">
                  {mix.coverUrl ? (
                    <Image
                      src={mix.coverUrl}
                      alt={`${mix.title} artwork`}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  ) : (
                    <div className="bg-gray-600 w-full h-full" />
                  )}
                </div>
                <h3 className="text-white font-medium truncate">{mix.title}</h3>
                <p className="text-gray-400 text-sm truncate">
                  {mix.visibility}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
