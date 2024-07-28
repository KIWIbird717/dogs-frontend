import { FC } from "react";
import { Typography } from "@/shared/ui/Typography/Typography";

interface IHeaderProps {
}

export const Header: FC<IHeaderProps> = () => {
  return (
    <div className={"w-full flex flex-col gap-2"}>
      <Typography tag={"h2"}
                  className={"text-white-900 text-center"}
      >
        Bonus for leveling up
      </Typography>
      <Typography tag={"span"}
                  className={"text-white-800 text-center"}
      >
        If your friend gets that rank, you&apos;ll get
      </Typography>
    </div>
  );
};