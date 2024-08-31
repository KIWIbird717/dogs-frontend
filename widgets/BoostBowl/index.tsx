"use client";

import { FC, ReactNode, useMemo } from "react";
import EnergyIcon from "@/public/images/svg/boost/energy.svg";
import BatteryIcon from "@/public/images/svg/boost/battery.svg";
import TapIcon from "@/public/images/svg/boost/tap.svg";
import RechargingIcon from "@/public/images/svg/boost/recharging.svg";
import ReloadIcon from "@/public/images/svg/boost/reload.svg";
import { BoostBowlItem } from "@/widgets/BoostBowlItem";
import { Typography } from "@/shared/ui/Typography/Typography";
import { UsersService } from "@/shared/lib/services/users/users";
import { UserApiTypes } from "@/shared/lib/services/users/types";
import { useAppDispatch, useAppSelector } from "@/shared/lib/redux-store/hooks";
import { UserSlice } from "@/shared/lib/redux-store/slices/user-slice/userSlice";

interface IBoostBowlProps {
  onMaxBoost: () => void;
  boosts: number;
  maxBoost: number;
}

export type BoostBowlItemType = {
  icon: ReactNode;
  title: string;
  description: string;
  onClick: () => void;
  disabled?: boolean;
};

export const BoostBowl: FC<IBoostBowlProps> = ({ onMaxBoost, maxBoost, boosts }) => {
  const user = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();

  const firstBowlItems: BoostBowlItemType[] = useMemo(
    () => [
      {
        icon: <EnergyIcon />,
        title: "Turbo",
        description: `${user.turboBonusLeft}/3 available`,
        onClick: async () => {
          if (!user.turboBonusLeft) return;
          dispatch(UserSlice.updateUser({ turboBonusLeft: user.turboBonusLeft - 1 }));
          // temp value
          dispatch(
            UserSlice.updateUser({
              turboBoostExpired: new Date(new Date().getTime() + 0.5 * 60 * 60 * 1000),
            }),
          );
          const response = await UsersService.boost(UserApiTypes.BoostName.TURBO);

          dispatch(UserSlice.updateUser({ turboBoostExpired: response.data.TURBO }));
        },
      },
      {
        icon: <BatteryIcon />,
        title: "Full Tank",
        description: "3/3 in day",
        disabled: maxBoost === boosts,
        onClick: () => {
          if (maxBoost === boosts) return;
          onMaxBoost();
          UsersService.boost(UserApiTypes.BoostName.FULL_TANK);
        },
      },
    ],
    [boosts, maxBoost, onMaxBoost, user.turboBonusLeft],
  );

  const secondBowlItems: BoostBowlItemType[] = useMemo(
    () => [
      {
        icon: <TapIcon />,
        title: "Multitap",
        description: "1 Tap 20 Energy",
        onClick: () => {
          UsersService.boost(UserApiTypes.BoostName.MULTITAP);
        },
      },
      {
        icon: <BatteryIcon />,
        title: "Energy Limit",
        description: "800 000 Bone",
        onClick: () => {
          UsersService.boost(UserApiTypes.BoostName.ENERY_LIMIT);
        },
      },
      {
        icon: <RechargingIcon />,
        title: "Recharning Speed",
        description: "5 Energy",
        onClick: () => {
          UsersService.boost(UserApiTypes.BoostName.RECHARGE_SPEED);
        },
      },
      {
        icon: <ReloadIcon />,
        title: "Tap Bot",
        description: "100 000 Bone in 4 hours",
        onClick: () => {
          UsersService.boost(UserApiTypes.BoostName.TAP_BOT);
        },
      },
    ],
    [],
  );

  return (
    <div className={"z-[10] flex w-full flex-col gap-6"}>
      <div className={"flex w-full flex-col gap-2"}>
        <Typography tag={"h3"} className={"text-white-900"}>
          Free Daily Bowl
        </Typography>

        <div className={"flex w-full flex-col gap-2"}>
          {firstBowlItems.map((item, i) => {
            return (
              <BoostBowlItem
                key={i}
                item={item}
                disabled={item.disabled || false}
                onClick={item.onClick}
              />
            );
          })}
        </div>
      </div>

      <div className={"flex w-full flex-col gap-2"}>
        <Typography tag={"h3"} className={"text-white-900"}>
          Bowls
        </Typography>

        <div className={"flex w-full flex-col gap-2"}>
          {secondBowlItems.map((item, i) => {
            return <BoostBowlItem key={i} item={item} onClick={item.onClick} />;
          })}
        </div>
      </div>
    </div>
  );
};
