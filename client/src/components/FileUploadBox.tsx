import { LucideIcon } from "lucide-react";

interface FileUploadBoxProps {
  onClick: () => void;
  icon: LucideIcon;
  text: string;
  subtext: string;
}

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
