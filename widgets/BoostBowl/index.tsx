"use client"

import { FC, ReactNode, useMemo } from "react";
import EnergyIcon from "@/public/images/svg/boost/energy.svg";
import BatteryIcon from "@/public/images/svg/boost/battery.svg";
import TapIcon from "@/public/images/svg/boost/tap.svg";
import EnergyBlueIcon from "@/public/images/svg/boost/energy-blue.svg";
import RechargingIcon from "@/public/images/svg/boost/recharging.svg";
import ReloadIcon from "@/public/images/svg/boost/reload.svg";
import { BoostBowlItem } from "@/widgets/BoostBowlItem";
import { Typography } from "@/shared/ui/Typography/Typography";
import { useClicker } from "@/shared/hooks/useClicker";

interface IBoostBowlProps {
  onMaxBoost: () => void
}


export type BoostBowlItemType = {
  icon: ReactNode
  title: string
  description: string
  onClick: () => void
}


export const BoostBowl: FC<IBoostBowlProps> = (
  {
    onMaxBoost
  }
) => {

  const firstBowlItems: BoostBowlItemType[] = useMemo(() => [
    {
      icon: <EnergyIcon />,
      title: "Turbo",
      description: "3/3 available",
      onClick: onMaxBoost
    },
    {
      icon: <BatteryIcon />,
      title: "Full Tank",
      description: "3/3 in day",
      onClick: () => {
      },
    },
  ], [onMaxBoost]);

  const secondBowlItems: BoostBowlItemType[] = useMemo(() => [
    {
      icon: <TapIcon />,
      title: "Multitap",
      description: "1 Tap 20 Energy",
      onClick: () => {
      },
    },
    {
      icon: <BatteryIcon />,
      title: "Energy Limit",
      description: "800 000 Bone",
      onClick: () => {
      },
    }, {
      icon: <RechargingIcon />,
      title: "Recharning Speed",
      description: "5 Energy",
      onClick: () => {
      },
    }, {
      icon: <ReloadIcon />,
      title: "Tap Bot",
      description: "100 000 Bone in 4 hours",
      onClick: () => {
      },
    },
  ], []);

  return (
    <div className={"w-full flex flex-col gap-6 z-[10]"}>
      <div className={"w-full flex flex-col gap-2"}>
        <Typography tag={"h3"}
                    className={"text-white-900"}
        >
          Free Daily Bowl
        </Typography>

        <div className={"w-full flex flex-col gap-2"}>

          {firstBowlItems.map((item, i) => {
            return <BoostBowlItem key={i}
                                  item={item}
                                  disabled={i === 1}
                                  onClick={item.onClick}

            />;
          })}
        </div>
      </div>

      <div className={"w-full flex flex-col gap-2"}>
        <Typography tag={"h3"}
                    className={"text-white-900"}
        >
          Bowls
        </Typography>

        <div className={"w-full flex flex-col gap-2"}>

          {secondBowlItems.map((item, i) => {
            return <BoostBowlItem key={i}
                                  item={item}
                                  onClick={item.onClick}

            />;
          })}
        </div>
      </div>
    </div>
  );
};