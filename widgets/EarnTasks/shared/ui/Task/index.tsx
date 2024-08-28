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

export const Task: FC<ITaskProps> = ({ toggle, task }) => {
  const { onOpenModal } = useModal();
  const newFormatCoins = formatNumber(task.coin);

  const handleClick = () => {
    if (!task.isClaim) {
      onOpenModal("earn", { task: task });
    }
  };

  return (
    <Button
      variant={"default"}
      className={twMerge(
        "flex h-[96px] w-full items-center gap-3 rounded-xl border border-black-300 bg-black-400 p-3 shadow-buttonNoAccent",
        task.isClaim && "bg-black-750",
        toggle === "tasks" && "h-[66px]",
      )}
      onClick={handleClick}
    >
      <div className={"h-[48px] w-[48px]"}>{task.icon}</div>

      <div className={"flex h-full w-full flex-col gap-1"}>
        <div className={"flex h-full w-full flex-col gap-1"}>
          <Typography tag={"p"} className={"text-[17px] font-bold leading-6 text-white-900"}>
            {task.title}
          </Typography>
          {toggle === "rewards" && (
            <Typography tag={"span"} className={"text-[13px] font-normal leading-4 text-white-900"}>
              {task.description}
            </Typography>
          )}
        </div>
        <div className={"flex h-full w-full gap-1"}>
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
            <Typography tag={"span"} className={"text-[13px] font-normal leading-4 text-white-800"}>
              every 24 hours
            </Typography>
          </div>
        </div>
      </div>

      <div>
        {task.isClaim ? (
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
