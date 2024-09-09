"use client";

import { NextPage } from "next";
import { View } from "@/shared/layout/View";
import { Header } from "@/widgets/Header";
import { Button } from "@/shared/ui/Button/Button";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { Navbar } from "@/widgets/Navbar";
import { TaskList } from "@/widgets/TaskList";
import Gradient1 from "@/public/images/svg/earn/gradient/gradient1.svg";
import Gradient2 from "@/public/images/svg/earn/gradient/gradient2.svg";
import { Typography } from "@/shared/ui/Typography/Typography";
import useSWR from "swr";
import { TasksService } from "@/shared/lib/services/tasks/stats";
import { RewardTaskList } from "@/widgets/RewardTaskList";
import { ModalEarn } from "@/widgets/ModalEarn";
import { TasksApiTypes } from "@/shared/lib/services/tasks/types";
import toast, { Toaster } from "react-hot-toast";

interface IEarnPageProps {}

export type ToggleCategoryType = "rewards" | "tasks";

const EarnPage: NextPage<IEarnPageProps> = () => {
  const [toggle, setToggle] = useState<ToggleCategoryType>("rewards");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<TasksApiTypes.TasksDto | null>(null);

  const onSetRewards = () => setToggle("rewards");
  const onSetTasks = () => setToggle("tasks");

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
    <View
      fadeInOnLoad
      className="relative flex h-screen w-full flex-col gap-4 overflow-hidden px-4 pt-6"
    >
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

      <div className={"z-[10] flex h-[48px] w-full gap-2"}>
        <Button
          variant={"default"}
          className={twMerge(
            "h-full rounded-none border-b border-b-white-800 text-[15px] font-bold leading-[18px]",
            toggle === "rewards" && "border-b-blue-900",
          )}
          onClick={onSetRewards}
        >
          <Typography
            tag={"span"}
            className={"text-[15px] font-bold leading-[18px] text-white-900"}
          >
            Rewards
          </Typography>
        </Button>
        <Button
          variant={"default"}
          className={twMerge(
            "h-full rounded-none border-b border-b-white-800 text-[15px] font-bold leading-[18px]",
            toggle === "tasks" && "border-b-blue-900",
          )}
          onClick={onSetTasks}
        >
          <Typography
            tag={"span"}
            className={"text-[15px] font-bold leading-[18px] text-white-900"}
          >
            Tasks
          </Typography>
        </Button>
      </div>

      <div className={"flex h-full flex-col overflow-y-auto"}>
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
      </div>

      <Navbar />

      <Gradient1 className={"absolute left-0 top-0 z-[1]"} />
      <Gradient2 className={"absolute bottom-0 right-0 z-[1]"} />
    </View>
  );
};
export default EarnPage;
