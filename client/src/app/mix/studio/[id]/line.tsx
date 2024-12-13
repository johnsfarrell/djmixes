/**
 * Copyright (c) 2024 DJMixes. All rights reserved.
 * Licensed under the MIT License.
 * Description: This file contains the line component for the studio view.
 */

interface LineProps {
  lineTop: number;
  handleMouseDownOnLine: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export const Line = ({ lineTop, handleMouseDownOnLine }: LineProps) => {
  return (
    <div
      style={{ top: `${lineTop / 10 + 8}px` }}
      className={`cursor-row-resize z-10 bg-red-500 h-1 left-0 right-0 absolute`}
      onMouseDown={handleMouseDownOnLine}
    />
  );
};
