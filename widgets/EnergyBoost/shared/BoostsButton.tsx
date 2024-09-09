"use client";

import { cn } from "@/shared/lib/utils/cn";
import { Button } from "@/shared/ui/Button/Button";
import { Typography } from "@/shared/ui/Typography/Typography";
import { FC, ReactNode } from "react";

type BoostsButtonProps = {
  onClick?: () => void;
  className?: string;
  icon: ReactNode;
  title: string | ReactNode;
};
export const BoostsButton: FC<BoostsButtonProps> = (props) => {
  return (
    <Button
      onClick={props.onClick}
      className={cn(
        props.className,
        "shadow-fix flex w-fit items-center justify-center gap-3 rounded-xl border-[2px] border-black-400 bg-black-400 px-3 py-2 shadow-buttonNoAccent",
      )}
    >
      <div>{props.icon}</div>
      <Typography
        tag={"p"}
        className={"text-[17px] font-bold tabular-nums leading-6 text-white-900"}
      >
        {props.title}
      </Typography>
    </Button>
  );
};
