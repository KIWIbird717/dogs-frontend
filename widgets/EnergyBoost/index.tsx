import { FC } from "react";
import { Button } from "@/shared/ui/Button/Button";
import EnergyIcon from "@/public/images/svg/energy.svg";
import BowlIcon from "@/public/images/svg/racket.svg";
import { Typography } from "@/shared/ui/Typography/Typography";

interface IEnergyBoostProps {
  boosts: number
  maxBoost: number
}

export const EnergyBoost: FC<IEnergyBoostProps> = (
  {
    boosts,
    maxBoost
  }
) => {
  return (
    <div className={"w-full flex justify-between"}>
      <Button
        className={"w-fit gap-2 py-2 px-3 bg-black-400 rounded-xl border-[2px] border-black-400 shadow-buttonNoAccent"}>
        <div>
          <EnergyIcon />
        </div>

        <Typography tag={"p"}
                    className={"text-[17px] font-bold leading-6 text-white-900"}
        >
          {boosts}/{maxBoost}
        </Typography>
      </Button>
      <Button
        className={"w-fit flex gap-2 py-2 px-3 bg-black-400 rounded-xl border-[2px] border-black-400 shadow-buttonNoAccent"}>
        <div>
          <BowlIcon />
        </div>
        <Typography tag={"p"}
                    className={"text-[17px] font-bold leading-6 text-white-900"}
        >
          Boost
        </Typography>
      </Button>
    </div>
  );
};