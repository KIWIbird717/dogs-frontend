import { FC } from "react";
import { Typography } from "@/shared/ui/Typography/Typography";
import { TotalCoin } from "@/shared/ui/TotalCoin";
import PrizeIcon from "@/public/images/svg/invite-friends/prize.svg";
import { formatNumber } from "@/shared/lib/utils/formatNumber";

interface ITopInviteBlocksProps {
  coin: number
}

export const TopInviteBlocks: FC<ITopInviteBlocksProps> = (
  {
    coin
  }
) => {
  const newFormatCoins = formatNumber(coin);

  return (
    <>
      <div className={"flex w-full flex-col items-center gap-1"}>
        <div>
          <PrizeIcon />
        </div>

        <Typography tag={"p"} className={"text-[17px] font-bold leading-6 text-white-900"}>
          Friend Telegram
        </Typography>
      </div>

      <div className={"flex w-full flex-col items-center gap-2"}>
        <TotalCoin coin={newFormatCoins} isPlus tag={"h4"} size={"small"} />

        <Typography tag={"p"} className={"text-[12px] font-normal leading-4 text-white-800"}>
          For you and your friend
        </Typography>
      </div>
    </>
  );
};