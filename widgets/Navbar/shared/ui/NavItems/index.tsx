import { FC, ReactNode } from "react";
import { Button } from "@/shared/ui/Button/Button";

export interface INavItems {
  icon: ReactNode
}

interface INavItemsProps {
  items: INavItems[]
}

export const NavItems: FC<INavItemsProps> = (
  {
    items
  }
) => {
  return (
    <div className={"flex gap-2"}>
      {items.map((item, index) => {
        return <Button key={index}
                       className={"flex justify-center pt-3 items-start w-[64px] h-[75px] bg-black-790 rounded-t-xl"}
        >
          {item.icon}
        </Button>;
      })}
    </div>
  );
};