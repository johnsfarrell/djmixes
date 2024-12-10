'use client';

import { useRouter, useParams } from 'next/navigation';
import { GetMixResponse } from '@/app/api/types';
import { useEffect, useState } from 'react';
import { commentOnMix, getMix, likeMix, unlikeMix } from '@/app/api/api';

export default function MixDetailsPage(): JSX.Element {
  const { id } = useParams();

  const [mix, setMix] = useState<GetMixResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchMix = async () => {
      try {
        const data = await getMix({
          mixId: parseInt(id as string),
          mock: false
        });
        setMix(data);
      } catch (err) {
        setError('Failed to fetch mix details.');
      } finally {
        setLoading(false);
      }
    };

    fetchMix();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-white text-lg">Loading Mix {id}...</p>
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
    if (liked && localStorage.getItem('userId')) {
      likeMix(
        parseInt(id as string),
        parseInt(localStorage.getItem('userId') as string)
      );
    } else if (localStorage.getItem('userId')) {
      unlikeMix(
        parseInt(id as string),
        parseInt(localStorage.getItem('userId') as string)
      );
    }
  };

  const handleComment = () => {
    const comment = prompt('Enter your comment');
    if (comment) {
      commentOnMix(
        comment, // comment (string)
        parseInt(id as string), // mixId (number)
        parseInt(localStorage.getItem('userId') as string) // userId (number)
      );
      window.location.reload();
    } else {
      alert('Please enter a comment');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4 sm:p-6 md:p-8 mb-28">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        <div className="lg:col-span-1">
          <img
            src={mix.cover_url ?? '/placeholder.png'}
            alt={`${mix.title} cover`}
            width={500}
            height={500}
            className="object-cover w-52 h-52 mb-2 rounded-lg"
          />
          <div className="bg-gray-700 rounded-lg p-4">
            <h1 className="text-white text-xl font-bold">{mix.title}</h1>
            <p className="text-gray-400">Artist: {mix.artist}</p>
            <p className="text-gray-400">
              Album: {mix.album || <span className="italic">N/A</span>}
            </p>
            <p className="text-gray-400">Visibility: {mix.visibility}</p>
            <p className="text-gray-400">Tags: {mix.tags.join(', ')}</p>
            <p className="text-gray-400">
              Created At: {new Date(mix.created_at).toLocaleDateString()}
            </p>
            <p className="text-gray-400">
              Updated At: {new Date(mix.updated_at).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-gray-700 rounded-lg p-6">
            <h2 className="text-white text-lg font-semibold">
              Listen to {mix.title} by{' '}
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
              {liked ? 'Unlike 👎' : 'Like 👍'}
            </button>

            {mix.vocalsUrl && (
              <>
                <h2 className="text-white text-lg font-semibold">
                  Vocals Stem
                </h2>
                <audio controls src={mix.vocalsUrl} className="w-full mt-4">
                  Your browser does not support the audio element.
                </audio>
              </>
            )}

            {mix.bassUrl && (
              <>
                <h2 className="text-white text-lg font-semibold">Bass Stem</h2>
                <audio controls src={mix.bassUrl} className="w-full mt-4">
                  Your browser does not support the audio element.
                </audio>
              </>
            )}

            {mix.drumsUrl && (
              <>
                <h2 className="text-white text-lg font-semibold">Drums Stem</h2>
                <audio controls src={mix.drumsUrl} className="w-full mt-4">
                  Your browser does not support the audio element.
                </audio>
              </>
            )}

            {mix.otherUrl && (
              <>
                <h2 className="text-white text-lg font-semibold">Other Stem</h2>
                <audio controls src={mix.otherUrl} className="w-full mt-4">
                  Your browser does not support the audio element.
                </audio>
              </>
            )}

            <h2 className="text-white text-lg font-semibold mt-6">Comments</h2>
            {mix.comments.length > 0 ? (
              <ul className="mt-2 space-y-2">
                {mix.comments.map((commentResponse, index) => (
                  <li
                    key={index}
                    className="bg-gray-800 p-3 rounded-lg text-gray-300"
                  >
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

      <div className="flex">
        {mix.vocalsUrl || mix.drumsUrl || mix.bassUrl || mix.otherUrl ? (
          <div className="bg-gray-700 rounded-lg p-6 mt-2 mr-2 w-fit">
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
          <div className="mt-2 bg-gray-700 rounded-lg p-6 mr-2">
            <h2 className="text-white text-lg font-semibold mr-6">
              No stems available
            </h2>
          </div>
        )}

        {mix.splits && mix.splits.length > 0 ? (
          <div className="mt-2 bg-gray-700 rounded-lg p-6">
            <h2 className="text-white text-lg font-semibold">Splits</h2>
            <ul className="mt-4 space-y-2">
              {mix.splits.map((split, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center bg-gray-800 p-3 rounded-lg cursor-pointer hover:bg-gray-600 transition-colors"
                  onClick={() => {
                    const audio = document.querySelector('audio');
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
          <div className="mt-2 bg-gray-700 rounded-lg p-6">
            <h2 className="text-white text-lg font-semibold">
              No splits available
            </h2>
          </div>
        )}
      </div>
    </div>
  );
}
