"use client";

import { useState } from "react";
import Image from "next/image";

export default function CreatorViewPage() {
  // State for the creator's info, mixes, and communication feed
  const [creator] = useState({
    id: 1,
    name: "Creator Name",
    bio: "This is a short bio about the creator.",
    profilePhoto: null, // Replace with actual photo URL or null for default
  });

  const [mixes] = useState([
    {
      id: 1,
      title: "Mix 1",
      artwork: null,
      dj: { name: "Creator Name" },
    },
    {
      id: 2,
      title: "Mix 2",
      artwork: null,
      dj: { name: "Creator Name" },
    },
    {
      id: 3,
      title: "Mix 3",
      artwork: null,
      dj: { name: "Creator Name" },
    },
    { id: 4, title: "Mix 4", artwork: null, dj: { name: "Creator Name" } },
  ]);

  const [posts] = useState([
    { id: 1, content: "Post 1" },
    { id: 2, content: "Post 2" },
    { id: 3, content: "Post 3" },
  ]);

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
                  alt={`${creator.name}'s profile photo`}
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
              <h1 className="text-3xl font-bold">{creator.name}</h1>
              <p className="text-gray-400 text-lg">{creator.bio}</p>
            </div>
          </div>
          {/* Creator Communication Feed */}
          <div className="mt-10">
            <h2 className="text-lg font-bold mb-2">
              Creator Communication Feed
            </h2>
            <div className="space-y-2">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="bg-gray-700 p-2 rounded-lg text-center"
                >
                  {post.content}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Half - Creator Mixes */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Creator Mixes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {mixes.map((mix) => (
              <div
                key={mix.id}
                className="group cursor-pointer bg-gray-700 p-4 rounded-lg"
              >
                <div className="aspect-square mb-2 relative rounded-md overflow-hidden">
                  {mix.artwork ? (
                    <Image
                      src={mix.artwork}
                      alt={`${mix.title} artwork`}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  ) : (
                    <div className="bg-gray-600 w-full h-full" />
                  )}
                </div>
                <h3 className="text-white font-medium truncate">{mix.title}</h3>
                <p className="text-gray-400 text-sm truncate">{mix.dj.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
