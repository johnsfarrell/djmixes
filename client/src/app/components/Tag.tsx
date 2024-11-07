import { X } from "lucide-react";

interface TagProps {
  text: string;
  onDelete: () => void;
}

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
