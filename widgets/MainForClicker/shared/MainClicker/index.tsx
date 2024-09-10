"use client";

import { useMemo } from "react";
import { Board } from "@/widgets/Board";
import { StatsInfo } from "@/widgets/StatsInfo";
import { Clicker } from "../ui/Clicker";
import { EnergyBoost } from "@/widgets/EnergyBoost";
import { useClicker } from "@/shared/hooks/useClicker/useClicker";
import { AnimatePresence } from "framer-motion";
import { Typography } from "@/shared/ui/Typography/Typography";
import { useAppSelector } from "@/shared/lib/redux-store/hooks";
import { Toaster } from "react-hot-toast";
import dynamic from "next/dynamic";

const MotionDiv = dynamic(() => import("framer-motion").then((mod) => mod.motion.div));

export const MainClicker = () => {
  const { clickEffects, handleClick, tabValue, maxBoost, boosts, earned, onMaxBoost } =
    useClicker(true);

  const balance = useAppSelector((store) => store.user.balance);
  const level = useAppSelector((store) => store.user.level);

  const currentBalance = useMemo(() => balance + earned, [earned, balance]);

  return (
    <div className={"flex h-full flex-col justify-between gap-8"}>
      <div className={"flex w-full flex-col gap-8"}>
        <div className={"flex w-full flex-col gap-6"}>
          <Board />
          <StatsInfo value={currentBalance} isIcon />
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
                  left: typeof effect.x === "string" ? effect.x : effect.x + 47,
                  top: typeof effect.y === "string" ? effect.y : effect.y - 30,
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
