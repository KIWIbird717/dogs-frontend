"use client";

import { useEffect } from "react";
import { isCancelError } from "../lib/utils/isCancelError";

/**
 * @description
 * Этот hook упрощает работу с запросами к api сервисам.
 *
 * Работает как `useEffect`. В callback функцию передан доп. параметр `signal`,
 * который предотвращает лишние запросы к api. Работает также как signal от
 * AbortController. Желательно передавать `signal` в параметры запроса для
 * лучшей оптимизации работы вебприложения и вебсервера
 *
 * Также в тело callback может стразу принимать ассинхронные функции.
 *
 * В массив зависимостей `deps` принимаются любые значения, работает также
 * как и в `useEffect`. По дефолту принимает пустой массив [] во избежании
 * ошибки с непрерывным рендером.
 *
 * @example
 * useRequest(async (signal) => {
 *  try {
 *    //handle api request here
 *    await apiWebserver.get('/some/route', { signal })
 *  } catch (error) {
 *    // handle error here
 *  }
 * }, [])
 */
export default function useRequest<T>(
  callback: (signal: AbortSignal) => void | Promise<void>,
  deps: T[],
) {
  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController as AbortController;

    (async () => {
      try {
        callback(signal);
      } catch (error) {
        if (isCancelError(error)) return;
        throw error;
      }
    })();

    return () => {
      abortController.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps]);
}
