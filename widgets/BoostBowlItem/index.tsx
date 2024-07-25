import { FC } from "react";
import { Typography } from "@/shared/ui/Typography/Typography";
import ArrowRightIcon from "@/public/images/svg/arrow-right.svg";
import { Button } from "@/shared/ui/Button/Button";
import { BoostBowlItemType } from "@/widgets/BoostBowl";
import { twMerge } from "tailwind-merge";

interface IBoostBowlItemProps {
  item: BoostBowlItemType;
  className?: string;
  disabled?: boolean;
  onClick: () => void;
}

export const BoostBowlItem: FC<IBoostBowlItemProps> = (
  {
    item,
    className,
    disabled,
    onClick,
  },
) => {
  return (
    <Button icon={<ArrowRightIcon />}
            variant={"bowl"}
            disabled={disabled}
            className={twMerge("", disabled && "opacity-50",
              className,
            )}
            onClick={onClick}
    >
      <div className={"flex items-center gap-2"}>
        <div>
          {item.icon}
        </div>
        <div className={"w-full flex flex-col gap-1"}>
          <Typography tag={"p"}
                      className={"text-white-900 font-bold leading-6"}
          >
            {item.title}
          </Typography>
          <Typography tag={"span"}
                      className={"text-white-800 font-normal leading-4"}
          >
            {item.description}
          </Typography>
        </div>
      </div>
    </Button>
  );
};