import { FC } from "react";
import { EarnTasksList } from "@/widgets/EarnTasks";
import { ToggleCategoryType } from "@/app/earn/page";
import { TasksApiTypes } from "@/shared/lib/services/tasks/types";
import { Typography } from "@/shared/ui/Typography/Typography";
import { twMerge } from "tailwind-merge";

interface ITaskListProps {
  tasks: TasksApiTypes.TasksDto[];
  toggle: ToggleCategoryType;
  notFoundTasks: string | null
}

export const TaskList: FC<ITaskListProps> = (
  {
    tasks,
    toggle ,
    notFoundTasks
  }
) => {
  return (
    <>
      {tasks?.length !== 0
        ? <div className={"z-[10] flex w-full flex-col gap-4 pb-[110px]"}>
          <EarnTasksList tasks={tasks} toggle={toggle} />
        </div>
        : <div className={"w-full h-[100px] flex items-center justify-center"}>
          <Typography className={twMerge("text-[20px] text-center font-bold leading-6 text-white-900")}
                      tag={"p"}
          >
            {notFoundTasks}
          </Typography>
        </div>
      }
    </>
  );
};
