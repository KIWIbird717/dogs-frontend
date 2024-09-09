import { FC } from "react";
import { EarnTasksList } from "@/widgets/EarnTasks";
import { ToggleCategoryType } from "@/app/earn/page";
import { TasksApiTypes } from "@/shared/lib/services/tasks/types";
import { Typography } from "@/shared/ui/Typography/Typography";
import { twMerge } from "tailwind-merge";
import { ITaskProps } from "../EarnTasks/shared/ui/Task";

interface ITaskListProps extends Pick<ITaskProps, "onOpen"> {
  tasks: TasksApiTypes.TasksDto[];
  toggle: ToggleCategoryType;
  notFoundTasks: string | null;
}

export const TaskList: FC<ITaskListProps> = ({ tasks, toggle, notFoundTasks, ...props }) => {
  return (
    <>
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
    </>
  );
};
