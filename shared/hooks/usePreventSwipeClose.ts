"use client";

import { useEffect, useState } from "react";

/**
 * Предотвращает закрытие окна при свайпе вниз на статичных экранах.
 * При этом скролл полностью отключается на странице.
 *
 * Работает только в окне мобильного браузера.
 *
 * Возвращает функцию для включения/выключения предотвращения закрытия окна при свайпе.
 *
 * @example
 * ```tsx
 * import { usePreventOnSwipeWindowClose } from "@/utils/hooks/usePreventSwipeClose";
 *
 * export default function Page() {
 *  usePreventOnSwipeWindowClose(true);
 *  return <div>Page</div>;
 * };
 * ```
 */
export const usePreventOnSwipeWindowClose = (firstState: boolean) => {
  const [isTurnOn, setIsTurnOn] = useState(firstState);

  useEffect(() => {
    const preventScroll = (event: TouchEvent) => {
      if (!isTurnOn) return;
      event.preventDefault();
    };
    window.addEventListener("touchmove", preventScroll, { passive: false });
    return () => {
      window.removeEventListener("touchmove", preventScroll);
    };
  }, [isTurnOn, firstState]);

  return setIsTurnOn;
};
