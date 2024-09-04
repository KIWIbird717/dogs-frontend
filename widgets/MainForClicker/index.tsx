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
import { AnimatePresence } from "framer-motion";
import { Typography } from "@/shared/ui/Typography/Typography";
import dynamic from "next/dynamic";

const MotionDiv = dynamic(() => import("framer-motion").then((mod) => mod.motion.div));

interface IMainForClickerProps {}

export const MainForClicker: FC<IMainForClickerProps> = () => {
  const logger = new Logger("MainPage");
  const { clickEffects, handleClick, tabValue, maxBoost, boosts, earned, onMaxBoost } =
    useClicker(true);
  const { user, onChangeGuildName } = useUser();
  const { guild, level } = user;

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

      <div className={"flex h-full flex-col justify-between gap-8"}>
        <div className={"flex w-full flex-col gap-8"}>
          <div className={"flex w-full flex-col gap-6"}>
            <Board />
            <StatsInfo value={currentBalance} isIcon />
          </div>

          <div className="relative h-full w-full">
            <AnimatePresence>
              {clickEffects.map((effect) => (
                <MotionDiv
                  key={effect.id}
                  initial={{ opacity: 1, y: 0 }}
                  animate={{ opacity: 0, y: -200 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                  className="pointer-events-none absolute top-0 z-[100] rounded-xl border-[6px] border-black-400 bg-white-100 text-center text-[28px] font-normal text-white backdrop-blur-xl"
                  style={{
                    left: typeof effect.x === "string" ? effect.x : effect.x + 30,
                    top: effect.y,
                  }}
                >
                  <Typography tag={"h1"} className={"text-[28px] font-normal leading-8"}>
                    +{tabValue}
                  </Typography>
                </MotionDiv>
              ))}
            </AnimatePresence>

            <Clicker handleClick={handleClick} level={level} tabValue={tabValue} />
          </div>
        </div>

        <EnergyBoost boosts={boosts} maxBoost={maxBoost} onMaxBoost={onMaxBoost} />
      </div>
    </div>
  );
};
