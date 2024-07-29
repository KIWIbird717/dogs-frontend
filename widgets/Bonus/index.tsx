import { FC } from "react";
import { Header } from "@/widgets/Bonus/shared/ui/Header";
import { BonusList } from "@/widgets/BonusList";

interface IBonusProps {}

export const Bonus: FC<IBonusProps> = () => {
  return (
    <div className={"z-[10] flex w-full flex-col gap-6 overflow-y-auto"}>
      <Header />
      <BonusList />
    </div>
  );
};
