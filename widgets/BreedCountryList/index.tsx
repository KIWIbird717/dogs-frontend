import { FC, ReactNode } from "react";
import TickIcon from "@/public/images/svg/breed/tick.svg";
import ArrowRightIcon from "@/public/images/svg/arrow-right.svg";
import { Button } from "@/shared/ui/Button/Button";
import { Typography } from "@/shared/ui/Typography/Typography";
import Image from "next/image";
import { IBreedCountry } from "@/app/profile/country/page";

interface IBreedCountryListProps {
  items: IBreedCountry[];
  item: string;
  onClick: (value: string) => void;
}

export const BreedCountryList: FC<IBreedCountryListProps> = ({ items, onClick, item }) => {
  return (
    <>
      {items.map((obj, i) => {
        const isSelected = obj.name.toUpperCase() === item.toUpperCase();
        const icon = isSelected ? <TickIcon /> : <ArrowRightIcon />;

        return (
          <Button
            key={obj.name}
            icon={icon}
            variant={"select"}
            isSelected={isSelected}
            onClick={() => onClick(obj.iso2.toUpperCase())}
          >
            <div className={"flex items-center gap-3"}>
              {obj.flag && (
                <Image
                  src={obj.flag as string}
                  width={24}
                  height={24}
                  alt={`${obj.name}${i}`}
                  className={"h-full max-h-[24px] w-full max-w-[24px] rounded-full"}
                />
              )}
              <Typography tag={"p"} className={"text-[18px] font-bold leading-6 text-white-900"}>
                {obj.name}
              </Typography>
            </div>
          </Button>
        );
      })}
    </>
  );
};
