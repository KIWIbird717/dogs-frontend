"use client";

import { FC, useCallback, useEffect, useState } from "react";
import { Header } from "@/widgets/Header";
import { Board } from "@/widgets/Board";
import { Money } from "@/widgets/Money";
import { Clicker } from "@/widgets/Clicker";
import { EnergyBoost } from "@/widgets/EnergyBoost";
import { useClicker } from "@/shared/hooks/useClicker";

interface IMainForClickerProps {
}

export const MainForClicker: FC<IMainForClickerProps> = () => {
  const {
    onIncrementCoin,
    maxBoost,
    boosts,
    coins,
    onMaxBoost
  } = useClicker();

  return (
    <div className={"w-full h-[calc(100%-112px)] flex flex-col gap-4 px-4 z-[10]"}>
      <Header />

      <div className={"flex h-full flex-col justify-between gap-8"}>
        <div className={"w-full flex flex-col gap-8"}>
          <div className={"w-full flex flex-col gap-6"}>
            <Board />
            <Money coins={coins} />
          </div>

          <Clicker onIncrementCoin={onIncrementCoin} />
        </div>

        <EnergyBoost boosts={boosts}
                     maxBoost={maxBoost}
                     onMaxBoost={onMaxBoost}
        />
      </div>
    </div>
  );
};