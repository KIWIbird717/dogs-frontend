import { FC, useMemo } from "react";
import { RewardsBoard } from "@/entities/RewardTaskList/shared/RewardsBoard";
import { EarnTasksList } from "@/widgets/EarnTasks";
import { Typography } from "@/shared/ui/Typography/Typography";
import { twMerge } from "tailwind-merge";
import { TasksApiTypes } from "@/shared/lib/services/tasks/types";
import { TabCategory } from "@/shared/types/tab-category";
import { ITaskProps } from "../../widgets/EarnTasks/shared/ui/Task";
import dynamic from "next/dynamic";

const MotionDiv = dynamic(() => import("framer-motion").then((mod) => mod.motion.div));

export interface IRewardTaskListProps extends Pick<ITaskProps, "onOpen"> {
  tasks: TasksApiTypes.TasksDto[];
  toggle: TabCategory;
  notFoundTasks: string | null;
}

export const RewardTaskList: FC<IRewardTaskListProps> = ({
  notFoundTasks,
  toggle,
  tasks,
  ...props
}) => {
  const youtubeTasks = useMemo(
    () => tasks?.filter((obj) => obj.type === TasksApiTypes.TaskTypeEnum.YOUTUBE) || [],
    [tasks.length],
  );
  const twitterTasks = useMemo(
    () => tasks?.filter((obj) => obj.type === TasksApiTypes.TaskTypeEnum.XTWITTER) || [],
    [tasks.length],
  );
  const xternalTasks = useMemo(
    () => tasks?.filter((obj) => obj.type === TasksApiTypes.TaskTypeEnum.EXTERNAL) || [],
    [tasks.length],
  );

  return (
    <MotionDiv
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={"z-[10] flex w-full flex-col gap-4"}
    >
      <RewardsBoard />

      <div className={"flex w-full flex-col gap-4 pb-[110px]"}>
        {tasks?.length !== 0 ? (
          <>
            <EarnTasksList tasks={youtubeTasks} onOpen={props.onOpen} toggle={toggle} />
            <EarnTasksList tasks={twitterTasks} onOpen={props.onOpen} toggle={toggle} />
            <EarnTasksList tasks={xternalTasks} onOpen={props.onOpen} toggle={toggle} />
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
    </MotionDiv>
  );
};
