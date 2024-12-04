/**
 * Copyright (c) 2024 DJMixes. All rights reserved.
 * Licensed under the MIT License.
 * Description: This file contains the Logo component that displays the DJMixes
 * logo.
 */

import { Disc } from "lucide-react";

/**
 * The Logo component displays the DJMixes logo.
 * @returns The Logo component
 */
export default function Logo(): JSX.Element {
  return (
    <div className="flex items-center gap-2">
      <Disc size={24} className="text-white" />
      <span className="text-white text-xl font-semibold hidden sm:block">
        DJMixes
      </span>
    </div>
  );
}
