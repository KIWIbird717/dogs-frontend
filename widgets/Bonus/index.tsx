import { FC } from "react";
import { Header } from "@/widgets/Bonus/shared/ui/Header";
import { BonusList } from "@/widgets/BonusList";

interface IBonusProps {
}

export const Bonus: FC<IBonusProps> = () => {
  return (
    <div className={"w-full flex flex-col gap-6 overflow-y-auto z-[10]"}>
      <Header />
      <BonusList />
    </div>
  );
};