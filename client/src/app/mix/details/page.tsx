'use client'

// import MixInfo from '@/app/components/MixInfo';
import { useAudioPlayerContext } from '@/context/audioPlayerContext';
import { mockMixResponse } from '@/api/mockData';
import { Mix } from '@/api/types';
import { BsMusicNoteBeamed } from 'react-icons/bs';
import { Heart } from 'lucide-react';
import { useState } from 'react';
import CurrentMixDetails from '@/app/components/CurrentMixDetails/CurrentMixDetails';
import { GetMixResponse } from '@/api/types';

export default function MixDetailsPage() {
  // const { mixId } = useAudioPlayerContext();
  const mixData = mockMixResponse; // make this a mix response
  // placeholder for if the Mix has been liked by the User
  const [isLiked, setIsLiked] = useState(false);

  // TODO: add Mix to User's liked mixes
  const handleLike = () => {
    setIsLiked(!isLiked);
    // add/remove from Liked mixes
  }

  const handleDownload = () => {

  }

  return (
    <div className="min-h-screen bg-gray-900 p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column - Mix Info */}
          <div className="lg:col-span-1">
            {/* Artwork */}
            <div className="bg-gray-700 w-full aspect-video rounded-lg mb-4 overflow-hidden">
              <div className="relative group w-full h-full">
                {mixData.coverUrl ? (
                  <img
                    src={mixData.coverUrl}
                    alt="Mix artwork"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full bg-gray-300 rounded-md">
                    <span className="text-xl text-gray-600">
                      <BsMusicNoteBeamed />
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Title */}
            <div>
              <h1
                className="text-white text-xl sm:text-2xl md:text-3xl font-bold cursor-pointer hover:text-gray-300">
                {mixData.title}
              </h1>
            </div>

            <p className="text-gray-400 mb-2">{mixData.artist}</p>

            {/* TODO: This should be where the description goes. Need to add info prop to mock data */}

            {/* Tags */}
            <p className="text-gray-500">
              Tags: {mixData.tags.join(", ")}
            </p>

            {/* Like; TODO figure out how to access if user has already liked the mix */}
            <div className="mt-4 rounded-lg p-4">
              <button onClick={handleLike}>
                <p className="flex flex-row w-full"><Heart fill={`${isLiked ? "red" : ""}`} />&nbsp;&nbsp;Add to Liked Mixes</p>
              </button>
            </div>

            {mixData.allowDownload ? (
              <div className="mt-4 bg-gray-700 rounded-lg p-4">
                <button onClick={handleDownload}>Download</button>
              </div>
            ) : (
              <div></div>
            )}
          </div>
          {/* Middle Column: list of songs in mix */}
          <div className="lg:col-span-1">
            <CurrentMixDetails />
          </div>
          {/* Right Column: public comments */}
          <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center gap-2 mb-6">
              <h2 className="text-white text-xl font-bold">Comments</h2>
            </div>
            {mixData.comments.map((comment_body, i) => (
              <div className="mt-4 bg-gray-700 p-4">
                <p>{i} - {comment_body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
};