import { FC } from "react";
import TickIcon from "@/public/images/svg/breed/tick.svg";
import ArrowRightIcon from "@/public/images/svg/arrow-right.svg";
import { Button } from "@/shared/ui/Button/Button";
import { Typography } from "@/shared/ui/Typography/Typography";
import { IBreedCountry } from "@/app/profile/breed/page";

interface IBreedCountryListProps {
  items: IBreedCountry[]
  item: string;
  onClick: (value: string) => void;
}

export const BreedCountryList: FC<IBreedCountryListProps> = (
  {
    items,
    onClick,
    item
  }
) => {
  return (
    <>
      {items.map((obj, i) => {
        const isSelected = obj.value === item;
        const icon = isSelected ? <TickIcon /> : <ArrowRightIcon />;

        return <Button key={obj.id}
                       icon={icon}
                       variant={"select"}
                       isSelected={isSelected}
                       onClick={() => onClick(obj.value)}
        >
          <div className={"flex items-center gap-3"}>
            {obj.icon}
            <Typography tag={"p"}
                        className={"text-[18px] text-white-900 font-bold leading-6"}
            >
              {obj.value}
            </Typography>

          </div>

        </Button>;
      })}
    </>
  );
};