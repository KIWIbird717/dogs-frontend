import { useState } from "react";
import { Logger } from "../lib/utils/logger/Logger";

export function useLocalStorage<T extends Record<string, any> | null | number>(
  key: string,
  initialValue: T,
): [T, (value: T) => void] {
  const logger = new Logger("useLocalStorage");
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      logger.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}
