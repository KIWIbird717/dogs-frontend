"use client";

import { FC, ReactNode, useMemo, useRef } from "react";
import EnergyIcon from "@/public/images/svg/boost/energy.svg";
import BatteryIcon from "@/public/images/svg/boost/battery.svg";
import EnergyLimitIcon from "@/public/images/svg/boost/energy-limit.svg";
import TapIcon from "@/public/images/svg/boost/tap.svg";
import RechargingIcon from "@/public/images/svg/boost/recharging.svg";
import ReloadIcon from "@/public/images/svg/boost/reload.svg";
import { BoostBowlItem } from "@/widgets/BoostBowlItem";
import { Typography } from "@/shared/ui/Typography/Typography";
import { UsersService } from "@/shared/lib/services/users/users";
import { UserApiTypes } from "@/shared/lib/services/users/types";
import { useAppDispatch, useAppSelector } from "@/shared/lib/redux-store/hooks";
import { UserSlice } from "@/shared/lib/redux-store/slices/user-slice/userSlice";
import { useModal } from "@/shared/hooks/useModal";
import { IBoost } from "@/shared/lib/redux-store/slices/modal-slice/type";

import BoostImg from "@/public/images/svg/modal/boosts/boost.svg";
import RechargingImg from "@/public/images/svg/modal/boosts/recharging.svg";
import FullTankImg from "@/public/images/svg/modal/boosts/full-tank.svg";
import MultiTapImg from "@/public/images/svg/modal/boosts/multi-tap.svg";
import EnergyLimitImg from "@/public/images/svg/modal/boosts/energy-limit.svg";
import TapBotImg from "@/public/images/svg/modal/boosts/tap-bot.svg";
import toast, { Toaster } from "react-hot-toast";
import { getTimeLeftUntil } from "@/shared/lib/utils/getTimeLeft";
import { useRouter } from "next/navigation";
import { useClicker } from "@/shared/hooks/useClicker/useClicker";
import { usePreventOnSwipeWindowClose } from "@/shared/hooks/usePreventSwipeClose";

interface IBoostBowlProps {}

export type BoostBowlItemType = {
  icon: ReactNode;
  title: string;
  description: string;
  onClick: () => void;
  disabled?: boolean;
};

