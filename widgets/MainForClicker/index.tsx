"use client";

import { FC, useCallback, useEffect, useState } from "react";
import { Header } from "@/widgets/Header";
import { Board } from "@/widgets/Board";
import { StatsInfo } from "../StatsInfo";
import { Clicker } from "@/widgets/Clicker";
import { EnergyBoost } from "@/widgets/EnergyBoost";
import { useClicker } from "@/shared/hooks/useClicker";
import { UsersService } from "@/shared/lib/services/users/users";
import { Logger } from "@/shared/lib/utils/logger/Logger";
import { GuildsService } from "@/shared/lib/services/guilds/guilds";
import { useUser } from "@/shared/hooks/useUser";

interface IMainForClickerProps {
}

export const MainForClicker: FC<IMainForClickerProps> = () => {
  const logger = new Logger("MainPage");
  const { onIncrementCoin, maxBoost, boosts, coins, onMaxBoost } = useClicker(true);
  const { user, onChangeGuildName } = useUser();
  const { guild } = user;

  useEffect(() => {
    if (guild) {
      (async () => {
        try {
          const {data} = await GuildsService.getGuild(guild!);
          onChangeGuildName(data.name)
        } catch (error) {
          logger.error(error);
        } finally {

        }
      })();
    }
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
