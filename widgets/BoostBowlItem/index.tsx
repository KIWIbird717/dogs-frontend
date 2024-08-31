import { FC } from "react";
import { Typography } from "@/shared/ui/Typography/Typography";
import ArrowRightIcon from "@/public/images/svg/arrow-right.svg";
import { Button } from "@/shared/ui/Button/Button";
import { BoostBowlItemType } from "@/widgets/BoostBowl";
import { twMerge } from "tailwind-merge";
import { BoostModal } from "../BoostBowl/shared/BoostModal";

interface IBoostBowlItemProps {
  item: BoostBowlItemType;
  className?: string;
  disabled?: boolean;
  onClick: () => void;
}

export const BoostBowlItem: FC<IBoostBowlItemProps> = ({ item, className, disabled, onClick }) => {
  return (
    <>
      <Button
        icon={<ArrowRightIcon />}
        variant={"bowl"}
        disabled={disabled}
        className={twMerge("", disabled && "opacity-50", className)}
        onClick={onClick}
      >
        <div className={"flex items-center gap-2"}>
          <div>{item.icon}</div>
          <div className={"flex w-full flex-col gap-1"}>
            <Typography tag={"p"} className={"font-bold leading-6 text-white-900"}>
              {item.title}
            </Typography>
            <Typography tag={"span"} className={"font-normal leading-4 text-white-800"}>
              {item.description}
            </Typography>
          </div>
        </div>
      </Button>

      {/* <BoostModal title={item.title} isOpen={false} /> */}
    </>
  );
};
