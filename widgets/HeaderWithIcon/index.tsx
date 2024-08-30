"use client";

import { FC, ReactNode } from "react";
import { Typography } from "@/shared/ui/Typography/Typography";

interface IHeaderWithIconProps {
  icon: ReactNode;
  button?: ReactNode;
  title: string;
}

export const HeaderWithIcon: FC<IHeaderWithIconProps> = ({ icon, button, title }) => {
  return (
    <div className={"z-[10] flex w-full justify-between"}>
      <div className={"flex items-center gap-2"}>
        {icon}

        <Typography tag={"h2"} className={"text-white-900"}>
          {title}
        </Typography>
      </div>

      {button}
    </div>
  );
};
