"use client";

import { ReactNode, useMemo } from "react";
import EnergyIcon from "@/public/images/svg/boost/energy.svg";
import BatteryIcon from "@/public/images/svg/boost/battery.svg";
import EnergyLimitIcon from "@/public/images/svg/boost/energy-limit.svg";
import TapIcon from "@/public/images/svg/boost/tap.svg";
import RechargingIcon from "@/public/images/svg/boost/recharging.svg";
import ReloadIcon from "@/public/images/svg/boost/reload.svg";
import { useAppDispatch, useAppSelector } from "@/shared/lib/redux-store/hooks";
import { IBoost } from "@/shared/lib/redux-store/slices/modal-slice/type";
import BoostImg from "@/public/images/svg/modal/boosts/boost.svg";
import RechargingImg from "@/public/images/svg/modal/boosts/recharging.svg";
import FullTankImg from "@/public/images/svg/modal/boosts/full-tank.svg";
import MultiTapImg from "@/public/images/svg/modal/boosts/multi-tap.svg";
import EnergyLimitImg from "@/public/images/svg/modal/boosts/energy-limit.svg";
import TapBotImg from "@/public/images/svg/modal/boosts/tap-bot.svg";
import { useRouter } from "next/navigation";
import { BoostsService } from "../func/boosts-service";
import { formatNumber } from "@/shared/lib/utils/formatNumber";
import { useClicker } from "@/shared/hooks/useClicker/useClicker";
import { useModal } from "@/shared/hooks/useModal";

export type BoostBowlItemType = {
  icon: ReactNode;
  title: string;
  description: string;
  onClick: () => void;
  disabled?: boolean;
};

export const useBoostsInfo = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((store) => store.user);
  const router = useRouter();
  const { onOpenModal } = useModal();
  const { boosts, energyLimit, onMaxBoost } = useClicker(true);

  const boostsInfo: IBoost[] = useMemo(
    () => [
      {
        icon: <BoostImg />,
        title: "Turbo Bowl",
        info: `Uses left ${user.boosts.turbo.turboLeft}/3`,
        description: "Your tap gives you a lot more coins than you think.",
        buttonTitle: "Choose Free",
        key: "turbo",
        value: user.boosts.turbo.turboLeft,
        onClick: () => {
          BoostsService.useTurbo(dispatch, () => {
            router.push("/main");
          });
        },
      },
      {
        icon: <FullTankImg />,
        title: "FullTank",
        info: `${user.boosts.fullTank.fullTankLeft}/3 in day`,
        buttonTitle: "Choose Free",
        key: "full-tank",
        value: user.boosts.fullTank.fullTankLeft,
        boosts,
        onClick: () => {
          BoostsService.useFullTank(dispatch, () => {
            router.push("/main");
          });
        },
      },
      {
        icon: <MultiTapImg />,
        title: "Multitap",
        info: "1 tap 20 energy",
        buttonTitle: "Buy",
        price: user.boosts.multitap.upgradePrice,
        onClick: () => {
          BoostsService.useMultitap(dispatch, () => {
            router.push("/main");
          });
        },
      },
      {
        icon: <EnergyLimitImg />,
        title: "Energy Limit",
        info: `${formatNumber(user.boosts.energyLimit.upgradePrice)} coin`,
        buttonTitle: "Buy",
        price: user.boosts.energyLimit.upgradePrice,
        onClick: () => {
          BoostsService.useEnergyLimit(dispatch, () => {
            router.push("/main");
          });
        },
      },
      {
        icon: <RechargingImg />,
        title: "Recharging Speed",
        info: `${user.boosts.rechargingSpeed.energyRechargeMultiplication} energy`,
        description: "Your tap gives you a lot more coins than you think.",
        price: user.boosts.rechargingSpeed.upgradePrice,
        buttonTitle: "Buy",
        onClick: () => {
          BoostsService.useRechargingSpeed(dispatch, () => {
            router.push("/main");
          });
        },
      },
      {
        icon: <TapBotImg />,
        title: "Tap Bot",
        info: `${formatNumber(user.boosts.tapBot.price)} Coins for 8 hours`,
        buttonTitle: "Buy",
        price: user.boosts.tapBot.price,
        onClick: () => {
          BoostsService.useTapBot(dispatch, () => {
            router.push("/main");
          });
        },
      },
    ],
    [boosts, dispatch, energyLimit, onMaxBoost, router],
  );

  const firstBowlItems: BoostBowlItemType[] = useMemo(
    () => [
      {
        icon: <EnergyIcon />,
        title: "Turbo",
        description: `${user.boosts.turbo.turboLeft}/3 available`,
        disabled: !user.boosts.turbo.turboLeft,
        onClick: async () => {
          if (!user.boosts.turbo.turboLeft) return;
          onOpenModal("boosts", { boost: boostsInfo[0] });
        },
      },
      {
        icon: <BatteryIcon />,
        title: "Full Tank",
        description: `${user.boosts.fullTank.fullTankLeft}/3 in day`,
        disabled: boosts >= energyLimit,
        onClick: () => {
          if (energyLimit >= boosts) return;
          onOpenModal("boosts", { boost: boostsInfo[1] });
        },
      },
    ],
    [boosts, energyLimit, onMaxBoost],
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
        description: "1 000 000 Coin in 8 hours",
        onClick: () => {
          onOpenModal("boosts", { boost: boostsInfo[5] });
        },
      },
    ],
    [boostsInfo],
  );

  return { firstBowlItems, secondBowlItems };
};
