import { FC } from "react";
import { Typography } from "@/shared/ui/Typography/Typography";

interface IHeaderProps {
}

export const Header: FC<IHeaderProps> = () => {
  return (
    <div className={"w-full flex justify-between"}>
      <Typography tag={"span"}
                  className={"text-white-800"}
      >
        Level
      </Typography>
      <Typography tag={"span"}
                  className={"text-white-800"}
      >
        Friend
      </Typography>
      <Typography tag={"span"}
                  className={"text-white-800"}
      >
        Premium
      </Typography>
    </div>
  );
};