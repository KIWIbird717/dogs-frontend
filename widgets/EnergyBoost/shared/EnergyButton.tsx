"use client";

import { FC, ReactNode } from "react";
import { cn } from "@/shared/lib/utils/cn";
import { Typography } from "@/shared/ui/Typography/Typography";

type EnergyButtonProps = {
  className?: string;
  icon: ReactNode;
  title: string | ReactNode;
};

export const EnergyButton: FC<EnergyButtonProps> = (props) => {
  return (
    <div
      className={cn(
        props.className,
        "flex items-center justify-center gap-2 rounded-xl border-[2px] border-black-400 bg-black-400 px-2 py-2 shadow-buttonNoAccent",
      )}
    >
      <div>{props.icon}</div>
      <Typography
        tag={"p"}
        className={"w-full text-[17px] font-bold tabular-nums leading-6 text-white-900"}
      >
        {props.title}
      </Typography>
    </div>
  );
};
