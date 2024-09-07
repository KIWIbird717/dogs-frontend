import { FC } from "react";
import EnergyIcon from "@/public/images/svg/energy.svg";
import RacketIcon from "@/public/images/svg/racket.svg";
import { useRouter } from "next/navigation";
import { EnergyButton } from "./shared/EnergyButton";
import { BoostsButton } from "./shared/BoostsButton";

interface IEnergyBoostProps {
  boosts: number;
  maxBoost: number;
  onMaxBoost: () => void;
}

export const EnergyBoost: FC<IEnergyBoostProps> = ({ boosts, maxBoost, onMaxBoost }) => {
  const { push } = useRouter();

  const redirectToBoost = () => push("/boost");

  return (
    <div className={"flex w-full justify-between"}>
      <EnergyButton
        icon={<EnergyIcon />}
        className="w-[155px]"
        title={
          <span className="flex w-full justify-end text-[17px] font-bold tabular-nums leading-6 text-white-900">
            {boosts}/{maxBoost}
          </span>
        }
      />
      <BoostsButton
        icon={<RacketIcon />}
        title={"Boost"}
        className="!w-[135px]"
        onClick={redirectToBoost}
      />
    </div>
  );
};
