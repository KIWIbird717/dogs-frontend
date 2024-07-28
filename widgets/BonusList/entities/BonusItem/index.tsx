import { FC } from "react";
import { IBonusList } from "@/widgets/BonusList";
import Image from "next/image";
import { Typography } from "@/shared/ui/Typography/Typography";
import { formatNumber } from "@/shared/lib/utils/formatNumber";
import { Button } from "@/shared/ui/Button/Button";
import { TotalCoin } from "@/shared/ui/TotalCoin";

interface IBonusItemProps {
  item: IBonusList;
}

export const BonusItem: FC<IBonusItemProps> = (
  {
    item,
  },
) => {

  const coinForFriend = formatNumber(item.coinForFriend);
  const coinPremium = formatNumber(item.coinPremium);

  return (
    <Button className={"w-full h-[64px] flex items-center gap-2 px-3 py-2 bg-black-400 border border-blue-800 rounded-xl"}>
      <div className={"w-[37%] flex items-center h-full gap-2"}>
        <div>
          <Image src={item.icon}
                 alt={"avatar"}
                 className={"w-[48px] h-[48px] object-cover"}
          />
        </div>
        <Typography tag={"h3"}
                    className={"font-normal text-white-900"}
        >
          {item.level}
        </Typography>
      </div>

      <TotalCoin coin={coinForFriend}
                 isPlus
                 tag={"p"}
                 size={"middle"}
                 className={"w-[30%]"}
      />
      <TotalCoin coin={coinPremium}
                 isPlus
                 tag={"p"}
                 size={"middle"}
                 className={"w-[33%] justify-end"}
      />
    </Button>
  );
};