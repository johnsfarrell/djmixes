/**
 * Copyright (c) 2024 DJMixes. All rights reserved.
 * Licensed under the MIT License.
 * Description: This file contains the UploadButton component that displays a
 * button with an upload icon and text.
 */

"use client";
import { Upload } from "lucide-react";

interface UploadButtonProps {
  onClick: () => void;
}

/**
 * The UploadButton component displays a button with an upload icon and text.
 * It is hidden on smaller screens because the mobile upload button is displayed
 * instead.
 * 
 * @param onClick The function to call when the button is clicked.
 * 
 * @returns The UploadButton component.
 */
export default function UploadButton({ onClick }: UploadButtonProps): JSX.Element {
  return (
    <button
      onClick={onClick}
      className="bg-white text-gray-900 px-4 py-1.5 rounded-full font-medium text-sm hover:bg-gray-100 transition-colors hidden sm:flex items-center gap-2"
    >
      <Upload size={16} />
      <span>Upload mix</span>
    </button>
  );
}
