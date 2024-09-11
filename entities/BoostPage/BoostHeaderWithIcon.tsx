"use client";

import { HeaderWithIcon } from "@/shared/ui/HeaderWithIcon";
import RacketIcon from "@/public/images/svg/boost/racket.svg";
import EnergyIcon from "@/public/images/svg/energy.svg";
import { Block } from "@/widgets/Block";
import { useAppSelector } from "@/shared/lib/redux-store/hooks";

export const BoostHeaderWithIcon = () => {
  const maxBoost = useAppSelector((store) => store.user.energyLimit);
  const currentEnergy = useAppSelector((store) => store.user.currentBoost);

  return (
    <HeaderWithIcon
      title={"Boost"}
      icon={<RacketIcon />}
      button={
        <Block icon={<EnergyIcon />} title={`${currentEnergy}/${maxBoost}`} onClick={() => {}} />
      }
    />
  );
};
