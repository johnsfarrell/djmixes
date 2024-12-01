/**
 * Copyright (c) 2024 DJMixes. All rights reserved.
 * Licensed under the MIT License.
 * Description: This file contains the mix upload page component that renders
 * the mix upload form, handles form submission, and redirects the user to the
 * mix page upon successful mix upload.
 */

'use client';
import { v4 as uuidv4 } from 'uuid';
import { Upload, Image, Music, Plus } from 'lucide-react';
import { useState, useRef } from 'react';
import FileUploadBox from '@/components/MixUpload/FileUploadBox';
import MixInfo from '@/components/MixUpload/MixInfo';
import MixVisibilitySettings from '@/components/MixUpload/MixVisibilitySettings';
import TagInput from '@/components/MixUpload/TagInput';
import { MixUploadRequest, UploadMixResponse } from '@/app/api/types';
import { uploadMix } from '@/app/api/api';
import { formatDateTime } from '@/util/helpers';

/**
 * The Tag interface represents a tag object with an ID and text.
 * 
 * @interface
 */
interface Tag {
  /**
   * The unique identifier of the tag.
   */
  id: string;

  /**
   * The text of the tag.
   */
  text: string;
}

/**
 * The mix upload page component renders the mix upload form, handles form
 * submission, and redirects the user to the mix page upon successful mix upload.
 * @returns The mix upload page component
 */
export default function MixUploadPage(): JSX.Element {
  const [tags, setTags] = useState<Tag[]>([]);
  const [visibility, setVisibility] = useState('public');
  const [downloadable, setDownloadable] = useState(false);
  const [mixTitle, setMixTitle] = useState('New Mix Title');
  const [mixInfo, setMixInfo] = useState('Add mix info');
  const [artwork, setArtwork] = useState<File | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);

  const artworkInputRef = useRef<HTMLInputElement>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);

  const handleArtworkUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setArtwork(file);
    } else {
      alert('Please upload an image file');
    }
  };

  const handleAudioUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('audio/')) {
      setAudioFile(file);
    } else {
      alert('Please upload an audio file');
    }
  };

  const handleAddTag = (tagText: string) => {
    const newTag: Tag = {
      id: uuidv4(),
      text: tagText
    };
    setTags([...tags, newTag]);
  };

  const handleDeleteTag = (tagId: string) => {
    setTags(tags.filter((tag) => tag.id !== tagId));
  };

  const handleUpload = async () => {
    if (!artwork || !audioFile || !mixTitle || !tags.length) {
      alert('Please fill out all required fields');
      return;
    }

    const data: MixUploadRequest = {
      title: mixTitle,
      visibility,
      tags: tags.map((tag) => tag.text),
      userId: 1, // TODO: Replace with current user's ID
      artist: 'DJ Name', // TODO: Replace with current user's DJ name
      mix: audioFile,
      cover: artwork,
      album: 'Mix Album', // TODO: Replace with current user's album (or remove this? not sure if we need it)
      releaseDate: formatDateTime(),
      allowDownload: downloadable
    };

    console.log(data); // TODO: remove later

    const res: UploadMixResponse = await uploadMix({ ...data, mock: false });

    // window.location.href = `/mix/${res.fileKey}`; // TODO redirect should be to mixId not fileKey
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column - Mix Info */}
          <div className="lg:col-span-1">
            {/* Artwork Upload */}
            <div className="bg-gray-700 w-full aspect-video rounded-lg mb-4 overflow-hidden">
              {artwork ? (
                <div className="relative group w-full h-full">
                  <img
                    src={URL.createObjectURL(artwork)}
                    alt="Mix artwork"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <button
                      onClick={() => artworkInputRef.current?.click()}
                      className="bg-white text-gray-800 px-4 py-2 rounded-lg"
                    >
                      Change Artwork
                    </button>
                  </div>
                </div>
              ) : (
                <FileUploadBox
                  onClick={() => artworkInputRef.current?.click()}
                  icon={Image}
                  text="Upload Artwork"
                  subtext="Click to select image"
                />
              )}
            </div>
            <input
              type="file"
              ref={artworkInputRef}
              onChange={handleArtworkUpload}
              accept="image/*"
              className="hidden"
            />

            <MixInfo
              title={mixTitle}
              dj={'DJ Name'} // TODO: Replace with current user's DJ name
              info={mixInfo}
              onTitleChange={setMixTitle}
              onInfoChange={setMixInfo}
            />

            {/* Audio Upload */}
            <div className="mt-4 bg-gray-700 rounded-lg p-4">
              {audioFile ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <Music size={20} className="text-white flex-shrink-0" />
                    <span className="text-white truncate">
                      {audioFile.name}
                    </span>
                  </div>
                  <button
                    onClick={() => audioInputRef.current?.click()}
                    className="text-sm text-gray-400 hover:text-white ml-2 flex-shrink-0"
                  >
                    Change
                  </button>
                </div>
              ) : (
                <FileUploadBox
                  onClick={() => audioInputRef.current?.click()}
                  icon={Music}
                  text="Upload Mix Audio"
                  subtext="MP3, WAV, FLAC"
                />
              )}
            </div>
            <input
              type="file"
              ref={audioInputRef}
              onChange={handleAudioUpload}
              accept="audio/*"
              className="hidden"
            />
          </div>

          {/* Middle and Right Columns - Wrapped in a container for mobile layout */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {/* Right Column - Settings */}
            <div className="w-full">
              <div className="bg-gray-700 p-6 rounded-lg">
                <MixVisibilitySettings
                  visibility={visibility}
                  onVisibilityChange={setVisibility}
                />

                <div className="mb-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-white">Downloadable?:</h3>
                    <button
                      className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out ${
                        downloadable ? 'bg-white' : 'bg-gray-600'
                      }`}
                      onClick={() => setDownloadable(!downloadable)}
                    >
                      <div
                        className={`w-4 h-4 rounded-full transition-transform duration-200 ease-in-out ${
                          downloadable
                            ? 'bg-gray-800 translate-x-6'
                            : 'bg-white'
                        }`}
                      ></div>
                    </button>
                  </div>
                </div>

                <TagInput
                  tags={tags}
                  onAddTag={handleAddTag}
                  onDeleteTag={handleDeleteTag}
                />
              </div>

              <button
                className="w-full bg-white text-gray-800 px-6 py-3 rounded-lg mt-4 flex items-center justify-center gap-2"
                onClick={handleUpload}
              >
                <Upload size={20} />
                Upload
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
