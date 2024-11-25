interface VisibilitySettingsProps {
  visibility: string;
  onVisibilityChange: (visibility: string) => void;
}

export default function VisibilitySettings({
  visibility,
  onVisibilityChange,
}: VisibilitySettingsProps): JSX.Element {
  return (
    <div className="mb-6">
      <h3 className="text-white mb-4">Visibility:</h3>
      <div className="space-y-2">
        {["Private", "Unlisted", "Friends-Only", "Public"].map((option) => (
          <button
            key={option}
            className={`w-full p-2 rounded ${
              visibility.toLowerCase() === option.toLowerCase()
                ? "bg-white text-gray-800"
                : "bg-gray-600 text-white"
            }`}
            onClick={() => onVisibilityChange(option.toLowerCase())}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
