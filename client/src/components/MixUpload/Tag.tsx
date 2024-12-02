/**
 * Copyright (c) 2024 DJMixes. All rights reserved.
 * Licensed under the MIT License.
 * Description: This file contains the Tag component that displays a tag with
 * text and a delete button.
 */

import { X } from "lucide-react";

interface TagProps {
  text: string;
  onDelete: () => void;
}

/**
 * The Tag component displays a tag with text and a delete button.
 *
 * @param text The text to display in the tag.
 * @param onDelete The function to call when the delete button is clicked.
 *
 * @returns The Tag component.
 */
export default function Tag({ text, onDelete }: TagProps): JSX.Element {
  return (
    <span className="bg-gray-500 text-white px-2 py-1 rounded text-sm flex items-center gap-1">
      {text}
      <button onClick={onDelete} className="hover:text-gray-300">
        <X size={14} />
      </button>
    </span>
  );
}
