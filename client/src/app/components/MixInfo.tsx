import { useState } from "react";

interface MixInfoProps {
  title: string;
  dj: string;
  info: string;
  onTitleChange: (title: string) => void;
  onInfoChange: (info: string) => void;
}

export default function MixInfo({
  title,
  dj,
  info,
  onTitleChange,
  onInfoChange,
}: MixInfoProps): JSX.Element {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingInfo, setIsEditingInfo] = useState(false);

  return (
    <div>
      {isEditingTitle ? (
        <input
          type="text"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          onBlur={() => setIsEditingTitle(false)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setIsEditingTitle(false);
            }
          }}
          className="text-white text-xl sm:text-2xl md:text-3xl font-bold w-full bg-gray-800 rounded px-2 py-1"
          autoFocus
        />
      ) : (
        <h1
          className="text-white text-xl sm:text-2xl md:text-3xl font-bold cursor-pointer hover:text-gray-300"
          onClick={() => setIsEditingTitle(true)}
        >
          {title}
        </h1>
      )}

      <p className="text-gray-400 mb-2">{dj}</p>

      {isEditingInfo ? (
        <textarea
          value={info}
          onChange={(e) => onInfoChange(e.target.value)}
          onBlur={() => setIsEditingInfo(false)}
          className="text-gray-500 bg-gray-800 rounded px-2 py-1 w-full resize-none"
          rows={2}
          autoFocus
        />
      ) : (
        <p
          className="text-gray-500 cursor-pointer hover:text-gray-400"
          onClick={() => setIsEditingInfo(true)}
        >
          {info}
        </p>
      )}
    </div>
  );
}
