import { FC } from "react";
import { RewardsBoard } from "@/widgets/RewardsBoard";
import { EarnTasksList } from "@/widgets/EarnTasks";
import { ToggleCategoryType } from "@/app/earn/page";
import { TasksApiTypes } from "@/shared/lib/services/tasks/types";

interface ITaskListProps {
  tasks:  TasksApiTypes.TasksDto[]
  toggle: ToggleCategoryType;
}

export const TaskList: FC<ITaskListProps> = ({ tasks, toggle }) => {
  return (
    <div className={"z-[10] flex w-full flex-col gap-4"}>
      {toggle === "rewards" && <RewardsBoard />}

      <div className={"flex w-full flex-col gap-4 pb-[110px]"}>
          <EarnTasksList tasks={tasks} toggle={toggle} />
      </div>
    </div>
  );
};
