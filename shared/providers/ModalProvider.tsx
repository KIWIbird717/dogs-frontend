"use client";

import { FC, useEffect, useState } from "react";
import { ModalSettings } from "@/widgets/ModalSettings/ModalSettings";
import { ModalEditAge } from "@/widgets/ModalEditAge/ModalEditAge";
import { ModalEarn } from "@/widgets/ModalEarn";
import { ModalBoosts } from "@/widgets/ModalBoosts";

interface IModalProviderProps {}

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
      <ModalEditAge />
      <ModalEarn />
      <ModalBoosts />
    </>
  );
};
