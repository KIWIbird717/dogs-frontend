import { FC } from "react";
import { Typography } from "@/shared/ui/Typography/Typography";
import { twMerge } from "tailwind-merge";
import Link from "next/link";

export interface INavItems {
  icon: any;
  title: string;
  link: string;
}

interface INavItemsProps {
  items: INavItems[];
  pathName: string;
}

export const NavItems: FC<INavItemsProps> = ({ items, pathName }) => {
  return (
    <div className={"flex gap-2"}>
      {items.map((item, index) => {
        const Component = item.icon;
        return (
          <Link
            href={item.link}
            key={index}
            className={
              "bg-navbar flex h-[75px] w-[64px] flex-col items-center justify-start gap-[5px] rounded-t-xl pt-3"
            }
          >
            <div>
              <Component className={twMerge(pathName === item.link && "[&>path]:fill-blue-900")} />
            </div>
            {pathName === item.link && (
              <Typography
                tag={"span"}
                className={"text-[13px] font-normal leading-4 text-blue-900"}
              >
                {item.title}
              </Typography>
            )}
          </Link>
        );
      })}
    </div>
  );
};
