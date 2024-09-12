import React, { useEffect } from "react";
import { useTelegram } from "./useTelegram";

export const useOpenWebappWindow = () => {
  const telegram = useTelegram();

  useEffect(() => {
    telegram?.expand();
  }, []);
};
