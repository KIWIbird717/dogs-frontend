import { FC } from "react";
import EnergyIcon from "@/public/images/svg/energy.svg";
import RacketIcon from "@/public/images/svg/racket.svg";
import { Block } from "@/widgets/Block";
import { useRouter } from "next/navigation";

interface IEnergyBoostProps {
  boosts: number;
  maxBoost: number;
  onMaxBoost: () => void;
}

export const EnergyBoost: FC<IEnergyBoostProps> = ({ boosts, maxBoost, onMaxBoost }) => {
  const {push} = useRouter()

  const redirectToBoost = () => push("/boost")

  return (
    <div className={"flex w-full justify-between"}>
      <Block icon={<EnergyIcon />} title={`${boosts}/${maxBoost}`} onClick={onMaxBoost} />
      <Block icon={<RacketIcon />} title={"Boost"} onClick={redirectToBoost} />
    </div>
  );
};
