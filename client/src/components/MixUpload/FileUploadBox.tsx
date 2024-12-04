/**
 * Copyright (c) 2024 DJMixes. All rights reserved.
 * Licensed under the MIT License.
 * Description: This file contains the FileUploadBox component that displays a
 * box with an icon, text, and subtext for uploading files.
 */

import { LucideIcon } from "lucide-react";

interface FileUploadBoxProps {
  onClick: () => void;
  icon: LucideIcon;
  text: string;
  subtext: string;
}

/**
 * The FileUploadBox component displays a box with an icon, text, and subtext 
 * for uploading files. The box is clickable and calls the onClick function when
 * clicked. The icon, text, and subtext are customizable so that the box can be
 * used for different types of file uploads (e.g. album art, mixes).
 * 
 * @param onClick The function to call when the box is clicked.
 * @param icon The icon to display in the box.
 * @param text The text to display in the box.
 * @param subtext The subtext to display in the box.
 * 
 * @returns The FileUploadBox component.
 */
export default function FileUploadBox({
  onClick,
  icon: Icon,
  text,
  subtext,
}: FileUploadBoxProps): JSX.Element {
  return (
    <button
      onClick={onClick}
      className="w-full h-full flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-600 rounded-lg hover:border-gray-500 transition-colors"
    >
      <Icon size={24} className="text-gray-400" />
      <div className="text-center">
        <p className="text-white">{text}</p>
        <p className="text-gray-400 text-sm">{subtext}</p>
      </div>
    </button>
  );
}
