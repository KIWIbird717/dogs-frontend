"use client";

import { FC, TouchEventHandler, useEffect, useMemo } from "react";
import { Header } from "@/widgets/Header";
import { Board } from "@/widgets/Board";
import { StatsInfo } from "../StatsInfo";
import { Clicker } from "./shared/ui/Clicker";
import { EnergyBoost } from "@/widgets/EnergyBoost";
import { useClicker } from "@/shared/hooks/useClicker/useClicker";
import { AnimatePresence } from "framer-motion";
import { Typography } from "@/shared/ui/Typography/Typography";
import dynamic from "next/dynamic";
import { useAppSelector } from "@/shared/lib/redux-store/hooks";
import { Toaster } from "react-hot-toast";

const MotionDiv = dynamic(() => import("framer-motion").then((mod) => mod.motion.div));

interface IMainForClickerProps {}

export const MainForClicker: FC<IMainForClickerProps> = () => {
  return (
    <div className={"z-[10] flex h-[calc(100%-112px)] w-full flex-col gap-4 px-4"}>
      <Header />
      <MainClicker />
    </div>
  );
};

const MainClicker = () => {
  const { clickEffects, handleClick, tabValue, maxBoost, boosts, earned, onMaxBoost } =
    useClicker(true);
  // const logger = new Logger("MainClicker");

  // const clickEffects: any[] = [];
  // const tabValue = 1;
  // const maxBoost = 500;
  // const boosts = 500;
  // const earned = 5;
  // const onMaxBoost = () => {};

  // /**
  //  * Clicker
  //  */
  // const dispatch = useAppDispatch();
  // const tapEnergyCoast = useAppSelector((store) => store.clicker.tapEnergyCoast);
  // const maxEnergyLimit = useAppSelector((store) => store.user.energyLimit);
  // const energy = useAppSelector((store) => store.clicker.energy);
  const balance = useAppSelector((store) => store.user.balance);
  const level = useAppSelector((store) => store.user.level);

  // const handleClick: TouchEventHandler<HTMLButtonElement> = (event) => {
  //   if (energy < tapEnergyCoast) return;
  //   dispatch(UserSlice.addCoins(tapEnergyCoast));
  //   dispatch(ClickerSlice.takeEnergy());
  // };

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (energy >= maxEnergyLimit) return;
  //     dispatch(ClickerSlice.recoverEnergy());
  //   }, 1000);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [energy, logger, maxEnergyLimit]);

  return (
    <div className={"flex h-full flex-col justify-between gap-8"}>
      <div className={"flex w-full flex-col gap-8"}>
        <div className={"flex w-full flex-col gap-6"}>
          <Board />
          <StatsInfo value={balance} isIcon />
        </div>

        <Toaster />

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
                  left: typeof effect.x === "string" ? effect.x : effect.x + 23,
                  top: typeof effect.y === "string" ? effect.y : effect.y - 23,
                }}
              >
                <Typography tag={"h1"} className={"text-[28px] font-normal leading-8"}>
                  +{tabValue}
                </Typography>
              </MotionDiv>
            ))}
          </AnimatePresence>

          <Clicker handleClick={handleClick} level={level} />
        </div>
      </div>

      <EnergyBoost boosts={boosts} maxBoost={maxBoost} onMaxBoost={onMaxBoost} />
    </div>
  );
};
