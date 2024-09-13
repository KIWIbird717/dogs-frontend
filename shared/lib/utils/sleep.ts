/**
 * Задержка выполнения асинхронного кода с помощью промиса
 * @argument timeout - time in ms
 */
export const sleep = (timeout: number) => {
  return new Promise((resolve) => setTimeout(() => resolve(null), timeout));
};
