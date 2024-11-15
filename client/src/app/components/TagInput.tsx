import { useState } from "react";
import { Tag as TagType } from "@/types"; // Import the Tag type from the types file as TagType to avoid naming conflicts
import Tag from "./Tag";

interface TagInputProps {
  tags: TagType[];
  onAddTag: (tag: string) => void;
  onDeleteTag: (id: string) => void;
}

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
