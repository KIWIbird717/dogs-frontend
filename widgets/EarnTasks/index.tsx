import { FC } from "react";
import { Typography } from "@/shared/ui/Typography/Typography";
import { Task } from "@/widgets/EarnTasks/shared/ui/Task";
import { ToggleCategoryType } from "@/app/earn/page";
import { TasksApiTypes } from "@/shared/lib/services/tasks/types";

interface IEarnTasksListProps {
  tasks: TasksApiTypes.TasksDto[];
  toggle: ToggleCategoryType;
}

export const EarnTasksList: FC<IEarnTasksListProps> = ({ tasks, toggle }) => {
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
          return <Task key={i} task={task} toggle={toggle} />;
        })}
      </div>
    </div>
  );
};
