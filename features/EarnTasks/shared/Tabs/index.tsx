"use client";

import { Button } from "@/shared/ui/Button/Button";
import { FC } from "react";
import { twMerge } from "tailwind-merge";
import { Typography } from "@/shared/ui/Typography/Typography";
import { TabCategory } from "@/shared/types/tab-category";

type TabsProps = {
  state: TabCategory;
  onChange?: (category: TabCategory) => void;
};

export const Tabs: FC<TabsProps> = (props) => {
  const onSetRewards = () => props.onChange && props.onChange("rewards");
  const onSetTasks = () => props.onChange && props.onChange("tasks");

  return (
    <div className={"z-[10] flex h-[48px] w-full gap-2"}>
      <Button
        variant={"default"}
        className={twMerge(
          "h-full rounded-none border-b border-b-white-800 text-[15px] font-bold leading-[18px]",
          props.state === "rewards" && "border-b-blue-900",
        )}
        onClick={onSetRewards}
      >
        <Typography tag={"span"} className={"text-[15px] font-bold leading-[18px] text-white-900"}>
          Rewards
        </Typography>
      </Button>

      <Button
        variant={"default"}
        className={twMerge(
          "h-full rounded-none border-b border-b-white-800 text-[15px] font-bold leading-[18px]",
          props.state === "tasks" && "border-b-blue-900",
        )}
        onClick={onSetTasks}
      >
        <Typography tag={"span"} className={"text-[15px] font-bold leading-[18px] text-white-900"}>
          Tasks
        </Typography>
      </Button>
    </div>
  );
};
