"use client";
import { v4 as uuidv4 } from "uuid";
import { Upload, Image, Music } from "lucide-react";
import { useState, useRef } from "react";
import FileUploadBox from "@/components/FileUploadBox";
import AddSongPopup from "@/components/AddSongPopup";
import MixInfo from "@/components/MixInfo";
import MixVisibilitySettings from "@/components/MixVisibilitySettings";
import TagInput from "@/components/TagInput";
import type { Song, Tag } from "@/types";

export default function MixUploadPage() {
  // State
  const [songs, setSongs] = useState<Song[]>([]);
  const [showAddSong, setShowAddSong] = useState(false);
  const [tags, setTags] = useState<Tag[]>([]);
  const [visibility, setVisibility] = useState("public");
  const [downloadable, setDownloadable] = useState(false);
  const [mixTitle, setMixTitle] = useState("New Mix Title");
  const [mixInfo, setMixInfo] = useState("Add mix info");
  const [artwork, setArtwork] = useState<string | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);

  // Refs
  const artworkInputRef = useRef<HTMLInputElement>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);

  // Handlers
  const handleArtworkUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setArtwork(URL.createObjectURL(file));
    } else {
      alert("Please upload an image file");
    }
  };

  const handleAudioUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("audio/")) {
      setAudioFile(file);
    } else {
      alert("Please upload an audio file");
    }
  };

  const handleAddSong = (songData: Omit<Song, "id">) => {
    const newSong: Song = {
      id: uuidv4(),
      ...songData,
    };
    setSongs([...songs, newSong]);
  };

  const handleAddTag = (tagText: string) => {
    const newTag: Tag = {
      id: uuidv4(),
      text: tagText,
    };
    setTags([...tags, newTag]);
  };

  const handleDeleteTag = (tagId: string) => {
    setTags(tags.filter((tag) => tag.id !== tagId));
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-3 gap-8">
          {/* Left Column - Mix Info */}
          <div className="col-span-1">
            {/* Artwork Upload */}
            <div className="bg-gray-700 w-full aspect-video rounded-lg mb-4 overflow-hidden">
              {artwork ? (
                <div className="relative group w-full h-full">
                  <img
                    src={artwork}
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
              dj={"DJ Name"} // TODO: Replace with current user's DJ name
              info={mixInfo}
              onTitleChange={setMixTitle}
              onInfoChange={setMixInfo}
            />

            {/* Audio Upload */}
            <div className="mt-4 bg-gray-700 rounded-lg p-4">
              {audioFile ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Music size={20} className="text-white" />
                    <span className="text-white truncate">
                      {audioFile.name}
                    </span>
                  </div>
                  <button
                    onClick={() => audioInputRef.current?.click()}
                    className="text-sm text-gray-400 hover:text-white"
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

          {/* Middle Column - Songs List */}
          <div className="col-span-1">
            <h2 className="text-white text-xl mb-4">Songs Used</h2>
            <div className="space-y-2 mb-4">
              {songs.map((song) => (
                <div key={song.id} className="bg-gray-700 p-4 rounded">
                  <h3 className="text-white font-medium">{song.title}</h3>
                  <p className="text-gray-400 text-sm">{song.artist}</p>
                  <p className="text-gray-500 text-xs">{song.timestamp}</p>
                </div>
              ))}
            </div>
            <button
              className="bg-white text-gray-800 px-4 py-2 rounded flex items-center gap-2"
              onClick={() => setShowAddSong(true)}
            >
              <Upload size={16} /> Add New
            </button>
          </div>

          {/* Right Column - Settings */}
          <div className="col-span-1">
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
                      downloadable ? "bg-white" : "bg-gray-600"
                    }`}
                    onClick={() => setDownloadable(!downloadable)}
                  >
                    <div
                      className={`w-4 h-4 rounded-full transition-transform duration-200 ease-in-out ${
                        downloadable ? "bg-gray-800 translate-x-6" : "bg-white"
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
              onClick={() => {
                // TODO: Handle upload
                console.log({
                  title: mixTitle,
                  info: mixInfo,
                  artwork,
                  audioFile,
                  songs,
                  tags,
                  visibility,
                  downloadable,
                });
              }}
            >
              <Upload size={20} />
              Upload
            </button>
          </div>
        </div>
      </div>

      {/* Add Song Popup */}
      {showAddSong && (
        <AddSongPopup
          onClose={() => setShowAddSong(false)}
          onAdd={handleAddSong}
        />
      )}
    </div>
  );
}
