"use client";
import { Upload } from "lucide-react";

interface MobileUploadButtonProps {
  onClick: () => void;
}

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
