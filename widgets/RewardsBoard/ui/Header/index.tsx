import { FC } from "react";
import { Typography } from "@/shared/ui/Typography/Typography";

interface IHeaderProps {}

export const Header: FC<IHeaderProps> = () => {
  return (
    <div className={"flex w-full flex-col gap-2"}>
      <Typography tag={"h2"} className={"text-white-900"}>
        Daily reward
      </Typography>
      <Typography tag={"p"} className={"text-[17px] font-normal leading-6 text-white-800"}>
        Pick up your coins every day
      </Typography>
    </div>
  );
};
