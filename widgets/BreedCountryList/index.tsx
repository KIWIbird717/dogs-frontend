import { FC, ReactNode } from "react";
import TickIcon from "@/public/images/svg/breed/tick.svg";
import ArrowRightIcon from "@/public/images/svg/arrow-right.svg";
import { Button } from "@/shared/ui/Button/Button";
import { Typography } from "@/shared/ui/Typography/Typography";
import Image from "next/image";

export interface IBreedCountry {
  id: string,
  value: string,
  flagUrl?: ReactNode
}

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
            {obj.flagUrl && <Image src={obj.flagUrl as string}
                                   width={24}
                                   height={24}
                                   alt={`${obj.value}${i}`}
                                   className={"rounded-full max-w-[24px] max-h-[24px] w-full h-full"}
            />
            }
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