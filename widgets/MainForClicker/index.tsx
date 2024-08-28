"use client";

import { FC, useEffect, useMemo } from "react";
import { Header } from "@/widgets/Header";
import { Board } from "@/widgets/Board";
import { StatsInfo } from "../StatsInfo";
import { Clicker } from "@/widgets/Clicker";
import { EnergyBoost } from "@/widgets/EnergyBoost";
import { useClicker } from "@/shared/hooks/useClicker";
import { Logger } from "@/shared/lib/utils/logger/Logger";
import { GuildsService } from "@/shared/lib/services/guilds/guilds";
import { useUser } from "@/shared/hooks/useUser";
import { useRouter } from "next/navigation";

interface IMainForClickerProps {}

export const MainForClicker: FC<IMainForClickerProps> = () => {
  const { push } = useRouter();

  const logger = new Logger("MainPage");
  const { clickEffects, handleClick, maxBoost, boosts, earned, onMaxBoost } = useClicker(true);
  const { user, onChangeGuildName } = useUser();
  const { guild } = user;

  useEffect(() => {
    if (guild) {
      (async () => {
        try {
          const { data } = await GuildsService.getGuild(guild!);
          onChangeGuildName(data.name);
        } catch (error) {
          logger.error(error);
        } finally {
        }
      })();
    }
  }, [guild]);

  const currentBalance = useMemo(() => user.balance + earned, [earned, user.balance]);

  return (
    <div className={"z-[10] flex h-[calc(100%-112px)] w-full flex-col gap-4 px-4"}>
      <Header />

      {/*<Button onClick={() => push("/onboarding")}>*/}
      {/*  sss*/}
      {/*</Button>*/}

      <div className={"flex h-full flex-col justify-between gap-8"}>
        <div className={"flex w-full flex-col gap-8"}>
          <div className={"flex w-full flex-col gap-6"}>
            <Board />
            <StatsInfo value={currentBalance} isIcon />
          </div>

          <Clicker handleClick={handleClick} clickEffects={clickEffects} level={user.level} />
        </div>

        <EnergyBoost boosts={boosts} maxBoost={maxBoost} onMaxBoost={onMaxBoost} />
      </div>
    </div>
  );
};
