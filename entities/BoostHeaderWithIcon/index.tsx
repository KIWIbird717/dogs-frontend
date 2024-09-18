"use client";

import { HeaderWithIcon } from "@/shared/ui/HeaderWithIcon";
import RacketIcon from "@/public/images/svg/boost/racket.svg";
import EnergyIcon from "@/public/images/svg/energy.svg";
import { Block } from "@/widgets/Block";
import { useAppSelector } from "@/shared/lib/redux-store/hooks";

export const BoostHeaderWithIcon = () => {
  const energyLimit = useAppSelector((store) => store.user.boosts.energyLimit.energyLimit);
  const currentEnergy = useAppSelector((store) => store.clicker.currentEnergy);

  return (
    <HeaderWithIcon
      title={"Boost"}
      icon={<RacketIcon />}
      button={<Block icon={<EnergyIcon />} title={`${currentEnergy}/${energyLimit}`} />}
    />
  );
};
