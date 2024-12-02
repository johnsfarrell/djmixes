import { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { Song } from '@/api/types';

interface AddSongPopupProps {
  onClose: () => void;
  onAdd: (song: Omit<Song, 'id'>) => void; // Omit the id field from the Song type
}

/**
 * AddSongPopup component allows users to add a new song to the mix.
 *
 * @param {AddSongPopupProps} props - The props for the AddSongPopup component.
 * @param {() => void} props.onClose - Function to close the popup.
 * @param {(songData: { title: string; artist: string; timestamp: string }) => void} props.onAdd - Function to add the new song.
 * @returns {JSX.Element} The rendered AddSongPopup component.
 */
export default function AddSongPopup({
  onClose,
  onAdd
}: AddSongPopupProps): JSX.Element {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [timestamp, setTimestamp] = useState('');

  const handleSubmit = () => {
    onAdd({ title, artist, timestamp });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-700 rounded-lg p-6 shadow-xl w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white"
        >
          <X size={20} />
        </button>

        <h3 className="text-white mb-4">Add New Song</h3>
        <div className="space-y-4">
          <div>
            <label className="text-white text-sm block mb-1">Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 rounded bg-gray-600 text-white"
            />
          </div>
          <div>
            <label className="text-white text-sm block mb-1">Artist:</label>
            <input
              type="text"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
              className="w-full p-2 rounded bg-gray-600 text-white"
            />
          </div>
          <div>
            <label className="text-white text-sm block mb-1">Timestamps:</label>
            <input
              type="text"
              value={timestamp}
              onChange={(e) => setTimestamp(e.target.value)}
              className="w-full p-2 rounded bg-gray-600 text-white"
            />
          </div>
          <button
            className="bg-white text-gray-800 px-4 py-2 rounded flex items-center gap-2"
            onClick={handleSubmit}
          >
            <Plus size={16} /> Add
          </button>
        </div>
      </div>
    </div>
  );
}
