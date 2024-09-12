import { useCallback, useEffect, useState } from "react";
import { Logger } from "../lib/utils/logger/Logger";

export function useLocalStorage<T extends Record<string, any> | null | number | boolean>(
  key: string,
  initialValue: T,
): [T, (value: T) => void] {
  const handleStorageValue = useCallback(() => {
    const logger = new Logger("useLocalStorage");

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      logger.error(error);
      return initialValue;
    }
  }, [initialValue, key]);

  const [storedValue, setStoredValue] = useState<T>(handleStorageValue());

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
      window.dispatchEvent(new Event("localStorage"));
    } catch (error) {
      console.error(error);
    }
  };

  // handle localStorage value update
  useEffect(() => {
    window.addEventListener("localStorage", () => {
      setStoredValue(handleStorageValue());
    });

    return () => {
      window.removeEventListener("localStorage", () => {
        setStoredValue(handleStorageValue());
      });
    };
  }, [handleStorageValue]);

  return [storedValue, setValue];
}
