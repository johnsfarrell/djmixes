/**
 * Copyright (c) 2024 DJMixes. All rights reserved.
 * Licensed under the MIT License.
 * Description: This file contains the TagInput component that displays an input
 * field for adding tags to a mix.
 */

import { useState } from "react";
import Tag from "@/components/MixUpload/Tag";

interface TagType {
  id: string;
  text: string;
}

interface TagInputProps {
  tags: TagType[];
  onAddTag: (tag: string) => void;
  onDeleteTag: (id: string) => void;
}

/**
 * The TagInput component displays an input field for adding tags to a mix.
 * When a tag is added, it is displayed as a pill below the input field.
 * 
 * @param tags The list of tags to display.
 * @param onAddTag The function to call when a tag is added.
 * @param onDeleteTag The function to call when a tag is deleted.
 * 
 * @returns The TagInput component.
 */
export default function TagInput({
  tags,
  onAddTag,
  onDeleteTag,
}: TagInputProps): JSX.Element {
  const [currentTag, setCurrentTag] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && currentTag.trim()) {
      onAddTag(currentTag.trim());
      setCurrentTag("");
    }
  };

  return (
    <div>
      <h3 className="text-white mb-2">Add Tags</h3>
      <input
        type="text"
        className="w-full p-2 rounded bg-gray-600 text-white mb-2"
        placeholder="Start typing..."
        value={currentTag}
        onChange={(e) => setCurrentTag(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <div className="bg-gray-600 p-2 rounded min-h-[60px]">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Tag
              key={tag.id}
              text={tag.text}
              onDelete={() => onDeleteTag(tag.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
