/**
 * Copyright (c) 2024 DJMixes. All rights reserved.
 * Licensed under the MIT License.
 * Description: This file contains the StemItem component that displays a stem
 * item with the stem name and download button.
 */

import { useState } from 'react';

interface StemItemProps {
  stemName: string;
  file?: File;
}

/**
 * The StemItem component displays a stem item with the stem name and download
 * button.
 *
 * @param stemName The name of the stem.
 * @param file The file to download when the download button is clicked.
 *
 * @returns The StemItem component.
 */
export default function StemItem({
  stemName,
  file
}: StemItemProps): JSX.Element {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleDownload = () => {
    if (file) {
      const url = URL.createObjectURL(file);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name;
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const handlePlaying = () => {
    setIsPlaying((prev) => !prev);
  };

  return (
    <div className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-800/50 transition-colors">
      <div
        className="w-12 h-12 rounded-md flex-shrink-0"
        style={{ backgroundColor: 'grey' }}
      />
      <p className="text-white font-medium">{stemName}</p>
      <button onClick={handleDownload}>
        <i>(Download)</i>
      </button>
      <button onClick={handlePlaying}>{isPlaying ? 'Pause' : 'Play'}</button>
    </div>
  );
}
