import { useEffect, useState } from "react";

/**
 * Предотвращает закрытие окна при свайпе вниз на статичных экранах.
 * При этом скролл полностью отключается на странице. Поэтому использовать
 * только на статичных экранах, где нет необходимости в скроле.
 *
 * Хук может динамически меняться, тоесть в процессе работы кода можно то
 * включать блокировку скрола, то выключать.
 *
 * Работает только в окне мобильного браузера.
 *
 * @return
 * - Возвращает массив, который подражает useState. Первый элемент
 * массива `setIsTurnOn` - функция переключения работы хука. Если вызвать функцию
 * и передать false, то хук прекратит блокировать скрол, если передать true,
 * блокировка скрола возобновится.
 *
 * - Второй элемент массива - текущее состояние хука: true - блокировка скрола
 * активна, false - блокировка не активна
 *
 * @param {boolean} firstState - принимает дефолтное значение активности
 * или блокировки скрола при инициализации. true - при инициализации хука
 * скролл блокируется, false - не блокируется
 *
 * @example
 * ```tsx
 * import { usePreventScroll } from "@/hooks/usePreventScroll";
 *
 * export default function Page() {
 *  usePreventScroll(true);
 *  return <div>Page</div>;
 * };
 * ```
 *
 * @example
 * ```tsx
 * import { usePreventScroll } from "@/hooks/usePreventScroll";
 *
 * export default function Page() {
 *  const [setScrollBlocking, isBlockingScroll] = usePreventScroll(true);
 *
 *  return (
 *    <button
 *      onClick={() => setScrollBlocking((state) => !state)}
 *    >
 *      {isBlockingScroll ? "Отключить" : "Включить"} блокировку скрола
 *    </button>
 *  )
 * }
 * ```
 */
export const usePreventScroll = (firstState: boolean) => {
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

  return [setIsTurnOn, isTurnOn];
};
