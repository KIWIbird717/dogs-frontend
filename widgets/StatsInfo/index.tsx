import { FC } from "react";
import { Typography } from "@/shared/ui/Typography/Typography";
import { formatNumber } from "@/shared/lib/utils/formatNumber";
import { TotalCoin } from "@/shared/ui/TotalCoin";

interface IMoneyProps {
  value: number;
  isIcon?: boolean;
  title?: string;
}

export const StatsInfo: FC<IMoneyProps> = (
  {
    value,
    title,
    isIcon,
  },
) => {
  const newFormatCoins = formatNumber(value)
  return (
    <div className={"w-full flex flex-col gap-2 justify-center"}>

      <Typography tag={"span"}
                  className={"text-[15px] font-normal leading-[18px] text-center text-white-800"}
      >
        {title}
      </Typography>

      <div className={"w-full flex justify-center gap-2"}>
        {isIcon ? <TotalCoin coin={newFormatCoins}
                             tag={"p"}
                             size={"huge"}
                             className={"gap-2"}
                             classNameText={"font-portico text-white-900 text-[32px] leading-[40px] font-normal"}
          />
          : <div className={"flex items-center"}>
            <Typography tag={"p"}
                        className={"font-portico text-white-900 text-[32px] leading-[40px] font-normal"}
            >
              {newFormatCoins}
            </Typography>
          </div>
        }
      </div>
    </div>
  );
};