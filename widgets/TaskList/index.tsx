import { FC } from "react";
import { RewardsBoard } from "@/widgets/RewardsBoard";
import { EarnTasksList } from "@/widgets/EarnTasks";
import { ToggleCategoryType } from "@/app/earn/page";
import { ITaskObj } from "@/shared/lib/redux-store/slices/modal-slice/type";

interface ITaskListProps {
  tasks: ITaskObj[];
  toggle: ToggleCategoryType;
}

export const TaskList: FC<ITaskListProps> = ({ tasks, toggle }) => {
  return (
    <div className={"z-[10] flex w-full flex-col gap-4"}>
      {toggle === "rewards" && <RewardsBoard />}

      <div className={"flex w-full flex-col gap-4 pb-[110px]"}>
        {tasks.map((item, i) => {
          return <EarnTasksList key={i} title={item.title} tasks={item.tasks} toggle={toggle} />;
        })}
      </div>
    </div>
  );
};
