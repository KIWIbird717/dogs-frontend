import { FC } from "react";
import { EarnTasksList } from "@/widgets/EarnTasks";
import { TabCategory } from "@/shared/types/tab-category";
import { TasksApiTypes } from "@/shared/lib/services/tasks/types";
import { Typography } from "@/shared/ui/Typography/Typography";
import { twMerge } from "tailwind-merge";
import { ITaskProps } from "../../widgets/EarnTasks/shared/ui/Task";
import dynamic from "next/dynamic";

const MotionDiv = dynamic(() => import("framer-motion").then((mod) => mod.motion.div));

interface ITaskListProps extends Pick<ITaskProps, "onOpen"> {
  tasks: TasksApiTypes.TasksDto[];
  toggle: TabCategory;
  notFoundTasks: string | null;
}

export const TaskList: FC<ITaskListProps> = ({ tasks, toggle, notFoundTasks, ...props }) => {
  return (
    <MotionDiv
      className="z-[2] h-fit w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {tasks?.length !== 0 ? (
        <div className={"z-[10] flex w-full flex-col gap-4 pb-[110px]"}>
          <EarnTasksList onOpen={props.onOpen} tasks={tasks} toggle={toggle} />
        </div>
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
    </MotionDiv>
  );
};
