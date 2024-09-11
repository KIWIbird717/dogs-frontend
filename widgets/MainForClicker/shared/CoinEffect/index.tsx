"use client";

import { FC } from "react";
import { useClicker } from "@/shared/hooks/useClicker/useClicker";
import { AnimatePresence } from "framer-motion";
import { Typography } from "@/shared/ui/Typography/Typography";
import dynamic from "next/dynamic";

const MotionDiv = dynamic(() => import("framer-motion").then((mod) => mod.motion.div));

type CoinEffectProps = {
  clickEffects: ReturnType<typeof useClicker>["clickEffects"];
  tabValue: ReturnType<typeof useClicker>["tabValue"];
};
export const CoinEffect: FC<CoinEffectProps> = (props) => {
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
