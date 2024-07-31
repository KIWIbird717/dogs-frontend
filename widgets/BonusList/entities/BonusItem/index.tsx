import { FC } from "react";
import { IBonusList } from "@/widgets/BonusList";
import Image from "next/image";
import { Typography } from "@/shared/ui/Typography/Typography";
import { formatNumber } from "@/shared/lib/utils/formatNumber";
import { Button } from "@/shared/ui/Button/Button";
import { TotalCoin } from "@/shared/ui/TotalCoin";
import { twMerge } from "tailwind-merge";

interface IBonusItemProps {
  item: IBonusList;
  index: number
}

export const BonusItem: FC<IBonusItemProps> = (
  {
    item,
    index
  }
) => {
  const coinForFriend = formatNumber(item.coinForFriend);
  const coinPremium = formatNumber(item.coinPremium);

  return (
    <Button
      className={twMerge(
        "flex h-[64px] w-full items-center gap-2 rounded-xl border  px-3 py-2",
        index === 0 && "border-blue-800 bg-black-400",
        index !== 0 && "border-black-300 bg-black-800",
      )
      }
    >
      <div className={"flex h-full w-[37%] items-center gap-2"}>
        <div>
          <Image src={item.icon} alt={"avatar"} className={"h-[48px] w-[48px] object-cover"} />
        </div>
        <Typography tag={"h3"} className={"font-normal text-white-900"}>
          {item.level}
        </Typography>
      </div>

      <TotalCoin coin={coinForFriend} isPlus tag={"p"} size={"middle"} className={"w-[30%]"} />
      <TotalCoin
        coin={coinPremium}
        isPlus
        tag={"p"}
        size={"middle"}
        className={"w-[33%] justify-end"}
      />
    </Button>
  );
};
