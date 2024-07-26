import { FC } from "react";
import CoinIcon from "@/public/images/svg/coin.svg";
import { Typography } from "@/shared/ui/Typography/Typography";

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
  const newFormatCoins = new Intl.NumberFormat("en").format(value).replace(/,/g, " ");
  return (
    <div className={"w-full flex flex-col gap-2 justify-center"}>

      <Typography tag={"span"}
                  className={"text-[15px] font-normal leading-[18px] text-center text-white-800"}
      >
        {title}
      </Typography>

      <div className={"w-full flex justify-center gap-2"}>
        {isIcon && <div>
          <CoinIcon />
        </div>}
        <div className={"flex items-center"}>
          <Typography tag={"p"}
                      className={"font-portico text-white-900 text-[32px] leading-[40px] font-normal"}
          >
            {newFormatCoins}
          </Typography>
        </div>
      </div>
    </div>
  );
};