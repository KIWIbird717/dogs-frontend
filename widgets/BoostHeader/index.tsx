"use client";

import { FC } from "react";

import { Block } from "@/widgets/Block";
import EnergyIcon from "@/public/images/svg/energy.svg";
import RacketIcon from "@/public/images/svg/boost/racket.svg";
import { Typography } from "@/shared/ui/Typography/Typography";

interface IBoostHeaderProps {
  boosts: number
  maxBoost: number
}

export const BoostHeader: FC<IBoostHeaderProps> = (
  {
    boosts,
    maxBoost
  }
) => {
  return (
    <div className={"w-full flex justify-between z-[10]"}>
      <div className={"flex items-center gap-2"}>
        <RacketIcon />

        <Typography tag={"h2"}
                    className={"text-white-900"}
        >
          Boost
        </Typography>
      </div>

      <Block icon={<EnergyIcon />}
             title={`${boosts}/${maxBoost}`}
      />
    </div>
  );
};