export const BoostBowl: FC<IBoostBowlProps> = () => {
  // usePreventOnSwipeWindowClose(true);

  const user = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();
  const { onOpenModal } = useModal();
  const router = useRouter();
  const { boosts, maxBoost, onMaxBoost } = useClicker(true);

  const refBowlsFirst = useRef<HTMLDivElement>(null);
  const refBowlsSecond = useRef<HTMLDivElement>(null);

  const boostsInfo: IBoost[] = useMemo(
    () => [
      {
        icon: <BoostImg />,
        title: "Turbo Bowl",
        info: `Uses left ${user.turboBonusLeft}/3`,
        description: "Your tap gives you a lot more coins than you think.",
        buttonTitle: "Choose Free",
        key: "turbo",
        value: user.turboBonusLeft,
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

          toast.success(`Turbo active for ${getTimeLeftUntil(new Date(response.data.TURBO))}`);
          dispatch(UserSlice.updateUser({ turboBoostExpired: response.data.TURBO }));

          router.push("/main");
        },
      },
      {
        icon: <FullTankImg />,
        title: "FullTank",
        info: `${user.eneryTankLeft}/3 in day`,
        buttonTitle: "Choose Free",
        key: "full-tank",
        value: user.eneryTankLeft,
        boosts,
        onClick: async () => {
          if (maxBoost === boosts || user.eneryTankLeft === 0) return;
          onMaxBoost();

          if (user.eneryTankLeft) {
            dispatch(UserSlice.updateUser({ eneryTankLeft: user.eneryTankLeft - 1 }));
          }

          toast.success("Energy restored");
          await UsersService.boost(UserApiTypes.BoostName.FULL_TANK);

          router.push("/main");
        },
      },
      {
        icon: <MultiTapImg />,
        title: "Multitap",
        info: "1 tap 20 energy",
        buttonTitle: "Buy",
        price: 25000,
        onClick: async () => {
          toast.success(`Multitap activate`);
          await UsersService.boost(UserApiTypes.BoostName.MULTITAP);

          router.push("/main");
        },
      },
      {
        icon: <EnergyLimitImg />,
        title: "Energy Limit",
        info: "800 000 coin",
        buttonTitle: "Buy",
        price: 800_000,
        onClick: async () => {
          const response = await UsersService.boost(UserApiTypes.BoostName.ENERY_LIMIT);
          toast.success(`Energy limit updated to ${response.data.ENERY_LIMIT}`);

          router.push("/main");
        },
      },
      {
        icon: <RechargingImg />,
        title: "Recharging Speed",
        info: "5 energy",
        description: "Your tap gives you a lot more coins than you think.",
        price: 25000,
        buttonTitle: "Buy",
        onClick: async () => {
          toast.success(`Recharge speed updated`);
          await UsersService.boost(UserApiTypes.BoostName.RECHARGE_SPEED);

          router.push("/main");
        },
      },
      {
        icon: <TapBotImg />,
        title: "Tap Bot",
        info: "100 000 Coin in 4 hours",
        buttonTitle: "Buy",
        price: 100_000,
        onClick: async () => {
          const response = await UsersService.boost(UserApiTypes.BoostName.TAP_BOT);
          toast.success(`Tapbot active for ${getTimeLeftUntil(response.data.TAP_BOT)}`);

          router.push("/main");
        },
      },
    ],
    [boosts, dispatch, maxBoost, onMaxBoost, router, user.eneryTankLeft, user.turboBonusLeft],
  );

  const firstBowlItems: BoostBowlItemType[] = useMemo(
    () => [
      {
        icon: <EnergyIcon />,
        title: "Turbo",
        description: `${user.turboBonusLeft}/3 available`,
        disabled: !user.turboBonusLeft,
        onClick: async () => {
          if (!user.turboBonusLeft) return;
          onOpenModal("boosts", { boost: boostsInfo[0] });
        },
      },
      {
        icon: <BatteryIcon />,
        title: "Full Tank",
        description: `${user.eneryTankLeft}/3 in day`,
        disabled: maxBoost === boosts || user.eneryTankLeft === 0,
        onClick: () => {
          if (maxBoost === boosts || user.eneryTankLeft === 0) return;
          onOpenModal("boosts", { boost: boostsInfo[1] });
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
          onOpenModal("boosts", { boost: boostsInfo[2] });
        },
      },
      {
        icon: <EnergyLimitIcon />,
        title: "Energy Limit",
        description: "800 000 Coin",
        onClick: () => {
          onOpenModal("boosts", { boost: boostsInfo[3] });
        },
      },
      {
        icon: <RechargingIcon />,
        title: "Recharning Speed",
        description: "5 Energy",
        onClick: () => {
          onOpenModal("boosts", { boost: boostsInfo[4] });
        },
      },
      {
        icon: <ReloadIcon />,
        title: "Tap Bot",
        description: "100 000 Coin in 4 hours",
        onClick: () => {
          onOpenModal("boosts", { boost: boostsInfo[5] });
        },
      },
    ],
    [boostsInfo],
  );

  return (
    <div className={"z-[10] flex w-full flex-col gap-6"}>
      {/* <Toaster /> */}
      <div ref={refBowlsFirst} className={"flex w-full flex-col gap-2"}>
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

      <div ref={refBowlsSecond} className={"flex w-full flex-col gap-2"}>
        <Typography tag={"h3"} className={"text-white-900"}>
          Bowls
        </Typography>

        <div className={"flex w-full flex-col gap-2"}>
          {secondBowlItems.map((item, i) => {
            return <BoostBowlItem key={i} item={item} onClick={item.onClick} />;
          })}
        </div>
      </div>

      <div
        style={{
          height:
            window.innerHeight -
            (refBowlsFirst.current?.clientHeight || 0) -
            (refBowlsSecond.current?.clientHeight || 0) -
            142 + // на угад подбирал, лень думать уже, я сонный пипец
            1, // это чтобы скрол в 1 пиксель появлялся на странице
        }}
      />
    </div>
  );
};
