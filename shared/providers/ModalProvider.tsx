"use client";

import { FC, useEffect, useState } from "react";
import { ModalSettings } from "@/widgets/ModalSettings/ModalSettings";

interface IModalProviderProps {
}

export const ModalProvider: FC<IModalProviderProps> = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <ModalSettings />
    </>
  );
};
