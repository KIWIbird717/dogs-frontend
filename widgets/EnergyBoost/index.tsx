import { FC } from "react";
import EnergyIcon from "@/public/images/svg/energy.svg";
import RacketIcon from "@/public/images/svg/racket.svg";
import { Block } from "@/widgets/Block";

interface IEnergyBoostProps {
  boosts: number;
  maxBoost: number;
  onMaxBoost: () => void
}

export const EnergyBoost: FC<IEnergyBoostProps> = (
  {
    boosts,
    maxBoost,
    onMaxBoost
  },
) => {
  return (
    <div className={"w-full flex justify-between"}>
      <Block icon={<EnergyIcon />}
             title={`${boosts}/${maxBoost}`}
      />
      <Block icon={<RacketIcon />}
             title={"Boost"}
             onClick={onMaxBoost}
      />
    </div>
  );
};