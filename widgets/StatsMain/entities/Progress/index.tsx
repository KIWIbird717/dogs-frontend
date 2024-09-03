import { FC, ReactNode } from "react";
import { ProgressBar } from "@/shared/ui/ProgressBar";
import { Typography } from "@/shared/ui/Typography/Typography";
import { StatsApiTypes } from "@/shared/lib/services/stats/types";
import { AnimatePresence } from "framer-motion";

import LeaguesStatusBar = StatsApiTypes.LeaguesStatusBar;
import dynamic from "next/dynamic";

const MotionDiv = dynamic(() => import("framer-motion").then((mod) => mod.motion.div));

interface IProgressProps {
  currentRank: string;
  serialNumber: number;
  statusBar: LeaguesStatusBar | null | undefined;
  isMyPlaceVisible?: boolean;
  isProgressVisible?: boolean;
}

export const Progress: FC<IProgressProps> = ({
  currentRank,
  serialNumber,
  statusBar,
  ...props
}) => {
  const currentBalance = new Intl.NumberFormat("en", {
    maximumFractionDigits: 1,
    notation: "compact",
  }).format(statusBar?.currentBalance || 0);

  const balanceTo = new Intl.NumberFormat("en", {
    maximumFractionDigits: 1,
    notation: "compact",
  }).format(statusBar?.balanceTo || 0);

  return (
    <div className={"flex h-[75px] w-full flex-col items-center gap-[11px]"}>
      <div className={"flex w-full flex-col justify-center"}>
        <Typography tag={"h1"} className={"text-center text-white-900"}>
          <MyPlace myPlace={serialNumber} isVisible={props.isMyPlaceVisible} /> {currentRank}
        </Typography>

        {props.isProgressVisible && (
          <MotionDiv initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Typography
              tag={"p"}
              className={"text-center text-[17px] font-normal leading-6 text-white-900"}
            >
              {currentBalance}/{balanceTo}
            </Typography>
          </MotionDiv>
        )}
      </div>

      <AnimatePresence>
        {props.isProgressVisible && (
          <MotionDiv initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ProgressBar
              page={"stats"}
              balanceTo={statusBar?.balanceTo!}
              currentBalance={statusBar?.currentBalance!}
            />
          </MotionDiv>
        )}
      </AnimatePresence>
    </div>
  );
};

type MyPlaceProps = {
  isVisible?: boolean;
  myPlace: number | string | ReactNode;
};
const MyPlace: FC<MyPlaceProps> = (props) => {
  if (props.isVisible === false) {
    return null;
  }

  return <>#{props.myPlace}</>;
};
