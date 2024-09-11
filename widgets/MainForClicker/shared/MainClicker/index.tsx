"use client";

import { FC, useMemo } from "react";
import { Board } from "@/widgets/Board";
import { StatsInfo } from "@/widgets/StatsInfo";
import { Clicker } from "../ui/Clicker";
import { EnergyBoost } from "@/widgets/EnergyBoost";
import { ClickEffect, useClicker } from "@/shared/hooks/useClicker/useClicker";
import { AnimatePresence } from "framer-motion";
import { Typography } from "@/shared/ui/Typography/Typography";
import { useAppSelector } from "@/shared/lib/redux-store/hooks";
import { Toaster } from "react-hot-toast";
import dynamic from "next/dynamic";
import { BreedPack } from "../BreedPack";
import styles from "./styles.module.scss";
import { cn } from "@/shared/lib/utils/cn";

const MotionDiv = dynamic(() => import("framer-motion").then((mod) => mod.motion.div));

export const MainClicker = () => {
  const { clickEffects, handleClick, tabValue, maxBoost, boosts, earned, onMaxBoost } =
    useClicker(true);

  const balance = useAppSelector((store) => store.user.balance);
  const level = useAppSelector((store) => store.user.level);

  const currentBalance = useMemo(() => balance + earned, [earned, balance]);

  return (
    <div className={"relative flex h-screen flex-col justify-between gap-8"}>
      <Toaster />

      <div className="flex w-full flex-col gap-8">
        <div className={cn(styles.boardStatsWrapper, "flex w-full flex-col")}>
          <Board />
          <StatsInfo value={currentBalance} isIcon />
        </div>

        <div className="relative h-full w-full">
          {/* <BreedPack /> */}
          <CoinEffect tabValue={tabValue} clickEffects={clickEffects} />
          <Clicker handleClick={handleClick} level={level} />
        </div>
      </div>

      <EnergyBoost
        className="absolute bottom-[60px]"
        boosts={boosts}
        maxBoost={maxBoost}
        onMaxBoost={onMaxBoost}
      />
    </div>
  );
};

type CoinEffectProps = {
  clickEffects: ReturnType<typeof useClicker>["clickEffects"];
  tabValue: ReturnType<typeof useClicker>["tabValue"];
};
const CoinEffect: FC<CoinEffectProps> = (props) => {
  return (
    <AnimatePresence>
      {props.clickEffects.map((effect) => (
        <MotionDiv
          key={effect.id}
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 0, y: -200 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="pointer-events-none absolute top-0 z-[100] rounded-xl border-[6px] border-black-400 bg-white-100 text-center text-[28px] font-normal text-white backdrop-blur-xl"
          style={{
            left: typeof effect.x === "string" ? effect.x : effect.x + 47,
            top: typeof effect.y === "string" ? effect.y : effect.y - 30,
          }}
        >
          <Typography tag={"h1"} className={"text-[28px] font-normal leading-8"}>
            +{props.tabValue}
          </Typography>
        </MotionDiv>
      ))}
    </AnimatePresence>
  );
};
