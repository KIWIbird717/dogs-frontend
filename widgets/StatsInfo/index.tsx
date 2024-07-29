import { FC } from "react";
import { Typography } from "@/shared/ui/Typography/Typography";
import { formatNumber } from "@/shared/lib/utils/formatNumber";
import { TotalCoin } from "@/shared/ui/TotalCoin";

interface IMoneyProps {
  value: number;
  isIcon?: boolean;
  title?: string;
}

export const StatsInfo: FC<IMoneyProps> = ({ value, title, isIcon }) => {
  const newFormatCoins = formatNumber(value);
  return (
    <div className={"flex w-full flex-col justify-center gap-2"}>
      <Typography
        tag={"span"}
        className={"text-center text-[15px] font-normal leading-[18px] text-white-800"}
      >
        {title}
      </Typography>

      <div className={"flex w-full justify-center gap-2"}>
        {isIcon ? (
          <TotalCoin
            coin={newFormatCoins}
            tag={"p"}
            size={"huge"}
            className={"gap-2"}
            classNameText={"font-portico text-white-900 text-[32px] leading-[40px] font-normal"}
          />
        ) : (
          <div className={"flex items-center"}>
            <Typography
              tag={"p"}
              className={"font-portico text-[32px] font-normal leading-[40px] text-white-900"}
            >
              {newFormatCoins}
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
};
