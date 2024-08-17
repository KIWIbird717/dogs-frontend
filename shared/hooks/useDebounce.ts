import { useCallback } from "react";
import debounce from "lodash.debounce";

export const useDebounce = (setValue: (value: string) => void, delay: number) =>
  useCallback(
    debounce((str: string) => {
      setValue(str);
    }, delay),
    [],
  );
