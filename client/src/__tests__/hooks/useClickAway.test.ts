/**
 * Copyright (c) 2024 DJMixes. All rights reserved.
 * Licensed under the MIT License.
 * Description: Tests the useClickAway hook.
 */

import { renderHook } from "@testing-library/react";
import { useClickAway } from "@/hooks/useClickAway";
import { fireEvent } from "@testing-library/dom";

describe("useClickAway", () => {
  it("calls handler when clicking outside", () => {
    const handler = jest.fn();
    const ref = { current: document.createElement("div") };
    document.body.appendChild(ref.current);

    renderHook(() => useClickAway(ref, handler));

    const outsideElement = document.createElement("div");
    document.body.appendChild(outsideElement);

    fireEvent.mouseDown(outsideElement);
    expect(handler).toHaveBeenCalled();
  });
});
