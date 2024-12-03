"use client";

import { useEffect } from "react";

/**
 * Hook that calls a handler when a click event occurs outside of the given element.
 *
 * @param ref The reference to the element to detect clicks outside of.
 * @param handler The handler function to call when a click event occurs outside of the element.
 */
export function useClickAway(
  ref: React.RefObject<HTMLElement>,
  handler: () => void,
) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, handler]);
}
