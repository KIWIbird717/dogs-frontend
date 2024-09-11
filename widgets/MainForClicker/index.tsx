"use client";

import { FC } from "react";
import { Header } from "@/widgets/Header";
import { MainClicker } from "./shared/MainClicker";

interface IMainForClickerProps {}

export const MainForClicker: FC<IMainForClickerProps> = () => {
  return (
    <div className={"z-[10] flex h-[calc(100svh-75px)] w-full flex-col gap-4 px-4"}>
      <Header />
      <MainClicker />
    </div>
  );
};
