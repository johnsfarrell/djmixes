"use client";
import { Upload } from "lucide-react";

interface UploadButtonProps {
  onClick: () => void;
}

export default function UploadButton({ onClick }: UploadButtonProps) {
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
