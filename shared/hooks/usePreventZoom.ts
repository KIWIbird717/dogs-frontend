"use client";

import { useEffect } from "react";

export const usePreventZoom = () => {
  useEffect(() => {
    let lastTouchEnd = 0;
    document.addEventListener(
      "touchend",
      function (event) {
        var now = new Date().getTime();
        if (now - lastTouchEnd <= 300) {
          event.preventDefault();
        }
        lastTouchEnd = now;
      },
      false,
    );

    document.addEventListener(
      "touchmove",
      function (event) {
        if ((event as any).scale !== 1) {
          event.preventDefault();
        }
      },
      { passive: false },
    );
  }, []);
};
