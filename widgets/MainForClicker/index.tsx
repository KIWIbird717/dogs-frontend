"use client";

import { FC, useCallback, useEffect, useState } from "react";
import { Header } from "@/widgets/Header";
import { Board } from "@/widgets/Board";
import { StatsInfo } from "../StatsInfo";
import { Clicker } from "@/widgets/Clicker";
import { EnergyBoost } from "@/widgets/EnergyBoost";
import { useClicker } from "@/shared/hooks/useClicker";
import { UsersService } from "@/shared/lib/services/users/users";

interface IMainForClickerProps {}

export const MainForClicker: FC<IMainForClickerProps> = () => {
  const { onIncrementCoin, maxBoost, boosts, coins, onMaxBoost } = useClicker(true);

  useEffect(() => {
    (async () => {
      const { data } = UsersService.getMe()
      console.log({data});
    })()
  }, []);

  return (
    <div className={"z-[10] flex h-[calc(100%-112px)] w-full flex-col gap-4 px-4"}>
      <Header />

      <div className={"flex h-full flex-col justify-between gap-8"}>
        <div className={"flex w-full flex-col gap-8"}>
          <div className={"flex w-full flex-col gap-6"}>
            <Board />
            <StatsInfo value={coins} isIcon />
          </div>

          <Clicker onIncrementCoin={onIncrementCoin} />
        </div>

        <EnergyBoost boosts={boosts} maxBoost={maxBoost} onMaxBoost={onMaxBoost} />
      </div>
    </div>
  );
};
