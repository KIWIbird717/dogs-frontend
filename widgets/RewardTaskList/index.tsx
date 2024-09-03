import { FC } from "react";
import { RewardsBoard } from "@/widgets/RewardsBoard";
import { EarnTasksList } from "@/widgets/EarnTasks";
import { Typography } from "@/shared/ui/Typography/Typography";
import { twMerge } from "tailwind-merge";
import { TasksApiTypes } from "@/shared/lib/services/tasks/types";
import { ToggleCategoryType } from "@/app/earn/page";

interface IRewardTaskListProps {
  tasks: TasksApiTypes.TasksDto[];
  toggle: ToggleCategoryType;
  notFoundTasks: string | null
}

export const RewardTaskList: FC<IRewardTaskListProps> = (
  {
    notFoundTasks,
    toggle,
    tasks
  }
) => {
  const youtubeTasks = tasks?.filter((obj) => obj.type === TasksApiTypes.TaskTypeEnum.YOUTUBE)
  const twitterTasks = tasks?.filter((obj) => obj.type === TasksApiTypes.TaskTypeEnum.XTWITTER)
  const xternalTasks = tasks?.filter((obj) =>  obj.type === TasksApiTypes.TaskTypeEnum.EXTERNAL);

  return (
    <div className={"z-[10] flex w-full flex-col gap-4"}>
      <RewardsBoard />

      <div className={"flex w-full flex-col gap-4 pb-[110px]"}>
        {tasks?.length !== 0
          ? <>
            <EarnTasksList tasks={youtubeTasks || []} toggle={toggle} />
            <EarnTasksList tasks={twitterTasks || []} toggle={toggle} />
            <EarnTasksList tasks={xternalTasks || []} toggle={toggle} />
          </>
          : <div className={"w-full h-[100px] flex items-center justify-center"}>
            <Typography className={twMerge("text-[20px] text-center font-bold leading-6 text-white-900")}
                        tag={"p"}
            >
              {notFoundTasks}
            </Typography>
          </div>}
      </div>
    </div>
  );
};