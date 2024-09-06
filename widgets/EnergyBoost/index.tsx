import { FC, ReactNode } from "react";
import EnergyIcon from "@/public/images/svg/energy.svg";
import RacketIcon from "@/public/images/svg/racket.svg";
import { Block } from "@/widgets/Block";
import { useRouter } from "next/navigation";
import { cn } from "@/shared/lib/utils/cn";
import { Typography } from "@/shared/ui/Typography/Typography";
import { Button } from "@/shared/ui/Button/Button";

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
        className="w-[161px]"
        title={
          <span className="flex w-full justify-end text-[17px] font-bold tabular-nums leading-6 text-white-900">
            {boosts}/{maxBoost}
          </span>
        }
      />
      <BoostsButton
        icon={<RacketIcon />}
        title={"Boost"}
        className="!w-[161px]"
        onClick={redirectToBoost}
      />
    </div>
  );
};

type EnergyButtonProps = {
  className?: string;
  icon: ReactNode;
  title: string | ReactNode;
};

const EnergyButton: FC<EnergyButtonProps> = (props) => {
  return (
    <div
      className={cn(
        props.className,
        "flex items-center justify-center gap-2 rounded-xl border-[2px] border-black-400 bg-black-400 px-3 py-2 shadow-buttonNoAccent",
      )}
    >
      <div>{props.icon}</div>
      <Typography
        tag={"p"}
        className={"w-full text-[17px] font-bold tabular-nums leading-6 text-white-900"}
      >
        {props.title}
      </Typography>
    </div>
  );
};

type BoostsButtonProps = {
  onClick?: () => void;
  className?: string;
  icon: ReactNode;
  title: string | ReactNode;
};
const BoostsButton: FC<BoostsButtonProps> = (props) => {
  return (
    <Button
      onClick={props.onClick}
      className={cn(
        props.className,
        "flex w-fit items-center justify-center gap-4 rounded-xl border-[2px] border-black-400 bg-black-400 px-3 py-2 shadow-buttonNoAccent",
      )}
    >
      <div>{props.icon}</div>
      <Typography
        tag={"p"}
        className={"text-[17px] font-bold tabular-nums leading-6 text-white-900"}
      >
        {props.title}
      </Typography>
    </Button>
  );
};
