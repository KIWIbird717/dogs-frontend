import { FC, memo, useEffect } from "react";
import EnergyIcon from "@/public/images/svg/energy.svg";
import RacketIcon from "@/public/images/svg/racket.svg";
import { useRouter } from "next/navigation";
import { EnergyButton } from "./shared/EnergyButton";
import { BoostsButton } from "./shared/BoostsButton";
import { cn } from "@/shared/lib/utils/cn";
import { getBoostHeight } from "./shared/func/getEnergyHeight";

interface IEnergyBoostProps {
  boosts: number;
  maxBoost: number;
  onMaxBoost: () => void;
  className?: string;
}

export const EnergyBoost: FC<IEnergyBoostProps> = ({ boosts, maxBoost, onMaxBoost, ...props }) => {
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/boost");
  }, [router]);

  const redirectToBoost = () => router.push("/boost");

  return (
    <div className={cn(props.className, "flex w-full justify-between")}>
      <EnergyButton
        icon={<EnergyIcon />}
        className="w-[155px]"
        title={
          <span
            style={{
              fontSize: getBoostHeight(maxBoost),
            }}
            className="flex w-full justify-end text-[17px] font-bold tabular-nums leading-6 text-white-900"
          >
            {boosts}/{maxBoost}
          </span>
        }
      />
      <BoostsButton
        icon={<RacketIcon />}
        title={"Boost"}
        className="!w-[155px]"
        onClick={redirectToBoost}
      />
    </div>
  );
};
