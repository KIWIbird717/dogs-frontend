import { FC } from "react";
import { Typography } from "@/shared/ui/Typography/Typography";
import { ITaskProps, Task } from "@/widgets/EarnTasks/shared/ui/Task";
import { TabCategory } from "@/shared/types/tab-category";
import { TasksApiTypes } from "@/shared/lib/services/tasks/types";

interface IEarnTasksListProps extends Pick<ITaskProps, "onOpen"> {
  tasks: TasksApiTypes.TasksDto[];
  toggle: TabCategory;
}

export const EarnTasksList: FC<IEarnTasksListProps> = ({ tasks, toggle, ...props }) => {
  const title =
    toggle === "tasks"
      ? "Dogi Task"
      : tasks[0]?.type === TasksApiTypes.TaskTypeEnum.YOUTUBE
        ? "Youtube Task"
        : tasks[0]?.type === TasksApiTypes.TaskTypeEnum.XTWITTER
          ? "Twitter Task"
          : "External Task";

  return (
    <div className={"flex w-full flex-col gap-3"}>
      <Typography tag={"h3"}>{title}</Typography>

      <div className={"flex w-full flex-col gap-2"}>
        {tasks.map((task, i) => {
          return <Task key={i} task={task} onOpen={props.onOpen} toggle={toggle} />;
        })}
      </div>
    </div>
  );
};
