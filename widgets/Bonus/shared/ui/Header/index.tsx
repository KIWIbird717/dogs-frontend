import { FC } from "react";
import { Typography } from "@/shared/ui/Typography/Typography";

interface IHeaderProps {}

export const Header: FC<IHeaderProps> = () => {
  return (
    <div className={"flex w-full flex-col gap-2"}>
      <Typography tag={"h2"} className={"text-center text-white-900"}>
        Bonus for leveling up
      </Typography>
      <Typography tag={"span"} className={"text-center text-white-800"}>
        If your friend gets that rank, you&apos;ll get
      </Typography>
    </div>
  );
};
