import { FC } from "react";
import { Header } from "@/widgets/BonusList/shared/ui/Header";
import { BonusItem } from "@/widgets/BonusList/entities/BonusItem";
import MonsterIcon from "@/public/images/monster.png";

interface IBonusListProps {
}

const bonusList: IBonusList[] = [
  {
    icon: MonsterIcon,
    level: "Silver",
    coinForFriend: 20000,
    coinPremium: 25000,
  },
  {
    icon: MonsterIcon,
    level: "Bronze",
    coinForFriend: 20000,
    coinPremium: 25000,
  }, {
    icon: MonsterIcon,
    level: "Silver",
    coinForFriend: 20000,
    coinPremium: 25000,
  },
  {
    icon: MonsterIcon,
    level: "Bronze",
    coinForFriend: 20000,
    coinPremium: 25000,
  }, {
    icon: MonsterIcon,
    level: "Silver",
    coinForFriend: 20000,
    coinPremium: 25000,
  },
  {
    icon: MonsterIcon,
    level: "Bronze",
    coinForFriend: 20000,
    coinPremium: 25000,
  }, {
    icon: MonsterIcon,
    level: "Silver",
    coinForFriend: 20000,
    coinPremium: 25000,
  },
  {
    icon: MonsterIcon,
    level: "Bronze",
    coinForFriend: 20000,
    coinPremium: 25000,
  },
];

export interface IBonusList {
  icon: any | string,
  level: string,
  coinForFriend: number,
  coinPremium: number,
}

export const BonusList: FC<IBonusListProps> = () => {
  return (
    <div className={"w-full flex flex-col gap-3 overflow-y-auto "}>
      <Header />

      <div className={"w-full flex flex-col gap-2 pb-[190px] overflow-y-auto"}>
        {bonusList.map((item, i) => {
          return <BonusItem key={i}
                            item={item}
          />;
        })}
      </div>
    </div>
  );
};