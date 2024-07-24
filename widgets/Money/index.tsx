import { FC } from "react";
import CoinIcon from "@/public/images/svg/coin.svg";
import { Typography } from "@/shared/ui/Typography/Typography";

interface IMoneyProps {
  coins: number
}

export const Money: FC<IMoneyProps> = (
  {
    coins
  }
  ) => {
  const newFormatCoins = new Intl.NumberFormat("en").format(coins).replace(/,/g, ' ');
  return (
    <div className={"w-full flex justify-center gap-2"}>
      <div>
        <CoinIcon />
      </div>
      <div className={"flex items-center"}>
        <Typography tag={"p"}
                    className={"font-portico text-white-900 text-[32px] leading-[40px] font-normal"}
        >
          {newFormatCoins}
        </Typography>
      </div>
    </div>
  );
};