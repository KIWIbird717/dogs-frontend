import { FC, ReactNode } from "react";
import { Typography } from "@/shared/ui/Typography/Typography";
import { Task } from "@/widgets/EarnTasks/shared/ui/Task";
import { ToggleCategoryType } from "@/app/earn/page";
import { ITask } from "@/shared/lib/redux-store/slices/modal-slice/type";

interface IEarnTasksListProps {
  title: string;
  tasks: ITask[];
  toggle: ToggleCategoryType;
}

export const EarnTasksList: FC<IEarnTasksListProps> = ({ title, tasks, toggle }) => {
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
