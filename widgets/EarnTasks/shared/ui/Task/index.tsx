import { FC } from "react";
import { twMerge } from "tailwind-merge";
import { Typography } from "@/shared/ui/Typography/Typography";
import { formatNumber } from "@/shared/lib/utils/formatNumber";
import { ToggleCategoryType } from "@/app/earn/page";
import ArrowRightIcon from "@/public/images/svg/arrow-right.svg";
import { Button } from "@/shared/ui/Button/Button";
import { ITask } from "@/shared/lib/redux-store/slices/modal-slice/type";
import { useModal } from "@/shared/hooks/useModal";
import { TotalCoin } from "@/shared/ui/TotalCoin";


interface ITaskProps {
  task: ITask;
  toggle: ToggleCategoryType;
}

export const Task: FC<ITaskProps> = (
  {
    toggle,
    task,
  },
) => {
  const { onOpenModal } = useModal();
  const newFormatCoins = formatNumber(task.coin);

  const handleClick = () => {
    if(!task.isClaim) {
      onOpenModal("earn", { task: task });
    }
  };

  return (
    <Button variant={"default"}
            className={twMerge(
              "w-full flex items-center h-[96px] gap-3 p-3 bg-black-400 border border-black-300 shadow-buttonNoAccent rounded-xl",
              task.isClaim && "bg-black-750",
              toggle === "tasks" && "h-[66px]",
            )}
            onClick={handleClick}
    >
      <div className={"w-[48px] h-[48px]"}>
        {task.icon}
      </div>

      <div className={"w-full h-full flex flex-col gap-1"}>
        <div className={"w-full h-full flex flex-col gap-1"}>
          <Typography tag={"p"}
                      className={"text-[17px] leading-6 font-bold text-white-900"}
          >
            {task.title}
          </Typography>
          {toggle === "rewards" && <Typography tag={"span"}
                                               className={"text-white-900"}
          >
            {task.description}
          </Typography>}
        </div>
        <div className={"w-full h-full flex gap-1"}>
          <div className={"flex items-center gap-1"}>
            <TotalCoin coin={newFormatCoins}
                       isPlus
                       tag={"span"}
                       size={"small"}
                       classNameText={"font-bold text-[15px]"}
            />
          </div>

          <div className={"flex items-center"}>
            <Typography tag={"span"}
                        className={"text-white-800 text-[13px] leading-4 font-normal"}
            >
              every 24 hours
            </Typography>
          </div>
        </div>
      </div>

      <div>
        {task.isClaim
          ?
          <Typography tag={"h3"}
                      className={"text-black-500"}
          >
            CLAIM
          </Typography>
          : <ArrowRightIcon />
        }
      </div>
    </Button>
  );
};