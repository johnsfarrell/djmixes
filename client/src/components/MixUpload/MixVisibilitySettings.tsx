/**
 * Copyright (c) 2024 DJMixes. All rights reserved.
 * Licensed under the MIT License.
 * Description: This file contains the VisibilitySettings component that
 * displays a list of visibility options for a mix.
 */

const VISIBILITY_OPTIONS = ["Private", "Unlisted", "Friends-Only", "Public"];

interface VisibilitySettingsProps {
  visibility: string;
  onVisibilityChange: (visibility: string) => void;
}

/**
 * The VisibilitySettings component displays a list of visibility options for a
 * mix. The user can select one of the options to change the visibility of the
 * mix when it is uploaded.
 *
 * @param visibility The current visibility of the mix.
 * @param onVisibilityChange The function to call when the visibility is
 * changed.
 *
 * @returns The VisibilitySettings component.
 */
export default function VisibilitySettings({
  visibility,
  onVisibilityChange,
}: VisibilitySettingsProps): JSX.Element {
  return (
    <div className="mb-6">
      <h3 className="text-white mb-4">Visibility:</h3>
      <div className="space-y-2">
        {VISIBILITY_OPTIONS.map((option) => (
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
