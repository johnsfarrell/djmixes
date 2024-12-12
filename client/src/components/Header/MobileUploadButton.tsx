/**
 * Copyright (c) 2024 DJMixes. All rights reserved.
 * Licensed under the MIT License.
 * Description: This file contains the MobileUploadButton component that
 * displays the upload button for mobile devices.
 */

"use client";
import { Upload } from "lucide-react";

interface MobileUploadButtonProps {
  onClick: () => void;
}

/**
 * The MobileUploadButton component displays the upload button for mobile
 * devices. It is hidden on larger screens.
 *
 * @param onClick The function to call when the button is clicked.
 *
 * @returns The MobileUploadButton component.
 */
export default function MobileUploadButton({
  onClick,
}: MobileUploadButtonProps) {
  return (
    <button
      onClick={onClick}
      className="sm:hidden bg-white text-gray-900 p-2 rounded-full hover:bg-gray-100 transition-colors"
    >
      <Upload size={20} />
    </button>
  );
}
