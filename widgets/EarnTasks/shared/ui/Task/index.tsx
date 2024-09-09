import { FC } from "react";
import { twMerge } from "tailwind-merge";
import { Typography } from "@/shared/ui/Typography/Typography";
import { formatNumber } from "@/shared/lib/utils/formatNumber";
import { ToggleCategoryType } from "@/app/earn/page";
import ArrowRightIcon from "@/public/images/svg/arrow-right.svg";
import { Button } from "@/shared/ui/Button/Button";
import { TotalCoin } from "@/shared/ui/TotalCoin";
import { TasksApiTypes } from "@/shared/lib/services/tasks/types";
import YoutubeIcon from "@/public/images/svg/earn/youtube.svg";
import TwitterIcon from "@/public/images/svg/earn/x.svg";
import NFTIcon from "@/public/images/svg/earn/nft.svg";
import toast, { Toaster } from "react-hot-toast";

export interface ITaskProps {
  task: TasksApiTypes.TasksDto;
  toggle: ToggleCategoryType;
  onOpen?: ({ data }: { data: TasksApiTypes.TasksDto }) => void;
}

export const Task: FC<ITaskProps> = ({ toggle, task, onOpen }) => {
  const newFormatCoins = formatNumber(task.amount);

  const handleClick = () => {
    if (!task.isCompleted) {
      onOpen && onOpen({ data: task });
    } else {
      toast.success("Task already complied");
    }
  };

  return (
    <Button
      variant={"default"}
      className={twMerge(
        "flex h-[96px] w-full items-center justify-between gap-3 rounded-xl border border-black-300 bg-black-400 p-3 shadow-buttonNoAccent",
        task.isCompleted && "bg-black-750",
        task.isCompleted && "opacity-50",
        toggle === "tasks" && "h-[66px]",
      )}
      disabled={task.isCompleted}
      onClick={handleClick}
    >
      <Toaster />
      <div className={"flex items-center gap-3 overflow-hidden"}>
        <div className={"h-[48px] w-[48px]"}>
          {task.type === TasksApiTypes.TaskTypeEnum.YOUTUBE ? (
            <YoutubeIcon />
          ) : task.type === TasksApiTypes.TaskTypeEnum.XTWITTER ? (
            <TwitterIcon />
          ) : (
            <NFTIcon />
          )}
        </div>

        <div className={"flex h-full flex-col gap-1 overflow-hidden"}>
          <div className={"flex h-full flex-col gap-1"}>
            <Typography
              tag={"p"}
              className={
                "overflow-hidden text-ellipsis whitespace-nowrap text-[17px] font-bold leading-6 text-white-900"
              }
            >
              {task.name}
            </Typography>
            {toggle === "rewards" && (
              <Typography
                tag={"span"}
                className={
                  "overflow-hidden text-ellipsis whitespace-nowrap text-[15px] font-normal leading-4 text-white-900"
                }
              >
                {task.desc}
              </Typography>
            )}
          </div>
          <div className={"flex h-full gap-1"}>
            <div className={"flex items-center gap-1"}>
              <TotalCoin
                coin={newFormatCoins}
                isPlus
                tag={"span"}
                size={"small"}
                classNameText={"font-bold text-[15px]"}
              />
            </div>

            <div className={"flex items-center"}>
              <Typography
                tag={"span"}
                className={"text-[13px] font-normal leading-4 text-white-800"}
              >
                every 24 hours
              </Typography>
            </div>
          </div>
        </div>
      </div>

      <div className={"max-w-[62px]"}>
        {task.isCompleted ? (
          <Typography tag={"h3"} className={"text-black-500"}>
            CLAIM
          </Typography>
        ) : (
          <ArrowRightIcon />
        )}
      </div>
    </Button>
  );
};
