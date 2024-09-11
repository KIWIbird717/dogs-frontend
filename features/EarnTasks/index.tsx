"use client";

import { Header } from "@/widgets/Header";
import { Button } from "@/shared/ui/Button/Button";
import { FC, useState } from "react";
import { twMerge } from "tailwind-merge";
import { TaskList } from "@/entities/TaskList";
import { Typography } from "@/shared/ui/Typography/Typography";
import useSWR from "swr";
import { TasksService } from "@/shared/lib/services/tasks/stats";
import { RewardTaskList } from "@/entities/RewardTaskList";
import { ModalEarn } from "@/widgets/ModalEarn";
import { TasksApiTypes } from "@/shared/lib/services/tasks/types";
import { TabCategory } from "@/shared/types/tab-category";
import { AnimatePresence } from "framer-motion";

export const EarnTasks = () => {
  const [toggle, setToggle] = useState<TabCategory>("rewards");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<TasksApiTypes.TasksDto | null>(null);

  const { data, mutate } = useSWR("/task", TasksService.getTasks);
  const tasks = data?.data;

  const notFoundTasks = tasks?.length === 0 ? "There are no tasks" : null;

  const handleModalOpen = ({ data }: { data: TasksApiTypes.TasksDto }) => {
    setIsModalOpen(true);
    setModalData(data);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalData(null);
  };
  return (
    <>
      <ModalEarn
        isOpen={isModalOpen}
        data={{ task: modalData }}
        onClose={handleCloseModal}
        onComplete={(compliedTask) => {
          if (!compliedTask) return;
          if (!data) return;
          if (!tasks) return;

          const compliedTaskIndex = tasks?.findIndex((rawTask) => rawTask.id === compliedTask.id);
          delete tasks[compliedTaskIndex];

          mutate({ ...data, data: tasks });
        }}
      />

      <Header />

      <Tabs state={toggle} onChange={(category) => setToggle(category)} />

      <div className={"flex h-full flex-col overflow-y-auto"}>
        <AnimatePresence>
          {toggle === "rewards" && (
            <RewardTaskList
              notFoundTasks={notFoundTasks}
              tasks={tasks || []}
              onOpen={handleModalOpen}
              toggle={toggle}
            />
          )}
          {toggle === "tasks" && (
            <TaskList
              notFoundTasks={notFoundTasks}
              onOpen={handleModalOpen}
              tasks={tasks || []}
              toggle={toggle}
            />
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

type TabsProps = {
  state: TabCategory;
  onChange?: (category: TabCategory) => void;
};

const Tabs: FC<TabsProps> = (props) => {
  const onSetRewards = () => props.onChange && props.onChange("rewards");
  const onSetTasks = () => props.onChange && props.onChange("tasks");

  return (
    <div className={"z-[10] flex h-[48px] w-full gap-2"}>
      <Button
        variant={"default"}
        className={twMerge(
          "h-full rounded-none border-b border-b-white-800 text-[15px] font-bold leading-[18px]",
          props.state === "rewards" && "border-b-blue-900",
        )}
        onClick={onSetRewards}
      >
        <Typography tag={"span"} className={"text-[15px] font-bold leading-[18px] text-white-900"}>
          Rewards
        </Typography>
      </Button>

      <Button
        variant={"default"}
        className={twMerge(
          "h-full rounded-none border-b border-b-white-800 text-[15px] font-bold leading-[18px]",
          props.state === "tasks" && "border-b-blue-900",
        )}
        onClick={onSetTasks}
      >
        <Typography tag={"span"} className={"text-[15px] font-bold leading-[18px] text-white-900"}>
          Tasks
        </Typography>
      </Button>
    </div>
  );
};
