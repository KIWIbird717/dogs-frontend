import { FC } from "react";
import { RewardsBoard } from "@/widgets/RewardsBoard";
import { EarnTasksList } from "@/widgets/EarnTasks";
import { Typography } from "@/shared/ui/Typography/Typography";
import { twMerge } from "tailwind-merge";
import { TasksApiTypes } from "@/shared/lib/services/tasks/types";
import { ToggleCategoryType } from "@/app/earn/page";
import { ITaskProps } from "../EarnTasks/shared/ui/Task";

export interface IRewardTaskListProps extends Pick<ITaskProps, "onOpen"> {
  tasks: TasksApiTypes.TasksDto[];
  toggle: ToggleCategoryType;
  notFoundTasks: string | null;
}

export const RewardTaskList: FC<IRewardTaskListProps> = ({
  notFoundTasks,
  toggle,
  tasks,
  ...props
}) => {
  const youtubeTasks = tasks?.filter((obj) => obj.type === TasksApiTypes.TaskTypeEnum.YOUTUBE);
  const twitterTasks = tasks?.filter((obj) => obj.type === TasksApiTypes.TaskTypeEnum.XTWITTER);
  const xternalTasks = tasks?.filter((obj) => obj.type === TasksApiTypes.TaskTypeEnum.EXTERNAL);

  return (
    <div className={"z-[10] flex w-full flex-col gap-4"}>
      <RewardsBoard />

      <div className={"flex w-full flex-col gap-4 pb-[110px]"}>
        {tasks?.length !== 0 ? (
          <>
            <EarnTasksList tasks={youtubeTasks || []} onOpen={props.onOpen} toggle={toggle} />
            <EarnTasksList tasks={twitterTasks || []} onOpen={props.onOpen} toggle={toggle} />
            <EarnTasksList tasks={xternalTasks || []} onOpen={props.onOpen} toggle={toggle} />
          </>
        ) : (
          <div className={"flex h-[100px] w-full items-center justify-center"}>
            <Typography
              className={twMerge("text-center text-[20px] font-bold leading-6 text-white-900")}
              tag={"p"}
            >
              {notFoundTasks}
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
};
