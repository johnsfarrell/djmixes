/**
 * Copyright (c) 2024 DJMixes. All rights reserved.
 * Licensed under the MIT License.
 * Description: This file contains the mix details page.
 */

"use client";

import { useRouter, useParams } from "next/navigation";
import { GetMixResponse } from "@/app/api/types";
import { useEffect, useState } from "react";
import {
  commentOnMix,
  getMix,
  getProfile,
  likeMix,
  unlikeMix,
} from "@/app/api/api";
import { useAudioPlayerContext } from "@/context/audioPlayerContext";

export default function MixDetailsPage(): JSX.Element {
  const { id } = useParams();

  const [mix, setMix] = useState<GetMixResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [likedMixIds, setLikedMixIds] = useState<number[]>([]);

  const [liked, setLiked] = useState(false);
  const { playMix } = useAudioPlayerContext();

  useEffect(() => {
    if (!id) return;
    const fetchMix = async () => {
      try {
        const data1 = await getProfile(
          parseInt(localStorage.getItem("userId") as string),
        );
        setLikedMixIds(data1.likedMixIds);
        setLiked(data1.likedMixIds.includes(parseInt(id as string)));
        const data = await getMix({
          mixId: parseInt(id as string),
          mock: false,
        });
        setMix(data);
        playMix(data);
      } catch (err) {
        setError("Failed to fetch mix details.");
      } finally {
        setLoading(false);
      }
    };
    fetchMix();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col">
        <p className="text-white text-lg mb-8">Loading Mix #{id}</p>
        <p className="w-fit spinning">📀</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-white text-lg">{error}</p>
      </div>
    );
  }

  if (!mix) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-white text-lg">Mix not found.</p>
      </div>
    );
  }

  const handleLike = async () => {
    setLiked(!liked);
    if (!liked && localStorage.getItem("userId")) {
      likeMix(
        parseInt(id as string),
        parseInt(localStorage.getItem("userId") as string),
      );
    } else if (localStorage.getItem("userId")) {
      unlikeMix(
        parseInt(id as string),
        parseInt(localStorage.getItem("userId") as string),
      );
    }
  };

  const handleComment = () => {
    const comment = prompt("Enter your comment");
    if (comment) {
      commentOnMix(
        comment, // comment (string)
        parseInt(id as string), // mixId (number)
        parseInt(localStorage.getItem("userId") as string), // userId (number)
      );
      mix.comments.push({
        comment_text: comment,
        user_id: parseInt(localStorage.getItem("userId") as string),
        comment_id: mix.comments.length + 1,
        created_at: new Date(),
        mix_id: parseInt(id as string),
      });
      setMix({ ...mix, comments: mix.comments });
    } else {
      alert("Please enter a comment");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4 sm:p-6 md:p-8 pb-28">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-2">
        <div className="lg:col-span-1">
          <img
            src={mix.cover_url ?? "/placeholder.png"}
            alt={`${mix.title} cover`}
            className="object-cover w-full aspect-square mb-2 rounded-lg border-4 border-white bg-slate-300"
          />
          <div className="bg-gray-700 rounded-lg p-4">
            <h1 className="text-white text-xl font-bold">{mix.title}</h1>
            <p className="text-gray-400">Artist: {mix.artist}</p>
            <p className="text-gray-400">
              Album: {mix.album || <span className="italic">N/A</span>}
            </p>
            <p className="text-gray-400">Visibility: {mix.visibility}</p>
            <p className="text-gray-400">Tags: {mix.tags.join(", ")}</p>
            <p className="text-gray-400">
              Created At: {new Date(mix.created_at).toLocaleDateString()}
            </p>
            <p className="text-gray-400">
              Updated At: {new Date(mix.updated_at).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="lg:col-span-2 flex flex-col justify-between">
          {mix.drumsUrl &&
            mix.bassUrl &&
            mix.vocalsUrl &&
            mix.otherUrl &&
            mix.split_json &&
            mix.splits &&
            mix.splits.length && (
              <div className="w-full flex justify-end">
                <a
                  href={`/mix/studio/${mix.id}`}
                  className="w-full bg-gray-800 p-2 rounded-lg text-white mb-2
                transition-all
                hover:scale-105
                hover:bg-gray-700"
                >
                  <b>Studio</b> 🎛️&nbsp;&nbsp;&nbsp; Remix <i>{mix.title}</i> by{" "}
                  <i>{mix.artist}</i>
                </a>
              </div>
            )}
          <div className="bg-gray-700 rounded-lg p-6">
            <h2 className="text-white text-lg font-semibold">
              Listen to {mix.title} by{" "}
              <a href={`/creator/${mix.upload_user.user_id}`}>
                <u>{mix.artist}</u>
              </a>
              &nbsp;
              <a
                href={mix.file_url}
                download={`${mix.title}.mp3`}
                className="text-blue-400 hover:underline"
              >
                (Download)
              </a>
            </h2>
            <audio controls src={mix.file_url} className="w-full mt-4">
              Your browser does not support the audio element.
            </audio>
            <button
              onClick={handleLike}
              className="mt-4 bg-gray-800 p-2 rounded-lg text-white"
            >
              {liked ? "Unlike 👎" : "Like 👍"}
            </button>

            <div className="flex flex-row mt-4">
              {mix.vocalsUrl && (
                <div className="flex flex-col w-1/4">
                  <h2 className="text-white text-lg font-semibold">Vocals</h2>
                  <audio
                    controls
                    src={mix.vocalsUrl}
                    className="w-full mb-4 bg-[#fffffff0]"
                  >
                    Your browser does not support the audio element.
                  </audio>
                </div>
              )}

              {mix.bassUrl && (
                <div className="flex flex-col w-1/4">
                  <h2 className="text-white text-lg font-semibold">Bass</h2>
                  <audio
                    controls
                    src={mix.bassUrl}
                    className="w-full mb-4 bg-[#fffffff0]"
                  >
                    Your browser does not support the audio element.
                  </audio>
                </div>
              )}

              {mix.drumsUrl && (
                <div className="flex flex-col w-1/4">
                  <h2 className="text-white text-lg font-semibold">Drums</h2>
                  <audio
                    controls
                    src={mix.drumsUrl}
                    className="w-full mb-4 bg-[#fffffff0]"
                  >
                    Your browser does not support the audio element.
                  </audio>
                </div>
              )}

              {mix.otherUrl && (
                <div className="flex flex-col w-1/4">
                  <h2 className="text-white text-lg font-semibold">Other</h2>
                  <audio
                    controls
                    src={mix.otherUrl}
                    className="w-full mb-4 bg-[#fffffff0]"
                  >
                    Your browser does not support the audio element.
                  </audio>
                </div>
              )}
            </div>
            <h2 className="text-white text-lg font-semibold mt-6">Comments</h2>
            {mix.comments.length > 0 ? (
              <ul className="mt-2 space-y-2">
                {mix.comments.map((commentResponse, index) => (
                  <li
                    key={index}
                    className="bg-gray-800 p-3 rounded-lg text-gray-300"
                  >
                    {new Date(commentResponse.created_at).toLocaleDateString()}{" "}
                    by{" "}
                    <a href={`/creator/${commentResponse.user_id}`}>
                      <u>User {commentResponse.user_id}</u>
                    </a>
                    :&nbsp;{commentResponse.comment_text}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400 mt-2">No comments yet.</p>
            )}
            <button
              className="bg-gray-100 p-2 rounded-sm text-black mt-2"
              onClick={handleComment}
            >
              Write a Comment
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-2">
        {mix.vocalsUrl || mix.drumsUrl || mix.bassUrl || mix.otherUrl ? (
          <div className="bg-gray-700 rounded-lg p-6 mt-2 lg:col-span-1">
            <h2 className="text-white text-lg font-semibold">
              Stems (Downloads)
            </h2>
            <ul className="mt-4 space-y-2">
              {mix.vocalsUrl && (
                <li>
                  <a
                    href={mix.vocalsUrl}
                    download="vocals_stem.mp3"
                    className="text-blue-400 hover:underline"
                  >
                    Vocals Stem
                  </a>
                </li>
              )}
              {mix.drumsUrl && (
                <li>
                  <a
                    href={mix.drumsUrl}
                    download="drums_stem.mp3"
                    className="text-blue-400 hover:underline"
                  >
                    Drums Stem
                  </a>
                </li>
              )}
              {mix.bassUrl && (
                <li>
                  <a
                    href={mix.bassUrl}
                    download="bass_stem.mp3"
                    className="text-blue-400 hover:underline"
                  >
                    Bass Stem
                  </a>
                </li>
              )}
              {mix.otherUrl && (
                <li>
                  <a
                    href={mix.otherUrl}
                    download="other_stem.mp3"
                    className="text-blue-400 hover:underline"
                  >
                    Other Stem
                  </a>
                </li>
              )}
            </ul>
          </div>
        ) : (
          <div className="mt-2 bg-gray-700 rounded-lg p-6 lg:col-span-1">
            <h2 className="text-white text-lg font-semibold">
              No stems available
            </h2>
          </div>
        )}

        {mix.splits && mix.splits.length > 0 ? (
          <div className="mt-2 bg-gray-700 rounded-lg p-6 lg:col-span-2">
            <h2 className="text-white text-lg font-semibold">Splits</h2>
            <ul className="mt-4 space-y-2">
              {mix.splits
                .sort((a, b) => a.timestamp - b.timestamp)
                .map((split, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center bg-gray-800 p-3 rounded-lg cursor-pointer hover:bg-gray-600 transition-colors"
                    onClick={() => {
                      const audio = document.querySelector("audio");
                      if (audio) {
                        audio.currentTime = split.timestamp;
                        audio.play();
                      }
                    }}
                  >
                    <span className="text-gray-300 mr-10">{split.name}</span>
                    <span className="text-gray-400">
                      {new Date(split.timestamp * 1000)
                        .toISOString()
                        .substr(11, 8)}
                    </span>
                  </li>
                ))}
            </ul>
          </div>
        ) : (
          <div className="mt-2 bg-gray-700 rounded-lg p-6 lg:col-span-2">
            <h2 className="text-white text-lg font-semibold">
              No splits available
            </h2>
          </div>
        )}
      </div>
    </div>
  );
}
